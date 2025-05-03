import { FormatEventError } from '../../commons/EventError'
import { Result } from '../../commons/Result'

export class Event {
  
  private constructor(public readonly type: string) {}

  public static create({ type }: { type: string}) {
    return !type 
      ? Result.err(new FormatEventError('Type is required for Event'))
      : Result.ok(new Event(type))
  }

}
