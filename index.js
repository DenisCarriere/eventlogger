var os = require('os')
var platform = os.platform()

switch (platform) {
  case 'win32':
    module.exports = require('./lib/win32')
    break
  case 'darwin':
    module.exports = require('./lib/darwin')
    break
  case 'linux':
    module.exports = require('./lib/linux')
    break
  default:
    throw new Error(platform + ' not supported')
}
