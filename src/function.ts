import { arrFromFactory } from "./array";

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
export function pipe(
    a: unknown,
    ab?: Function,
    bc?: Function,
    cd?: Function,
    de?: Function,
    ef?: Function,
    fg?: Function,
    gh?: Function,
    hi?: Function,
): unknown {
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
            const args = arguments;
            return arrFromFactory(arguments.length, (i) => args[i])
                .slice(1)
                .reduce((acc, fn) => fn(acc), arguments[0]);
        }
    }
}
