// Add binary invokers
module.exports = require('./binaries')

// Add command line shortcuts
var commands = require('./cmd')
for (var item in commands) {
  module.exports[item] = commands[item]
}

// Add daemon management capabilities
module.exports.EventLogger = require('./eventlog')
