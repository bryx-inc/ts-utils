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
export type DeepUnwrap<T> = T extends (infer Inner)[] ? DeepUnwrap<Inner> : T extends ReadonlyArray<infer Inner> ? DeepUnwrap<Inner> : T;
