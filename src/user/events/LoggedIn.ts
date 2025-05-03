import { FormatEventError } from '../../commons/EventError'
import { Result } from '../../commons/Result'
import { Event } from './Event'
import { ILoggedIn } from './interfaces/ILoggedIn'

export class LoggedIn {
  
  private constructor(
    public readonly email: string,
    public readonly token: string,
    public readonly type: string,
    public readonly timestamp?: Date
  ) {}

  public static create(data: ILoggedIn) {

    const result = Event.create(data)

    if (result.isErr) return Result.err(result.unwrapErr())
      
    const { email, token, type } = data

    if (!email) return Result.err(new FormatEventError('Email is required for LoggedIn'))

    if (!token) return Result.err(new FormatEventError('Token is required for LoggedIn'))
    
    return Result.ok(new LoggedIn(email, token, type))
  }

}
