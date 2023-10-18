// import { IntersectUnion } from "./types/intersectUnion";
import { DeepKeyOf } from "./DeepKeyOf";

import { IntersectUnion } from "ts-utils";

/**
 * Similar functionality to the builtin `Pick<T, K>`, but allows for use of {@link DeepKeyOf}.
 *
 * @example
 * ```ts
 * type Person = {
 *   firstName: string,
 *   lastName: string,
 *   hobbies: {
 *     name: string,
 *     equipment: {
 *       name: string,
 *       cost: number
 *     }[]
 *   }[]
 * }
 *
 * type HobbySubType = DeepPick<Person, 'firstName' | 'hobbies.name' | 'hobbies.equipment.cost'>;
 * //   ^? { firstName: string } & { hobbies: { name: string }[] } & { hobbies: { equipment: { cost: number }[] }[] };
 *
 * const Joe: HobbySubType = {
 *   firstName: "Joe",
 *   hobbies: [{
 *     name: "Golfing",
 *     equipment: [{ cost: 43 }, { cost: 12 }]
 *   }]
 * }
 * ```
 */
export type DeepPick<TBase extends object, TKeys extends DeepKeyOf<TBase>> = IntersectUnion<
    {
        [K in TKeys]: K extends `${infer KHead}.${infer KTail}`
            ? KHead extends keyof TBase
                ? TBase[KHead] extends (infer InferredInner extends object)[]
                    ? KTail extends DeepKeyOf<InferredInner>
                        ? { [_ in KHead]: DeepPick<InferredInner, KTail>[] }
                        : "error: KTail extends DeepPick<InferredInner> failed!"
                    : TBase[KHead] extends infer InferredInner extends object
                    ? KTail extends DeepKeyOf<InferredInner>
                        ? { [_ in KHead]: DeepPick<InferredInner, KTail> }
                        : "error: KTail extends DeepPick<TBase[KHead]> failed!"
                    : TBase[KHead] extends (infer InferredNonNullishInnerObject extends object)[] | undefined /* prettier-ignore */ // *1
                    ? KTail extends DeepKeyOf<InferredNonNullishInnerObject>
                        ? { [_ in KHead]?: DeepPick<InferredNonNullishInnerObject, KTail>[] }
                        : "error: KTail extends DeepKeyOf<InferredNOnNullishInnerObject> failed!"
                    : TBase[KHead] extends (infer InferredNonNullishInnerObject extends object) | undefined /* prettier-ignore */ // *1
                    ? KTail extends DeepKeyOf<InferredNonNullishInnerObject>
                        ? { [_ in KHead]?: DeepPick<InferredNonNullishInnerObject, KTail> }
                        : "error: KTail extends DeepKeyOf<InferredNOnNullishInnerObject> failed!"
                    : "error: TBase[KHead] extends object or (object | undefined) failed!"
                : "error: KHead extends keyof TBase failed!"
            : { [_ in K]: K extends keyof TBase ? TBase[K] : `error: K doesn't match _._, but also doesn't extend keyof TBase!` };
    }[TKeys]
>;

/**
 * *1 prettier-ignore note:
 *
 * something like `TUnk extends (infer U extends object) | undefined ? <...> : never`
 * will type `U` as the object-part of `TUnk` if `TUnk` extends `object | undefined`.
 * For example, if `TUnk = { id: string } | undefined` then `U = { id: string }`.
 * Prettier, however, when formatting will remove these parenthases, resulting in
 * `TUnk extends infer U extends object | undefined ? <...> : never.
 *
 * In this case, if `TUnk = { id: string } | undefined`, then `U` would get typed
 * as `{ id: string } | undefined`, which is /not/ the behavior we desire.
 */
