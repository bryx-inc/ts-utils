/**
 * Represents a mapped tuple type that extracts a specific property from each object in a tuple.
 *
 * @typeParam TTuple The input tuple type.
 * @typeParam TKey The key of the property to extract from each object in the tuple.
 * @typeParam TMapped The resulting mapped tuple type.
 *
 * @example
 * ```ts
 * // Extract the 'id' property from each object in the tuple.
 * type InputTuple = [{ id: number }, { id: string }, { id: boolean }];
 * type ResultTuple = MappedTuple<InputTuple, 'id'>;
 *      ^? [number, string, boolean]
 * ```
 */
export type MappedTuple<
    TTuple extends readonly [...object[]],
    TKey extends keyof TTuple[number],
    TMapped extends readonly [...unknown[]] = [],
> = TTuple extends readonly [infer THead extends object, ...infer TRest extends object[]]
    ? MappedTuple<TRest, TKey, [...TMapped, THead[TKey]]>
    : TMapped;
