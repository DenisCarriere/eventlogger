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
  warn (message: string, code?: number, callback?: Callback): void
  warning (message: string, code?: number, callback?: Callback): void
  error (message: string, code?: number, callback?: Callback): void
  info (message: string, code?: number, callback?: Callback): void
  information (message: string, code?: number, callback?: Callback): void
  success (message: string, code?: number, callback?: Callback): void
  toString(): string
}

declare namespace EventLogger {}
export = EventLogger
