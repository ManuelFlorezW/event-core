import { FormatEventError } from '../../../commons/EventError'
import { Result } from '../../../commons/Result'
import { UserType } from '../../User'
import { ILoggedIn } from '../interfaces/ILoggedIn'
import { IUserRegistered } from '../interfaces/IUserRegistered'

export class UserProjection {
  public static projection(state: {}, event: UserType) {
    if (!event) return Result.err(new FormatEventError('Invalid format event for decide: event is undefined'))

    const handler = {
      UserRegistered: (state: {}, event: IUserRegistered) => ({
        ...state, email: event.email, password: event.password, createdAt: event.createdAt
      }),

      LoggedIn: (state: {}, event: ILoggedIn) => ({
        ...state, lastLogin: { token: event.token, timestamp: event.timestamp }
      })
    }

    if (!(event.type in handler)) Result.err(new FormatEventError(`Unrecognized Event: ${event.type}`))
    
    return Result.ok(handler[event.type](state, event as any))
  }
}
