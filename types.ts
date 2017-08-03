import * as EventLogger from './'

const log = new EventLogger()

log.info('Basic information')
log.information('Basic information')
log.warning('Watch out!')
log.warn('Watch out!')
log.error('Something went wrong.')
log.auditFailure('Audit Failure')
log.auditSuccess('Audit Success')

// Configurations
new EventLogger('FooApplication')
new EventLogger({
  source: 'FooApplication',
  logPath: '/var/usr/local/log',
  eventLog: 'APPLICATION'
})
