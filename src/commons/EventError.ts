export class EventError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class FormatEventError extends EventError {
  constructor(message: string) {
    super(message)
    this.name = 'FormatEventError'
  }
}

export class BusinessEventError extends EventError {
  constructor(message: string, readonly type: string) {
    super(message)
  }
}
