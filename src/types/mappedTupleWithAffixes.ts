/**
 * Maps a tuple of strings by adding prefix and suffix affixes to each element.
 *
 * !> Note that this type required that the given tuple be `readonly`
 *
 * @typeParam TTuple - The tuple of strings to be mapped.
 * @typeParam TAffixes - An object with prefix and suffix properties defining the affixes.
 *
 * @param {TTuple} TTuple - The tuple of strings to be mapped.
 * @param {TAffixes} TAffixes - An object with prefix and suffix properties defining the affixes.
 *
 * @returns {MappedTupleWithAffixes<TTuple, TAffixes, TMapped>} The mapped tuple with affixes.
 *
 * @example
 * ```ts
 * type MyTuple = ["apple", "banana", "cherry"] as const;
 * type Mapped = MappedTupleWithAffixes<MyTuple, { prefix: "Fruit:", suffix: "!" }>;
 * // ^? ["Fruit:apple!", "Fruit:banana!", "Fruit:cherry!"]
 * ```
 */
export type MappedTupleWithAffixes<
    TTuple extends ReadonlyArray<string>,
    TAffixes extends { readonly prefix: string; readonly suffix: string },
    TMapped extends ReadonlyArray<string> = [],
> = TTuple extends readonly [infer THead extends string, ...infer TRest extends readonly string[]]
    ? MappedTupleWithAffixes<TRest, TAffixes, [...TMapped, `${TAffixes["prefix"]}${THead}${TAffixes["suffix"]}`]>
    : TMapped;
