import { FormatEventError } from '../../commons/EventError'
import { Result } from '../../commons/Result'
import { Event } from './Event'
import { IUserRegistered } from './interfaces/IUserRegistered'

export class UserRegistered {

  private constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly type: string,
    public readonly createdAt?: string
  ) {}

  public static create(data: IUserRegistered) {

    const result = Event.create(data)

    if (result.isErr) return Result.err(result.unwrapErr())

    const { email, password, type } = data

    if (!email) return Result.err(new FormatEventError('Email is required for UserRegistered'))

    if (!password) return Result.err(new FormatEventError('Password is required for UserRegistered'))

    return Result.ok(new UserRegistered(email, password, type))
  }

}
