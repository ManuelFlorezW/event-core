import { IEvent } from './IEvent'

export interface ILoggedIn extends IEvent<'LoggedIn'> {
  email: string
  token: string
  timestamp?: Date
}
