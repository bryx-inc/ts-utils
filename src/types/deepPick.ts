import { IntersectUnion } from "./intersectUnion";
import { DeepKeyOf } from "./deepKeyOf";

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
                ? TBase[KHead] extends object[]
                    ? KTail extends DeepKeyOf<TBase[KHead][number]>
                        ? { [_ in KHead]: DeepPick<TBase[KHead][number], KTail>[] }
                        : "error: KTail extends QueryKeys<TBase[KHead][number]> failed!"
                    : TBase[KHead] extends object
                    ? KTail extends DeepKeyOf<TBase[KHead]>
                        ? { [_ in KHead]: DeepPick<TBase[KHead], KTail> }
                        : "error: KTail extends QueryKeys<TBase[KHead]> failed!"
                    : "error: TBase[KHead] extends object failed!"
                : "error: KHead extends keyof TBase failed!"
            : { [_ in K]: K extends keyof TBase ? TBase[K] : `never5` };
    }[TKeys]
>;
