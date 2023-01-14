import { Maybe } from "./maybe";

/**
 * An object which can either be in an `Ok` state, or an `Err` state, with an associated value, `T`
 */
export class Result<T, E> {
    private constructor(private tuple: [true, T] | [false, E]) {}

    /**
     * Contructs a {@link Result} object in the `Ok` state around the given value.
     *
     * @example
     * ```
     * console.log(Result.Ok('foo').isOk()); // true
     * ```
     */
    static Ok<T, E>(v: T) {
        return new Result<T, E>([true, v]);
    }

    /**
     * Constructs a {@link Result} object in the `Err` state around the given value.
     *
     * @example
     * ```
     * console.log(Result.Err('yikes! something went wrong').isOk()); // false
     */
    static Err<T, E>(v: E) {
        return new Result<T, E>([false, v]);
    }

    private inner() {
        return this.tuple[1];
    }

    /**
     * Transforms a `Result<T, E>` into a `Result<J, K>` by specifying a mapper function `(v: T) => J` and
     * `(v: E) => K`.
     *
     * @example
     * ```
     * const res: Result<number, { msg: string }> = ...;
     * const mapped: Result<string, string> = res.map((v: number) => v.toString(), JSON.stringify);
     * ```
     */
    map<J, K>(mapOk: (v: T) => J, mapErr: (v: E) => K): Result<J, K> {
        if (this.tuple[0]) return Result.Ok(mapOk(this.tuple[1]));
        else return Result.Err(mapErr(this.tuple[1]));
    }

    /**
     * Returns `true` if the {@link Result} is in an `Ok` state.
     *
     * @example
     * ```
     * const res: Result<string, string> = ...;
     * if (res.isOk()) console.log('passed!');
     * ```
     */
    isOk() {
        return this.tuple[0];
    }

    /**
     * Returns `true` is the {@link Result} in in an `Err` state.
     *
     * @example
     * ```
     * const res: Result<string, string> = ...;
     * if (res.isErr()) console.log('an error occured!');
     * ```
     */
    isErr() {
        return !this.tuple[0];
    }

    /**
     * Returns the inner value if the {@link Result} in in an `Ok` state, otherwise `null`
     *
     * @example
     * ```
     * const res: Result<string, string> = ...;
     * if (res.isOk()) console.log(`result: ${res.ok()}`);
     * ```
     */
    ok(): Maybe<T> {
        if (this.isErr()) return null;
        else return this.inner() as T;
    }

    /**
     * Returns the inner value of the {@link Result} in an `Err` state, otherwise `null`
     *
     * @example
     * ```
     * const res: Result<string, string> = ...;
     * if (res.isErr()) console.log(`result failed with: ${res.err()}`);
     * ```
     */
    err(): Maybe<E> {
        if (this.isOk()) return null;
        else return this.inner() as E;
    }

    /**
     * Maps a `Result.Ok(null)` to `null`, otherwise return self.
     *
     * @example
     * ```
     * const res: Result<Maybe<string>, string> = ...;
     * const m: Maybe<Result<string, string>> = res.transpose();
     * ```
     */
    transpose(): Maybe<Result<T, E>> {
        if (this.isOk() && this.inner() == null) return null;
        else return this;
    }

    /**
     * Returns `res` if the {@link Result} is `Ok`, otherwise returns the inner `Err` value of the {@link Result}
     *
     * @example
     * ```
     * const a: Result.Ok(10);
     * const b: Result.Err('foo');
     *
     * console.log(a.and(v => Result.Ok(v * 2))); // Ok(20)
     * console.log(v.and(v => Result.Ok(v * 2))); // Err('foo')
     * ```
     */
    and(res: Result<T, E>) {
        if (this.isErr()) return this;
        else return res;
    }

    /**
     * If `this` is `Ok`, return `this`. Otherwise, return the other given {@link Result}, `res`;
     *
     * @example
     * ```
     * function div(n1: number, n2: number) {
     *  if (n2 == 0) return Result.Err('divide by zero');
     *  else return Result.Ok(n1 / n2);
     * }
     *
     * console.log(div(10, 2).or(Result.Ok(0))) // Ok(5)
     * console.log(div(10, 0).or(Result.Ok(0))) // Ok(0)
     * ```
     */
    or(res: Result<T, E>) {
        if (this.isOk()) return this;
        else return res;
    }

    /**
     * Calls and returns the value of `fn` if `this` is `Ok`, otherwise returns `this`;
     *
     * @example
     * ```
     * function div(n1: number, n2: number) {
     *  if (n2 == 0) return Result.Err('divide by zero');
     *  else return Result.Ok(n1 / n2);
     * }
     *
     * console.log(div(20, 2).andThen(n => div(n, 2))); // Ok(5)
     * console.log(div(20, 0).andThen(n => div(n, 2))); // Err('divide by zero');
     * ```
     */
    andThen<U>(fn: (v: T) => Result<U, E>): Result<U, E> {
        if (this.isErr()) return Result.Err(this.inner() as E);
        else return fn(this.inner() as T);
    }

    /**
     * Calls and returns the value of `fn` if the {@link Result} is an `Err`, otherwise returns the `Ok` value of `this`.
     *
     * @example
     * ```
     * const square = (v: number) => Result.Ok(v * v);
     * const err = (v: number) => Result.Err(v);
     *
     * console.log(Result.Ok(2).orElse(square)); // Ok(2)
     * console.log(Result.Err(2).orElse(square)); // Ok(4)
     * console.log(Result.Ok(3).orElse(square).orElse(err)) // Ok(9)
     * ```
     */
    orElse<F>(fn: (v: E) => Result<T, F>): Result<T, F> {
        if (this.isOk()) return Result.Ok(this.inner() as T);
        else return fn(this.inner() as E);
    }

    /**
     * Returns the contained `Ok` value of the {@link Result}. If the {@link Result} in an `Err`,
     * throws a generic error.
     *
     * @example
     * ```
     * console.log(Result.Ok('foo').unwrap()); // 'foo'
     * console.log(Result.Err('bar').unwrap()); // ERROR!
     * ```
     */
    unwrap(): T {
        if (this.isErr()) throw "attempted to unwrap ERR result";
        else return this.inner() as T;
    }

    /**
     * Returns the contained `Ok` value of the {@link Result}. If the {@link Result} is an `Err`,
     * then returns the given value `v`.
     *
     * @example
     * ```
     * const a = Result.Err('foo');
     * const b = Result.Ok('fizz');
     *
     * console.log(a.unwrapOr('bar')); // 'bar'
     * console.log(b.unwrapOr('bar')); // 'fizz'
     * ```
     */
    unwrapOr(v: T) {
        if (this.isOk()) return this.inner() as T;
        else return v;
    }

    /**
     * Returns the contained `Ok` value of the {@link Result}. If the {@link Result} is an `Err`,
     * then returns the result of the given `fn`, called with the `Err` value.
     *
     * @example
     * ```
     * const a = Result.Ok(15);
     * const b = Result.Err(15);
     *
     * console.log(a.unwrapOrElse(err => 'some value')); // 15
     * console.log(b.unwrapOrElse(err => err.toString())); // '15'
     * ```
     */
    unwrapOrElse(fn: (err: E) => T) {
        if (this.isOk()) return this.inner() as T;
        else return fn(this.inner() as E);
    }

    /**
     * Returns `true` if the {@link Result} `Ok` state equals the given value.
     *
     * @example
     * ```
     * console.log(Result.Ok('foo').contains('foo')); // true
     * console.log(Result.Ok('foobar').contains('foo')); // false
     * console.log(Result.Err('foo').contains('foo')) // false
     * ```
     */
    contains(v: T) {
        if (this.isErr()) return false;
        else return this.inner() == v;
    }

    /**
     * Returns `true` if the {@link Result} `Err` value equals the given value.
     *
     * @example
     * ```
     * console.log(Result.Ok('foo').contains('foo')); // true
     * console.log(Result.Ok('foobar').contains('foo')); // false
     * console.log(Result.Err('foo').contains('foo')) // false
     * ```
     */
    containsErr(v: E) {
        if (this.isOk()) return false;
        else return this.inner() == v;
    }

    equals(res: Result<T, E>): boolean {
        return res.isOk() == this.isOk() && res.inner() == this.inner();
    }

    toString() {
        return `${this.isOk() ? "Ok" : "Err"}(${JSON.stringify(this.inner())})`;
    }
}
