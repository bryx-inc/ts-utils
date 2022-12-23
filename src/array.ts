import { Maybe } from "./maybe";
import { intoMaybe } from "./maybe";

/**
 * Filtered an incoming array of objects by discarding all keys on each object not specifiecd by 'keys'.
 *
 * @example
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

export function arrayIsEmpty(arr: unknown[]) {
    return arr.length == 0;
}

/**
 * Swaps two elements in some array, returning a copy of the new array without modifying the source.
 *
 * This method is pure
 *
 * @example
 * const arr = ['apple', 'banana', 'pear'];
 *
 * console.log(swapAt(arr, 1, 2)); // ['apple', 'pear', 'banana']
 * console.log(arr); // ['apple', 'banana', 'pear']
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
 *
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
 * const arr = [1, 2, null, 3, null, 4];
 * findFirstAndReplace([1, 2, null, 3, null, 4], 9, (v) => v == null);  // [1, 2, 9, 3, null, 4]
 *
 * console.log(arr); // [1, 2, null, 3, null, 4];
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
 * const arr = ['apple', 'banana', 'orange'];
 * console.log(interleave(arr, '|')); // ['apple', '|', 'banana', '|', 'orange']
 * console.log(arr); // ['apple', 'banana', 'orange']
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
 * const arr = ['one', 'two', 'three'];
 * console.log(sliceAround(arr, 2, 'foo')); // ['one', 'two', 'foo', 'three']
 * console.log(arr); // ['one', 'two', 'three']
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
