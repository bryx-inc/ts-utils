import { cond } from "./condition";
import { Maybe } from "./maybe";
import { DeepKeyOf, DeepValue } from "./types";

/**
 * Construct a object with properties identical to the given base object, without any nullish values.
 *
 * @example
 * ```ts
 * const person = {
 *  name: 'Jane Doe',
 *  age: 21,
 *  phone: null
 * }
 *
 * dropNullValues(person);
 * // { name: 'Jane Doe', age: 21 }
 * ```
 *
 * @param obj The given base object
 * @returns The base object with all nullish values dropped
 *
 * @category Object
 */
export function dropNullValues<T extends object>(obj: T) {
    type PermittedValue = T extends {
        [K in keyof T]: Exclude<infer V, "undefined" | "null">;
    }
        ? V
        : never;

    return Object.keys(obj).reduce((acc, cur: string) => {
        if (typeof obj[cur as keyof T] != "undefined" && obj[cur as keyof T] !== null) acc[cur] = obj[cur as keyof T] as PermittedValue;
        return acc;
    }, {} as { [k: string]: PermittedValue });
}

/**
 * Performs a deep clone of an object via the JSON serialize/deserialize method.
 *
 * !> This method *will not work* for objects that have values of `Date`, `undefined`, or `Infinity`s
 *
 * @example
 * ```ts
 * const gizmo = { name: 'gizmo', extraInfo: { tags: ['tag1', 'tag2'] } } }
 *
 * // with quickDeepClone
 * const deepClone = quickDeepClone(gizmo);
 * shallowClone == gizmo; // false
 * shallowClone.name == gizmo.name; // false
 * shallowClone.extraInfo.tags == gizmo.extraInfo.tags; // false
 *
 * // with shallow clone
 * const shallowClone = { ...gizmo };
 * shallowClone == gizmo; // false
 * shallowClone.name == gizmo.name; // false
 * shallowClone.extraInfo.tags == gizmo.extraInfo.tags; // true
 * ```
 *
 *
 * @param o The object to clone
 * @returns The deep clone
 */
export function quickDeepClone<T extends object>(o: T): T {
    return JSON.parse(JSON.stringify(o)) as T;
}

/**
 * Creates a new object from the given object with the specified fields deleted.
 *
 * @example
 * ```ts
 * const person = {
 *  first: "John",
 *  last: "Smith",
 *  age: 23,
 *  state: "NY"
 * }
 *
 * const name = dropKeys(person, ['age', 'state']);
 * console.log(name); // { "first": "John", "last": "Smith" }
 * console.log(person); // { "first": "John", "last": "Smith", "age": 23, "state": "NY" }
 * ```
 *
 * @category Object
 */
export function dropKeys<T extends object, K extends (keyof T)[]>(from: T, keys: K) {
    const o = { ...from }; // clone object
    for (const k of keys) delete o[k];
    return o as Exclude<T, K[number]>;
}

/**
 * Creates a new object from the given object only with the specified fields from the base object
 *
 * @example
 * ```ts
 * const person = {
 *  first: "John",
 *  last: "Smith",
 *  age: 23,
 *  state: "NY"
 * }
 *
 * const newObj = pickKeys(person, ['first', 'last']);
 * console.log(newObj); // { "first": "John", "last": "Smith" }
 * console.log(person); // { "first": "John", "last": "Smith", "age": 23, "state": "NY" }
 * ```
 *
 * @category Object
 */
export function pickKeys<T extends object, K extends (keyof T)[]>(from: T, keys: K): Pick<T, K[number]> {
    return Object.fromEntries(
        getObjKeys(from)
            .filter((k) => keys.includes(k))
            .map((k) => [k, from[k]]),
    ) as Pick<T, K[number]>;
}

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
        else _mutateObj(obj[kHead], kRest.join("."), value);
    };

    const clonedObj = quickDeepClone(obj);
    _mutateObj(clonedObj, key, value);

    return clonedObj;
}

export function selectObjectKeys<T extends object, K extends (keyof T)[]>(from: T, keys: K) {
    const o = new Object() as Pick<T, K[number]>;
    for (const k of keys) o[k] = from[k];

    return o;
}

export function objectIsEmpty<T extends object>(obj: T) {
    return Object.keys(obj).length == 0;
}

/**
 * Converts a record-style object to an array with each record key and value mapped to a specified named attribute.
 * If the given `v` name is '...' then, given that the value of each record is an object, the keys of that subobject will be inlined into the new object.
 *
 * This method is pure.
 *
 * @example
 * ```ts
 * const ages = {
 *  bill: 38,
 *  john: 21,
 *  adam: 25
 * };
 *
 * derecordify(ages, { k: 'name', v: 'age' });
 * // [{ name: 'bill', age: 38 }, { name: 'john', age: 21 }, ...]
 *
 * const people = {
 *   bill: { age: 38, hobbies: ['cooking']},
 *   john: { age: 21, hobbies: ['gardening', 'sports']},
 *   adam: { age: 25 , hobbies: ['hiking']},
 * }
 *
 * derecordify(people, { k: 'name', v: 'info' });
 * // [{ name: "bill", info: { age: 38, hobbies: ["cooking"]}}, ...]
 *
 * derecordify(people, { k: 'name', v: '...' });
 * // [{ name: "bill", age: 38, hobbies: ["cooking"] }, ...]
 * ```
 *
 * @category Object
 */
export function derecordify<T extends object, KN extends string, VN extends string>(record: T, opts: { k: KN; v: VN }) {
    return cond(
        [opts.v == "...", () => Object.entries(record).map(([k, v]) => ({ [opts.k]: k, ...v }))],
        [
            true,
            () =>
                Object.entries(record).map(([k, v]) => ({
                    [opts.k]: k,
                    [opts.v]: v,
                })),
        ],
    ) as (VN extends "..."
        ? T[keyof T] extends object
            ? { [k in KN]: keyof T } & T[keyof T]
            : never
        : { [k in KN | VN]: k extends KN ? keyof T : T[keyof T] })[];
}

//

/**
 * Converts an array of objects into a single, record-style object keyed by the given key attribute.
 *
 * @example
 * ```ts
 * const people = [
 *  { first: 'john', last: 'smith', state: 'NY' },
 *  { first: 'sam', last: 'johnson', state: 'NY' },
 *  { first: 'john', last: 'appleseed', state: 'CO' },
 *  ...
 * ];
 * const peopleByState = recordify(people, 'state');
 * console.log(peopleByState);
 * // {
 * //   'NY': [
 * //      { first: 'john', last: 'smith', state: 'NY' },
 * //      { first: 'sam', last: 'johnson', state: 'NY' }
 * //    ],
 * //    'CO': [
 * //      { first: 'john', last: 'appleseed', state: 'CO' }
 * //    ],
 * //    ...
 * // }
 * ```
 *
 * @category Object
 */
export function recordify<T extends object, K extends keyof { [Key in keyof T]-?: T[Key] extends string ? Key : never }>(arr: T[], key: K) {
    return arr.reduce((obj, cur) => {
        if (typeof obj[cur[key] as string] == "undefined") obj[cur[key] as string] = [] as T[];
        obj[cur[key] as string].push(cur);
        return obj;
    }, {} as Record<string, T[]>);
}

/**
 * Return the keys of the given object an array.
 *
 * ?> This is identical to `Object.keys()`, except this method types it's return type as `(keyof T)[]`, rather than `string | number | symbol`.
 *
 * @example
 * ```ts
 * const person = {
 *   firstName: 'Jane',
 *   lastName: 'Doe',
 *   favoriteColor: 'Green'
 * }
 *
 * const keys = getObjKeys(person);
 * //    ^? ('firstName' | 'lastName' | 'favoriteColor')[]
 * ```
 * @param v The given object
 * @returns The array of keys
 *
 * @category Object
 */
export function getObjKeys<T extends object>(v: T) {
    return Object.keys(v) as (keyof T)[];
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
export function getDeepObjKeys<T extends object>(o: T): DeepKeyOf<T>[] {
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
 * Maybe get a property on some object, who's type does not define the specified key. If no property is found on the given object at the given key, `null` is returned.
 *
 * @category Object
 */
export function getPropertyUnsafe<T extends object, E, K extends string>(v: T, key: K): Maybe<E> {
    return (v as T & Record<K, E>)[key as keyof T | K] ?? null;
}

/**
 * Cast some given `T` to `E` without any type overlap checks.
 *
 * !> This function should be used _very_ sparingly, and only in situations where typescript cannot follow the typechecking. Often times, this happens when object properies are being checked on an indexed value. Although, in most cases this object should simply be explicitly bound to a variable, in sitations where it cannot, `unsafeCast` may be used.
 *
 * @example
 * ```ts
 * type Shape2D = ...;
 * type Shape3D = ...;
 *
 * type Shape =
 *  | { type: '2d', shape: Shape2D }
 *  | { type: '3d', shape: Shape3D }
 *
 * function print2DShape(shape: Shape2D) { ... }
 * function print3DShape(shape: Shape3D) { ... }
 *
 * function printShapeRange(shapes: Shape[], lowerIdx: number, upperIdx: number) {
 *  if (shapes[lowerIdx].type == '2d')
 *    print2DShape(castUnsafe(shapes[lowerIdx]));
 *  else
 *    print3DShape(castUnsafe(shapes[lowerIdx]))
 *
 *  if (lowerIdx < upperIdx)
 *    printShapeRange(shapes, lowerIdx + 1, upperIdx);
 * }
 *
 * ```
 *
 */
export function castUnsafe<T, E>(v: T): E {
    return v as unknown as E;
}

/**
 * Applies the given function `fn` to each key in the object `obj` and returns an array of the resulting values.
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = mapKeys(obj, (key) => key.toUpperCase());
 * // result is ['A', 'B', 'C']
 * ```
 *
 * @typeparam T - The type of the input object `obj`
 * @typeparam U - The type of the output array elements
 * @param obj - The input object
 * @param fn - A function to apply to each key in the object
 * @returns An array of the resulting values
 *
 * @category Object
 */
export function mapKeys<T extends object, U>(obj: T, fn: (k: keyof T) => U): U[] {
    return getObjKeys(obj).map(fn);
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
