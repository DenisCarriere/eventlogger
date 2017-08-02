const test = require('tape')
const EventLogger = require('./')

test('offline-event-logger -- default values', t => {
  const log = new EventLogger()
  t.equal(log.source, 'Node.js', 'source')
  t.equal(log.eventLog, 'APPLICATION', 'eventLog')
  t.equal(log.path, '/Library/Logs/Node.js', 'path')
  t.end()
})

test('offline-event-logger -- custom values', t => {
  const log = new EventLogger({
    source: 'Hello World',
    path: '/Library/Logs/Foo',
    eventLog: 'SYSTEM'
  })
  t.equal(log.source, 'Hello World', 'source')
  t.equal(log.eventLog, 'SYSTEM', 'eventLog')
  t.equal(log.path, '/Library/Logs/Foo', 'path')
  t.end()
})
