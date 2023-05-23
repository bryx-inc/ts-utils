import { DeepUnwrap } from "./deepUnwrap";

/**
 * Recursivly removes `readonly` from the given type.
 *
 * ?> This type works for both readonly tuples, as well as readonly object, and any combination therein
 *
 * ?> Typically, this is useful when working with [zustand](https://github.com/pmndrs/zustand) stores that leverage the [immer middleware](https://docs.pmnd.rs/zustand/integrations/immer-middleware), which [strips `readonly` internally](https://github.com/immerjs/immer/blob/75e004db1374e059773047e786d6d01ee1e90a0f/src/types/types-external.ts#L35) when using readonly types to describe a store. This often can lead to bizzare type errors.
 *
 * ### With an Object
 *
 * @example
 * ```ts
 * const thing = {
 *  stuff: ["one", "two", "three"],
 * } as const;
 *
 * type Thing = typeof thing;
 * //   ^?  { readonly stuff: readonly ["one", "two", "three"]; }
 *
 * type MutableThing = DeepRemoveReadonly<Thing>
 * //   ^? { stuff: ("one" | "two" | "three")[]; }
 * ```
 *
 * ### With a Tuple
 * This is effectivly the same thing as calling {@link DeepUnwrap}: `DeepUnwrap<readonly [...]>[] // equals [...]`
 *
 * @example
 * ```ts
 * type Keys = DeepRemoveReadonly<readonly ["one", "two", "three"]>
 * //   ^? ("one" | "two" | "three")[]
 * ```
 */
export type DeepRemoveReadonly<T> = T extends readonly unknown[]
    ? DeepRemoveReadonly<DeepUnwrap<T>>[]
    : T extends object
    ? { -readonly [k in keyof T]: DeepRemoveReadonly<T[k]> }
    : T;
