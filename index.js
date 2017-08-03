var os = require('os')
var platform = os.platform()

switch (platform) {
  /* istanbul ignore next */
  case 'win32':
    module.exports = require('./lib/win32')
    break
  /* istanbul ignore next */
  case 'darwin':
    module.exports = require('./lib/darwin')
    break
  /* istanbul ignore next */
  case 'linux':
    module.exports = require('./lib/linux')
    break
  /* istanbul ignore next */
  default:
    throw new Error(platform + ' not supported')
}
