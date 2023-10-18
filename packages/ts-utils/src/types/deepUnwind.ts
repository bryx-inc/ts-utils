/**
 * Recursively unwinds nested array types and returns the innermost type.
 *
 * #### With Simple Arrays
 *
 * @example
 * ```ts
 * type Example1 = DeepUnwind<string[][]>;
 * //   ^? string
 *
 * type Example2 = DeepUnwind<number[]>;
 * //   ^? number
 * ```
 *
 * #### With Complex Arrays
 *
 * @example
 * ```ts
 * const arr = ['one', 2, 'three', ['four', 5, ['six']]];
 * type Example3 = DeepUnwind<typeof arr>
 * //   ^? string | number
 * ```
 *
 * #### With Readonly Tuples
 *
 * @example
 * ```ts
 * const arr = ['one', 2, 'three', ['four', 5, ['six']]] as const;
 * type Example4 = DeepUnwind<typeof arr>
 * //   ^? "one" | 2 | "three" | "four" | 5 | "six"
 * ```
 *
 * @typeParam T - The array type to unwind.
 */
export type DeepUnwind<T> = T extends (infer Inner)[] ? DeepUnwind<Inner> : T extends ReadonlyArray<infer Inner> ? DeepUnwind<Inner> : T;
