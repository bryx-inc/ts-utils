/**
 * Similar in functionality to the built-in {@link Partial<T>}, but the type is recursivly applied to all subobjects
 *
 * @example
 * ```ts
 * type FormattingBlock = { where: { argument: { value: string } } };
 *
 * type FormattingBlockPatch RecursivePartial<FormattingBlock>;
 * //   ^?: { where?: RecursivePartial<{ argument: { value: string; }; }> | undefined;
 * ```
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
};
