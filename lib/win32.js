// var wincmd = require('./binaries')
var spawn = require('child_process').spawn
var DarwinEventLogger = require('./darwin')

/**
 * EventLogger Constructor
 *
 * @param {Object|string} [config={}] Configuration
 * @param {string} [config.source='NodeJS'] Source
 * @param {string} [config.eventLog='APPLICATION'] Event Log
 */
function EventLogger (config) {
  DarwinEventLogger.call(this, config)
}
EventLogger.prototype = Object.create(DarwinEventLogger.prototype)

/**
 * Write
 *
 * @param {string} messageType Message Type
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 */
EventLogger.prototype.write = function (messageType, message, code, callback) {
  if (message == null) return
  if (message.trim().length === 0) return
  code = code || 1000

  var cmd = [
    'eventcreate',
    '/L', this.eventLog,
    '/T', messageType,
    '/SO', this.source,
    '/D', message,
    '/ID', code
  ]

  const eventcreate = spawn(cmd)
  eventcreate.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })
  eventcreate.stderr.on('data', function (data) {
    if (callback) {
      console.log(data)
      callback(data)
    }
  })
}

EventLogger.prototype.constructor = EventLogger
module.exports = EventLogger
