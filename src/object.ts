import { cond } from "./condition";
import { Maybe } from "./maybe";

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
 */
export function dropKeys<T extends object, K extends (keyof T)[]>(from: T, keys: K) {
    const o = { ...from }; // clone object
    for (const k of keys) delete o[k];
    return o as Exclude<T, K[number]>;
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
 */
export function recordify<T extends object, K extends keyof { [Key in keyof T]-?: T[Key] extends string ? Key : never }>(arr: T[], key: K) {
    return arr.reduce((obj, cur) => {
        if (typeof obj[cur[key] as string] == "undefined") obj[cur[key] as string] = [] as T[];
        obj[cur[key] as string].push(cur);
        return obj;
    }, {} as Record<string, T[]>);
}

export function getObjKeys<T extends object>(v: T) {
    return Object.keys(v) as (keyof T)[];
}

/**
 * Maybe get a property on some object, who's type does not define the specified key. If no property is found on the given object at the given key, `null` is returned.
 */
export function getPropertyUnsafe<T extends object, E, K extends string>(v: T, key: K): Maybe<E> {
    return (v as T & Record<K, E>)[key as keyof T | K] ?? null;
}

export function castUnsafe<T, E>(v: T): E {
    return v as unknown as E;
}
