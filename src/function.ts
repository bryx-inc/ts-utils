/**
 * Create an "andable"/curried predicate from some base type guard predicate. This method returns a function that, when invoked with its own
 * predicate, will return a new predicate that is the result of the base predicate, and the supplied predicate.
 *
 * This is particularly helpful when the two predicates have two different input types, with the first predicate type-guarding the second.
 *
 * @example
 * ```
 * type Thing = { empty: true } | { empty: false, data: string }
 * type ThingIsFilledGuard = (v: Thing) => v is Thing & { empty: false };
 * const things: Thing[] = [{ empty: true }, { empty: false, data: 'apple' }, { empty: false, data: 'banana' }];
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
