var DarwinEventLogger = require('./darwin')

/**
 * EventLogger Constructor
 *
 * @param {Object|string} [config={}] Configuration
 * @param {string} [config.source='NodeJS'] Source
 * @param {string} [config.eventLog='APPLICATION'] Event Log
 * @param {string} [config.logPath='/var/log'] Log Path
 */
function EventLogger (config) {
  if (typeof config === 'string') config = {source: config}
  config = config || {}
  config.logPath = config.logPath || '/var/log'
  DarwinEventLogger.call(this, config)
}

EventLogger.prototype = Object.create(DarwinEventLogger.prototype)
EventLogger.prototype.constructor = EventLogger
module.exports = EventLogger
