import { Command, CommandName } from '../../../commons/Command'
import { FormatEventError } from '../../../commons/EventError'
import { Result } from '../../../commons/Result'
import { UserType } from '../../User'
import { ILoggedIn } from '../interfaces/ILoggedIn'
import { IUserRegistered } from '../interfaces/IUserRegistered'
import { LoggedIn } from '../LoggedIn'
import { UserRegistered } from '../UserRegistered'

export class UserDecide {
  public static decide(event: UserType) {
    if (!event) return Result.err(new FormatEventError('Invalid format event for decide: event is undefined'))
    
    const handler = {
      UserRegistered: (event: IUserRegistered) => {
        const result = UserRegistered.create(event)
        return result.isErr ? Result.err(result.unwrapErr()) : Result.ok([CommandName.SAVE])
      },

      LoggedIn: (event: ILoggedIn) => {
        const result = LoggedIn.create(event)
        return result.isErr ? Result.err(result.unwrapErr()) : Result.ok([CommandName.SAVE])
      }
    }

    if (!(event.type in handler)) Result.err(new FormatEventError(`Unrecognized Event: ${event.type}`))
    
    const result = handler[event.type](event as any)

    if (result.isErr) return Result.err(result.unwrapErr())

    return Result.ok(result.unwrap().map(c => new Command(c)))
  }
}
