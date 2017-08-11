type MessageTypes = 'ERROR'| 'WARNING'| 'INFORMATION'| 'SUCCESS'
type EventTypes = 'APPLICATION' | 'SYSTEM'

interface Config {
  source?: string
  eventLog?: EventTypes
  logPath?: string
}
type Callback = (error: Error) => void

declare class EventLogger {
  constructor (config?: Config | string)
  warn (message: any, code?: number, callback?: Callback): void
  warning (message: any, code?: number, callback?: Callback): void
  error (message: any, code?: number, callback?: Callback): void
  info (message: any, code?: number, callback?: Callback): void
  information (message: any, code?: number, callback?: Callback): void
  success (message: any, code?: number, callback?: Callback): void
  toString(): string
}

declare namespace EventLogger {}
export = EventLogger
