export class Result<T, E = Error> {
  public readonly isOk: boolean
  public readonly isErr: boolean
  private constructor(
    private readonly value?: T,
    private readonly error?: E
  ) {
    this.isOk = error === undefined
    this.isErr = !this.isOk
  }

  static ok<T>(value: T): Result<T> {
    return new Result<T>(value)
  }

  static err<E>(error: E): Result<never, E> {
    return new Result<never, E>(undefined, error)
  }

  unwrap(): T {
    if (this.isErr) throw new Error('Tried to unwrap an Err')
    return this.value as T
  }

  unwrapErr(): E {
    if (this.isOk) throw new Error('Tried to unwrapErr an Ok')
    return this.error as E
  }
}
