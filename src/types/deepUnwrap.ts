/**
 * Recursively unwraps nested arrays and returns the innermost type.
 *
 * @example
 * ```
 * // Returns `string`.
 * type Example1 = DeepUnwrap<string[][]>;'
 * ```
 *
 * @example
 * ```ts
 * // Returns `number`.
 * type Example2 = DeepUnwrap<number[]>;
 * ```
 *
 * @typeParam T - The array to unwrap.
 */
export type DeepUnwrap<T extends unknown[]> = T extends (infer Inner extends unknown[])[] ? DeepUnwrap<Inner> : T[number];
