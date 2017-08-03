var wincmd = require('./binaries')
var exec = require('child_process').exec
var DarwinEventLogger = require('./darwin')

/**
 * EventLogger Constructor
 *
 * @param {Object|string} [config={}] Configuration
 * @param {string} [config.source='NodeJS'] Source
 * @param {string} [config.eventLog='APPLICATION'] Event Log
 */
var EventLogger = Object.create(DarwinEventLogger)

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

  var cmd = 'eventcreate /L ' + this.eventLog + ' /T ' + messageType + ' /SO "' + this.source + '" /D "' + message + '" /ID ' + code

  exec(cmd, function (err) {
    if (err && err.message.indexOf('Access is Denied')) wincmd.elevate(cmd, callback)
    else if (callback) callback(err)
  })
}

module.exports = EventLogger
