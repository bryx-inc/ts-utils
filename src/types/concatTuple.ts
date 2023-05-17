/**
 * Concatenates a tuple of strings using a specified delimiter.
 *
 * @typeParam TTuple - The input tuple of strings.
 * @typeParam TDelim - The delimiter used to concatenate the strings.
 * @typeParam TAcc - The accumulated string during concatenation (initially an empty string).
 * @returns The concatenated string.
 *
 * @example
 * ```typescript
 * type Result = ConcatTuple<["Hello", "World"], "-">;
 * //   ^? "Hello-World"
 * ```
 */
export type ConcatTuple<TTuple extends string[], TDelim extends string, TAcc extends string = ""> = TTuple extends [
    infer Head extends string,
    ...infer Rest extends string[],
]
    ? ConcatTuple<Rest, TDelim, `${TAcc}${TDelim}${Head}`>
    : TAcc;

/**
 * Concatenates a readonly tuple of strings using a specified delimiter.
 *
 * @typeParam TTuple - The input readonly tuple of strings.
 * @typeParam TDelim - The delimiter used to concatenate the strings.
 * @typeParam TAcc - The accumulated string during concatenation (initially an empty string).
 * @returns The concatenated string.
 *
 * @example
 * ```typescript
 * type Result = ConcatReadonlyTuple<readonly ["Hello", "World"], "-">;
 * //   ^? "Hello-World"
 * ```
 */
export type ConcatReadonlyTuple<
    TTuple extends readonly string[],
    TDelim extends string,
    TAcc extends string = "",
> = TTuple extends readonly [infer Head extends string, ...infer Rest extends readonly string[]]
    ? ConcatReadonlyTuple<Rest, TDelim, `${TAcc}${TDelim}${Head}`>
    : TAcc;
