export type Maybe<T> = T | null;

export function isNone<T>(m: Maybe<T>): m is null {
  return m == null;
}

export function isSome<T>(m: Maybe<T>): m is T {
  return m != null;
}

/**
 * Converts a nullish `T?` value into a `Maybe<T>` type
 *
 * @example
 * const arr = ['apple', 'banana'];
 * const res: Maybe<string> = intoMaybe(arr.find(v => v = 'apple'));
 */
export function intoMaybe<T>(v?: T): Maybe<T> {
  return v ?? null;
}

export function matchMaybe<T, R, E>(
  v: Maybe<T>,
  recipe: {
    some: (v: T) => R;
    none: () => E;
  }
): R | E {
  if (isSome(v)) return recipe.some(v);
  else return recipe.none();
}

/**
 * Converts a value from `Maybe<T>` to `T`, throwing the specify error is the given Maybe is None.
 * This is particularly helpful since `const value ?? throw 'error'` is not valid
 *
 * @example
 * function findSomethingOrDont(): Maybe<string> { ... }
 * const res: string = expectMaybe(findSomethingOrDont(), 'could not find the value!');
 */
export function expectMaybe<T>(v: Maybe<T>, err: Error | string) {
  return matchMaybe(v, {
    some(v) {
      return v;
    },
    none() {
      throw err;
    },
  });
}

/**
 * Converts a value from `Maybe<T>` to `T`, throwing a generic "unable to unwrap" error if the given Maybe is None
 * To specify the error this method uses, refer to {@link expectMaybe}
 */
export function unwrapMaybe<T>(v: Maybe<T>) {
  return expectMaybe(v, "attempted to unwrap a null value!");
}

export function withSome<T, E>(v: Maybe<T>, fn: (v: T) => E): Maybe<E> {
  if (isSome(v)) return fn(v);
  else return null;
}

// ## //

export class FormalMaybe<T> {
  constructor(private v: Maybe<T>) {}

  static from<T>(v: Maybe<T>) {
    return new FormalMaybe(v);
  }

  static Some<T>(v: T) {
    return new FormalMaybe(v);
  }

  static None<T>() {
    return new FormalMaybe<T>(null);
  }

  inner(): Maybe<T> {
    return this.v;
  }

  isSome() {
    return isSome(this.v);
  }

  isNone() {
    return isNone(this.v);
  }

  isSomeAnd<E>(fn: (v: T) => Maybe<E>) {
    if (isSome(this.v)) return fn(this.v);
    else return null;
  }

  expect(msg: string) {
    if (isNone(this.v)) throw msg;
    else return this.v;
  }

  unwrap() {
    return this.expect("Failed to unwrap!");
  }

  unwrapOr(v: T) {
    return this.v ?? v;
  }

  unwrapOrElse(v: () => T) {
    return this.v ?? v();
  }

  when<E extends "some">(cond: E, fn: (v: T) => unknown): FormalMaybe<T>;
  when<E extends "none">(cond: E, fn: () => unknown): FormalMaybe<T>;

  when(cond: "some" | "none", fn: Function) {
    if (cond == "some" && this.isSome()) fn(this.unwrap());
    if (cond == "none" && this.isNone()) fn();

    return this;
  }
}
