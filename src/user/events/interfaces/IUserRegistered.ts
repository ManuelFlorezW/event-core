import { IEvent } from './IEvent'

export interface IUserRegistered extends IEvent<'UserRegistered'> {
  type: 'UserRegistered'
  email: string
  password: string
  createdAt?: string
}
