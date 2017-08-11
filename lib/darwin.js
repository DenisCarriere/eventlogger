var fs = require('fs')
var os = require('os')
var path = require('path')
var mkdirp = require('./mkdirp')
var common = require('./common')
var EVENT_TYPES = common.EVENT_TYPES
var MESSAGE_TYPES = common.MESSAGE_TYPES

/**
 * EventLogger Constructor
 *
 * @param {Object|string} [config={}] Configuration
 * @param {string} [config.source='NodeJS'] Source
 * @param {string} [config.eventLog='APPLICATION'] Event Log
 * @param {string} [config.logPath='~/Library/Logs/NodeJS'] Log Path
 * @example
 * const EventLogger = require('eventlogger')
 * const log = new EventLogger({
 *   source: 'Hello World',
 *   logPath: '~/Library/Logs'
 * })
 */
function EventLogger (config) {
  if (typeof config === 'string') config = {source: config}
  config = config || {}

  // Handle source
  var DEFAULT_SOURCE = 'NodeJS'
  this.source = config.source || DEFAULT_SOURCE

  // Handle eventLog
  var DEFAULT_EVENT_LOG = 'APPLICATION'
  var eventLog = config.eventLog ? config.eventLog.toUpperCase() : DEFAULT_EVENT_LOG
  this.eventLog = EVENT_TYPES.indexOf(eventLog) >= 0 ? eventLog : DEFAULT_EVENT_LOG

  // Handle logPath
  var DEFAULT_LOG_PATH = path.join(os.homedir(), 'Library', 'Logs', this.source)
  var logPath = config.logPath || DEFAULT_LOG_PATH
  this.logPath = logPath.replace(/~/, os.homedir())
}

/**
 * Write
 *
 * @private
 * @param {string} messageType Message Type
 * @param {*} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 */
EventLogger.prototype.write = function (messageType, message, code, callback) {
  // Handle Code
  code = code || 1000
  code = (typeof code === 'number') ? code : 1000

  // Handle Message
  if (typeof message === 'object') message = JSON.stringify(message)
  messageType = (messageType) ? messageType.trim().toUpperCase() : 'INFORMATION'
  messageType = MESSAGE_TYPES.indexOf(messageType) >= 0 ? messageType : 'INFORMATION'

  // Handle Dates
  var time = new Date().toISOString()

  // Save Log
  var outputPath = path.join(this.logPath, this.source + '.log')
  var outputMessage = ''

  // Create Folders if do not exist
  mkdirp.sync(this.logPath)
  mkdirp.sync(path.parse(this.logPath).dir)

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
 * @example
 * const log = new EventLogger()
 * log.warn('Watch out!')
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
 * @example
 * const log = new EventLogger()
 * log.info('Basic Information')
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
 * @example
 * const log = new EventLogger()
 * log.error('Something went wrong!')
 */
EventLogger.prototype.error = function (message, code, callback) {
  this.write('ERROR', message, code, callback)
}

/**
 * Audit Failure
 *
 * @param {string} message Message
 * @param {number} [code=1000] Code
 * @param {Function} [callback] Callback
 * @example
 * const log = new EventLogger()
 * log.success('Tests pass!')
 */
EventLogger.prototype.success = function (message, code, callback) {
  this.write('SUCCESS', message, code, callback)
}

EventLogger.prototype.toString = function () {
  return 'EventLogger("' + this.source + '")'
}

module.exports = EventLogger
