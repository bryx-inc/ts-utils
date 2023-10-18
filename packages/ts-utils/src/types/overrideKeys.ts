/**
 * Returns a new object type that combines two existing object types: `TBase` and `TOverrides`.
 * The resulting object type will have all the properties of `TBase` except those that are also present in `TOverrides`.
 * If `TOverrides` contains properties with the same names as those in `TBase`, the properties from `TOverrides` will override those in `TBase`.
 * If the keys in `TOverrides` are not a subset of the keys in `TBase`, the `never` type is returned.
 *
 * @typeParam TBase - The base object type.
 * @typeParam TOverrides - The object type containing overrides for `TBase`.
 * @returns A new object type that combines `TBase` and `TOverrides`.
 *
 * @example
 * ```ts
 * type Personnel = {
 *     name: string;
 *     rank: {
 *         thing1: string;
 *         thing2: number;
 *     };
 * };
 *
 * // Override the `rank` property in `Personnel` with a string type.
 * type ApiResponse = OverrideKeys<Personnel, { rank: string }>;
 * ```
 */
export type OverrideKeys<TBase extends object, TOverrides extends { [k in keyof TBase]?: unknown }> = keyof TOverrides extends keyof TBase
    ? Omit<TBase, keyof TOverrides> & TOverrides
    : never;
