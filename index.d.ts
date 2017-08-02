type MessageTypes = 'ERROR'| 'WARNING'| 'INFORMATION'| 'SUCCESSAUDIT'| 'FAILUREAUDIT'
type EventTypes = 'APPLICATION' | 'SYSTEM'

interface Config {
  source?: string
  eventLogs?: EventTypes
  path?: string
}

declare class EventLogger {
  constructor (config?: Config | string)
  warn (message: string, code?: number, callback?: (error: Error) => void): void
  error (message: string, code?: number, callback?: (error: Error) => void): void
  info (message: string, code?: number, callback?: (error: Error) => void): void
  auditSuccess (message: string, code?: number, callback?: (error: Error) => void): void
  auditFailure (message: string, code?: number, callback?: (error: Error) => void): void
}

namespace EventLogger {}
export = EventLogger
