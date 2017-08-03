var fs = require('fs-extra')
var os = require('os')
var path = require('path')
var test = require('tape')
var EventLogger = require('./')

switch (os.platform()) {
  case 'darwin':
    test('darwin -- default values', t => {
      var logPath = path.join(os.homedir(), 'Library', 'Logs', 'NodeJS')
      var log = new EventLogger()
      t.equal(log.source, 'NodeJS', 'source')
      t.equal(log.eventLog, 'APPLICATION', 'eventLog')
      t.equal(log.logPath, logPath, 'logPath')
      t.end()
    })

    test('darwin -- custom values', t => {
      var logPath = '~/Library/Logs/Foo'
      var log = new EventLogger({
        logPath: logPath,
        source: 'Hello World',
        eventLog: 'SYSTEM'
      })
      t.equal(log.source, 'Hello World', 'source')
      t.equal(log.eventLog, 'SYSTEM', 'eventLog')
      t.equal(log.logPath, path.join(os.homedir(), 'Library', 'Logs', 'Foo'), 'logPath')
      t.end()
    })

    test('darwin -- write', t => {
      var source = 'Hello World'
      var logPath = path.join(os.homedir(), 'Library', 'Logs', source)
      var logFilePath = path.join(logPath, source + '.log')
      fs.removeSync(logPath)
      var log = new EventLogger(source)

      log.warn('Basic information.')
      log.info('Watch out!')
      log.error('Something went wrong.')

      t.equal(fs.readFileSync(logFilePath).byteLength, 173, 'saved log')
      t.end()
    })
    break
  case 'linux':
    test('linux -- default values', t => {
      var logPath = '/var/log'
      var log = new EventLogger()
      t.equal(log.source, 'NodeJS', 'source')
      t.equal(log.eventLog, 'APPLICATION', 'eventLog')
      t.equal(log.logPath, logPath, 'logPath')
      t.end()
    })
    test('linux -- custom values', t => {
      var logPath = '/var/local/log'
      var log = new EventLogger({
        logPath: logPath,
        source: 'Hello World',
        eventLog: 'SYSTEM'
      })
      t.equal(log.source, 'Hello World', 'source')
      t.equal(log.eventLog, 'SYSTEM', 'eventLog')
      t.equal(log.logPath, logPath, 'logPath')
      t.end()
    })
    test('linux -- write', t => {
      var source = 'Hello World'
      var logPath = '/tmp/log/'
      var logFilePath = logPath + source + '.log'
      fs.removeSync(logFilePath)

      var log = new EventLogger({
        source: source,
        logPath: logPath
      })

      log.warn('Basic information.')
      log.info('Watch out!')
      log.error('Something went wrong.')

      t.equal(fs.readFileSync(logFilePath).byteLength, 173, 'saved log')
      t.end()
    })
    break
  case 'win32':
    test('win32 -- default values', t => {
      var log = new EventLogger()
      t.equal(log.source, 'NodeJS', 'source')
      t.equal(log.eventLog, 'APPLICATION', 'eventLog')
      t.end()
    })
    test('win32 -- custom values', t => {
      var log = new EventLogger({
        source: 'Hello World',
        eventLog: 'SYSTEM'
      })
      t.equal(log.source, 'Hello World', 'source')
      t.equal(log.eventLog, 'SYSTEM', 'eventLog')
      t.end()
    })
    test('win32 -- write', t => {
      var source = 'Hello World'
      var log = new EventLogger(source)

      log.warn('Basic information.')
      log.info('Watch out!')
      log.error('Something went wrong.')
      t.pass()
      t.end()
    })
}
