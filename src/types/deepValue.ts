import { DeepKeyOf } from "./deepKeyOf";
import { DeepPick } from "./deepPick";

/**
 * Resolves a deeply nested key path from an object type, returning the type of the resolved key.
 *
 * @typeParam TObj - The object type to traverse.
 * @typeParam TKey - The deep key path to resolve.
 *
 * @example
 * ```ts
 * type User = {
 *   id: number,
 *   name: string,
 *   address: {
 *     street: string,
 *     city: string,
 *     state: string,
 *     zipcode: number,
 *   },
 *   orders: {
 *     id: number,
 *     date: string,
 *     items: {
 *       id: number,
 *       name: string,
 *       price: number,
 *       quantity: number,
 *     }[],
 *   }[],
 * }
 *
 * DeepValue<User, "id">; // number
 * DeepValue<User, "orders.items.name">; // string[][]
 * DeepValue<User, "orders.items">; // { id: number, name: string, price: number, quantity: number }[][]
 * ```
 */
export type DeepValue<TObj extends object, TKey extends DeepKeyOf<TObj>> = DeepPick<TObj, TKey> extends infer Picked extends object
    ? TKey extends DeepKeyOf<Picked>
        ? TraversePicked<Picked, TKey>
        : never
    : never;

type TraversePicked<TPicked extends object, Path extends DeepKeyOf<TPicked>> = Path extends `${infer KCur}.${infer KRest}`
    ? TPicked extends (infer Inner extends object)[]
        ? KCur extends keyof Inner // e2
            ? Inner[KCur] extends infer Next extends object // e1
                ? KRest extends DeepKeyOf<Next> // e0
                    ? TraversePicked<Next, KRest>[]
                    : "e0"
                : "e1"
            : "e2"
        : KCur extends keyof TPicked // 5
        ? TPicked[KCur] extends infer Next extends object // 4
            ? KRest extends DeepKeyOf<Next> // 3
                ? TraversePicked<Next, KRest>
                : "e3"
            : "e4"
        : "e5"
    : TPicked extends (infer Inner extends object)[]
    ? Path extends keyof Inner // e9
        ? Inner[Path][]
        : "e9"
    : Path extends keyof TPicked // e10
    ? TPicked[Path]
    : "e10";
