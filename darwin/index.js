var eventlogs = ['APPLICATION', 'SYSTEM']
var validtypes = ['ERROR', 'WARNING', 'INFORMATION', 'SUCCESSAUDIT', 'FAILUREAUDIT']

function write (eventLog, source, type, message, code, callback) {
  console.log(eventLog, source, type, message, code)
  // var cmd

  // if (msg === null) return
  // if (msg.trim().length === 0) return
  // log = log || 'APPLICATION'
  // log = eventlogs.indexOf(log.toUpperCase()) >= 0 ? log : 'APPLICATION'
  // type = (type || 'INFORMATION').trim().toUpperCase()
  // type = (validtypes.indexOf(type.trim().toUpperCase()) >= 0 ? type : 'INFORMATION').trim().toUpperCase()
  // id = typeof id === 'number' ? (id > 0 ? id : 1000) : 1000
  // src = (src || 'Unknown Application').trim()

  // // cmd = "eventcreate /L " + log + " /T " + type + " /SO \"" + src + "\" /D \"" + msg + "\" /ID " + id
  // cmd = `eventcreate /L ${log} /T ${type} /SO "${src}" /D "${msg}" /ID ${id}`

  // exec(cmd, function (err) {
  //   if (err && err.message.indexOf('Access is Denied')) {
  //     wincmd.elevate(cmd, callback)
  //   } else if (callback) {
  //     callback(err)
  //   }
  // })
}

/**
 * EventLogger
 */
class EventLogger {
  /**
   * EventLogger Constructor
   *
   * @param {Object|string} [config={}] Configuration
   * @param {string} [config.source='Node.js'] Source
   * @param {string} [config.eventLog='APPLICATION'] Event Log
   * @param {string} [config.path='/Library/Logs/Node.js'] Log Path
   */
  constructor (config = {}) {
    if (typeof config === 'string') config = {source: config}
    const eventLog = config.eventLog ? config.eventLog.toUpperCase() : 'APPLICATION'
    this.source = config.source || 'Node.js'
    this.eventLog = eventlogs.indexOf(eventLog) >= 0 ? eventLog : 'APPLICATION'
    this.path = config.path || '/Library/Logs/' + this.source
  }

  /**
   * Warning
   *
   * @param {string} message Message
   * @param {number} [code=1000] Code
   * @param {Function} [callback] Callback
   */
  warn (message, code, callback) {
    write(this.eventLog, this.source, 'WARNING', message, code, callback)
  }

  /**
   * Information
   *
   * @param {string} message Message
   * @param {number} [code=1000] Code
   * @param {Function} [callback] Callback
   */
  info (message, code, callback) {
    write(this.eventLog, this.source, 'INFORMATION', message, code, callback)
  }

  /**
   * Error
   *
   * @param {string} message Message
   * @param {number} [code=1000] Code
   * @param {Function} [callback] Callback
   */
  error (message, code, callback) {
    write(this.eventLog, this.source, 'ERROR', message, code, callback)
  }

  /**
   * Audit Success
   *
   * @param {string} message Message
   * @param {number} [code=1000] Code
   * @param {Function} [callback] Callback
   */
  auditSuccess (message, code, callback) {
    write(this.eventLog, this.source, 'SUCCESSAUDIT', message, code, callback)
  }

  /**
   * Audit Failure
   *
   * @param {string} message Message
   * @param {number} [code=1000] Code
   * @param {Function} [callback] Callback
   */
  auditFailure (message, code, callback) {
    write(this.eventLog, this.source, 'FAILUREAUDIT', message, code, callback)
  }
}

module.exports = EventLogger
