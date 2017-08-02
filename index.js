const os = require('os')
const platform = os.platform()

switch (platform) {
  case 'win32':
    module.exports = require('./win32')
    break
  case 'darwin':
    module.exports = require('./darwin')
    break
  default:
    throw new Error(platform + ' not supported')
}
