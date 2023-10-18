// import { DeepKeyOf, DeepPick, DeepValue } from "./types";
import { DeepKeyOf } from './DeepKeyOf';
import { DeepPick } from './DeepPick';
import { DeepValue } from './DeepValue';
import { quickDeepClone, getObjKeys, deepFlattenArr, DeepUnwind } from 'ts-utils';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

/**
 * Construct a new object which is a clone of the given `obj` with the specified value replacing the base value at the given deep key (see {@link DeepKeyOf}), without modifying the source object.
 *
 * This method can also work with multiple objects spread across nested subobjects/arrays.
 *
 * !> This method internally uses {@link quickDeepClone}, and is thus subject to all the object limitations therein.
 *
 * ### Examples
 *
 * #### Basic Values
 * @example
 * ```ts
 * slicePropertyAtDeepKey({ name: 'John Doe' }, 'name', 'Jane Doe');
 * // returns: { name: 'Jane Doe' }
 * slicePropertyAtDeepKey({ person: { name: 'John Doe' } }, 'person.name', 'Jane Doe');
 * // returns: { person: { name: 'Jane Doe' } }
 * ```
 *
 * #### Array Values
 * @example
 * ```ts
 * slicePropertyAtDeepKey({ arr: ["one", "two", "three"] }, "arr", ["four", "five"]);
 * // returns: { arr: ["four", "five"] }
 * ```
 *
 * #### Undefined Direct Parents
 * It may be possible to specify a valid deep key which does not resolve to a value that has a parent. For example
 * @example
 * ```ts
 * type Thing = { a: { b?: { c: string } } };
 * const thing: Thing = { a: { } };
 * slicePropertyAtDeepKey(a, 'a.b.c', 'foo');
 *
 * // `c` doesn't have a parent to set the key/value `"c" => "foo"` since `b` is optional.
 * // in this situation, the method will just return the base object.
 * // returns { a: { } }
 * ```
 *
 * #### Distributed Replacement (1-Dimentional)
 * It is possible that a single key can target multiple different values within an object. This often happens if the key specifies a subobject within an array.
 * With this method, we can specify a key for *each* of the expected targets of keys by specifying an array of values to use. The values will be used in the order
 * of which the subobjects are encountered (top to bottom, outer to inner).
 * @example
 * ```ts
 * const data = {
 *  people: [
 *    { name: "Joe", age: 12 },
 *    { name: "Jane", age: 15 }
 *  ]
 * };
 *
 * slicePropertyAtDeepKey(data, 'people.name', ["foo", "bar"]);
 * // returns: {
 * //   people: [
 * //     { name: "foo", age: 12 },
 * //     { name: "bar", age: 15 }
 * //   ]
 * // }
 * ```
 *
 * #### Advanced Distributed Replacement (N-Dimentional)
 * This concept of distributed replacement can be scaled to any number of nested dimentions. For each new subobject array encountered,
 * the method will move one more level deep in the array. A 2D distributed replacement could look like this
 * @example
 * ```ts
 * const customer = {
 *   firstname: 'john',
 *   lastname: 'doe',
 *   orders: [
 *     {
 *       day: 'monday',
 *       items: [
 *         {
 *           name: 'gizmo',
 *           price: 12
 *         },
 *         {
 *           name: 'gadget',
 *           price: 15
 *         }
 *       ]
 *     },
 *     {
 *       day: 'wednesday',
 *       items: [
 *         {
 *           name: 'tickets',
 *           price: 20
 *         },
 *       ]
 *     }
 *   ]
 * }
 *
 * slicePropertAtDeepKey(customer, 'orders.items.name', [["foo", "bar", "foobar"]]);
 * // returns: {
 * //   firstname: 'john',
 * //   lastname: 'doe',
 * //   orders: [
 * //     {
 * //       day: 'monday',
 * //       items: [
 * //         {
 * //           name: 'foo',
 * //           price: 12
 * //         },
 * //         {
 * //           name: 'bar',
 * //           price: 15
 * //         }
 * //       ]
 * //     },
 * //     {
 * //       day: 'wednesday',
 * //       items: [
 * //         {
 * //           name: 'foobar',
 * //           price: 20
 * //         },
 * //       ]
 * //     }
 * //   ]
 * // }
 * ```
 *
 * @param obj The base object to use
 * @param key The specified {@link DeepKeyOf} of the base object
 * @param value The value to use at the specified `key`
 * @returns The new object
 */
export function slicePropertyAtDeepKey<TObj extends object, K extends DeepKeyOf<TObj>>(obj: TObj, key: K, value: DeepValue<TObj, K>): TObj {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const _mutateObj = (obj: any, key: string, value: any): void => {
        const [kHead, ...kRest] = key.split(".");

        if (Array.isArray(obj)) obj.forEach((member, i) => _mutateObj(member, key, value[i]));
        else if (kRest.length == 0) obj[kHead] = value;
        else if (obj[kHead] !== undefined) _mutateObj(obj[kHead], kRest.join("."), value);
    };

    const clonedObj = quickDeepClone(obj);
    _mutateObj(clonedObj, key, value);

    return clonedObj;
}

/**
 * Returns the keys of the given object in {@link DeepKeyOf} format.
 *
 * @example
 * ```ts
 * const joe = {
 *   firstName: 'Joe',
 *   lastName: 'Smith',
 *   address: {
 *     city: 'Somewhereville',
 *     state: "NY"
 *   },
 *   hobbies: [{
 *     name: "Golfing"
 *     equipment: ["Clubs", "Membership", "Golf Balls"]
 *   }]
 * }
 * console.log(getDeepKeyOf(person))
 * DeepKeyOf<Person>;
 * // ^? 'firstName' | 'lastName' | 'address' | 'address.city' | 'address.state' | 'hobbies' | 'hobbies.name' | 'hobbies.equipment'
 * ````
 */
export function deepKeyOf<T extends object>(o: T): DeepKeyOf<T>[] {
    function _next<T extends object>(o: T, prefix: string): DeepKeyOf<T>[] {
        if (getObjKeys(o).length == 0) return [];

        return Object.keys(o).flatMap((k) => {
            const v = o[k as keyof T];

            if (Array.isArray(v) && v.some((el) => typeof el == "object")) {
                v.reduce((last, cur) => {
                    if (JSON.stringify(getObjKeys(last)) != JSON.stringify(getObjKeys(cur)))
                        throw new Error(
                            `Tried to call getDeepObjKeys with an array subobject that does not have a well-defined structure: ${getObjKeys(
                                last,
                            )} != ${getObjKeys(cur)}`,
                        );
                    return cur;
                });

                return [prefix + k, ..._next(v[0], k + ".").map((k) => prefix + k)];
            }

            if (typeof v == "object" && !Array.isArray(v)) return [prefix + k, ..._next(v as object, k + ".").map((k) => k + prefix)];
            return prefix + k;
        }) as DeepKeyOf<T>[];
    }

    return _next(o, "");
}

/**
 * Returns the value at the specified {@link DeepKeyOf} the specified object.
 *
 * @example
 * ```ts
 * const obj = { a: { b: { c: 10 } } };
 *
 * getDeepValue(obj, 'a.b.c'); // returns 10
 * ```
 *
 * @example
 * ```ts
 * const obj = { a: [{ b: { c: 10 } }, { b: { c: 20 } }] };
 *
 * getDeepValue(obj, 'a.b.c'); // returns [10, 20]
 * ```
 *
 * @example
 * ```ts
 * const john: Person = {
 *     firstName: 'John',
 *     orders: [
 *         {
 *             day: 'Monday',
 *             items: [
 *                 { name: 'gizmo', price: 5 },
 *                 { name: 'thing', price: 2 },
 *             ],
 *         },
 *         {
 *             day: 'Wednesday',
 *             items: [
 *                 { name: 'guitar', price: 20 },
 *             ],
 *         },
 *     ],
 * };
 *
 * getDeepValue(john, 'orders.day'); // returns ['Monday', 'Wednesday']
 * getDeepValue(john, 'orders.items.name'); // returns [['gizmo', 'thing'], ['guitar']]
 * ```
 *
 * @param obj - The object to retrieve the value from.
 * @param key - The deep key to retrieve the value at.
 * @returns The value at the specified deep key of the object.
 */
export function getDeepValue<TObj extends object, TKey extends DeepKeyOf<TObj>>(obj: TObj, key: TKey): DeepValue<TObj, TKey> {
    const [kHead, ...kRest] = key.split(".") as [keyof TObj, ...string[]];
    const cur = obj[kHead];

    if (cur === undefined) return cur as DeepValue<TObj, TKey>;
    if (kRest.length == 0) return cur as DeepValue<TObj, TKey>;
    else if (Array.isArray(cur)) return cur.map((el) => getDeepValue(el, kRest.join(".") as DeepKeyOf<typeof el>)) as DeepValue<TObj, TKey>;
    else return getDeepValue(cur as object, kRest.join(".") as DeepKeyOf<object>);
}

/**
 * Narrows a deeply nested object by returning a copy of the given base object, but with all keys except for those in the specific {@link DeepKeyOf<TBase>} path
 *
 * ?> This method differs from {@link getDeepValue} by returning an object with the same path to the specified value as the base object, whereas {@link getDeepValue} only returns the leaf-node value.
 *
 * @param {TBase} base The base object from which to retrieve the nested object
 * @param {TDeepKey} deepKey A deep key string specifying the path to the nested object
 *
 * @returns {DeepPick<TBase, TDeepKey>} The nested object specified by the deep key
 *
 * @example
 * ```ts
 * const obj = {
 *   name: {
 *     first: "joe",
 *     last: "bean",
 *   },
 *   attrs: {
 *     age: 20,
 *     hobbies: [
 *       {
 *         name: "coffee",
 *         startDate: "today",
 *       },
 *       {
 *         name: "other stuff",
 *         startDate: "yesterday",
 *       },
 *     ],
 *   },
 * };
 *
 * const nestedObj = getObjByDeepKey(obj, "name.first");
 * // returns { name: { first: "joe" } }
 *
 * const anotherNestedObj = getObjByDeepKey(obj, "attrs.hobbies.name");
 * // returns { attrs: { hobbies: [ { name: "coffee" }, { name: "other stuff" } ] } }
 * ```
 */
export function getObjByDeepKey<TBase extends object, TDeepKey extends DeepKeyOf<TBase>>(
    base: TBase,
    deepKey: TDeepKey,
): DeepPick<TBase, TDeepKey> {
    if (Array.isArray(base)) return base.map((child) => getObjByDeepKey(child, deepKey)) as DeepPick<TBase, TDeepKey>;
    if (!deepKey.includes(".")) return { [deepKey]: getDeepValue(base, deepKey) } as DeepPick<TBase, TDeepKey>;

    const [curKey, ...restKeys] = deepKey.split(".");
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any  */
    return { [curKey]: getObjByDeepKey(base[curKey as keyof typeof base] as any, restKeys.join(".")) } as DeepPick<TBase, TDeepKey>;
}

/**
 * Flat map an array of objects into an associated array of one of their specified proerties at the given {@link DeepKeyOf} the object type.
 *
 * !> Note that since `DeepKeyOf<T>` is a *superset* of `keyof T`, any regular key may be used with this method as well.
 *
 * ### With Traditional Keys
 *
 * @example
 * ```ts
 * const people = [{ first: "joe", last: "smith" }, { first: "jane", last: "doe" }];
 *
 * flatMapIntoDeepKey(people, "first");
 * // returns: ["joe", "jane"];
 * ```
 *
 * ### With Deep Keys
 * @example
 * ```ts
 * const gizmos = [
 *  {
 *    name: "gizmo1",
 *    parts: [
 *      { partName: "spring", cost: 15 },
 *      { partName: "sprocket", cost: 12 }
 *    ]
 *  },
 *  {
 *     name: "gizmo2",
 *     parts: [
 *       { partName: "steel plate", cost: 20 },
 *       { partName: "plastic cap", cost: 5 }
 *     ]
 *   }
 * ];
 *
 * flatMapIntoDeepKey(gizmos, "parts.partName");
 * // returns ["spring", "sprocket", "steel plate", "plastic cap"];
 * ```
 *
 * @param arr
 * @param key
 * @returns
 */
export function flatMapIntoDeepKey<T extends object, K extends DeepKeyOf<T>>(arr: T[], key: K): DeepUnwind<DeepValue<T, K>>[] {
    return deepFlattenArr(arr.map((el) => getDeepValue(el, key)));
}