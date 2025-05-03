import { IUserRegistered } from './events/interfaces/IUserRegistered'
import { ILoggedIn } from './events/interfaces/ILoggedIn'
import { UserProjection } from './events/projection/UserProjection'
import { UserDecide } from './events/decide/UserDecide'

export type UserType = IUserRegistered | ILoggedIn

export class User {

  getProjection(state: {}, event: UserType) {
    return UserProjection.projection(state, event)
  }

  getDecide(event: UserType) {
    return UserDecide.decide(event)
  }

}
