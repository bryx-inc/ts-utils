import { pipe } from "./function";
import { Maybe, intoMaybe, unwrapMaybe } from "./maybe";
import { dropKeys, getDeepValue, getObjKeys, getPropertyUnsafe } from "./object";
import { Result } from "./result";
import { DeepKeyOf, DeepValue } from "./types";

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
 * @category Array
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
 *
 * @category Array
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
 *
 * @category Array
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
 * @category Array
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
 *
 * @category Array
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
 *
 * @category Array
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
 *
 * @category Array
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
 *
 * @category Array
 */
export function sliceAround<T>(arr: T[], i: number, v: T): T[] {
    return arr.slice(0, i).concat([v]).concat(arr.slice(i));
}

/**
 * Creates a copy of some array, with some value at the given index replaced with the given value
 *
 * @category Array
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
 *
 * @category Array
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
 *
 * @category Array
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

    const _next = (acc: E | { _bail: symbol; v: R }, i: number): E | { _bail: symbol; v: R } => {
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
 * arrFromFactory(5, (idx) => idx % 2 == 0 ? 'even' : 'odd');
 * // ['even', 'odd', 'even', 'odd', 'even'];
 * ```
 *
 * @category Array
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
 *
 * @category Array
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
 *
 * @category Array
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
 *
 * @category Array
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

/**
 * For each index between the given `lower` and `upper` bounds (exclusive upper), call the specified function with that index.
 *
 * @example
 * ```ts
 * repeat(10, console.log);
 * // 0
 * // 1
 * // 2
 * // ...
 * // 9
 * ```
 *
 * @example
 * ```ts
 * const arr = [1, 2, 3];
 * repeat(10, 13, (i) => {
 *   arr.push(i);
 * });
 *
 * console.log(arr);
 * // [1, 2, 3, 10, 12]
 * ```
 */
export function repeat(lower: number, upper: number, fn: (i: number) => void) {
    if (lower == upper) return;

    fn(lower);
    repeat(lower + 1, upper, fn);
}

/**
 * Generates all possible permutations of a sequence of numbers with the specified lengths for each position.
 *
 * @example
 * console.log(permurationsOf([2, 3, 2]));
 * // [
 * //   [0, 0, 0],
 * //   [0, 0, 1],
 * //   [0, 1, 0],
 * //   [0, 1, 1],
 * //   [0, 2, 0],
 * //   [0, 2, 1],
 * //   [1, 0, 0],
 * //   [1, 0, 1],
 * //   [1, 1, 0],
 * //   [1, 1, 1],
 * //   [1, 2, 0],
 * //   [1, 2, 1],
 * // ];
 */
export function permutationsOf(nums: number[]): number[][] {
    const result: number[][] = [[...nums].fill(0)];

    /* eslint-disable-next-line no-constant-condition */
    while (true) {
        let i = nums.length - 1;

        while (i >= 0 && result[result.length - 1][i] == nums[i] - 1) i--;

        if (i < 0) break;

        const newPermutation = pipe(result, lastElem, unwrapMaybe, cloneArr);
        newPermutation[i]++;

        repeat(i + 1, nums.length, (j) => {
            newPermutation[j] = 0;
        });

        result.push(newPermutation);
    }

    return result;
}

/**
 * Clears all elements of the given array.
 *
 * @typeParam T - The type of the elements in the array.
 * @param arr - The array to clear.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 3];
 * clearArr(arr);
 * console.log(arr); // []
 * ```
 */
export function clearArr<T>(arr: T[]): void {
    arr.splice(0, arr.length);
}

/**
 * Chunks the input array into smaller arrays of the specified size.
 *
 * @typeParam T - The type of the elements in the array.
 * @param arr - The array to chunk.
 * @param chunkSize - The size of each chunk.
 * @returns An array of chunks, where each chunk is an array of `T`.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const chunkSize = 3;
 * const chunks = chunkArr(arr, chunkSize);
 * console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 */
export function chunkArr<T>(arr: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    const buf: T[] = [];

    arr.forEach((cur, i) => {
        buf.push(cur);

        if (buf.length == chunkSize || i + 1 == arr.length) {
            chunks.push([...buf]);
            clearArr(buf);
        }
    });

    return chunks;
}

/**
 * Returns a clone of the given array wih duplicate elements removed via the `filter/indexOf` method.
 *
 * @example
 * ```ts
 * const arr = [1, 1, 1, 2, 1, 3, 4, 4, 2, 1, 2];
 *
 * dedupArr(arr);
 * // returns [1, 2, 3, 4]
 * ```
 */
export function dedupArr<T>(arr: T[]): T[] {
    return arr.filter((cur, i) => arr.indexOf(cur) == i);
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
export function flatMapIntoDeepKey<T extends object, K extends DeepKeyOf<T>>(arr: T[], key: K): DeepValue<T, K>[] {
    return arr.flatMap((el) => getDeepValue(el, key));
}

/**
 * Merges multiple arrays and returns a new array containing the unique elements from all union of the given arrays.
 *
 * @typeParam T - The type of elements in the arrays.
 * @param arrs - Arrays to be merged.
 * @returns A new array with unique elements from all input arrays.
 *
 * @example
 * ```ts
 * const arr1 = [1, 2, 3];
 * const arr2 = [2, 3, 4];
 * const arr3 = [3, 4, 5];
 *
 * mergeArrs(arr1, arr2, arr3);
 * // returns [1, 2, 3, 4, 5]
 * ```
 * 
 * @category Array
 */
export function mergeArrs<T>(...arrs: T[][]): T[] {
    return arrs.reduce((acc, cur) => dedupArr(acc.concat(cur)));
}
