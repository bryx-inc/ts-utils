import { Maybe, intoMaybe } from "./maybe";
import { dropKeys, getObjKeys, getPropertyUnsafe } from "./object";
import { Result } from "./result";

/**
 * Extract the inner type of some given array type, `T`
 */
export type Unarray<T extends any[]> = T extends (infer K)[] ? K : never; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Filtered an incoming array of objects by discarding all keys on each object not specifiecd by 'keys'.
 *
 * @example
 * ```ts
 * const arr = [
 *  {
 *    first: 'johnny',
 *    last: 'appleseed',
 *    age: 20
 *  },
 *  {
 *    first: 'jane',
 *    last: 'doe',
 *    age: 31
 *  }
 * ];
 *
 * const filtered = selectKeys(arr, 'first', 'age');
 * console.log(filtered);
 * // -> [{first: 'jonny', age: 20}, {first: 'jane', age: 31}]
 * ```
 *
 * @param arr The incoming array
 * @param keys The collection of keys desired for the resulting array
 * @returns The updated array
 */
export function selectKeys<T extends object, K extends keyof T>(arr: T[], ...keys: K[]): Pick<T, K>[] {
    return arr.map((e) => {
        const ret = {} as Pick<T, K>;
        keys.forEach((k) => (ret[k] = e[k]));

        return ret;
    });
}

/**
 * Returns a copy of the given array, with the element at the specified startIdx moved to the specified endIdx.
 *
 * This operation is pure and leaves no gaps in the resulting array
 */
export function moveToIdx<T>(arr: T[], startIdx: number, endIdx: number) {
    const arrCpy = cloneArr(arr);
    const [moved] = arrCpy.splice(startIdx, 1);
    arrCpy.splice(endIdx, 0, moved);

    return arrCpy;
}

/**
 * Returns true if the given array is empty
 *
 * @example
 * ```ts
 * arrayIsEmpty([]); // true
 * arrayIsEmpty([1, 2, 3]); // false
 * ```
 */
export function arrayIsEmpty(arr: unknown[]) {
    return arr.length == 0;
}

/**
 * Swaps two elements in some array, returning a copy of the new array without modifying the source.
 *
 * This method is pure
 *
 * @example
 * ```ts
 * const arr = ['apple', 'banana', 'pear'];
 *
 * console.log(swapAt(arr, 1, 2)); // ['apple', 'pear', 'banana']
 * console.log(arr); // ['apple', 'banana', 'pear']
 * ```
 */
export function swapAt<T>(arr: T[], i1: number, i2: number): T[] {
    const arrCpy = cloneArr(arr);
    const tmp = arrCpy[i2];
    arrCpy[i2] = arrCpy[i1];
    arrCpy[i1] = tmp;

    return arrCpy;
}

/**
 * Returns the last element of some array, and `null` if the array is empty
 *
 * @example
 * ```ts
 * const arr1 = [1, 2, 3, 4];
 * const arr2 = [];
 *
 * // vanilla
 * arr1[arr1.length - 1]; // 4
 * arr2[arr2.length - 1]; // undefined
 *
 * // with `lastElem`
 * lastElem(arr1); // 4
 * lastElem(arr2) // null
 * ```
 */
export function lastElem<T>(arr: T[]): Maybe<T> {
    return intoMaybe(arr[arr.length - 1]);
}

/**
 * Inserts the `toInsert` value at the first position of a given array at which the array value matches the supplied predicate.
 * If no values are found that match the predicate, then the original array is returned.
 *
 * This method is pure
 *
 * @example
 * ```ts
 * const arr = [1, 2, null, 3, null, 4];
 * findFirstAndReplace([1, 2, null, 3, null, 4], 9, (v) => v == null);  // [1, 2, 9, 3, null, 4]
 *
 * console.log(arr); // [1, 2, null, 3, null, 4];
 * ```
 */
export function findFirstAndReplace<T>(arr: T[], toInsert: T, predicate: (v: T) => boolean): T[] {
    for (const [i, v] of arr.entries()) if (predicate(v)) return arr.slice(0, i).concat([toInsert], arr.slice(i + 1));
    return arr.slice(0);
}

/**
 * Interleave some value in-between each element of some array.
 *
 * This method is pure
 *
 * @example
 * ```ts
 * const arr = ['apple', 'banana', 'orange'];
 * console.log(interleave(arr, '|')); // ['apple', '|', 'banana', '|', 'orange']
 * console.log(arr); // ['apple', 'banana', 'orange']
 * ```
 */
export function interleave<T>(arr: T[], toInsert: T) {
    return arr.flatMap((e) => [toInsert, e]).slice(1);
}

/**
 * Checks if some given number, i, is a, index of some array, arr.
 * Equivilant to `i >= 0 && i < arr.length`
 */
export function isIndexOf(arr: unknown[], i: number): boolean {
    return i >= 0 && i < arr.length;
}

/**
 * Create an array with some value inserted at some index, without modifying the source array.
 *
 * @example
 * ```ts
 * const arr = ['one', 'two', 'three'];
 * console.log(sliceAround(arr, 2, 'foo')); // ['one', 'two', 'foo', 'three']
 * console.log(arr); // ['one', 'two', 'three']
 * ```
 */
export function sliceAround<T>(arr: T[], i: number, v: T): T[] {
    return arr.slice(0, i).concat([v]).concat(arr.slice(i));
}

/**
 * Creates a copy of some array, with some value at the given index replaced with the given value
 */
export function replaceAt<T>(arr: T[], i: number, v: T): T[] {
    const arrCpy = cloneArr(arr);
    arrCpy[i] = v;
    return arrCpy;
}

/**
 * Creates a clone of some given array, without calling the given array's internal iterator, thereby improving
 * performance, particularly for larger arrays. For more information refer to [this comparison benchmark](https://jsbench.me/fylb5kvldn/1)
 *
 * This operation yields the same result as `const newArr = [...arr];`
 */
export function cloneArr<T>(arr: T[]): T[] {
    return new Array<T>().concat(arr);
}

export function bailableMap<T, E, R>(
    arr: T[],
    mapper: (v: T, bail: (v: R) => { _bail: symbol; v: R }) => E | { _bail: symbol; v: R },
): Result<E[], R> {
    const mappedArr = [] as E[];
    const _bail = Symbol();

    function isBail(v: unknown): v is { _bail: symbol; v: R } {
        return v != null && typeof v == "object" && getPropertyUnsafe(v, "_bail") == _bail;
    }

    for (const v of arr) {
        const mapped = mapper(v, (v: R) => ({ _bail, v }));
        if (isBail(mapped)) return Result.Err(mapped.v);

        mappedArr.push(mapped);
    }

    return Result.Ok(mappedArr);
}

/**
 * Try to fold an array. The supplied reducer function accepts the accumulator, the current value, as well as a `bail` method that,
 * when called with a given value and returned from the reducer, will halt the fold and make the `tryToFold` method return an error state, with value
 * of the error being equal to the value that the `bail` method was called with.
 *
 * @example
 * ```ts
 * const nums1 = [5, 5, 2];
 * const nums2 = [5, 5, 0];
 *
 * const fn = (acc, n, bail) => (n == 0 ? bail("divide by zero") : acc / n);
 *
 * console.log(tryToFold(nums1, fn, 100).ok()); // 2
 * console.log(tryToFold(nums2, fn, 100).err()); // "divide by zero"
 * ```
 *
 * @typeParam T The inner type of the given array to fold
 * @typeParam E The success type if the fold doesn't bail early
 * @typeParam R The fail type if the fold bails early
 */
export function tryToFold<T, E, R>(
    arr: T[],
    fn: (acc: E, cur: T, bail: (v: R) => { _bail: symbol; v: R }) => E | { _bail: symbol; v: R },
    initalValue: E,
): Result<E, R> {
    const _bail = Symbol();

    function isBail(v: unknown): v is { _bail: symbol; v: R } {
        return v != null && typeof v == "object" && getPropertyUnsafe(v, "_bail") == _bail;
    }

    const _next = (acc: E | { _bail: symbol; v: R }, i: number) => {
        if (isBail(acc)) return acc;
        if (i >= arr.length) return acc;

        return _next(
            fn(acc, arr[i], (v: R) => ({ _bail, v })),
            i + 1,
        );
    };

    const res = _next(initalValue, 0);
    if (isBail(res)) return Result.Err(res.v);
    else return Result.Ok(res);
}

/**
 * Construct a new array of a given size from the result of calling the given factory method with the respective index therein.
 *
 * @example
 * ```ts
 * arrFromFactor(5, (idx) => idx % 2 == 0 ? 'even' : 'odd');
 * // ['even', 'odd', 'even', 'odd', 'even'];
 * ```
 */
export function arrFromFactory<T>(size: number, factory: (idx: number) => T): T[] {
    return new Array(size).fill(null).map((_, i) => factory(i));
}

/**
 * Transform an array of objects sharing some type, `T`, into a single object sharing the same set of keys,
 * but with each value mapped to the array of values from the given array for each key.
 *
 * @example
 * ```ts
 * const people = [
 *   { first: "jane", last: "doe" },
 *   { first: "john", last: "ppleseed" }
 * ];
 *
 * console.log(objectifyArr(people));
 *
 * // {
 * //  first: [ "jane", "john" ],
 * //  last: ["doe", "appleseed"]
 * // }
 * ```
 *
 * @param arr The array to objectify
 * @returns
 */
export function objectifyArr<T extends object>(arr: T[]) {
    return arr.reduce(
        (acc, cur) =>
            getObjKeys(cur).reduce((acc, k) => {
                if (!acc[k]) acc[k] = [];
                acc[k].push(cur[k]);
                return acc;
            }, acc),
        {} as { [k in keyof T]: T[k][] },
    );
}

/**
 * Construct a new array equal to the given array with the data at the given index excluded. The source array is left unmodified.
 *
 * @example
 * ```ts
 * const fruits = ['apple', 'banana', 'orange'];
 * dropIdx(fruits, 1); // [ 'apple', 'orange' ];
 * console.log(fruits); // ['apple', 'banana', 'orange']
 * ```
 */
export function dropIdx<T>(arr: T[], idx: number): T[] {
    if (!isIndexOf(arr, idx)) return arr;
    return arr.filter((_, i) => i != idx);
}

/**
 * Flatten an array of objects with children specified by the given `childKey`, into a 1D array with each child moving to a top-level node. Additionally,
 * inline the original nested path of the object into the key specified by `pathKey`. This key must already exist for the given objects. The paths are jointed
 * together by the given `pathDelim`.
 * This transformation is especially helpful for interacting with the [MUI Data Grid in Tree Mode](https://mui.com/x/react-data-grid/tree-data/).
 *
 * @example
 * ```ts
 * type Person = { name: string, age: number, children: Person[] };
 *
 * const people: Person[] = [
 *  { name: 'joe', age: 15, children: [] },
 *  { name: 'rob', age: 40, children: [
 *    { name: 'john', age: 17, children: [] },
 *    { name: 'sam', age: 13, children: [] }
 *  ]},
 *  { name: 'zac', age: 60, children: [
 *    { name: 'bill', age: 39, children: [
 *      { name: 'jenna', age: 20, children: [
 *        { name: 'lenny', age: 1, children: [] }
 *      ]}
 *    ]}
 *  ]}
 * ];
 *
 * console.log(toPathedArr(people, {
 *  pathKey: 'name',
 *  childKey: 'children',
 *  pathDelim: '/'
 * }));
 *
 * // [
 * //  { name: 'joe', age: 15 },
 * //  { name: 'rob', age: 40 },
 * //  { name: 'rob/john', age: 17 },
 * //  { name: 'rob/sam', age: 13 },
 * //  { name: 'zac', age: 60 },
 * //  { name: 'zac/bill', age: 39 },
 * //  { name: 'zac/bill/jenna', age: 20 },
 * //  { name: 'zac/bill/jenna/lenny', age: 1 }
 * // ]
 *
 * ```
 *
 * @param arr The source array. This array is not modified.
 * @param opts Behavior specifiction options
 * @returns A new, flattened array
 */
export function toPathedArr<
    PathDelim extends string,
    PathKey extends string,
    ChildKey extends string,
    Source extends Record<ChildKey, Source[]> & Record<PathKey, string>,
>(
    arr: Source[],
    opts: { pathKey: PathKey; pathDelim: PathDelim; childKey: ChildKey; basePath?: string },
): (Exclude<Source, ChildKey> & Record<PathKey, string>)[] {
    return arr.flatMap((e) => [
        dropKeys<Source, ChildKey[]>({ ...e, name: (opts.basePath?.concat("/") ?? "") + e[opts.pathKey] }, [opts.childKey]),
        ...toPathedArr(e[opts.childKey], { ...opts, basePath: (opts.basePath?.concat(opts.pathDelim) ?? "") + e[opts.pathKey] }),
    ]);
}
