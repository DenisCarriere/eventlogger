type MessageTypes = 'ERROR'| 'WARNING'| 'INFORMATION'| 'SUCCESSAUDIT'| 'FAILUREAUDIT'
type EventTypes = 'APPLICATION' | 'SYSTEM'

interface Config {
  source?: string
  eventLogs?: EventTypes
  path?: string
}
type Callback = (error: Error) => void

declare class EventLogger {
  constructor (config?: Config | string)
  warn (message: string, code?: number, callback?: Callback): void
  warning (message: string, code?: number, callback?: Callback): void
  error (message: string, code?: number, callback?: Callback): void
  info (message: string, code?: number, callback?: Callback): void
  information (message: string, code?: number, callback?: Callback): void
  auditSuccess (message: string, code?: number, callback?: Callback): void
  auditFailure (message: string, code?: number, callback?: Callback): void
  write (messageType: MessageTypes, message: string, code?: number, callback?: Callback): void
}

declare namespace EventLogger {}
export = EventLogger
