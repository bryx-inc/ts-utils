import { IntersectUnion } from "./intersectUnion";

/**
 * A type that removes duplicate values from a union type.
 *
 * This type takes a union type as input and produces a new union type where duplicate values are removed.
 *
 * !> Note that since this type leverages {@link IntersectUnion}, this type also only works if `strict` is set to `true` in your `tsconfig.json`.
 *
 *
 * @example
 * ```typescript
 * type Example = Unique<"a" | "a" | "b" | "c" | "b">;
 * //   ^? type Example = "a" | "b" | "c"
 * ```
 *
 * Since union members are compared by assignability, subtypes of other members of the union will be dropped
 * @example
 * ```
 * type Example = Unique<string | "string_subtype" | number>;
 * //   ^? type Example = string | number
 *
 * type ExampleWithObjects = Unique<{ k: "a" } | { k: "b" } | { k: "a" }
 * //   ^? type ExampleWithObjects = { k: "a" } | { k: "b" }
 * ```
 *
 * @typeparam U The input union type.
 */
export type Unique<U> = UnionToUnsafeTuple<U> extends (infer R)[] ? R : U;

//

type LastOf<T> = IntersectUnion<T extends T ? () => T : never> extends () => infer R ? R : never;

type Push<T extends unknown[], V> = [...T, V];

type UnionToUnsafeTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
    ? []
    : Push<UnionToUnsafeTuple<Exclude<T, L>>, L>;
