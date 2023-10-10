/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * Create an "andable"/curried predicate from some base type guard predicate. This method returns a function that, when invoked with its own
 * predicate, will return a new predicate that is the result of the base predicate, and the supplied predicate.
 *
 * This is particularly helpful when the two predicates have two different input types, with the first predicate type-guarding the second.
 *
 * @example
 * ```ts
 * type Thing =
 *  | { empty: true }
 *  | { empty: false, data: string }
 *
 * type ThingIsFilledGuard =
 *   (v: Thing) => v is Thing & { empty: false };
 *
 * const things: Thing[] = [
 *  { empty: true },
 *  { empty: false, data: 'apple' },
 *  { empty: false, data: 'banana' }
 * ];
 *
 * // with curried guard
 *
 * const isThingFilledAnd = createCurriedGuardPredicate((v => !v.empty) as ThingIsFilledGuard);
 * things.some(isThingFilledAnd((v) => v == 'banana')); // true
 *
 * // without the curred guard
 *
 * things.some((v: Thing) => v.empty == false && v.data == 'banana'); // true
 * ```
 */
export function createCurriedGuardPredicate<T, E extends T>(basePredicate: (v: T) => v is E) {
    return (predicate: (v: E) => boolean) => ((v) => basePredicate(v) && predicate(v)) as (v: T) => v is E;
}

/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * !> Adapted from the `pipe` implementation in [fp-ts](https://github.com/gcanti/fp-ts)
 *
 * @example
 * ```ts
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * // without pipe
 * assert.strictEqual(double(len('aaa')), 6)
 *
 * // with pipe
 * assert.strictEqual(pipe('aaa', len, double), 6)
 * ```
 */
export function pipe<A>(a: A): A;
export function pipe<A, B>(a: A, ab: (a: A) => B): B;
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
export function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
export function pipe<A, B, C, D, E, F>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): F;
export function pipe<A, B, C, D, E, F, G>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
): G;
export function pipe(a: unknown, ab?: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function, fg?: Function): unknown {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab!(a);
        case 3:
            return bc!(ab!(a));
        case 4:
            return cd!(bc!(ab!(a)));
        case 5:
            return de!(cd!(bc!(ab!(a))));
        case 6:
            return ef!(de!(cd!(bc!(ab!(a)))));
        case 7:
            return fg!(ef!(de!(cd!(bc!(ab!(a))))));
        default: {
            return [ab, bc, cd, de, ef, fg].reduce((acc, fn) => {
                if (!!fn) return fn(acc);
                return acc;
            }, a);
        }
    }
}

/**
 * Calls the provided function and returns its result. If an exception is thrown during the function call,
 * returns the provided fallback value instead.
 *
 * @param fn - The function to call.
 * @param or - The value to return if an exception is thrown during the function call.
 * @returns The result of the function call or the fallback value.
 *
 * @typeParam T - The type of the value returned by the function.
 * @typeParam E - The type of the fallback value.
 */
export function tryOr<T, E>(fn: () => T, or: E): T | E {
    try {
        return fn();
    } catch {
        return or;
    }
}

/**
 * Wraps a function and returns a new function that calls the wrapped function with its argument
 * and then returns the same argument.
 *
 * @example
 * This example demonstrates how to use `inject` with `Array.prototype.filter`, `Array.prototype.map`,
 * and `Array.prototype.forEach` to filter, transform, and log an array of numbers.
 *
 * ```typescript
 * [1, 2, 3, 4, 5, 6, 7]
 *  .filter(n => n % 2 == 0) // keep only even numbers
 *  .map(inject(console.log)) // log each even number and pass it through
 *  .map(n => n * 2) // double each even number
 *  .forEach(console.log); // log each doubled even number
 *
 * // Output:
 * // 2
 * // 4
 * // 6
 * // 4
 * // 8
 * // 12
 * ```
 *
 * @typeParam T The type of the argument for both the wrapped function and the returned function.
 * @param fn The function to be wrapped.
 * @returns A new function that calls `fn` with its argument and returns the same argument.
 */
export function inject<T>(fn: (arg: T) => unknown): (arg: T) => T {
    return (arg: T) => {
        fn(arg);
        return arg;
    };
}

/**
 * Apply a callback function to a value and return the result.
 *
 * @param {T} val - The value to be passed to the callback function.
 * @param {(it: T) => E} fn - The callback function that processes the value.
 * @returns {E} The result of applying the callback function to the value.
 *
 * @example
 * ```ts
 * type Data =
 *   | { type: "gizmo" }
 *   | { type: "shape", sides: number };
 *
 * function getData(): Data {
 *   // ...
 * }
 *
 * const sides = withLet(getData(), it => it.type == "shape" ? it.sides : 0);
 * ```
 */
export function withLet<T, E = T>(val: T, fn: (it: T) => E): E {
    return fn(val);
}
