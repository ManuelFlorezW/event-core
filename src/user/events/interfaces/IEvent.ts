export interface IEvent<T extends string> {
  type: T,
  timestamp?: Date
}