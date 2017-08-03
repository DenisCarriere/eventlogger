var fs = require('fs')
var os = require('os')
var path = require('path')
var mkdirp = require('mkdirp')
var moment = require('moment')

var EVENT_TYPES = ['APPLICATION', 'SYSTEM']
var MESSAGE_TYPES = ['ERROR', 'WARNING', 'INFORMATION', 'SUCCESSAUDIT', 'FAILUREAUDIT']

/**
 * EventLogger Constructor
 *
 * @param {Object|string} [config={}] Configuration
 * @param {string} [config.source='Node.js'] Source
 * @param {string} [config.eventLog='APPLICATION'] Event Log
 * @param {string} [config.logPath='~/Library/Logs/Node.js'] Log Path
 */
function EventLogger (config) {
  config = config || {}
  if (typeof config === 'string') config = {source: config}
  var eventLog = config.eventLog ? config.eventLog.toUpperCase() : 'APPLICATION'
  this.source = config.source || 'Node.js'
  this.eventLog = EVENT_TYPES.indexOf(eventLog) >= 0 ? eventLog : 'APPLICATION'
  this.logPath = config.logPath || path.join(os.homedir(), 'Library', 'Logs', this.source)
  this.logPath = this.logPath.replace(/~/, os.homedir())
  mkdirp.sync(this.logPath)
}

/**
 * Write
 *
 * @param {string} messageType Message Type
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 * @example
 * //= 2016-03-15T23:25:23Z [6419] INFO file-descriptors (nofiles) new hard limit is -1, new soft limit is 1024
 */
EventLogger.prototype.write = function (messageType, message, code, callback) {
  // Handle Code
  code = code || 1000
  code = (typeof code === 'number') ? code : 1000

  // Handle Message
  messageType = (messageType) ? messageType.trim().toUpperCase() : 'INFORMATION'
  messageType = MESSAGE_TYPES.indexOf(messageType) >= 0 ? messageType : 'INFORMATION'

  // Handle Dates
  var time = moment().toISOString()
  var date = moment().format('YYYY-MM-DD')

  // Save Log
  var outputPath = path.join(this.logPath, this.source + '_' + date + '.log')
  var outputMessage = ''
  if (fs.existsSync(outputPath)) outputMessage += '\n'
  outputMessage += time + ' [' + code + '] ' + messageType + ' ' + message
  fs.appendFileSync(outputPath, outputMessage)
}

/**
 * Warning
 *
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 */
EventLogger.prototype.warn = function (message, code, callback) {
  this.write('WARNING', message, code, callback)
}
EventLogger.prototype.warning = function (message, code, callback) {
  this.warn(message, code, callback)
}

/**
 * Information
 *
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 */
EventLogger.prototype.info = function (message, code, callback) {
  this.write('INFORMATION', message, code, callback)
}
EventLogger.prototype.information = function (message, code, callback) {
  this.info(message, code, callback)
}

/**
 * Error
 *
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 */
EventLogger.prototype.error = function (message, code, callback) {
  this.write('ERROR', message, code, callback)
}

/**
 * Audit Success
 *
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 */
EventLogger.prototype.auditSuccess = function (message, code, callback) {
  this.write('SUCCESSAUDIT', message, code, callback)
}

/**
 * Audit Failure
 *
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 */
EventLogger.prototype.auditFailure = function (message, code, callback) {
  this.write('FAILUREAUDIT', message, code, callback)
}

EventLogger.prototype.toString = function () {
  return 'EventLogger("' + this.source + '")'
}

module.exports = EventLogger
