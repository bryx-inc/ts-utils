/**
 * Splits a string into an array of individual characters.
 *
 * @typeParam TStr - The input string to be exploded.
 * @typeParam TAcc - The accumulator array that holds the exploded characters. Defaults to an empty string array. Do not set manually.
 *
 * @example
 * ```ts
 * type Result1 = Explode<'Hello'>;
 * //   ^? ['H', 'e', 'l', 'l', 'o'
 *
 * type Result2 = Explode<'12345'>;
 * //   ^? ['1', '2', '3', '4', '5']
 * ```
 */
export type Explode<
    TStr extends string,
    TAcc extends readonly string[] = [],
> = TStr extends `${infer Head extends string}${infer Rest extends string}` ? Explode<Rest, [...TAcc, Head]> : TAcc;
