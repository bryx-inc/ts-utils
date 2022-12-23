import { Maybe } from "./maybe";

export class Result<T, E> {
  constructor(private tuple: [true, T] | [false, E]) {}

  static Ok<T, E>(v: T) {
    return new Result<T, E>([true, v]);
  }

  static Err<T, E>(v: E) {
    return new Result<T, E>([false, v]);
  }

  private inner() {
    return this.tuple[1];
  }

  map<J, K>(mapOk: (v: T) => J, mapErr: (v: E) => K): Result<J, K> {
    if (this.isOk()) return Result.Ok(mapOk(this.ok()));
    else return Result.Err(mapErr(this.err()));
  }

  isOk() {
    return this.tuple[0];
  }

  isErr() {
    return !this.tuple[0];
  }

  ok(): Maybe<T> {
    if (this.isErr()) return null;
    else return this.inner() as T;
  }

  err(): Maybe<E> {
    if (this.isOk()) return null;
    else return this.inner() as E;
  }

  transpose(): Maybe<Result<T, E>> {
    if (this.isOk() && this.inner() == null) return null;
    else return this;
  }

  and(res: Result<T, E>) {
    if (this.isErr()) return this;
    else return res;
  }

  or(res: Result<T, E>) {
    if (this.isOk()) return this;
    else return res;
  }

  andThen<U>(fn: (v: T) => Result<U, E>): Result<U, E> {
    if (this.isErr()) return Result.Err(this.inner() as E);
    else return fn(this.inner() as T);
  }

  orElse<F>(fn: (v: E) => Result<T, F>): Result<T, F> {
    if (this.isOk()) return Result.Ok(this.inner() as T);
    else return fn(this.inner() as E);
  }

  unwrap(): T {
    if (this.isErr()) throw "attempted to unwrap ERR result";
    else return this.inner() as T;
  }

  unwrapOr(v: T) {
    if (this.isOk()) return this.inner() as T;
    else return v;
  }

  unwrapOrElse(fn: (err: E) => T) {
    if (this.isOk()) return this.inner() as T;
    else return fn(this.inner() as E);
  }

  contains(v: T) {
    if (this.isErr()) return false;
    else return this.inner() == v;
  }

  containsErr(v: E) {
    if (this.isOk()) return false;
    else return this.inner() == v;
  }
}
