import { cond } from "./condition";
import { Maybe } from "./maybe";

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
