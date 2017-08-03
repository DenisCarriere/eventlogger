const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const test = require('tape')
const moment = require('moment')
const EventLogger = require('./')

switch (os.platform()) {
  case 'darwin':
    test('darwin -- default values', t => {
      const logPath = path.join(os.homedir(), 'Library', 'Logs', 'Node.js')
      const log = new EventLogger()
      t.equal(log.source, 'Node.js', 'source')
      t.equal(log.eventLog, 'APPLICATION', 'eventLog')
      t.equal(log.logPath, logPath, 'logPath')
      t.end()
    })

    test('darwin -- custom values', t => {
      const logPath = '~/Library/Logs/Foo'
      const log = new EventLogger({
        logPath,
        source: 'Hello World',
        eventLog: 'SYSTEM'
      })
      t.equal(log.source, 'Hello World', 'source')
      t.equal(log.eventLog, 'SYSTEM', 'eventLog')
      t.equal(log.logPath, path.join(os.homedir(), 'Library', 'Logs', 'Foo'), 'logPath')
      t.end()
    })

    test('darwin -- write', t => {
      const source = 'EventLogger'
      const date = moment().format('YYYY-MM-DD')
      const logPath = path.join(os.homedir(), 'Library', 'Logs', source)
      const logFilePath = path.join(logPath, `${source}_${date}.log`)
      fs.removeSync(logPath)
      const log = new EventLogger(source)

      log.warn('Basic information.')
      log.info('Watch out!')
      log.error('Something went wrong.')

      t.equal(fs.readFileSync(logFilePath).byteLength, 173, 'saved log')
      t.end()
    })
}
