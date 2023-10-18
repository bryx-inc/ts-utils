/**
 * A shorthand type for `T | null`.
 */
export type Maybe<T> = T | null;

export function isNone<T>(m: Maybe<T>): m is null {
    return m == null;
}

export function isSome<T>(m: Maybe<T>): m is NonNullable<T> {
    return m != null;
}

/**
 * Converts a nullish `T?` value into a `Maybe<T>` type
 *
 * @example
 * ```ts
 * const arr = ['apple', 'banana'];
 * const res: Maybe<string> = intoMaybe(arr.find(v => v = 'apple'));
 * ```
 */
export function intoMaybe<T>(v?: T): Maybe<T> {
    return v ?? null;
}

/**
 * Matches a `Maybe<T>` to either "some" (not null) or "none" (null) and runs/returns a code block for
 * each arm.
 *
 * @example
 * ```ts
 * const name: Maybe<{first: string, last: string}> = ...;
 * const first: string = matchMaybe(name, {
 *  some: ({ first }) => first,
 *  none: () => "Joe" // default
 * });
 *
 * ```
 *
 * @param v The `Maybe` to match with
 * @param recipe An object containing a method for `none`, and a method for `some`
 * @returns The result of the evaluated code arm.
 */
export function matchMaybe<T, R, E>(
    v: Maybe<T>,
    recipe: {
        some: (v: T) => R;
        none: () => E;
    },
): R | E {
    if (isSome(v)) return recipe.some(v);
    else return recipe.none();
}

/**
 * Converts a value from `Maybe<T>` to `T`, throwing the specify error is the given Maybe is None.
 *
 * ?> This is particularly helpful since `const value ?? throw 'error'` is not valid
 *
 * @example
 * ```ts
 * function findSomethingOrDont(): Maybe<string> { ... }
 * const res: string = expectMaybe(findSomethingOrDont(), 'could not find the value!');
 * ```
 */
export function expectMaybe<T>(v: Maybe<T>, err: Error | string) {
    return matchMaybe(v, {
        some(v) {
            return v;
        },
        none() {
            throw err instanceof Error ? err : new Error(err);
        },
    });
}

/**
 * Converts a value from `Maybe<T>` to `T`, throwing a generic "unable to unwrap" error if the given Maybe is None
 *
 * ?> To specify the error this method uses, refer to {@link expectMaybe}
 */
export function unwrapMaybe<T>(v: Maybe<T>) {
    return expectMaybe(v, "attempted to unwrap a null value!");
}

/**
 * Converts a value from `Maybe<T>` to `T | undefined`.
 *
 * ?> Typically, this is useful for passing a `Maybe<T>` to an optional function parameter.
 *
 * @example
 * ```ts
 * function doSomething(arg?: string) { ... }
 * const maybeStr: Maybe<string> = ...;
 *
 * doSomething(unwrapOrUndef(maybeStr));
 * ```
 */
export function unwrapOrUndef<T>(v: Maybe<T>) {
    return v ?? undefined;
}

export function withSome<T, E>(v: Maybe<T>, fn: (v: NonNullable<T>) => E): Maybe<E> {
    if (isSome(v)) return fn(v);
    else return null;
}

// ## //

/**
 * A formal wrapper class for interacting with possibly `null` values.
 *
 * ?> {@link Maybe<T>} is a type-alias for `T | null`, whereas {@link FormalMaybe<T>} is a runtime-evaluated object proper, containing a {@link Maybe<T>} value.
 */
export class FormalMaybe<T> {
    constructor(private v: Maybe<T>) {}

    /**
     * Constructs a {@link FormalMaybe} from a nullish input.
     *
     * @example
     * ```ts
     * const arr = ['apple', 'banana', 'orange', ...]
     * const fruit = FormalMaybe.from(arr.find(v => v == 'pear'));
     * ```
     *
     * @param v The nullish object to wrap in a {@link FormalMaybe}
     * @returns The newly constructed {@link FormalMaybe}
     */
    static from<T>(v?: Maybe<T>): FormalMaybe<T> {
        return new FormalMaybe(v ?? null);
    }

    /**
     * Constructs a {@link FormalMaybe} from a non-null input.
     *
     * @example
     * ```ts
     * let name: Maybe<string> = FormalMaybe.None();
     *
     * function loadName() {
     *  name = FormalMaybe.Some("tyler");
     * }
     *
     * setTimeout(loadName, 1000);
     *
     * while (true) {
     *  name.when('some', (name) => console.log(name));
     * }
     *
     * ```
     *
     * @param v The non-null value wrap in a {@link FormalMaybe}
     * @returns The newly constructed {@link FormalMaybe}
     */
    static Some<T>(v: T) {
        return new FormalMaybe(v);
    }

    /**
     * Constructs an empty {@link FormalMaybe}.
     *
     * @example
     * ```ts
     * let name: Maybe<string> = FormalMaybe.None();
     *
     * function loadName() {
     *  name = FormalMaybe.Some("tyler");
     * }
     *
     * setTimeout(loadName, 1000);
     *
     * while (true) {
     *  name.when('some', (name) => console.log(name));
     * }
     *
     * ```
     *
     * @returns The empty {@link FormalMaybe}
     */
    static None<T>() {
        return new FormalMaybe<T>(null);
    }

    /**
     * Eject the wrapped {@link Maybe} value from the {@link FormalMaybe}.
     *
     * ?> This is helpful for interop compatability with raw {@link Maybe}-based functions.
     *
     * @example
     * ```ts
     * function doSomething(v: Maybe<string>) { ... }
     * const val: FormalMaybe<string> = (...);
     *
     * doSomething(val.inner());
     * ```
     */
    inner(): Maybe<T> {
        return this.v;
    }

    /**
     * Returns `true` if the wrapped {@link Maybe} value is not `null`.
     * Note: that for control guards that interact with checked value, it is recommended to use {@link FormalMaybe}::{@link when} instead.
     *
     * @example
     * ```ts
     * const v: Maybe<string> = (...);
     *
     * if (v.isSome()) {
     *  console.log("the result is not null!");
     * }
     * ```
     *
     * @returns `true` if the wrapped {@link Maybe} value is not `null`.
     */
    isSome() {
        return isSome(this.v);
    }

    /**
     * Returns `true` if the wrapped {@link Maybe} value is `null`.
     * Note: that for control guards that interact with checked value, it is recommended to use {@link FormalMaybe}::{@link when} instead.
     *
     * @example
     * ```ts
     * const v: Maybe<string> = (...);
     *
     * if (v.isNone()) {
     *  console.log("the result is null!");
     * }
     * ```
     *
     * @returns `true` if the wrapped {@link Maybe} value is `null`.
     */
    isNone() {
        return isNone(this.v);
    }

    /**
     * If the {@link FormalMaybe} is `null`, return `None`. Otherwise, return the result given function, invoked with the non-null inner value.
     *
     * @example
     * ```ts
     * const v1 = FormalMaybe.Some('foo');
     * const v2 = FormalMaybe.None<string>();
     *
     * const toLen = (s: string) => s.length;
     *
     * console.log(v1.isSomeAnd(toLen)); // 3
     * console.log(v2.isSomeAnd(toLen)); // null
     * ```
     *
     * @param fn
     * @returns
     */
    isSomeAnd<E>(fn: (v: T) => FormalMaybe<E>) {
        if (isSome(this.v)) return fn(this.v);
        else return FormalMaybe.None<E>();
    }

    /**
     * Returns the inner value as a non-null {@link T}. If the inner value is `null`, throw the given error instead.
     *
     * @example
     * ```ts
     * function fetchName(): FormalMaybe<string> { ... }
     *
     * console.log(`the name is ${fetchName().expect('failed to fetch name!')}`);
     * ```
     *
     * @param msg The error message to throw if the inner value is `null`.
     * @returns The non-null inner value
     */
    expect(msg: string) {
        if (isNone(this.v)) throw new Error(msg);
        else return this.v;
    }

    /**
     * Returns the inner non-null value, throwing a generic error if the inner value is `null`.
     *
     * @example
     * ```ts
     * const v = FormalMaybe.Some('foo');
     * const v2 = FormalMaybe.None();
     *
     * console.log(v.unwrap()); // 'foo'
     * console.log(v2.unwrap()); // ERROR!
     * ```
     *
     * @returns The inner, non-null value.
     */
    unwrap() {
        return this.expect("Failed to unwrap!");
    }

    /**
     * Returns the inner non-null value, or the provided value if the inner value is `null`.
     *
     * @example
     * ```ts
     * console.log(FormalMaybe.Some("foo").unwrapOr("bar")); // "foo"
     * console.log(FormalMaybe.None().unwrapOr("bar")); // "bar"
     * ```
     *
     * @param v The default value
     */
    unwrapOr(v: T) {
        return this.v ?? v;
    }

    /**
     * Returns the inner non-null value, or computes it from a given function.
     *
     * @example
     * ```ts
     * const k = 10;
     * console.log(FormalResult.Some(4).unwrapOrElse(() => 2 * k)); // 4
     * console.log(FormalResult.None().unwrapOrelse(() => 2 * k)); // 20
     * ```
     *
     * @param fn The function to compute the default value from.
     */
    unwrapOrElse(fn: () => T) {
        return this.v ?? fn();
    }

    /**
     * Returns the inner non-null value, or returns `undefined`.
     *
     * ?> Typically, this is useful for passing the inner value to an optional function parameter.
     *
     * @example
     * ```ts
     * function doSomething(arg?: string) { ... }
     * const maybeStr: FormalMaybe<string> = ...;
     *
     * doSomething(maybeStr.unwrapOrUndef());
     * ```
     */
    unwrapOrUndef(): T | undefined {
        return this.v ?? undefined;
    }

    /**
     * Removes and returns the wrapped value from the `FormalMaybe` instance.
     * After calling this method, the `FormalMaybe` instance will be empty (`null`).
     *
     * @example
     * ```
     * const maybeValue = FormalMaybe.Some(42);
     * const value = maybeValue.take(); // value = 42, maybeValue is now empty
     *
     * console.log(value); // 42
     * console.log(maybeValue.isNone()); // true
     * ```
     *
     * @returns The wrapped value if it exists, otherwise `null`.
     */
    take(): Maybe<T> {
        const taken = this.v;
        this.v = null;

        return taken;
    }

    /**
     * Conditionally execute a block of code based on the `null` state of the inner value
     *
     * @param cond "some" to run the code block when the inner value is not null
     * @param fn The function to run, called with the non-null inner value
     * @returns `this`
     */
    when<E extends "some">(cond: E, fn: (v: T) => unknown): FormalMaybe<T>;

    /**
     * Conditionally execute a block of code based on the `null` state of the inner value
     *
     * @param cond "none" to run the code block when the inner value is null
     * @param fn The code block to run
     * @returns `this`
     */
    when<E extends "none">(cond: E, fn: () => unknown): FormalMaybe<T>;

    when(cond: "some" | "none", fn: (...v: T[]) => unknown) {
        if (cond == "some" && this.isSome()) fn(this.unwrap());
        if (cond == "none" && this.isNone()) fn();

        return this;
    }
}

type NullOrUndefined = null | undefined;

type WrappedMaybe<T> = T extends NullOrUndefined
    ? WrappedMaybe<Exclude<T, NullOrUndefined>> | Extract<T, NullOrUndefined>
    : {
          /** Calls the specified function with the wrapped value as its argument and returns the result */
          let: <E>(fn: (it: T) => E) => WrappedMaybe<E>;
          /** Calls the specified function with the wrapped value as its argument and returns the wrapped value */
          also: (fn: (it: T) => void) => WrappedMaybe<T>;
          /** Returns the taken value if it satisfies the given predicate, otherwise returns null */
          takeIf: (predicate: (it: T) => boolean) => NonNullable<T> | null;
          /** Returns the taken value unless it satisfies the given predicate, in which case it returns null */
          takeUnless: (predicate: (it: T) => boolean) => T | null;
          /** Returns the wrapped value unless it satisfies the given predicate, in which case it returns null */
          if: (predicate: (it: T) => boolean) => WrappedMaybe<NonNullable<T>> | null;
          /** Returns the wrapped value unless it satisfies the given predicate, in which case it returns null */
          unless: (predicate: (it: T) => boolean) => WrappedMaybe<NonNullable<T>> | null;
          /** Returns the wrapped value it was called with */
          take: () => NonNullable<T>;
      } & NonNullable<T>;

/**
 * Creates a scoped value for chaining operations on a copy of the given wrapped value.
 *
 * @typeParam T The type of the wrapped value.
 * @param wrapped The value to wrap
 */
export function maybe<T>(wrapped: T): WrappedMaybe<T> {
    if (wrapped !== null && wrapped !== undefined)
        return {
            ...wrapped,
            let: <E>(fn: (it: T) => E) => maybe(fn(wrapped)),
            takeIf: (predicate: (it: T) => boolean) => (predicate(wrapped) ? wrapped : null),
            takeUnless: (predicate: (it: T) => boolean) => (predicate(wrapped) ? null : wrapped),
            if: (predicate: (it: T) => boolean) => maybe(predicate(wrapped) ? wrapped : null),
            unless: (predicate: (it: T) => boolean) => maybe(predicate(wrapped) ? null : wrapped),
            take: () => wrapped,
            also: (fn: (it: T) => void) => {
                fn(wrapped);
                return maybe(wrapped);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else return wrapped as any;
}
