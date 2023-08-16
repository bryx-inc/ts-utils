# Class: ChainableIterator<T\>

Represents a chainable iterator that allows performing various operations on an underlying generator.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of elements produced by the iterator. |

## Implements

- `Generator`<`T`\>

## Constructors

### constructor

`Private` **new ChainableIterator**<`T`\>(`generator`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `generator` | `Generator`<`T`, `void`, `unknown`\> |

#### Defined in

[iters.ts:13](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L13)

## Properties

### generator

 `Private` **generator**: `Generator`<`T`, `void`, `unknown`\>

#### Defined in

[iters.ts:11](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L11)

## Methods

### [iterator]

**[iterator]**(): `Generator`<`T`, `any`, `unknown`\>

#### Returns

`Generator`<`T`, `any`, `unknown`\>

#### Implementation of

Generator.\_\_@iterator@87

#### Defined in

[iters.ts:55](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L55)

___

### chain

**chain**<`U`\>(`other`): [`ChainableIterator`](ChainableIterator.md)<`T` \| `U`\>

Chains the elements of the current iterator with the elements of another iterator.

**`Example`**

```ts
const result = iter([1, 2, 3]).chain(iter(4, 5, 6)).collect()
console.log(result); // Output: [1, 2, 3, 4, 5, 6]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of elements produced by the other iterator. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`ChainableIterator`](ChainableIterator.md)<`U`\> | Another [ChainableIterator](ChainableIterator.md) to chain with the current iterator. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T` \| `U`\>

A new [ChainableIterator](ChainableIterator.md) containing elements from both iterators in sequence.

#### Defined in

[iters.ts:261](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L261)

___

### collect

**collect**(): `T`[]

Collects all elements of the iterator into an array.

?> This is the equivalent of using the `[...iter]` syntax;

**`Example`**

```ts
const result = iter([1, 2, 3, 4, 5]).collect();
console.log(result); // Output: [1, 2, 3, 4, 5]
```

#### Returns

`T`[]

An array containing all elements of the iterator in the order they were produced.

#### Defined in

[iters.ts:208](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L208)

___

### count

**count**(): `number`

#### Returns

`number`

#### Defined in

[iters.ts:212](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L212)

___

### dedup

**dedup**(): [`ChainableIterator`](ChainableIterator.md)<`Unique`<`T`\>\>

Removes duplicate elements from the iterator.

This method returns a new [ChainableIterator](ChainableIterator.md) with duplicate elements removed.

**`Example`**

```typescript
const result = iter([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]).dedup().collect();
console.log(result); // [1, 2, 3, 4, 5]
```

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`Unique`<`T`\>\>

A new ChainableIterator with duplicate elements removed.

#### Defined in

[iters.ts:608](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L608)

___

### enumerate

**enumerate**(): [`ChainableIterator`](ChainableIterator.md)<[`number`, `T`]\>

Enumerates the elements of the iterator, providing their index along with the value.

**`Example`**

```ts
const result = iter([10, 20, 30, 40, 50]).enumerate().collect();
console.log(result); // Output: [[0, 10], [1, 20], [2, 30], [3, 40], [4, 50]]
```

#### Returns

[`ChainableIterator`](ChainableIterator.md)<[`number`, `T`]\>

A new `ChainableIterator` containing pairs of index-value for each element.

#### Defined in

[iters.ts:341](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L341)

___

### every

**every**(`func`): `boolean`

Checks if all elements of the iterator satisfy a given predicate.

**`Example`**

```ts
function isPositive(val: number): boolean {
  return val > 0;
}

const result = iter([1, 2, 3, 4, 5]).every(isPositive);
console.log(result); // Output: true
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => `boolean` | The predicate function used to determine if elements satisfy the condition. |

#### Returns

`boolean`

`true` if all elements satisfy the predicate, otherwise `false`.

#### Defined in

[iters.ts:587](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L587)

___

### filter

**filter**(`func`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Filters the elements of the iterator based on a predicate function.

**`Example`**

```typescript
function arrIsOnlyEvens(arr) {
  return arr.every(val => val % 2 == 0);
}

const iter = ChainableIterator.from(() => [[1, 2], [3, 4], [5, 6]]);
const result = iter.filter(arrIsOnlyEvens).collect();
console.log(result); // Output: [[3, 4], [5, 6]]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`value`: `T`) => `boolean` | The predicate function used to filter the elements. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

A new `ChainableIterator` containing only the elements that satisfy the predicate.

#### Defined in

[iters.ts:115](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L115)

___

### filterMap

**filterMap**<`U`\>(`func`): [`ChainableIterator`](ChainableIterator.md)<`U`\>

Maps the elements of the iterator using a mapping function that returns a [Maybe](../modules.md#maybe) value and filters out the `null` values.

**`Example`**

```ts
function divideByTwo(val: number): Maybe<number> {
  if (val % 2 == 0) return val / 2;
  return null;
}

const result = iter([1, 2, 3, 4, 5]).filterMap(divideByTwo).collect();
console.log(result); // Output: [1, 2]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of elements produced after applying the mapping function. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => [`Maybe`](../modules.md#maybe)<`U`\> | The mapping function that returns a `Maybe` value. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`U`\>

A new `ChainableIterator` containing the mapped and filtered elements.

#### Defined in

[iters.ts:326](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L326)

___

### flatMap

**flatMap**<`U`\>(`func`): [`ChainableIterator`](ChainableIterator.md)<`U` extends `Inner`[] ? `Inner` : `U`\>

Maps and flattens the elements of the iterator using a mapping function.

**`Example`**

```ts
const result = iter([1, 2, 3]).flatMap((val) => [val, val * 2]).collect();
console.log(result); // Output: [1, 2, 2, 4, 3, 6]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of elements produced after applying the mapping function. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => `U` | The mapping function that returns an array of values. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`U` extends `Inner`[] ? `Inner` : `U`\>

A new [ChainableIterator](ChainableIterator.md) containing the mapped and flattened elements.

#### Defined in

[iters.ts:519](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L519)

___

### flatten

**flatten**(): [`ChainableIterator`](ChainableIterator.md)<`T` extends `Inner`[] ? `Inner` : `T`\>

Flattens the elements of the iterator by unwrapping nested arrays.

**`Example`**

```ts
const result = iter([[1], [2, 3], [4, 5, 6]]).flatten().collect();
console.log(result); // Output: [1, 2, 3, 4, 5, 6]
```

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T` extends `Inner`[] ? `Inner` : `T`\>

A new [ChainableIterator](ChainableIterator.md) with elements at the deepest level of nesting.

#### Defined in

[iters.ts:495](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L495)

___

### fold

**fold**<`U`\>(`initialValue`, `func`): `U`

Folds the elements of the iterator with an initial value and a reducer function.

**`Example`**

```ts
const iter = ChainableIterator.fromArr([[1], [2], [3], [4], [5]]);
const result = iter.fold("## ", (acc, arr) => acc + arr[0]);
console.log(result); // Output: "## 12345"
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of the resulting folded value. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `U` | The initial value of the fold. |
| `func` | (`acc`: `U`, `val`: `T`) => `U` | The reducer function used to combine the elements. |

#### Returns

`U`

The final folded value.

#### Defined in

[iters.ts:160](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L160)

___

### forEach

**forEach**(`func`): `void`

Executes a provided function on each element of the iterator.

**`Example`**

```typescript
iter([1, 2, 3, 4, 5]).forEach((val) => console.log(val)); // Output: 1, 2, 3, 4, 5
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => `void` | The function to execute on each element. |

#### Returns

`void`

#### Defined in

[iters.ts:304](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L304)

___

### inspect

**inspect**(`func`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Executes a provided function on each element of the iterator and returns a new iterator with the original elements.

**`Example`**

```ts
const iter = ChainableIterator.from<number[]>(() => [1, 2, 3, 4, 5]);
const result = iter([1, 2, 3, 4, 5]).inspect(console.log).collect();
// Output: 1, 2, 3, 4, 5
console.log(result); // Output: [1, 2, 3, 4, 5]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => `void` | The function to execute on each element. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

A new `ChainableIterator` containing the original elements.

#### Defined in

[iters.ts:537](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L537)

___

### last

**last**(): `T`

Returns the last element of the iterator.

**`Example`**

```ts
const result = iter([1, 2, 3, 4, 5]).last();
console.log(result); // Output: 5
```

#### Returns

`T`

The last element produced by the iterator.

#### Defined in

[iters.ts:227](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L227)

___

### map

**map**<`U`\>(`func`): [`ChainableIterator`](ChainableIterator.md)<`U`\>

Applies a transformation function to each element of the iterator.

**`Example`**

```typescript
const chainableIterator = ChainableIterator.from<number[]>(() => [[1, 2], [3, 4], [5, 6]]);
const flattenedIterator = chainableIterator.map((arr) => arr.reduce((acc, val) => acc + val, 0));
const result = flattenedIterator.collect();
console.log(result); // Output: [3, 7, 11]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of elements produced by the resulting iterator after applying the mapping function. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`, `idx`: `number`) => `U` | The mapping function that transforms elements from type `T` to type `U`. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`U`\>

A new `ChainableIterator` with elements of type U.

#### Defined in

[iters.ts:91](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L91)

___

### mapWhile

**mapWhile**<`U`\>(`func`): [`ChainableIterator`](ChainableIterator.md)<`U`\>

Maps the elements of the iterator while the provided mapping function returns a non-null value, and stops when a `null` value is encountered.

**`Example`**

```ts
function maybeDivideByTwo(val: number): Maybe<number> {
  if (val % 2 == 0) return val / 2;
  return null;
}

const iter = ChainableIterator.from<number[]>(() => [2, 4, 6, 7, 8]);
const result = iter([2, 4, 6, 7, 8]).mapWhile(maybeDivideByTwo).collect();
console.log(result); // Output: [1, 2, 3]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of elements produced after applying the mapping function. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => [`Maybe`](../modules.md#maybe)<`U`\> | The mapping function that returns a [Maybe](../modules.md#maybe) value. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`U`\>

A new [ChainableIterator](ChainableIterator.md) containing the mapped elements until a `null` value is encountered.

#### Defined in

[iters.ts:424](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L424)

___

### next

**next**(`...args`): `IteratorResult`<`T`, `void`\>

Returns the next value from the iterator.

**`Example`**

```typescript
const chainableIterator = ChainableIterator.from<number>(() => [1, 2, 3][Symbol.iterator]());
const firstValue = chainableIterator.next();
console.log(firstValue); // Output: { value: 1, done: false }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | [] \| [`undefined`] | Optional arguments that will be passed to the underlying generator's `next()` method. |

#### Returns

`IteratorResult`<`T`, `void`\>

An object representing the next value and done status of the iterator.

#### Implementation of

Generator.next

#### Defined in

[iters.ts:72](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L72)

___

### nth

**nth**(`n`): [`Maybe`](../modules.md#maybe)<`T`\>

Retrieves the nth element from the iterator (zero-based index).

**`Example`**

```ts
const element = iter([1, 2, 3, 4, 5]).nth(2);
console.log(element); // Output: 3
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The zero-based index of the element to retrieve. |

#### Returns

[`Maybe`](../modules.md#maybe)<`T`\>

The nth element as a {@link}. If the index is out of range, it returns `null`.

#### Defined in

[iters.ts:243](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L243)

___

### partition

**partition**(`func`): [passIter: ChainableIterator<T\>, failIter: ChainableIterator<T\>]

Partitions the elements of the iterator into two new iterators based on a predicate function.

**`Example`**

```typescript
function isEven(val: number): boolean {
  return val % 2 === 0;
}

const iter = ChainableIterator.from<number[]>(() => [1, 2, 3, 4, 5]);
const [evenIter, oddIter] = iter.partition(isEven);
console.log(evenIter.collect()); // Output: [2, 4]
console.log(oddIter.collect()); // Output: [1, 3, 5]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => `boolean` | The predicate function used to determine the partitioning. |

#### Returns

[passIter: ChainableIterator<T\>, failIter: ChainableIterator<T\>]

A tuple of two [ChainableIterator](ChainableIterator.md) instances: one containing elements that satisfy the predicate, and the other containing elements that don't.

#### Defined in

[iters.ts:562](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L562)

___

### reduce

**reduce**(`func`): `T`

Reduces the elements of the iterator to a single value using the provided reducer function.

**`Example`**

```ts
const iter = ChainableIterator.fromArr([[1], [2], [3], [4], [5]]);
const result = iter.reduce((acc, arr) => acc.concat(arr), []);
console.log(result); // Output: [1, 2, 3, 4, 5]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`acc`: `T`, `val`: `T`) => `T` | The reducer function used to combine the elements. |

#### Returns

`T`

The final reduced value.

#### Defined in

[iters.ts:135](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L135)

___

### return

**return**(): `IteratorResult`<`T`, `void`\>

#### Returns

`IteratorResult`<`T`, `void`\>

#### Implementation of

Generator.return

#### Defined in

[iters.ts:46](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L46)

___

### scan

**scan**<`U`\>(`initialValue`, `func`): [`ChainableIterator`](ChainableIterator.md)<`U`\>

Scans the elements of the iterator using a reducer function and returns a new iterator with intermediate values.

**`Example`**

```ts
iter([1, 2, 3, 4, 5])
  .scan(0, (acc, val) => acc + val)
  .inspect(console.log) // Output 1 3 6 10 15
  .scan(0, (acc, val) => acc + val)
  .inspect(console.log); // Output 1 4 10 20 35
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of elements produced after applying the reducer function. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValue` | `U` | The initial value of the scan. |
| `func` | (`accumulator`: `U`, `val`: `T`) => `U` | The reducer function used to combine the elements. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`U`\>

A new [ChainableIterator](ChainableIterator.md) containing intermediate scan values.

#### Defined in

[iters.ts:471](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L471)

___

### skip

**skip**(`n`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Skips a specific number of elements from the iterator by calling `[Symbol.iterator].next()` `n` times

**`Example`**

```
const result = iter([1, 2, 3, 4, 5]).skip(2).collect();
console.log(result); // Output: [3, 4, 5]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number of elements to skip. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

#### Defined in

[iters.ts:448](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L448)

___

### skipWhile

**skipWhile**(`func`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Skips elements from the iterator while the provided predicate function returns `true`.

**`Example`**

```ts
function isEven(val: number): boolean {
  return val % 2 == 0;
}

const result = iter([4, 2, 3, 2, 4]).skipWhile(isEven).collect();
console.log(result); // Output: [3, 2, 4]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => `boolean` | The predicate function used to determine whether to skip elements. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

A new [ChainableIterator](ChainableIterator.md) containing the remaining elements after skipping.

#### Defined in

[iters.ts:361](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L361)

___

### take

**take**(`count`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Takes a specific number of elements from the iterator and returns a new iterator with those values

**`Example`**

```ts
const iter = ChainableIterator.fromArr([1, 2, 3, 4, 5]);
const result = iter.take(3).collect();
console.log(result); // Output: [1, 2, 3]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | The number of elements to take from the iterator. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

A new `ChainableIterator` containing the taken elements.

#### Defined in

[iters.ts:184](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L184)

___

### takeWhile

**takeWhile**(`func`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Takes elements from the iterator while the provided predicate function returns `true`.

**`Example`**

```ts
function isLessThanThree(val: number): boolean {
  return val < 3;
}

const nums = iter([1, 2, 3, 4, 5]);
console.log(nums.takeWhile(isLessThanThree).collect()); // [1, 2]
console.log(nums.collect()) // [3, 4, 5]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`val`: `T`) => `boolean` | The predicate function used to determine whether to take elements. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

A new [ChainableIterator](ChainableIterator.md) containing elements taken until the predicate returns `false`.

#### Defined in

[iters.ts:394](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L394)

___

### throw

**throw**(`e`): `IteratorResult`<`T`, `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `string` \| `Error` |

#### Returns

`IteratorResult`<`T`, `void`\>

#### Implementation of

Generator.throw

#### Defined in

[iters.ts:50](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L50)

___

### zip

**zip**<`U`\>(`other`): [`ChainableIterator`](ChainableIterator.md)<[`T`, `U`]\>

Zips the elements of the current iterator with the elements of another iterator.

**`Example`**

```ts
const iter1 = iter([1, 2, 3])
const iter2 = iter([4, 5, 6]);
const result = iter1.zip(iter2).collect();
console.log(result); // Output: [[1, 4], [2, 5], [3, 6]]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of elements produced by the other iterator. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`ChainableIterator`](ChainableIterator.md)<`U`\> | Another `ChainableIterator` to zip with the current iterator. |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<[`T`, `U`]\>

A new `ChainableIterator` containing pairs of elements from both iterators until the shortest iterator is exhausted.

#### Defined in

[iters.ts:284](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L284)

___

### fromArr

`Static` **fromArr**<`T`\>(`arr`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Creates a new [ChainableIterator](ChainableIterator.md) from an array's internal iterator

?> Use [iter](../modules.md#iter) rather than calling raw constructor functions

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

#### Defined in

[iters.ts:42](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L42)

___

### fromGeneratorFn

`Static` **fromGeneratorFn**<`T`\>(`factory`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Creates a new [ChainableIterator](ChainableIterator.md) from a generator factory function.

?> Use [iter](../modules.md#iter) rather than calling raw constructor functions

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | () => `Generator`<`T`, `void`, `unknown`\> |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

#### Defined in

[iters.ts:22](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L22)

___

### fromIter

`Static` **fromIter**<`T`\>(`iter`): [`ChainableIterator`](ChainableIterator.md)<`T`\>

Creates a new [ChainableIterator](ChainableIterator.md) from an existing iterator

?> Use [iter](../modules.md#iter) rather than calling raw constructor functions

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`<`T`, `void`, `unknown`\> |

#### Returns

[`ChainableIterator`](ChainableIterator.md)<`T`\>

#### Defined in

[iters.ts:31](https://github.com/bryx-inc/ts-utils/blob/78c7a25/src/iters.ts#L31)
