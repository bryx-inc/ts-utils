import { throwError } from "./errors";
import { intoMaybe, isNone, isSome, Maybe } from "./maybe";
import { Unique } from "./types/unique";

/**
 * Represents a chainable iterator that allows performing various operations on an underlying generator.
 *
 * @typeParam T - The type of elements produced by the iterator.
 */
export class ChainableIterator<T> implements Generator<T> {
    private generator: Generator<T, void, unknown>;

    private constructor(generator: Generator<T, void, unknown>) {
        this.generator = generator;
    }

    /**
     * Creates a new {@link ChainableIterator} from a generator factory function.
     *
     * ?> Use {@link iter} rather than calling raw constructor functions
     */
    static fromGeneratorFn<T>(factory: () => Generator<T, void, unknown>) {
        return new ChainableIterator(factory());
    }

    /**
     * Creates a new {@link ChainableIterator} from an existing iterator
     *
     * ?> Use {@link iter} rather than calling raw constructor functions
     */
    static fromIter<T>(iter: Iterator<T, void, unknown>) {
        return ChainableIterator.fromGeneratorFn(function* () {
            yield* { [Symbol.iterator]: () => iter };
        });
    }

    /**
     * Creates a new {@link ChainableIterator} from an array's internal iterator
     *
     * ?> Use {@link iter} rather than calling raw constructor functions
     */
    static fromArr<T>(arr: T[]) {
        return ChainableIterator.fromIter(arr[Symbol.iterator]());
    }

    return(): IteratorResult<T, void> {
        return this.generator.return();
    }

    throw(e: string | Error): IteratorResult<T, void> {
        return this.generator.throw(e);
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [Symbol.iterator](): Generator<T, any, unknown> {
        return this.generator[Symbol.iterator]();
    }

    /**
     * Returns the next value from the iterator.
     *
     * @param args - Optional arguments that will be passed to the underlying generator's `next()` method.
     * @returns An object representing the next value and done status of the iterator.
     *
     * @example
     * ```typescript
     * const chainableIterator = ChainableIterator.from<number>(() => [1, 2, 3][Symbol.iterator]());
     * const firstValue = chainableIterator.next();
     * console.log(firstValue); // Output: { value: 1, done: false }
     * ```
     */
    next(...args: [] | [undefined]): IteratorResult<T, void> {
        return this.generator.next(...args);
    }

    /**
     * Applies a transformation function to each element of the iterator.
     *
     * @typeParam U - The type of elements produced by the resulting iterator after applying the mapping function.
     * @param func - The mapping function that transforms elements from type `T` to type `U`.
     * @returns A new `ChainableIterator` with elements of type U.
     *
     * @example
     * ```typescript
     * const chainableIterator = ChainableIterator.from<number[]>(() => [[1, 2], [3, 4], [5, 6]]);
     * const flattenedIterator = chainableIterator.map((arr) => arr.reduce((acc, val) => acc + val, 0));
     * const result = flattenedIterator.collect();
     * console.log(result); // Output: [3, 7, 11]
     * ```
     */
    map<U>(func: (val: T, idx: number) => U): ChainableIterator<U> {
        const generator = this.generator;
        return ChainableIterator.fromGeneratorFn(function* () {
            let idx = 0;
            for (const val of generator) yield func(val, idx++);
        });
    }

    /**
     * Filters the elements of the iterator based on a predicate function.
     *
     * @param func - The predicate function used to filter the elements.
     * @returns A new `ChainableIterator` containing only the elements that satisfy the predicate.
     * @example
     * ```typescript
     * function arrIsOnlyEvens(arr) {
     *   return arr.every(val => val % 2 == 0);
     * }
     *
     * const iter = ChainableIterator.from(() => [[1, 2], [3, 4], [5, 6]]);
     * const result = iter.filter(arrIsOnlyEvens).collect();
     * console.log(result); // Output: [[3, 4], [5, 6]]
     * ```
     */
    filter(func: (value: T) => boolean): ChainableIterator<T> {
        const generator = this.generator;
        return ChainableIterator.fromGeneratorFn(function* () {
            for (const val of generator) if (func(val)) yield val;
        });
    }

    /**
     * Reduces the elements of the iterator to a single value using the provided reducer function.
     *
     * @param func - The reducer function used to combine the elements.
     * @returns The final reduced value.
     *
     * @example
     * ```ts
     * const iter = ChainableIterator.fromArr([[1], [2], [3], [4], [5]]);
     * const result = iter.reduce((acc, arr) => acc.concat(arr), []);
     * console.log(result); // Output: [1, 2, 3, 4, 5]
     * ```
     */
    reduce(func: (acc: T, val: T) => T): T {
        const _next = (val: T): T => {
            const next = this.generator.next();

            if (next.done) return val;
            else return _next(func(val, next.value));
        };
        return _next(this.generator.next().value ?? throwError("Cannot reduce an empty iterator"));
    }

    /**
     * Folds the elements of the iterator with an initial value and a reducer function.
     *
     * @typeParam U - The type of the resulting folded value.
     * @param initialValue - The initial value of the fold.
     * @param func - The reducer function used to combine the elements.
     * @returns The final folded value.
     *
     * @example
     * ```ts
     * const iter = ChainableIterator.fromArr([[1], [2], [3], [4], [5]]);
     * const result = iter.fold("## ", (acc, arr) => acc + arr[0]);
     * console.log(result); // Output: "## 12345"
     * ```
     */
    fold<U>(initialValue: U, func: (acc: U, val: T) => U): U {
        const _next = (val: U): U => {
            const next = this.generator.next();

            if (next.done) return val;
            else return _next(func(val, next.value));
        };

        return _next(initialValue);
    }

    /**
     * Takes a specific number of elements from the iterator and returns a new iterator with those values
     *
     * @param count - The number of elements to take from the iterator.
     * @returns A new `ChainableIterator` containing the taken elements.
     *
     * @example
     * ```ts
     * const iter = ChainableIterator.fromArr([1, 2, 3, 4, 5]);
     * const result = iter.take(3).collect();
     * console.log(result); // Output: [1, 2, 3]
     * ```
     */
    take(count: number): ChainableIterator<T> {
        const generator = this.generator;
        function* _take(num: number): Generator<T, void, unknown> {
            const next = generator.next();
            if (!next.done) yield next.value;
            if (!next.done && num > 1) yield* _take(num - 1);
        }

        return new ChainableIterator(_take(count));
    }

    /**
     * Collects all elements of the iterator into an array.
     *
     * ?> This is the equivalent of using the `[...iter]` syntax;
     *
     * @returns An array containing all elements of the iterator in the order they were produced.
     *
     * @example
     * ```ts
     * const result = iter([1, 2, 3, 4, 5]).collect();
     * console.log(result); // Output: [1, 2, 3, 4, 5]
     * ```
     */
    collect(): T[] {
        return [...this.generator];
    }

    count(): number {
        return this.collect().length;
    }

    /**
     * Returns the last element of the iterator.
     *
     * @returns The last element produced by the iterator.
     *
     * @example
     * ```ts
     * const result = iter([1, 2, 3, 4, 5]).last();
     * console.log(result); // Output: 5
     * ```
     */
    last(): T {
        return this.reduce((_, val) => val);
    }

    /**
     * Retrieves the nth element from the iterator (zero-based index).
     *
     * @param n - The zero-based index of the element to retrieve.
     * @returns The nth element as a {@link}. If the index is out of range, it returns `null`.
     *
     * @example
     * ```ts
     * const element = iter([1, 2, 3, 4, 5]).nth(2);
     * console.log(element); // Output: 3
     * ```
     */
    nth(n: number): Maybe<T> {
        rangeIter(0, n - 1).forEach(() => this.next());
        return intoMaybe(this.next().value ?? null);
    }

    /**
     * Chains the elements of the current iterator with the elements of another iterator.
     *
     * @typeParam U - The type of elements produced by the other iterator.
     * @param other - Another {@link ChainableIterator} to chain with the current iterator.
     * @returns A new {@link ChainableIterator} containing elements from both iterators in sequence.
     *
     * @example
     * ```ts
     * const result = iter([1, 2, 3]).chain(iter(4, 5, 6)).collect()
     * console.log(result); // Output: [1, 2, 3, 4, 5, 6]
     * ```
     */
    chain<U>(other: ChainableIterator<U>): ChainableIterator<T | U> {
        const generator = this.generator;
        return ChainableIterator.fromGeneratorFn(function* () {
            yield* generator;
            yield* other.generator;
        });
    }

    /**
     * Zips the elements of the current iterator with the elements of another iterator.
     *
     * @typeParam U - The type of elements produced by the other iterator.
     * @param other - Another `ChainableIterator` to zip with the current iterator.
     * @returns A new `ChainableIterator` containing pairs of elements from both iterators until the shortest iterator is exhausted.
     *
     * @example
     * ```ts
     * const iter1 = iter([1, 2, 3])
     * const iter2 = iter([4, 5, 6]);
     * const result = iter1.zip(iter2).collect();
     * console.log(result); // Output: [[1, 4], [2, 5], [3, 6]]
     * ```
     */
    zip<U>(other: ChainableIterator<U>): ChainableIterator<[T, U]> {
        const generator = this.generator;
        return ChainableIterator.fromGeneratorFn(function* () {
            for (const a of generator) {
                const { value: b, done } = other.next();
                if (!done) yield [a, b];
            }
        });
    }

    /**
     * Executes a provided function on each element of the iterator.
     *
     * @param func - The function to execute on each element.
     *
     * @example
     * ```typescript
     * iter([1, 2, 3, 4, 5]).forEach((val) => console.log(val)); // Output: 1, 2, 3, 4, 5
     * ```
     */
    forEach(func: (val: T) => void) {
        for (const val of this) func(val);
    }

    /**
     * Maps the elements of the iterator using a mapping function that returns a {@link Maybe} value and filters out the `null` values.
     *
     * @typeParam U - The type of elements produced after applying the mapping function.
     * @param func - The mapping function that returns a `Maybe` value.
     * @returns A new `ChainableIterator` containing the mapped and filtered elements.
     *
     * @example
     * ```ts
     * function divideByTwo(val: number): Maybe<number> {
     *   if (val % 2 == 0) return val / 2;
     *   return null;
     * }
     *
     * const result = iter([1, 2, 3, 4, 5]).filterMap(divideByTwo).collect();
     * console.log(result); // Output: [1, 2]
     * ```
     */
    filterMap<U>(func: (val: T) => Maybe<U>): ChainableIterator<U> {
        return this.map(func).filter(isSome) as ChainableIterator<U>;
    }

    /**
     * Enumerates the elements of the iterator, providing their index along with the value.
     *
     * @returns A new `ChainableIterator` containing pairs of index-value for each element.
     *
     * @example
     * ```ts
     * const result = iter([10, 20, 30, 40, 50]).enumerate().collect();
     * console.log(result); // Output: [[0, 10], [1, 20], [2, 30], [3, 40], [4, 50]]
     * ```
     */
    enumerate(): ChainableIterator<[number, T]> {
        return this.map((val, idx) => [idx, val]) as ChainableIterator<[number, T]>;
    }

    /**
     * Skips elements from the iterator while the provided predicate function returns `true`.
     *
     * @param func - The predicate function used to determine whether to skip elements.
     * @returns A new {@link ChainableIterator} containing the remaining elements after skipping.
     *
     * @example
     * ```ts
     * function isEven(val: number): boolean {
     *   return val % 2 == 0;
     * }
     *
     * const result = iter([4, 2, 3, 2, 4]).skipWhile(isEven).collect();
     * console.log(result); // Output: [3, 2, 4]
     * ```
     */
    skipWhile(func: (val: T) => boolean): ChainableIterator<T> {
        return ChainableIterator.fromGeneratorFn(
            function* (this: ChainableIterator<T>) {
                let skipping = true;

                for (const val of this) {
                    if (!skipping) yield val;
                    else if (!func(val)) {
                        skipping = false;
                        yield val;
                    }
                }
            }.bind(this),
        );
    }

    /**
     * Takes elements from the iterator while the provided predicate function returns `true`.
     *
     * @param func - The predicate function used to determine whether to take elements.
     * @returns A new {@link ChainableIterator} containing elements taken until the predicate returns `false`.
     *
     * @example
     * ```ts
     * function isLessThanThree(val: number): boolean {
     *   return val < 3;
     * }
     *
     * const nums = iter([1, 2, 3, 4, 5]);
     * console.log(nums.takeWhile(isLessThanThree).collect()); // [1, 2]
     * console.log(nums.collect()) // [3, 4, 5]
     * ```
     */
    takeWhile(func: (val: T) => boolean): ChainableIterator<T> {
        return ChainableIterator.fromGeneratorFn(
            function* (this: ChainableIterator<T>) {
                for (const val of this) {
                    if (!func(val)) return;
                    yield val;
                }
            }.bind(this),
        );
    }

    /**
     * Maps the elements of the iterator while the provided mapping function returns a non-null value, and stops when a `null` value is encountered.
     *
     * @typeParam U - The type of elements produced after applying the mapping function.
     * @param func - The mapping function that returns a {@link Maybe} value.
     * @returns A new {@link ChainableIterator} containing the mapped elements until a `null` value is encountered.
     *
     * @example
     * ```ts
     * function maybeDivideByTwo(val: number): Maybe<number> {
     *   if (val % 2 == 0) return val / 2;
     *   return null;
     * }
     *
     * const iter = ChainableIterator.from<number[]>(() => [2, 4, 6, 7, 8]);
     * const result = iter([2, 4, 6, 7, 8]).mapWhile(maybeDivideByTwo).collect();
     * console.log(result); // Output: [1, 2, 3]
     * ```
     */
    mapWhile<U>(func: (val: T) => Maybe<U>): ChainableIterator<U> {
        return ChainableIterator.fromGeneratorFn(
            function* (this: ChainableIterator<T>) {
                for (const val of this) {
                    const mapped = func(val);
                    if (isNone(mapped)) return;

                    yield mapped;
                }
            }.bind(this),
        );
    }

    /**
     * Skips a specific number of elements from the iterator by calling `[Symbol.iterator].next()` `n` times
     *
     * @param n - The number of elements to skip.
     *
     * @example
     * ```
     * const result = iter([1, 2, 3, 4, 5]).skip(2).collect();
     * console.log(result); // Output: [3, 4, 5]
     * ```
     */
    skip(n: number): ChainableIterator<T> {
        if (n == 0) return this;
        this.next();
        return this.skip(n - 1);
    }

    /**
     * Scans the elements of the iterator using a reducer function and returns a new iterator with intermediate values.
     *
     * @typeParam U - The type of elements produced after applying the reducer function.
     * @param initialValue - The initial value of the scan.
     * @param func - The reducer function used to combine the elements.
     * @returns A new {@link ChainableIterator} containing intermediate scan values.
     *
     * @example
     * ```ts
     * iter([1, 2, 3, 4, 5])
     *   .scan(0, (acc, val) => acc + val)
     *   .inspect(console.log) // Output 1 3 6 10 15
     *   .scan(0, (acc, val) => acc + val)
     *   .inspect(console.log); // Output 1 4 10 20 35
     * ```
     */
    scan<U>(initialValue: U, func: (accumulator: U, val: T) => U): ChainableIterator<U> {
        return ChainableIterator.fromGeneratorFn(
            function* (this: ChainableIterator<T>) {
                let state = initialValue;

                for (const val of this) {
                    state = func(state, val);
                    yield state;
                }
            }.bind(this),
        );
    }

    /**
     * Flattens the elements of the iterator by unwrapping nested arrays.
     *
     * @returns A new {@link ChainableIterator} with elements at the deepest level of nesting.
     *
     * @example
     * ```ts
     * const result = iter([[1], [2, 3], [4, 5, 6]]).flatten().collect();
     * console.log(result); // Output: [1, 2, 3, 4, 5, 6]
     * ```
     */
    flatten(): ChainableIterator<T extends (infer Inner)[] ? Inner : T> {
        return ChainableIterator.fromGeneratorFn(
            function* (this: ChainableIterator<T>) {
                for (const val of this) {
                    if (Array.isArray(val)) yield* ChainableIterator.fromArr(val);
                    else yield val;
                }
            }.bind(this),
        );
    }

    /**
     * Maps and flattens the elements of the iterator using a mapping function.
     *
     * @typeParam U - The type of elements produced after applying the mapping function.
     * @param func - The mapping function that returns an array of values.
     * @returns A new {@link ChainableIterator} containing the mapped and flattened elements.
     *
     * @example
     * ```ts
     * const result = iter([1, 2, 3]).flatMap((val) => [val, val * 2]).collect();
     * console.log(result); // Output: [1, 2, 2, 4, 3, 6]
     * ```
     */
    flatMap<U>(func: (val: T) => U): ChainableIterator<U extends (infer Inner)[] ? Inner : U> {
        return this.map(func).flatten();
    }

    /**
     * Executes a provided function on each element of the iterator and returns a new iterator with the original elements.
     *
     * @param func - The function to execute on each element.
     * @returns A new `ChainableIterator` containing the original elements.
     *
     * @example
     * ```ts
     * const iter = ChainableIterator.from<number[]>(() => [1, 2, 3, 4, 5]);
     * const result = iter([1, 2, 3, 4, 5]).inspect(console.log).collect();
     * // Output: 1, 2, 3, 4, 5
     * console.log(result); // Output: [1, 2, 3, 4, 5]
     * ```
     */
    inspect(func: (val: T) => void): ChainableIterator<T> {
        return this.map((val) => {
            func(val);
            return val;
        });
    }

    /**
     * Partitions the elements of the iterator into two new iterators based on a predicate function.
     *
     * @param func - The predicate function used to determine the partitioning.
     * @returns A tuple of two {@link ChainableIterator} instances: one containing elements that satisfy the predicate, and the other containing elements that don't.
     *
     * @example
     * ```typescript
     * function isEven(val: number): boolean {
     *   return val % 2 === 0;
     * }
     *
     * const iter = ChainableIterator.from<number[]>(() => [1, 2, 3, 4, 5]);
     * const [evenIter, oddIter] = iter.partition(isEven);
     * console.log(evenIter.collect()); // Output: [2, 4]
     * console.log(oddIter.collect()); // Output: [1, 3, 5]
     * ```
     */
    partition(func: (val: T) => boolean): [passIter: ChainableIterator<T>, failIter: ChainableIterator<T>] {
        const [a, b] = this.fold([[] as T[], [] as T[]], ([arr1, arr2], val) => {
            if (func(val)) return [arr1.concat([val]), arr2];
            else return [arr1, arr2.concat([val])];
        });

        return [ChainableIterator.fromArr(a), ChainableIterator.fromArr(b)];
    }

    /**
     * Checks if all elements of the iterator satisfy a given predicate.
     *
     * @param func - The predicate function used to determine if elements satisfy the condition.
     * @returns `true` if all elements satisfy the predicate, otherwise `false`.
     *
     * @example
     * ```ts
     * function isPositive(val: number): boolean {
     *   return val > 0;
     * }
     *
     * const result = iter([1, 2, 3, 4, 5]).every(isPositive);
     * console.log(result); // Output: true
     * ```
     */
    every(func: (val: T) => boolean): boolean {
        for (const val of this) {
            if (!func(val)) return false;
        }

        return true;
    }

    dedup(): ChainableIterator<Unique<T>> {
        const generator = this.generator;

        return ChainableIterator.fromGeneratorFn(function* () {
            let lastElem: Maybe<Unique<T>> = null;

            for (const val of generator) {
                if (lastElem != val) yield val as Unique<T>;
                lastElem = val as Unique<T>;
            }
        });
    }
}

/**
 * @generator
 *
 * Generates a range of numbers from a lower bound to an optional upper bound.
 *
 * !> Note: When providing bounds of a very large interval, this generator may result in stack overflow errors due to excessive recursion.
 *
 *
 * @param {number} lower - The lower bound of the range.
 * @param {number} upper - The upper bound of the range (inclusive).
 * @returns {Generator<number>} A generator yielding the numbers in the specified range.
 *
 * @example
 * ```ts
 * for (const i of rangeIter(-5, 10)) {
 *  console.log(i); // -5, -4, -3, -2, ... 9, 10
 * }
 * ```
 *
 * @category Iterator
 */
export function rangeIter(lower: number, upper: number): ChainableIterator<number> {
    return iter(function* () {
        yield lower;
        if (lower < upper) yield* rangeIter(lower + 1, upper);
    });
}

/**
 * Creates a {@link ChainableIterator} from a generator function
 *
 * @example
 * ```
 * const arr = [1, 2, 3, 4, 5];
 * iter(function*() { yield* arr }).map(val => val * 2).inspect(console.log);
 * // Output: 2, 4, 6, 8, 10
 * ```
 *
 * @typeParam T - The type of elements produced by the iterator.
 * @param val - The generator function to construct the iterator with
 * @returns A new {@link ChainableIterator} instance based on the provided input.
 */
export function iter<T>(val: () => Generator<T, void, unknown>): ChainableIterator<T>;
/**
 * Creates a {@link ChainableIterator} from an existing generator
 *
 * @example
 * ```
 * const arr = [1, 2, 3, 4, 5];
 * function* myGenerator() { yield* arr }
 *
 * const nums = myGenerator();
 * nums.next();
 *
 * iter(nums).map(val => val * 2).inspect(console.log);
 * // Output: 4, 6, 8, 10
 * ```
 *
 * @typeParam T - The type of elements produced by the iterator.
 * @param val - The generator to construct the iterator with
 * @returns A new {@link ChainableIterator} instance based on the provided input.
 */
export function iter<T>(val: Generator<T, void, unknown>): ChainableIterator<T>;
/**
 * Creates a {@link ChainableIterator} from an array.
 *
 * ?> This method does *not* preemptively call the array's inernal iterator at construction time, it just constructs a new iterator based on the array's iterator
 *
 * @example
 * ```ts
 * console.log(iter([1, 2, 3]).fold("", (acc, cur) => acc + cur)); // output: "123"
 * ```
 *
 * @typeParam T - The type of elements produced by the iterator.
 * @param val - The array to construct the iterator with
 * @returns A new {@link ChainableIterator} instance based on the provided input.
 */
export function iter<T>(val: T[]): ChainableIterator<T>;
/**
 * Creates a {@link ChainableIterator} from an existing, raw {@link Iterator}
 *
 * @example
 * ```ts
 * const it = [1, 2, 3, 4, 5][Symbol.iterator]();
 * it.next();
 * console.log(iter(it).collect()); // [2, 3, 4, 5]
 * ```
 *
 * @typeParam T - The type of elements produced by the iterator.
 * @param val - The iterator to use
 * @returns A new {@link Iterator} instance based on the provided input.
 */
export function iter<T>(val: Iterator<T, void, unknown>): ChainableIterator<T>;
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function iter<T>(val: any): ChainableIterator<T> {
    if (typeof val == "function") return ChainableIterator.fromGeneratorFn(val);
    if (Array.isArray(val)) return ChainableIterator.fromArr(val);
    else return ChainableIterator.fromIter(val);
}
