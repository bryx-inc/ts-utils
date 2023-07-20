/**
 * @generator
 *
 * Generates a range of numbers from a lower bound to an optional upper bound.
 *
 * !> Note: When providing bounds of a very large interval, this generator may result in stack overflow errors due to excessive recursion.
 *
 *
 * @param {number} lower - The lower bound of the range.
 * @param {number} upper - The upper bound of the range (inclusive).
 * @returns {Generator<number>} A generator yielding the numbers in the specified range.
 *
 * @example
 * ```ts
 * for (const i of rangeIter(-5, 10)) {
 *  console.log(i); // -5, -4, -3, -2, ... 9, 10
 * }
 * ```
 *
 * @category Iterator
 */
export function* rangeIter(lower: number, upper: number): Generator<number> {
    yield lower;
    if (lower < upper) yield* rangeIter(lower + 1, upper);
}
