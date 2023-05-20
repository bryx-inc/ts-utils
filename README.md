# Docs

## Classes

- [FormalMaybe](classes/FormalMaybe.md)
- [Result](classes/Result.md)

## Array Functions

- [arrFromFactory](modules.md#arrfromfactory)
- [arrayIsEmpty](modules.md#arrayisempty)
- [cloneArr](modules.md#clonearr)
- [dropIdx](modules.md#dropidx)
- [findFirstAndReplace](modules.md#findfirstandreplace)
- [interleave](modules.md#interleave)
- [lastElem](modules.md#lastelem)
- [moveToIdx](modules.md#movetoidx)
- [objectifyArr](modules.md#objectifyarr)
- [replaceAt](modules.md#replaceat)
- [selectKeys](modules.md#selectkeys)
- [sliceAround](modules.md#slicearound)
- [swapAt](modules.md#swapat)
- [toPathedArr](modules.md#topathedarr)
- [tryToFold](modules.md#trytofold)

## Condition Functions

- [cond](modules.md#cond)
- [expect](modules.md#expect)
- [iff](modules.md#iff)
- [orThrow](modules.md#orthrow)

## Error Functions

- [throwError](modules.md#throwerror)

## Hook Functions

- [useAnchorEl](modules.md#useanchorel)
- [useBool](modules.md#usebool)
- [useConst](modules.md#useconst)
- [useConstCallback](modules.md#useconstcallback)
- [useDefer](modules.md#usedefer)
- [useIndex](modules.md#useindex)

## Object Functions

- [derecordify](modules.md#derecordify)
- [dropKeys](modules.md#dropkeys)
- [dropNullValues](modules.md#dropnullvalues)
- [getObjKeys](modules.md#getobjkeys)
- [getPropertyUnsafe](modules.md#getpropertyunsafe)
- [mapKeys](modules.md#mapkeys)
- [pickKeys](modules.md#pickkeys)
- [recordify](modules.md#recordify)

## Other Functions

- [bailableMap](modules.md#bailablemap)
- [castUnsafe](modules.md#castunsafe)
- [chunkArr](modules.md#chunkarr)
- [clearArr](modules.md#cleararr)
- [createCurriedGuardPredicate](modules.md#createcurriedguardpredicate)
- [dedupArr](modules.md#deduparr)
- [escapeRegex](modules.md#escaperegex)
- [expectMaybe](modules.md#expectmaybe)
- [flatMapIntoDeepKey](modules.md#flatmapintodeepkey)
- [getDeepObjKeys](modules.md#getdeepobjkeys)
- [getDeepValue](modules.md#getdeepvalue)
- [initialism](modules.md#initialism)
- [inject](modules.md#inject)
- [intoMaybe](modules.md#intomaybe)
- [isIndexOf](modules.md#isindexof)
- [isNone](modules.md#isnone)
- [isSome](modules.md#issome)
- [keyFrom](modules.md#keyfrom)
- [matchMaybe](modules.md#matchmaybe)
- [maybeParseFloat](modules.md#maybeparsefloat)
- [maybeParseInt](modules.md#maybeparseint)
- [objectIsEmpty](modules.md#objectisempty)
- [orFragment](modules.md#orfragment)
- [permutationsOf](modules.md#permutationsof)
- [pipe](modules.md#pipe)
- [quickDeepClone](modules.md#quickdeepclone)
- [repeat](modules.md#repeat)
- [selectObjectKeys](modules.md#selectobjectkeys)
- [slicePropertyAtDeepKey](modules.md#slicepropertyatdeepkey)
- [sliceStrTo](modules.md#slicestrto)
- [strAdd](modules.md#stradd)
- [tryOr](modules.md#tryor)
- [unwrapMaybe](modules.md#unwrapmaybe)
- [unwrapOrUndef](modules.md#unwraporundef)
- [useDebounce](modules.md#usedebounce)
- [useWaitFor](modules.md#usewaitfor)
- [withSome](modules.md#withsome)

## Type Aliases

### ConcatReadonlyTuple

 **ConcatReadonlyTuple**<`TTuple`, `TDelim`, `TAcc`\>: `TTuple` extends readonly [infer Head, ...(infer Rest extends readonly string[])] ? [`ConcatReadonlyTuple`](modules.md#concatreadonlytuple)<`Rest`, `TDelim`, \`${TAcc}${TDelim}${Head}\`\> : `TAcc`

Concatenates a readonly tuple of strings using a specified delimiter.

**`Example`**

```typescript
type Result = ConcatReadonlyTuple<readonly ["Hello", "World"], "-">;
//   ^? "Hello-World"
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TTuple` | extends readonly `string`[] | The input readonly tuple of strings. |
| `TDelim` | extends `string` | The delimiter used to concatenate the strings. |
| `TAcc` | extends `string` = ``""`` | The accumulated string during concatenation (initially an empty string). |

#### Defined in

[types/concatTuple.ts:36](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/concatTuple.ts#L36)

___

### ConcatTuple

 **ConcatTuple**<`TTuple`, `TDelim`, `TAcc`\>: `TTuple` extends [infer Head, ...(infer Rest extends string[])] ? [`ConcatTuple`](modules.md#concattuple)<`Rest`, `TDelim`, \`${TAcc}${TDelim}${Head}\`\> : `TAcc`

Concatenates a tuple of strings using a specified delimiter.

**`Example`**

```typescript
type Result = ConcatTuple<["Hello", "World"], "-">;
//   ^? "Hello-World"
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TTuple` | extends `string`[] | The input tuple of strings. |
| `TDelim` | extends `string` | The delimiter used to concatenate the strings. |
| `TAcc` | extends `string` = ``""`` | The accumulated string during concatenation (initially an empty string). |

#### Defined in

[types/concatTuple.ts:15](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/concatTuple.ts#L15)

___

### DeepKeyOf

 **DeepKeyOf**<`TObj`\>: `TObj` extends infer Inner[] ? [`DeepKeyOf`](modules.md#deepkeyof)<`Inner`\> : { [TKey in keyof TObj & string]: FormattedKey<TObj[TKey], \`${TKey}\`\> }[keyof `TObj` & `string`]

The keys of the given deep, nested object `TObj`.

**`Example`**

```ts
type Person = {
  firstName: string,
  lastName: string,
  address: {
    city: string,
    state: zip
  },
  hobbies: {
    name: string,
    equipment: string[]
  }[]
}
DeepKeyOf<Person>;
// ^? 'firstName' | 'lastName' | 'address' | 'address.city' | 'address.state' | 'hobbies' | 'hobbies.name' | 'hobbies.equipment'
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObj` | extends `object` |

#### Defined in

[types/deepKeyOf.ts:22](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/deepKeyOf.ts#L22)

___

### DeepPick

 **DeepPick**<`TBase`, `TKeys`\>: [`IntersectUnion`](modules.md#intersectunion)<{ [K in TKeys]: K extends \`${infer KHead}.${infer KTail}\` ? KHead extends keyof TBase ? TBase[KHead] extends (infer InferredInner extends object)[] ? KTail extends DeepKeyOf<InferredInner\> ? { [\_ in KHead]: DeepPick<InferredInner, KTail\>[] } : "error: KTail extends DeepPick<InferredInner\> failed!" : TBase[KHead] extends infer InferredInner extends object ? KTail extends DeepKeyOf<InferredInner\> ? { [\_ in KHead]: DeepPick<InferredInner, KTail\> } : "error: KTail extends DeepPick<TBase[KHead]\> failed!" : TBase[KHead] extends (infer InferredNonNullishInnerObject extends object)[] \| undefined ? KTail extends DeepKeyOf<InferredNonNullishInnerObject\> ? { [\_ in KHead]?: DeepPick<InferredNonNullishInnerObject, KTail\>[] } : "error: KTail extends DeepKeyOf<InferredNOnNullishInnerObject\> failed!" : TBase[KHead] extends infer InferredNonNullishInnerObject extends object \| undefined ? KTail extends DeepKeyOf<InferredNonNullishInnerObject\> ? { [\_ in KHead]?: DeepPick<InferredNonNullishInnerObject, KTail\> } : "error: KTail extends DeepKeyOf<InferredNOnNullishInnerObject\> failed!" : "error: TBase[KHead] extends object or (object \| undefined) failed!" : "error: KHead extends keyof TBase failed!" : { [\_ in K]: K extends keyof TBase ? TBase[K] : "error: K doesn't match \_.\_, but also doesn't extend keyof TBase!" } }[`TKeys`]\>

Similar functionality to the builtin `Pick<T, K>`, but allows for use of [DeepKeyOf](modules.md#deepkeyof).

**`Example`**

```ts
type Person = {
  firstName: string,
  lastName: string,
  hobbies: {
    name: string,
    equipment: {
      name: string,
      cost: number
    }[]
  }[]
}

type HobbySubType = DeepPick<Person, 'firstName' | 'hobbies.name' | 'hobbies.equipment.cost'>;
//   ^? { firstName: string } & { hobbies: { name: string }[] } & { hobbies: { equipment: { cost: number }[] }[] };

const Joe: HobbySubType = {
  firstName: "Joe",
  hobbies: [{
    name: "Golfing",
    equipment: [{ cost: 43 }, { cost: 12 }]
  }]
}
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBase` | extends `object` |
| `TKeys` | extends [`DeepKeyOf`](modules.md#deepkeyof)<`TBase`\> |

#### Defined in

[types/deepPick.ts:33](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/deepPick.ts#L33)

___

### DeepUnwrap

 **DeepUnwrap**<`T`\>: `T` extends infer Inner[] ? [`DeepUnwrap`](modules.md#deepunwrap)<`Inner`\> : `T`

Recursively unwraps nested arrays and returns the innermost type.

**`Example`**

```
// Returns `string`.
type Example1 = DeepUnwrap<string[][]>;'
```

**`Example`**

```ts
// Returns `number`.
type Example2 = DeepUnwrap<number[]>;
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The array to unwrap. |

#### Defined in

[types/deepUnwrap.ts:18](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/deepUnwrap.ts#L18)

___

### DeepValue

 **DeepValue**<`TObj`, `TKey`\>: [`DeepPick`](modules.md#deeppick)<`TObj`, `TKey`\> extends infer Picked ? `TKey` extends [`DeepKeyOf`](modules.md#deepkeyof)<`Picked`\> ? `TraversePicked`<`Picked`, `TKey`\> : `never` : `never`

Resolves a deeply nested key path from an object type, returning the type of the resolved key.

**`Example`**

```ts
type User = {
  id: number,
  name: string,
  address: {
    street: string,
    city: string,
    state: string,
    zipcode: number,
  },
  orders: {
    id: number,
    date: string,
    items: {
      id: number,
      name: string,
      price: number,
      quantity: number,
    }[],
  }[],
}

DeepValue<User, "id">; // number
DeepValue<User, "orders.items.name">; // string[][]
DeepValue<User, "orders.items">; // { id: number, name: string, price: number, quantity: number }[][]
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TObj` | extends `object` | The object type to traverse. |
| `TKey` | extends [`DeepKeyOf`](modules.md#deepkeyof)<`TObj`\> | The deep key path to resolve. |

#### Defined in

[types/deepValue.ts:38](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/deepValue.ts#L38)

___

### HeadOf

 **HeadOf**<`T`\>: `T` extends [infer Head, infer \_] ? `Head` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Defined in

[types/tuple.ts:6](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/tuple.ts#L6)

___

### IntersectUnion

 **IntersectUnion**<`Union`\>: `Union` extends `Union` ? `Fn`<`Union`\> : `never` extends `Fn`<infer Intersection\> ? `Intersection` : `never`

Transform a union into an intersection

!> Note: this only works if your `tsconfig.json` has `"strict": true`.

**`Example`**

```ts
type Things = { a: string } | { b: number };
type _ = IntersectUnion<Things>;
//   ^? { a: string } & { b: number };
```

#### Type parameters

| Name |
| :------ |
| `Union` |

#### Defined in

[types/intersectUnion.ts:15](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/intersectUnion.ts#L15)

___

### Maybe

 **Maybe**<`T`\>: `T` \| ``null``

A shorthand type for `T | null`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[maybe.ts:4](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L4)

___

### Narrow

 **Narrow**<`T`, `U`\>: `T` extends `U` ? `T` : `never`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

[types/narrow.ts:1](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/narrow.ts#L1)

___

### OverrideKeys

 **OverrideKeys**<`TBase`, `TOverrides`\>: keyof `TOverrides` extends keyof `TBase` ? `Omit`<`TBase`, keyof `TOverrides`\> & `TOverrides` : `never`

Returns a new object type that combines two existing object types: `TBase` and `TOverrides`.
The resulting object type will have all the properties of `TBase` except those that are also present in `TOverrides`.
If `TOverrides` contains properties with the same names as those in `TBase`, the properties from `TOverrides` will override those in `TBase`.
If the keys in `TOverrides` are not a subset of the keys in `TBase`, the `never` type is returned.

**`Example`**

```ts
type Personnel = {
    name: string;
    rank: {
        thing1: string;
        thing2: number;
    };
};

// Override the `rank` property in `Personnel` with a string type.
type ApiResponse = OverrideKeys<Personnel, { rank: string }>;
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TBase` | extends `object` | The base object type. |
| `TOverrides` | extends { [k in keyof TBase]?: unknown } | The object type containing overrides for `TBase`. |

#### Defined in

[types/overrideKeys.ts:25](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/overrideKeys.ts#L25)

___

### Range

 **Range**<`L`, `U`\>: `_RangeTuple`<`U`, []\> extends [...(infer T), ...\_RangeTuple<L, []\>] ? [...T, `L`] : `never` extends infer I[] ? `I` : `never`

A union type comprised of the set of the whole number unit types bounded by L and U inclusively.

**`Example`**

```ts
type Example = Range<5, 10>; // 5 | 6 | 7 | 8 | 9 | 10
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | extends `number` |
| `U` | extends `number` |

#### Defined in

[types/range.ts:10](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/range.ts#L10)

___

### RecursivePartial

 **RecursivePartial**<`T`\>: { [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U\>[] : T[P] extends object ? RecursivePartial<T[P]\> : T[P] }

Similar in functionality to the built-in Partial<T>, but the type is recursivly applied to all subobjects

**`Example`**

```ts
type FormattingBlock = { where: { argument: { value: string } } };

type FormattingBlockPatch RecursivePartial<FormattingBlock>;
//   ^?: { where?: RecursivePartial<{ argument: { value: string; }; }> | undefined;
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types/recursivePartial.ts:12](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/recursivePartial.ts#L12)

___

### RecursiveWriteable

 **RecursiveWriteable**<`T`\>: { -readonly [P in keyof T]: RecursiveWriteable<T[P]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types/recursiveWritable.ts:1](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/recursiveWritable.ts#L1)

___

### SizedTuple

 **SizedTuple**<`Size`, `Fill`, `_T`\>: `_T`[``"length"``] extends `Size` ? `_T` : [`SizedTuple`](modules.md#sizedtuple)<`Size`, `Fill`, [`Fill`, ...\_T]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Size` | extends `number` |
| `Fill` | `unknown` |
| `_T` | extends `unknown`[] = [] |

#### Defined in

[types/tuple.ts:1](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/tuple.ts#L1)

___

### TailOf

 **TailOf**<`T`\>: `T` extends [...(infer \_), infer Tail] ? `Tail` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Defined in

[types/tuple.ts:5](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/tuple.ts#L5)

___

### Unarray

 **Unarray**<`T`\>: `T` extends infer K[] ? `K` : `never`

Extract the inner type of some given array type, `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |

#### Defined in

[array.ts:10](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L10)

___

### WithRequiredKeys

 **WithRequiredKeys**<`TObj`, `K`\>: `Required`<`Pick`<`TObj`, `K`\>\> & `Omit`<`TObj`, `K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObj` | extends `object` |
| `K` | extends keyof `TObj` |

#### Defined in

[types/withRequiredKeys.ts:1](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/types/withRequiredKeys.ts#L1)

## Array Functions

### arrFromFactory

**arrFromFactory**<`T`\>(`size`, `factory`): `T`[]

Construct a new array of a given size from the result of calling the given factory method with the respective index therein.

**`Example`**

```ts
arrFromFactory(5, (idx) => idx % 2 == 0 ? 'even' : 'odd');
// ['even', 'odd', 'even', 'odd', 'even'];
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `factory` | (`idx`: `number`) => `T` |

#### Returns

`T`[]

#### Defined in

[array.ts:291](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L291)

___

### arrayIsEmpty

**arrayIsEmpty**(`arr`): `boolean`

Returns true if the given array is empty

**`Example`**

```ts
arrayIsEmpty([]); // true
arrayIsEmpty([1, 2, 3]); // false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `unknown`[] |

#### Returns

`boolean`

#### Defined in

[array.ts:75](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L75)

___

### cloneArr

**cloneArr**<`T`\>(`arr`): `T`[]

Creates a clone of some given array, without calling the given array's internal iterator, thereby improving
performance, particularly for larger arrays. For more information refer to [this comparison benchmark](https://jsbench.me/fylb5kvldn/1)

This operation yields the same result as `const newArr = [...arr];`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`T`[]

#### Defined in

[array.ts:207](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L207)

___

### dropIdx

**dropIdx**<`T`\>(`arr`, `idx`): `T`[]

Construct a new array equal to the given array with the data at the given index excluded. The source array is left unmodified.

**`Example`**

```ts
const fruits = ['apple', 'banana', 'orange'];
dropIdx(fruits, 1); // [ 'apple', 'orange' ];
console.log(fruits); // ['apple', 'banana', 'orange']
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `idx` | `number` |

#### Returns

`T`[]

#### Defined in

[array.ts:343](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L343)

___

### findFirstAndReplace

**findFirstAndReplace**<`T`\>(`arr`, `toInsert`, `predicate`): `T`[]

Inserts the `toInsert` value at the first position of a given array at which the array value matches the supplied predicate.
If no values are found that match the predicate, then the original array is returned.

This method is pure

**`Example`**

```ts
const arr = [1, 2, null, 3, null, 4];
findFirstAndReplace([1, 2, null, 3, null, 4], 9, (v) => v == null);  // [1, 2, 9, 3, null, 4]

console.log(arr); // [1, 2, null, 3, null, 4];
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `toInsert` | `T` |
| `predicate` | (`v`: `T`) => `boolean` |

#### Returns

`T`[]

#### Defined in

[array.ts:141](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L141)

___

### interleave

**interleave**<`T`\>(`arr`, `toInsert`): `T`[]

Interleave some value in-between each element of some array.

This method is pure

**`Example`**

```ts
const arr = ['apple', 'banana', 'orange'];
console.log(interleave(arr, '|')); // ['apple', '|', 'banana', '|', 'orange']
console.log(arr); // ['apple', 'banana', 'orange']
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `toInsert` | `T` |

#### Returns

`T`[]

#### Defined in

[array.ts:160](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L160)

___

### lastElem

**lastElem**<`T`\>(`arr`): [`Maybe`](modules.md#maybe)<`T`\>

Returns the last element of some array, and `null` if the array is empty

**`Example`**

```ts
const arr1 = [1, 2, 3, 4];
const arr2 = [];

// vanilla
arr1[arr1.length - 1]; // 4
arr2[arr2.length - 1]; // undefined

// with `lastElem`
lastElem(arr1); // 4
lastElem(arr2) // null
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

[`Maybe`](modules.md#maybe)<`T`\>

#### Defined in

[array.ts:121](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L121)

___

### moveToIdx

**moveToIdx**<`T`\>(`arr`, `startIdx`, `endIdx`): `T`[]

Returns a copy of the given array, with the element at the specified startIdx moved to the specified endIdx.

This operation is pure and leaves no gaps in the resulting array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `startIdx` | `number` |
| `endIdx` | `number` |

#### Returns

`T`[]

#### Defined in

[array.ts:56](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L56)

___

### objectifyArr

**objectifyArr**<`T`\>(`arr`): { [k in string \| number \| symbol]: T[k][] }

Transform an array of objects sharing some type, `T`, into a single object sharing the same set of keys,
but with each value mapped to the array of values from the given array for each key.

**`Example`**

```ts
const people = [
  { first: "jane", last: "doe" },
  { first: "john", last: "ppleseed" }
];

console.log(objectifyArr(people));

// {
//  first: [ "jane", "john" ],
//  last: ["doe", "appleseed"]
// }
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | The array to objectify |

#### Returns

{ [k in string \| number \| symbol]: T[k][] }

#### Defined in

[array.ts:319](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L319)

___

### replaceAt

**replaceAt**<`T`\>(`arr`, `i`, `v`): `T`[]

Creates a copy of some array, with some value at the given index replaced with the given value

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `i` | `number` |
| `v` | `T` |

#### Returns

`T`[]

#### Defined in

[array.ts:193](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L193)

___

### selectKeys

**selectKeys**<`T`, `K`\>(`arr`, `...keys`): `Pick`<`T`, `K`\>[]

Filtered an incoming array of objects by discarding all keys on each object not specifiecd by 'keys'.

**`Example`**

```ts
const arr = [
 {
   first: 'johnny',
   last: 'appleseed',
   age: 20
 },
 {
   first: 'jane',
   last: 'doe',
   age: 31
 }
];

const filtered = selectKeys(arr, 'first', 'age');
console.log(filtered);
// -> [{first: 'jonny', age: 20}, {first: 'jane', age: 31}]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | The incoming array |
| `...keys` | `K`[] | The collection of keys desired for the resulting array |

#### Returns

`Pick`<`T`, `K`\>[]

The updated array

#### Defined in

[array.ts:40](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L40)

___

### sliceAround

**sliceAround**<`T`\>(`arr`, `i`, `v`): `T`[]

Create an array with some value inserted at some index, without modifying the source array.

**`Example`**

```ts
const arr = ['one', 'two', 'three'];
console.log(sliceAround(arr, 2, 'foo')); // ['one', 'two', 'foo', 'three']
console.log(arr); // ['one', 'two', 'three']
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `i` | `number` |
| `v` | `T` |

#### Returns

`T`[]

#### Defined in

[array.ts:184](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L184)

___

### swapAt

**swapAt**<`T`\>(`arr`, `i1`, `i2`): `T`[]

Swaps two elements in some array, returning a copy of the new array without modifying the source.

This method is pure

**`Example`**

```ts
const arr = ['apple', 'banana', 'pear'];

console.log(swapAt(arr, 1, 2)); // ['apple', 'pear', 'banana']
console.log(arr); // ['apple', 'banana', 'pear']
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `i1` | `number` |
| `i2` | `number` |

#### Returns

`T`[]

#### Defined in

[array.ts:93](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L93)

___

### toPathedArr

**toPathedArr**<`PathDelim`, `PathKey`, `ChildKey`, `Source`\>(`arr`, `opts`): `Exclude`<`Source`, `ChildKey`\> & `Record`<`PathKey`, `string`\>[]

Flatten an array of objects with children specified by the given `childKey`, into a 1D array with each child moving to a top-level node. Additionally,
inline the original nested path of the object into the key specified by `pathKey`. This key must already exist for the given objects. The paths are jointed
together by the given `pathDelim`.
This transformation is especially helpful for interacting with the [MUI Data Grid in Tree Mode](https://mui.com/x/react-data-grid/tree-data/).

**`Example`**

```ts
type Person = { name: string, age: number, children: Person[] };

const people: Person[] = [
 { name: 'joe', age: 15, children: [] },
 { name: 'rob', age: 40, children: [
   { name: 'john', age: 17, children: [] },
   { name: 'sam', age: 13, children: [] }
 ]},
 { name: 'zac', age: 60, children: [
   { name: 'bill', age: 39, children: [
     { name: 'jenna', age: 20, children: [
       { name: 'lenny', age: 1, children: [] }
     ]}
   ]}
 ]}
];

console.log(toPathedArr(people, {
 pathKey: 'name',
 childKey: 'children',
 pathDelim: '/'
}));

// [
//  { name: 'joe', age: 15 },
//  { name: 'rob', age: 40 },
//  { name: 'rob/john', age: 17 },
//  { name: 'rob/sam', age: 13 },
//  { name: 'zac', age: 60 },
//  { name: 'zac/bill', age: 39 },
//  { name: 'zac/bill/jenna', age: 20 },
//  { name: 'zac/bill/jenna/lenny', age: 1 }
// ]

```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `PathDelim` | extends `string` |
| `PathKey` | extends `string` |
| `ChildKey` | extends `string` |
| `Source` | extends `Record`<`ChildKey`, `Source`[]\> & `Record`<`PathKey`, `string`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `Source`[] | The source array. This array is not modified. |
| `opts` | `Object` | Behavior specifiction options |
| `opts.basePath?` | `string` | - |
| `opts.childKey` | `ChildKey` | - |
| `opts.pathDelim` | `PathDelim` | - |
| `opts.pathKey` | `PathKey` | - |

#### Returns

`Exclude`<`Source`, `ChildKey`\> & `Record`<`PathKey`, `string`\>[]

A new, flattened array

#### Defined in

[array.ts:398](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L398)

___

### tryToFold

**tryToFold**<`T`, `E`, `R`\>(`arr`, `fn`, `initalValue`): [`Result`](classes/Result.md)<`E`, `R`\>

Try to fold an array. The supplied reducer function accepts the accumulator, the current value, as well as a `bail` method that,
when called with a given value and returned from the reducer, will halt the fold and make the `tryToFold` method return an error state, with value
of the error being equal to the value that the `bail` method was called with.

**`Example`**

```ts
const nums1 = [5, 5, 2];
const nums2 = [5, 5, 0];

const fn = (acc, n, bail) => (n == 0 ? bail("divide by zero") : acc / n);

console.log(tryToFold(nums1, fn, 100).ok()); // 2
console.log(tryToFold(nums2, fn, 100).err()); // "divide by zero"
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The inner type of the given array to fold |
| `E` | The success type if the fold doesn't bail early |
| `R` | The fail type if the fold bails early |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `fn` | (`acc`: `E`, `cur`: `T`, `bail`: (`v`: `R`) => { `_bail`: `symbol` ; `v`: `R`  }) => `E` \| { `_bail`: `symbol` ; `v`: `R`  } |
| `initalValue` | `E` |

#### Returns

[`Result`](classes/Result.md)<`E`, `R`\>

#### Defined in

[array.ts:254](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L254)

___

## Condition Functions

### cond

**cond**<`T`\>(`...instrs`): `T`

Allows for simple control branching. Each instruction supplied is a tuple who's first value,
is a boolean, and who's second value is the value to return if the aformentioned boolean is `true`.

**`Example`**

```ts
type Result = { type: "ok" | "warn" | "err"; msg: string };

function alert(res: Result) {
  console.log(
      cond(
          [res.type == "ok", () => `Good news: ${res.msg}`],
          [res.type == "warn", () => `Quick Heads Up: ${res.msg}`],
          [res.type == "err", () => `Oh No!: ${res.msg}`],
      ),
  );
}

alert({ msg: 'everything is good', type: 'ok' }) // Good news: everything is good'
alert({ msg: 'some stuff is down', type: 'warn' }) // Quick Heads Up: some stuff is down
alert({ msg: 'the world is on fire', type: 'err' }) // Oh No!: the world is on fire
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...instrs` | [when: boolean, then: Function][] |

#### Returns

`T`

#### Defined in

[condition.ts:110](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/condition.ts#L110)

___

### expect

**expect**<`T`\>(`assertation`, `then`, `err?`): `T`

Expect a certain condition and, given that condition, return a value.

?> This often serves as a fill-in for `const v = maybe ? thing : (throw 'err')`, since that syntax is not supported.

**`Example`**

```ts
type Result = {
 isFetched: boolean,
 isSuccess: boolean,
 data?: string,
 ...
}

function getData() {
  const res: Result = ...

  if (res.isFetched)
    return expect(res.isSuccess, res.data, 'result failed!');
}
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assertation` | `boolean` | The control assertation to check. |
| `then` | `T` | The value to return if the assertation passes. |
| `err?` | `string` \| `Error` | The Error or error message to throw of the assertation fails. If none is provided, a generic message will be thrown instead. |

#### Returns

`T`

The `then` value, given a passing assertation.

#### Defined in

[condition.ts:57](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/condition.ts#L57)

___

### iff

**iff**<`T`\>(`cond`, `v`): `T` \| `undefined`

Conditionally return a given value.
?> This is a useful replacement for `when ? something : undefined`.

**`Example`**

```ts
function getSx(isRed: boolean) {
 return { fontFamily: 'monospace', backgroundColor: iff(isRed, 'red') }
}

console.log(getSx(false)); // { fontFamily: 'monospace' }
console.log(getSx(true)); // { fontFamily: 'monospace', backgroundColor: 'red' }
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cond` | `undefined` \| `boolean` | The condition to check |
| `v` | `T` | The value to return if the `cond` is true |

#### Returns

`T` \| `undefined`

v if `cond` is true, otherwise `undefined`

#### Defined in

[condition.ts:23](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/condition.ts#L23)

___

### orThrow

**orThrow**<`T`\>(`v?`, `err?`): `T`

Return the given value if it is not nullish, otherwise throw the given error. If no error is provided, a generic error will be thrown instead.

?> Helpful to support the lack of `(someObject ?: throw "err").someMethod()` syntax.

**`Example`**

```ts
const fruits = ["apple", "pear", "banana"];
console.log(orThrow(fruits.find(v => v == "orange"), "could not find 'orange'").toUpperCase()); // throws "could not find 'orange'"
console.log(orThrow(fruits.find(v => v == "pear"), "could not find 'pear'").toUpperCase()); // "PEAR"
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v?` | `T` |
| `err?` | `string` |

#### Returns

`T`

#### Defined in

[condition.ts:80](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/condition.ts#L80)

___

## Error Functions

### throwError

**throwError**<`T`, `R`\>(`err`): `R`

Thows the given error

?> This is useful for cleaner one-line lambdas which function as branches which should only throw an error;

**`Example`**

```ts
const key:string = ...;

const res = match(key)
 .with("value1", () => "apple")
 .with("value2", () => "banana")
 .otherwise(() => throwError<string, string>("no valid key. Did you specify the right one?");

typeof res; // 'string'
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `Error` |
| `R` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `err` | `T` | The error to throw |

#### Returns

`R`

#### Defined in

[errors.ts:22](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/errors.ts#L22)

___

## Hook Functions

### useAnchorEl

**useAnchorEl**(): readonly [[`Maybe`](modules.md#maybe)<`HTMLDivElement`\>, (`e`: `MouseEvent`<`HTMLDivElement`, `MouseEvent`\>) => `void`, () => `void`]

#### Returns

readonly [[`Maybe`](modules.md#maybe)<`HTMLDivElement`\>, (`e`: `MouseEvent`<`HTMLDivElement`, `MouseEvent`\>) => `void`, () => `void`]

#### Defined in

[hooks/useAnchorEl.ts:7](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useAnchorEl.ts#L7)

___

### useBool

**useBool**(`initialState`): [`boolean`, `UseBooleanCallbacks`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialState` | `boolean` |

#### Returns

[`boolean`, `UseBooleanCallbacks`]

#### Defined in

[hooks/useBool.ts:16](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useBool.ts#L16)

___

### useConst

**useConst**<`T`\>(`initialValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialValue` | `T` \| () => `T` |

#### Returns

`T`

#### Defined in

[hooks/useConst.ts:6](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useConst.ts#L6)

___

### useConstCallback

**useConstCallback**<`T`\>(`cb`): `T`

Construct a function that maintains referential equality throughout lifecycle rerenders of the component. The returned function, however, will have updated closured values of each render's state.

**`Example`**

```ts
function MyComponent() {
  const [ name, setName ] = useState("jonny appleseed");
  const onClick = useConstCalback(() => alert(name));

  return <Button onClick={onClick}>Say Hello</Button> // doesn't rerender when `setName` is called
}
```

**`Author`**

Mary Strodl

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | `T` |

#### Returns

`T`

#### Defined in

[hooks/useConstCallback.ts:19](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useConstCallback.ts#L19)

___

### useDefer

**useDefer**<`T`\>(`fn`): (`e`: `T`) => `void`

Defer an action to be run later. By calling the returned method, the supplied function
will be called with the given parameter on next rerender. A rerender is then queued.

**`Example`**

```tsx
// console.log some message on next render
const deferMsg = useDefer((s: string) => console.log(s));

const MyButton = <button onClick={() => {
   // ...
      deferMsg("second");
      console.log("first");
 }}>Click Me</button>;

   // when clicked...
   // --> "first"
   // --> "second"
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`v`: `T`) => `unknown` |

#### Returns

`fn`

(`e`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `T` |

##### Returns

`void`

#### Defined in

[hooks/useDefer.ts:25](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useDefer.ts#L25)

___

### useIndex

**useIndex**(`initialState`): [`number`, `UseIndexCallbacks`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialState` | `number` |

#### Returns

[`number`, `UseIndexCallbacks`]

#### Defined in

[hooks/useIndex.ts:16](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useIndex.ts#L16)

___

## Object Functions

### derecordify

**derecordify**<`T`, `KN`, `VN`\>(`record`, `opts`): `VN` extends ``"..."`` ? `T`[keyof `T`] extends `object` ? { [k in string]: keyof T } & `any`[`any`] : `never` : { [k in string]: k extends KN ? keyof T : T[keyof T] }[]

Converts a record-style object to an array with each record key and value mapped to a specified named attribute.
If the given `v` name is '...' then, given that the value of each record is an object, the keys of that subobject will be inlined into the new object.

This method is pure.

**`Example`**

```ts
const ages = {
 bill: 38,
 john: 21,
 adam: 25
};

derecordify(ages, { k: 'name', v: 'age' });
// [{ name: 'bill', age: 38 }, { name: 'john', age: 21 }, ...]

const people = {
  bill: { age: 38, hobbies: ['cooking']},
  john: { age: 21, hobbies: ['gardening', 'sports']},
  adam: { age: 25 , hobbies: ['hiking']},
}

derecordify(people, { k: 'name', v: 'info' });
// [{ name: "bill", info: { age: 38, hobbies: ["cooking"]}}, ...]

derecordify(people, { k: 'name', v: '...' });
// [{ name: "bill", age: 38, hobbies: ["cooking"] }, ...]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `KN` | extends `string` |
| `VN` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `record` | `T` |
| `opts` | `Object` |
| `opts.k` | `KN` |
| `opts.v` | `VN` |

#### Returns

`VN` extends ``"..."`` ? `T`[keyof `T`] extends `object` ? { [k in string]: keyof T } & `any`[`any`] : `never` : { [k in string]: k extends KN ? keyof T : T[keyof T] }[]

#### Defined in

[object.ts:309](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L309)

___

### dropKeys

**dropKeys**<`T`, `K`\>(`from`, `keys`): `Exclude`<`T`, `K`[`number`]\>

Creates a new object from the given object with the specified fields deleted.

**`Example`**

```ts
const person = {
 first: "John",
 last: "Smith",
 age: 23,
 state: "NY"
}

const name = dropKeys(person, ['age', 'state']);
console.log(name); // { "first": "John", "last": "Smith" }
console.log(person); // { "first": "John", "last": "Smith", "age": 23, "state": "NY" }
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends keyof `T`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `T` |
| `keys` | `K` |

#### Returns

`Exclude`<`T`, `K`[`number`]\>

#### Defined in

[object.ts:87](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L87)

___

### dropNullValues

**dropNullValues**<`T`\>(`obj`): `Object`

Construct a object with properties identical to the given base object, without any nullish values.

**`Example`**

```ts
const person = {
 name: 'Jane Doe',
 age: 21,
 phone: null
}

dropNullValues(person);
// { name: 'Jane Doe', age: 21 }
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `T` | The given base object |

#### Returns

`Object`

The base object with all nullish values dropped

#### Defined in

[object.ts:25](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L25)

___

### getObjKeys

**getObjKeys**<`T`\>(`v`): keyof `T`[]

Return the keys of the given object an array.

?> This is identical to `Object.keys()`, except this method types it's return type as `(keyof T)[]`, rather than `string | number | symbol`.

**`Example`**

```ts
const person = {
  firstName: 'Jane',
  lastName: 'Doe',
  favoriteColor: 'Green'
}

const keys = getObjKeys(person);
//    ^? ('firstName' | 'lastName' | 'favoriteColor')[]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `T` | The given object |

#### Returns

keyof `T`[]

The array of keys

#### Defined in

[object.ts:385](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L385)

___

### getPropertyUnsafe

**getPropertyUnsafe**<`T`, `E`, `K`\>(`v`, `key`): [`Maybe`](modules.md#maybe)<`E`\>

Maybe get a property on some object, who's type does not define the specified key. If no property is found on the given object at the given key, `null` is returned.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `E` | `E` |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |
| `key` | `K` |

#### Returns

[`Maybe`](modules.md#maybe)<`E`\>

#### Defined in

[object.ts:445](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L445)

___

### mapKeys

**mapKeys**<`T`, `U`\>(`obj`, `fn`): `U`[]

Applies the given function `fn` to each key in the object `obj` and returns an array of the resulting values.

**`Example`**

```ts
const obj = { a: 1, b: 2, c: 3 };
const result = mapKeys(obj, (key) => key.toUpperCase());
// result is ['A', 'B', 'C']
```

**`Typeparam`**

T - The type of the input object `obj`

**`Typeparam`**

U - The type of the output array elements

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `U` | `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `T` | The input object |
| `fn` | (`k`: keyof `T`) => `U` | A function to apply to each key in the object |

#### Returns

`U`[]

An array of the resulting values

#### Defined in

[object.ts:501](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L501)

___

### pickKeys

**pickKeys**<`T`, `K`\>(`from`, `keys`): `Pick`<`T`, `K`[`number`]\>

Creates a new object from the given object only with the specified fields from the base object

**`Example`**

```ts
const person = {
 first: "John",
 last: "Smith",
 age: 23,
 state: "NY"
}

const newObj = pickKeys(person, ['first', 'last']);
console.log(newObj); // { "first": "John", "last": "Smith" }
console.log(person); // { "first": "John", "last": "Smith", "age": 23, "state": "NY" }
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends keyof `T`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `T` |
| `keys` | `K` |

#### Returns

`Pick`<`T`, `K`[`number`]\>

#### Defined in

[object.ts:112](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L112)

___

### recordify

**recordify**<`T`, `K`\>(`arr`, `key`): `Record`<`string`, `T`[]\>

Converts an array of objects into a single, record-style object keyed by the given key attribute.

**`Example`**

```ts
const people = [
 { first: 'john', last: 'smith', state: 'NY' },
 { first: 'sam', last: 'johnson', state: 'NY' },
 { first: 'john', last: 'appleseed', state: 'CO' },
 ...
];
const peopleByState = recordify(people, 'state');
console.log(peopleByState);
// {
//   'NY': [
//      { first: 'john', last: 'smith', state: 'NY' },
//      { first: 'sam', last: 'johnson', state: 'NY' }
//    ],
//    'CO': [
//      { first: 'john', last: 'appleseed', state: 'CO' }
//    ],
//    ...
// }
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `key` | `K` |

#### Returns

`Record`<`string`, `T`[]\>

#### Defined in

[object.ts:356](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L356)

___

## Other Functions

### bailableMap

**bailableMap**<`T`, `E`, `R`\>(`arr`, `mapper`): [`Result`](classes/Result.md)<`E`[], `R`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `mapper` | (`v`: `T`, `bail`: (`v`: `R`) => { `_bail`: `symbol` ; `v`: `R`  }) => `E` \| { `_bail`: `symbol` ; `v`: `R`  } |

#### Returns

[`Result`](classes/Result.md)<`E`[], `R`\>

#### Defined in

[array.ts:211](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L211)

___

### castUnsafe

**castUnsafe**<`T`, `E`\>(`v`): `E`

Cast some given `T` to `E` without any type overlap checks.

!> This function should be used _very_ sparingly, and only in situations where typescript cannot follow the typechecking. Often times, this happens when object properies are being checked on an indexed value. Although, in most cases this object should simply be explicitly bound to a variable, in sitations where it cannot, `unsafeCast` may be used.

**`Example`**

```ts
type Shape2D = ...;
type Shape3D = ...;

type Shape =
 | { type: '2d', shape: Shape2D }
 | { type: '3d', shape: Shape3D }

function print2DShape(shape: Shape2D) { ... }
function print3DShape(shape: Shape3D) { ... }

function printShapeRange(shapes: Shape[], lowerIdx: number, upperIdx: number) {
 if (shapes[lowerIdx].type == '2d')
   print2DShape(castUnsafe(shapes[lowerIdx]));
 else
   print3DShape(castUnsafe(shapes[lowerIdx]))

 if (lowerIdx < upperIdx)
   printShapeRange(shapes, lowerIdx + 1, upperIdx);
}

```

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

#### Returns

`E`

#### Defined in

[object.ts:479](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L479)

___

### chunkArr

**chunkArr**<`T`\>(`arr`, `chunkSize`): `T`[][]

Chunks the input array into smaller arrays of the specified size.

**`Example`**

```ts
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunkSize = 3;
const chunks = chunkArr(arr, chunkSize);
console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the elements in the array. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | The array to chunk. |
| `chunkSize` | `number` | The size of each chunk. |

#### Returns

`T`[][]

An array of chunks, where each chunk is an array of `T`.

#### Defined in

[array.ts:521](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L521)

___

### clearArr

**clearArr**<`T`\>(`arr`): `void`

Clears all elements of the given array.

**`Example`**

```ts
const arr = [1, 2, 3];
clearArr(arr);
console.log(arr); // []
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the elements in the array. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | The array to clear. |

#### Returns

`void`

#### Defined in

[array.ts:501](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L501)

___

### createCurriedGuardPredicate

**createCurriedGuardPredicate**<`T`, `E`\>(`basePredicate`): (`predicate`: (`v`: `E`) => `boolean`) => (`v`: `T`) => v is E

Create an "andable"/curried predicate from some base type guard predicate. This method returns a function that, when invoked with its own
predicate, will return a new predicate that is the result of the base predicate, and the supplied predicate.

This is particularly helpful when the two predicates have two different input types, with the first predicate type-guarding the second.

**`Example`**

```ts
type Thing =
 | { empty: true }
 | { empty: false, data: string }

type ThingIsFilledGuard =
  (v: Thing) => v is Thing & { empty: false };

const things: Thing[] = [
 { empty: true },
 { empty: false, data: 'apple' },
 { empty: false, data: 'banana' }
];

// with curried guard

const isThingFilledAnd = createCurriedGuardPredicate((v => !v.empty) as ThingIsFilledGuard);
things.some(isThingFilledAnd((v) => v == 'banana')); // true

// without the curred guard

things.some((v: Thing) => v.empty == false && v.data == 'banana'); // true
```

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `basePredicate` | (`v`: `T`) => v is E |

#### Returns

`fn`

(`predicate`): (`v`: `T`) => v is E

##### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`v`: `E`) => `boolean` |

##### Returns

`fn`

(`v`): v is E

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

##### Returns

v is E

#### Defined in

[function.ts:35](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L35)

___

### dedupArr

**dedupArr**<`T`\>(`arr`): `T`[]

Returns a clone of the given array wih duplicate elements removed via the `filter/indexOf` method.

**`Example`**

```ts
const arr = [1, 1, 1, 2, 1, 3, 4, 4, 2, 1, 2];

dedupArr(arr);
// returns [1, 2, 3, 4]
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`T`[]

#### Defined in

[array.ts:548](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L548)

___

### escapeRegex

**escapeRegex**(`s`): `string`

Given a string that contains regex commands, escape those characters to match as literals with regex.

**`Example`**

```ts
new RegExp("$50").test("$50"); // false
new RegExp(escapeRegex("$50")).test("$50"); // true
```

?> special thanks to mary.strodl@bryx.com and https://stackoverflow.com/a/3561711

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`string`

#### Defined in

[string.ts:64](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/string.ts#L64)

___

### expectMaybe

**expectMaybe**<`T`\>(`v`, `err`): `T`

Converts a value from `Maybe<T>` to `T`, throwing the specify error is the given Maybe is None.

?> This is particularly helpful since `const value ?? throw 'error'` is not valid

**`Example`**

```ts
function findSomethingOrDont(): Maybe<string> { ... }
const res: string = expectMaybe(findSomethingOrDont(), 'could not find the value!');
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`Maybe`](modules.md#maybe)<`T`\> |
| `err` | `string` \| `Error` |

#### Returns

`T`

#### Defined in

[maybe.ts:67](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L67)

___

### flatMapIntoDeepKey

**flatMapIntoDeepKey**<`T`, `K`\>(`arr`, `key`): [`DeepValue`](modules.md#deepvalue)<`T`, `K`\>[]

Flat map an array of objects into an associated array of one of their specified proerties at the given [DeepKeyOf](modules.md#deepkeyof) the object type.

!> Note that since `DeepKeyOf<T>` is a *superset* of `keyof T`, any regular key may be used with this method as well.

### With Traditional Keys

**`Example`**

```ts
const people = [{ first: "joe", last: "smith" }, { first: "jane", last: "doe" }];

flatMapIntoDeepKey(people, "first");
// returns: ["joe", "jane"];
```

### With Deep Keys

**`Example`**

```ts
const gizmos = [
 {
   name: "gizmo1",
   parts: [
     { partName: "spring", cost: 15 },
     { partName: "sprocket", cost: 12 }
   ]
 },
 {
    name: "gizmo2",
    parts: [
      { partName: "steel plate", cost: 20 },
      { partName: "plastic cap", cost: 5 }
    ]
  }
];

flatMapIntoDeepKey(gizmos, "parts.partName");
// returns ["spring", "sprocket", "steel plate", "plastic cap"];
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `key` | `K` |

#### Returns

[`DeepValue`](modules.md#deepvalue)<`T`, `K`\>[]

#### Defined in

[array.ts:595](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L595)

___

### getDeepObjKeys

**getDeepObjKeys**<`T`\>(`o`): [`DeepKeyOf`](modules.md#deepkeyof)<`T`\>[]

Returns the keys of the given object in [DeepKeyOf](modules.md#deepkeyof) format.

**`Example`**

```ts
const joe = {
  firstName: 'Joe',
  lastName: 'Smith',
  address: {
    city: 'Somewhereville',
    state: "NY"
  },
  hobbies: [{
    name: "Golfing"
    equipment: ["Clubs", "Membership", "Golf Balls"]
  }]
}
console.log(getDeepKeyOf(person))
DeepKeyOf<Person>;
// ^? 'firstName' | 'lastName' | 'address' | 'address.city' | 'address.state' | 'hobbies' | 'hobbies.name' | 'hobbies.equipment'
````

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `T` |

#### Returns

[`DeepKeyOf`](modules.md#deepkeyof)<`T`\>[]

#### Defined in

[object.ts:411](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L411)

___

### getDeepValue

**getDeepValue**<`TObj`, `TKey`\>(`obj`, `key`): [`DeepValue`](modules.md#deepvalue)<`TObj`, `TKey`\>

Returns the value at the specified [DeepKeyOf](modules.md#deepkeyof) the specified object.

**`Example`**

```ts
const obj = { a: { b: { c: 10 } } };

getDeepValue(obj, 'a.b.c'); // returns 10
```

**`Example`**

```ts
const obj = { a: [{ b: { c: 10 } }, { b: { c: 20 } }] };

getDeepValue(obj, 'a.b.c'); // returns [10, 20]
```

**`Example`**

```ts
const john: Person = {
    firstName: 'John',
    orders: [
        {
            day: 'Monday',
            items: [
                { name: 'gizmo', price: 5 },
                { name: 'thing', price: 2 },
            ],
        },
        {
            day: 'Wednesday',
            items: [
                { name: 'guitar', price: 20 },
            ],
        },
    ],
};

getDeepValue(john, 'orders.day'); // returns ['Monday', 'Wednesday']
getDeepValue(john, 'orders.items.name'); // returns [['gizmo', 'thing'], ['guitar']]
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObj` | extends `object` |
| `TKey` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `TObj` | The object to retrieve the value from. |
| `key` | `TKey` | The deep key to retrieve the value at. |

#### Returns

[`DeepValue`](modules.md#deepvalue)<`TObj`, `TKey`\>

The value at the specified deep key of the object.

#### Defined in

[object.ts:551](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L551)

___

### initialism

**initialism**(`s`, `separator?`, `capitalize?`): `string`

Construct an initialism (the first letters of each token) in a given string separated by a given separator

**`Example`**

```ts
console.log(initialism("adam blue")); // 'AB'
console.log(initialism("joe_schmoe", "_")); // 'JS'
console.log(initialism("balsam bagels", " ", false)); // 'bb'
```

**`Author`**

Adam Green

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `s` | `string` | `undefined` | The string to initialize |
| `separator` | `string` | `" "` | Delimiter separating tokens in `s`; by default, a space (`' '`) |
| `capitalize` | `boolean` | `true` | Whether to capitalize the letters or leave as is; by default, `true` |

#### Returns

`string`

The initialism of `s`

#### Defined in

[string.ts:85](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/string.ts#L85)

___

### inject

**inject**<`T`\>(`fn`): (`arg`: `T`) => `T`

Wraps a function and returns a new function that calls the wrapped function with its argument
and then returns the same argument.

**`Example`**

This example demonstrates how to use `inject` with `Array.prototype.filter`, `Array.prototype.map`,
and `Array.prototype.forEach` to filter, transform, and log an array of numbers.

```typescript
[1, 2, 3, 4, 5, 6, 7]
 .filter(n => n % 2 == 0) // keep only even numbers
 .map(inject(console.log)) // log each even number and pass it through
 .map(n => n * 2) // double each even number
 .forEach(console.log); // log each doubled even number

// Output:
// 2
// 4
// 6
// 4
// 8
// 12
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the argument for both the wrapped function and the returned function. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`arg`: `T`) => `unknown` | The function to be wrapped. |

#### Returns

`fn`

A new function that calls `fn` with its argument and returns the same argument.

(`arg`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `T` |

##### Returns

`T`

#### Defined in

[function.ts:144](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L144)

___

### intoMaybe

**intoMaybe**<`T`\>(`v?`): [`Maybe`](modules.md#maybe)<`T`\>

Converts a nullish `T?` value into a `Maybe<T>` type

**`Example`**

```ts
const arr = ['apple', 'banana'];
const res: Maybe<string> = intoMaybe(arr.find(v => v = 'apple'));
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v?` | `T` |

#### Returns

[`Maybe`](modules.md#maybe)<`T`\>

#### Defined in

[maybe.ts:23](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L23)

___

### isIndexOf

**isIndexOf**(`arr`, `i`): `boolean`

Checks if some given number, i, is a, index of some array, arr.
Equivilant to `i >= 0 && i < arr.length`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `unknown`[] |
| `i` | `number` |

#### Returns

`boolean`

#### Defined in

[array.ts:168](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L168)

___

### isNone

**isNone**<`T`\>(`m`): m is null

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | [`Maybe`](modules.md#maybe)<`T`\> |

#### Returns

m is null

#### Defined in

[maybe.ts:6](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L6)

___

### isSome

**isSome**<`T`\>(`m`): m is NonNullable<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | [`Maybe`](modules.md#maybe)<`T`\> |

#### Returns

m is NonNullable<T\>

#### Defined in

[maybe.ts:10](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L10)

___

### keyFrom

**keyFrom**(`...strs`): `string`

Construct a key from a list of given bases

**`Example`**

```ts
console.log(keyFrom('one', 'two', 10)); // 'one-two-10'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...strs` | (`string` \| `number`)[] | The bases to construct a key from |

#### Returns

`string`

The bases, interleaved with `-`

#### Defined in

[string.ts:49](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/string.ts#L49)

___

### matchMaybe

**matchMaybe**<`T`, `R`, `E`\>(`v`, `recipe`): `R` \| `E`

Matches a `Maybe<T>` to either "some" (not null) or "none" (null) and runs/returns a code block for
each arm.

**`Example`**

```ts
const name: Maybe<{first: string, last: string}> = ...;
const first: string = matchMaybe(name, {
 some: ({ first }) => first,
 none: () => "Joe" // default
});

```

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |
| `E` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`Maybe`](modules.md#maybe)<`T`\> | The `Maybe` to match with |
| `recipe` | `Object` | An object containing a method for `none`, and a method for `some` |
| `recipe.none` | () => `E` | - |
| `recipe.some` | (`v`: `T`) => `R` | - |

#### Returns

`R` \| `E`

The result of the evaluated code arm.

#### Defined in

[maybe.ts:45](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L45)

___

### maybeParseFloat

**maybeParseFloat**(`str`): [`Maybe`](modules.md#maybe)<`number`\>

Parses a string into a floating-point number, returning null instead of `NaN` if parsing fails.

**`Example`**

```ts
maybeParseFloat('3.14');
// returns 3.14
```

**`Example`**

```ts
maybeParseFloat('abc');
// returns null
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to parse. |

#### Returns

[`Maybe`](modules.md#maybe)<`number`\>

The parsed number, or null if parsing fails.

#### Defined in

[string.ts:153](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/string.ts#L153)

___

### maybeParseInt

**maybeParseInt**(`str`, `radix?`): [`Maybe`](modules.md#maybe)<`number`\>

Parses a string into an integer, returning `null` instead of `NaN` if parsing fails

**`Example`**

```ts
// returns 10
maybeParseInt('10');
```

**`Example`**

```ts
maybeParseInt('abc');
// returns null
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to parse. |
| `radix?` | `number` | The radix used to parse the string. Defaults to 10. |

#### Returns

[`Maybe`](modules.md#maybe)<`number`\>

The parsed integer, or null if parsing fails.

#### Defined in

[string.ts:130](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/string.ts#L130)

___

### objectIsEmpty

**objectIsEmpty**<`T`\>(`obj`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |

#### Returns

`boolean`

#### Defined in

[object.ts:273](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L273)

___

### orFragment

**orFragment**(`cond`, `node`): `React.ReactElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cond` | `boolean` |
| `node` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |

#### Returns

`React.ReactElement`

#### Defined in

[condition.ts:62](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/condition.ts#L62)

___

### permutationsOf

**permutationsOf**(`nums`): `number`[][]

Generates all possible permutations of a sequence of numbers with the specified lengths for each position.

**`Example`**

```ts
console.log(permurationsOf([2, 3, 2]));
// [
//   [0, 0, 0],
//   [0, 0, 1],
//   [0, 1, 0],
//   [0, 1, 1],
//   [0, 2, 0],
//   [0, 2, 1],
//   [1, 0, 0],
//   [1, 0, 1],
//   [1, 1, 0],
//   [1, 1, 1],
//   [1, 2, 0],
//   [1, 2, 1],
// ];
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nums` | `number`[] |

#### Returns

`number`[][]

#### Defined in

[array.ts:464](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L464)

___

### pipe

**pipe**<`A`\>(`a`): `A`

Pipes the value of an expression into a pipeline of functions.

!> Adapted from the `pipe` implementation in [fp-ts](https://github.com/gcanti/fp-ts)

**`Example`**

```ts

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

// without pipe
assert.strictEqual(double(len('aaa')), 6)

// with pipe
assert.strictEqual(pipe('aaa', len, double), 6)
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`A`

#### Defined in

[function.ts:57](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L57)

**pipe**<`A`, `B`\>(`a`, `ab`): `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |

#### Returns

`B`

#### Defined in

[function.ts:58](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L58)

**pipe**<`A`, `B`, `C`\>(`a`, `ab`, `bc`): `C`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |

#### Returns

`C`

#### Defined in

[function.ts:59](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L59)

**pipe**<`A`, `B`, `C`, `D`\>(`a`, `ab`, `bc`, `cd`): `D`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |

#### Returns

`D`

#### Defined in

[function.ts:60](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L60)

**pipe**<`A`, `B`, `C`, `D`, `E`\>(`a`, `ab`, `bc`, `cd`, `de`): `E`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |

#### Returns

`E`

#### Defined in

[function.ts:61](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L61)

**pipe**<`A`, `B`, `C`, `D`, `E`, `F`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |

#### Returns

`F`

#### Defined in

[function.ts:62](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L62)

**pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |

#### Returns

`G`

#### Defined in

[function.ts:63](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L63)

___

### quickDeepClone

**quickDeepClone**<`T`\>(`o`): `T`

Performs a deep clone of an object via the JSON serialize/deserialize method.

!> This method *will not work* for objects that have values of `Date`, `undefined`, or `Infinity`s

**`Example`**

```ts
const gizmo = { name: 'gizmo', extraInfo: { tags: ['tag1', 'tag2'] } } }

// with quickDeepClone
const deepClone = quickDeepClone(gizmo);
shallowClone == gizmo; // false
shallowClone.name == gizmo.name; // false
shallowClone.extraInfo.tags == gizmo.extraInfo.tags; // false

// with shallow clone
const shallowClone = { ...gizmo };
shallowClone == gizmo; // false
shallowClone.name == gizmo.name; // false
shallowClone.extraInfo.tags == gizmo.extraInfo.tags; // true
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `o` | `T` | The object to clone |

#### Returns

`T`

The deep clone

#### Defined in

[object.ts:64](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L64)

___

### repeat

**repeat**(`lower`, `upper`, `fn`): `void`

For each index between the given `lower` and `upper` bounds (exclusive upper), call the specified function with that index.

**`Example`**

```ts
repeat(10, console.log);
// 0
// 1
// 2
// ...
// 9
```

**`Example`**

```ts
const arr = [1, 2, 3];
repeat(10, 13, (i) => {
  arr.push(i);
});

console.log(arr);
// [1, 2, 3, 10, 12]
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `lower` | `number` |
| `upper` | `number` |
| `fn` | (`i`: `number`) => `void` |

#### Returns

`void`

#### Defined in

[array.ts:437](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/array.ts#L437)

___

### selectObjectKeys

**selectObjectKeys**<`T`, `K`\>(`from`, `keys`): `Pick`<`T`, `K`[`number`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends keyof `T`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `T` |
| `keys` | `K` |

#### Returns

`Pick`<`T`, `K`[`number`]\>

#### Defined in

[object.ts:266](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L266)

___

### slicePropertyAtDeepKey

**slicePropertyAtDeepKey**<`TObj`, `K`\>(`obj`, `key`, `value`): `TObj`

Construct a new object which is a clone of the given `obj` with the specified value replacing the base value at the given deep key (see [DeepKeyOf](modules.md#deepkeyof)), without modifying the source object.

This method can also work with multiple objects spread across nested subobjects/arrays.

!> This method internally uses [quickDeepClone](modules.md#quickdeepclone), and is thus subject to all the object limitations therein.

### Examples

#### Basic Values

**`Example`**

```ts
slicePropertyAtDeepKey({ name: 'John Doe' }, 'name', 'Jane Doe');
// returns: { name: 'Jane Doe' }
slicePropertyAtDeepKey({ person: { name: 'John Doe' } }, 'person.name', 'Jane Doe');
// returns: { person: { name: 'Jane Doe' } }
```

#### Array Values

**`Example`**

```ts
slicePropertyAtDeepKey({ arr: ["one", "two", "three"] }, "arr", ["four", "five"]);
// returns: { arr: ["four", "five"] }
```

#### Undefined Direct Parents
It may be possible to specify a valid deep key which does not resolve to a value that has a parent. For example

**`Example`**

```ts
type Thing = { a: { b?: { c: string } } };
const thing: Thing = { a: { } };
slicePropertyAtDeepKey(a, 'a.b.c', 'foo');

// `c` doesn't have a parent to set the key/value `"c" => "foo"` since `b` is optional.
// in this situation, the method will just return the base object.
// returns { a: { } }
```

#### Distributed Replacement (1-Dimentional)
It is possible that a single key can target multiple different values within an object. This often happens if the key specifies a subobject within an array.
With this method, we can specify a key for *each* of the expected targets of keys by specifying an array of values to use. The values will be used in the order
of which the subobjects are encountered (top to bottom, outer to inner).

**`Example`**

```ts
const data = {
 people: [
   { name: "Joe", age: 12 },
   { name: "Jane", age: 15 }
 ]
};

slicePropertyAtDeepKey(data, 'people.name', ["foo", "bar"]);
// returns: {
//   people: [
//     { name: "foo", age: 12 },
//     { name: "bar", age: 15 }
//   ]
// }
```

#### Advanced Distributed Replacement (N-Dimentional)
This concept of distributed replacement can be scaled to any number of nested dimentions. For each new subobject array encountered,
the method will move one more level deep in the array. A 2D distributed replacement could look like this

**`Example`**

```ts
const customer = {
  firstname: 'john',
  lastname: 'doe',
  orders: [
    {
      day: 'monday',
      items: [
        {
          name: 'gizmo',
          price: 12
        },
        {
          name: 'gadget',
          price: 15
        }
      ]
    },
    {
      day: 'wednesday',
      items: [
        {
          name: 'tickets',
          price: 20
        },
      ]
    }
  ]
}

slicePropertAtDeepKey(customer, 'orders.items.name', [["foo", "bar", "foobar"]]);
// returns: {
//   firstname: 'john',
//   lastname: 'doe',
//   orders: [
//     {
//       day: 'monday',
//       items: [
//         {
//           name: 'foo',
//           price: 12
//         },
//         {
//           name: 'bar',
//           price: 15
//         }
//       ]
//     },
//     {
//       day: 'wednesday',
//       items: [
//         {
//           name: 'foobar',
//           price: 20
//         },
//       ]
//     }
//   ]
// }
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObj` | extends `object` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `TObj` | The base object to use |
| `key` | `K` | The specified [DeepKeyOf](modules.md#deepkeyof) of the base object |
| `value` | [`DeepValue`](modules.md#deepvalue)<`TObj`, `K`\> | The value to use at the specified `key` |

#### Returns

`TObj`

The new object

#### Defined in

[object.ts:250](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/object.ts#L250)

___

### sliceStrTo

**sliceStrTo**(`str`, `to`, `nth?`): `string`

Get a substring of the given string `str` from the origin of the string to the first or nth occurance of the given `to` string

**`Example`**

```ts
const str = 'apple.banana.orange.kiwi';
sliceStrTo(str, '.'); // 'apple.'
sliceStrTo(str, '.', 2); // 'apple.banana.orange.'
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `to` | `string` | `undefined` |
| `nth` | `number` | `0` |

#### Returns

`string`

#### Defined in

[string.ts:102](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/string.ts#L102)

___

### strAdd

**strAdd**(`strs`, `options?`): [`Maybe`](modules.md#maybe)<`string`\>

Add two numbers as strings together, yeilding a string which is the sum of those numbers.

**`Example`**

```ts
console.log(strAdd('5', '8')); // '13'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `strs` | `string`[] |
| `options?` | `StrAddOptions` |

#### Returns

[`Maybe`](modules.md#maybe)<`string`\>

#### Defined in

[string.ts:20](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/string.ts#L20)

___

### tryOr

**tryOr**<`T`, `E`\>(`fn`, `or`): `T` \| `E`

Calls the provided function and returns its result. If an exception is thrown during the function call,
returns the provided fallback value instead.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the value returned by the function. |
| `E` | The type of the fallback value. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `T` | The function to call. |
| `or` | `E` | The value to return if an exception is thrown during the function call. |

#### Returns

`T` \| `E`

The result of the function call or the fallback value.

#### Defined in

[function.ts:108](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/function.ts#L108)

___

### unwrapMaybe

**unwrapMaybe**<`T`\>(`v`): `T`

Converts a value from `Maybe<T>` to `T`, throwing a generic "unable to unwrap" error if the given Maybe is None

?> To specify the error this method uses, refer to [expectMaybe](modules.md#expectmaybe)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`Maybe`](modules.md#maybe)<`T`\> |

#### Returns

`T`

#### Defined in

[maybe.ts:83](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L83)

___

### unwrapOrUndef

**unwrapOrUndef**<`T`\>(`v`): `undefined` \| `NonNullable`<`T`\>

Converts a value from `Maybe<T>` to `T | undefined`.

?> Typically, this is useful for passing a `Maybe<T>` to an optional function parameter.

**`Example`**

```ts
function doSomething(arg?: string) { ... }
const maybeStr: Maybe<string> = ...;

doSomething(unwrapOrUndef(maybeStr));
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`Maybe`](modules.md#maybe)<`T`\> |

#### Returns

`undefined` \| `NonNullable`<`T`\>

#### Defined in

[maybe.ts:100](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L100)

___

### useDebounce

**useDebounce**<`T`\>(`initialState`, `delay`): [`T`, (`v`: `T`) => `void`]

**`Author`**

Adam Green

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialState` | `T` \| () => `T` |
| `delay` | `number` |

#### Returns

[`T`, (`v`: `T`) => `void`]

#### Defined in

[hooks/useDebounce.ts:6](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useDebounce.ts#L6)

___

### useWaitFor

**useWaitFor**<`T`\>(`fn`, `...preconditions`): `void`

Fires the given `fn` a single time once all the given preconditions are `true`.

**`Example`**

```tsx
const Page = () => {
 const dataset1Loaded = useState(false);
 const dataset2Loaded = useState(false);

 // load the data ...

 // Trigger the print dialog once the component is ready
 useWaitFor(() => window.print(), dataset1Loaded, dataset2Loaded);

 return dataset1Loaded && dataset2Loaded ? <Content /> : <Loader />;
}

@category Hook
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends () => `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `T` |
| `...preconditions` | `boolean`[] |

#### Returns

`void`

#### Defined in

[hooks/useWaitFor.ts:23](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/hooks/useWaitFor.ts#L23)

___

### withSome

**withSome**<`T`, `E`\>(`v`, `fn`): [`Maybe`](modules.md#maybe)<`E`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`Maybe`](modules.md#maybe)<`T`\> |
| `fn` | (`v`: `NonNullable`<`T`\>) => `E` |

#### Returns

[`Maybe`](modules.md#maybe)<`E`\>

#### Defined in

[maybe.ts:104](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L104)
# Class: FormalMaybe<T\>

A formal wrapper class for interacting with possibly `null` values.

?> Maybe<T> is a type-alias for `T | null`, whereas FormalMaybe<T> is a runtime-evaluated object proper, containing a Maybe<T> value.

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

**new FormalMaybe**<`T`\>(`v`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`Maybe`](../modules.md#maybe)<`T`\> |

#### Defined in

[maybe.ts:117](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L117)

## Properties

### v

 `Private` **v**: [`Maybe`](../modules.md#maybe)<`T`\>

#### Defined in

[maybe.ts:117](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L117)

## Methods

### expect

**expect**(`msg`): `T`

Returns the inner value as a non-null T. If the inner value is `null`, throw the given error instead.

**`Example`**

```ts
function fetchName(): FormalMaybe<string> { ... }

console.log(`the name is ${fetchName().expect('failed to fetch name!')}`);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The error message to throw if the inner value is `null`. |

#### Returns

`T`

The non-null inner value

#### Defined in

[maybe.ts:276](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L276)

___

### inner

**inner**(): [`Maybe`](../modules.md#maybe)<`T`\>

Eject the wrapped [Maybe](../modules.md#maybe) value from the [FormalMaybe](FormalMaybe.md).

?> This is helpful for interop compatability with raw [Maybe](../modules.md#maybe)-based functions.

**`Example`**

```ts
function doSomething(v: Maybe<string>) { ... }
const val: FormalMaybe<string> = (...);

doSomething(val.inner());
```

#### Returns

[`Maybe`](../modules.md#maybe)<`T`\>

#### Defined in

[maybe.ts:199](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L199)

___

### isNone

**isNone**(): `boolean`

Returns `true` if the wrapped [Maybe](../modules.md#maybe) value is `null`.
Note: that for control guards that interact with checked value, it is recommended to use [FormalMaybe](FormalMaybe.md)::[when](FormalMaybe.md#when) instead.

**`Example`**

```ts
const v: Maybe<string> = (...);

if (v.isNone()) {
 console.log("the result is null!");
}
```

#### Returns

`boolean`

`true` if the wrapped [Maybe](../modules.md#maybe) value is `null`.

#### Defined in

[maybe.ts:237](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L237)

___

### isSome

**isSome**(): `boolean`

Returns `true` if the wrapped [Maybe](../modules.md#maybe) value is not `null`.
Note: that for control guards that interact with checked value, it is recommended to use [FormalMaybe](FormalMaybe.md)::[when](FormalMaybe.md#when) instead.

**`Example`**

```ts
const v: Maybe<string> = (...);

if (v.isSome()) {
 console.log("the result is not null!");
}
```

#### Returns

`boolean`

`true` if the wrapped [Maybe](../modules.md#maybe) value is not `null`.

#### Defined in

[maybe.ts:218](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L218)

___

### isSomeAnd

**isSomeAnd**<`E`\>(`fn`): [`FormalMaybe`](FormalMaybe.md)<`E`\>

If the [FormalMaybe](FormalMaybe.md) is `null`, return `None`. Otherwise, return the result given function, invoked with the non-null inner value.

**`Example`**

```ts
const v1 = FormalMaybe.Some('foo');
const v2 = FormalMaybe.None<string>();

const toLen = (s: string) => s.length;

console.log(v1.isSomeAnd(toLen)); // 3
console.log(v2.isSomeAnd(toLen)); // null
```

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`v`: `T`) => [`FormalMaybe`](FormalMaybe.md)<`E`\> |

#### Returns

[`FormalMaybe`](FormalMaybe.md)<`E`\>

#### Defined in

[maybe.ts:258](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L258)

___

### unwrap

**unwrap**(): `T`

Returns the inner non-null value, throwing a generic error if the inner value is `null`.

**`Example`**

```ts
const v = FormalMaybe.Some('foo');
const v2 = FormalMaybe.None();

console.log(v.unwrap()); // 'foo'
console.log(v2.unwrap()); // ERROR!
```

#### Returns

`T`

The inner, non-null value.

#### Defined in

[maybe.ts:295](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L295)

___

### unwrapOr

**unwrapOr**(`v`): `T`

Returns the inner non-null value, or the provided value if the inner value is `null`.

**`Example`**

```ts
console.log(FormalMaybe.Some("foo").unwrapOr("bar")); // "foo"
console.log(FormalMaybe.None().unwrapOr("bar")); // "bar"
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `T` | The default value |

#### Returns

`T`

#### Defined in

[maybe.ts:310](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L310)

___

### unwrapOrElse

**unwrapOrElse**(`fn`): `T`

Returns the inner non-null value, or computes it from a given function.

**`Example`**

```ts
const k = 10;
console.log(FormalResult.Some(4).unwrapOrElse(() => 2 * k)); // 4
console.log(FormalResult.None().unwrapOrelse(() => 2 * k)); // 20
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `T` | The function to compute the default value from. |

#### Returns

`T`

#### Defined in

[maybe.ts:326](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L326)

___

### unwrapOrUndef

**unwrapOrUndef**(): `undefined` \| `T`

Returns the inner non-null value, or returns `undefined`.

?> Typically, this is useful for passing the inner value to an optional function parameter.

**`Example`**

```ts
function doSomething(arg?: string) { ... }
const maybeStr: FormalMaybe<string> = ...;

doSomething(maybeStr.unwrapOrUndef());
```

#### Returns

`undefined` \| `T`

#### Defined in

[maybe.ts:343](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L343)

___

### when

**when**<`E`\>(`cond`, `fn`): [`FormalMaybe`](FormalMaybe.md)<`T`\>

Conditionally execute a block of code based on the `null` state of the inner value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"some"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cond` | `E` | "some" to run the code block when the inner value is not null |
| `fn` | (`v`: `T`) => `unknown` | The function to run, called with the non-null inner value |

#### Returns

[`FormalMaybe`](FormalMaybe.md)<`T`\>

`this`

#### Defined in

[maybe.ts:354](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L354)

**when**<`E`\>(`cond`, `fn`): [`FormalMaybe`](FormalMaybe.md)<`T`\>

Conditionally execute a block of code based on the `null` state of the inner value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends ``"none"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cond` | `E` | "none" to run the code block when the inner value is null |
| `fn` | () => `unknown` | The code block to run |

#### Returns

[`FormalMaybe`](FormalMaybe.md)<`T`\>

`this`

#### Defined in

[maybe.ts:363](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L363)

___

### None

`Static` **None**<`T`\>(): [`FormalMaybe`](FormalMaybe.md)<`T`\>

Constructs an empty [FormalMaybe](FormalMaybe.md).

**`Example`**

```ts
let name: Maybe<string> = FormalMaybe.None();

function loadName() {
 name = FormalMaybe.Some("tyler");
}

setTimeout(loadName, 1000);

while (true) {
 name.when('some', (name) => console.log(name));
}

```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`FormalMaybe`](FormalMaybe.md)<`T`\>

The empty [FormalMaybe](FormalMaybe.md)

#### Defined in

[maybe.ts:182](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L182)

___

### Some

`Static` **Some**<`T`\>(`v`): [`FormalMaybe`](FormalMaybe.md)<`T`\>

Constructs a [FormalMaybe](FormalMaybe.md) from a non-null input.

**`Example`**

```ts
let name: Maybe<string> = FormalMaybe.None();

function loadName() {
 name = FormalMaybe.Some("tyler");
}

setTimeout(loadName, 1000);

while (true) {
 name.when('some', (name) => console.log(name));
}

```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `T` | The non-null value wrap in a [FormalMaybe](FormalMaybe.md) |

#### Returns

[`FormalMaybe`](FormalMaybe.md)<`T`\>

The newly constructed [FormalMaybe](FormalMaybe.md)

#### Defined in

[maybe.ts:157](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L157)

___

### from

`Static` **from**<`T`\>(`v?`): [`FormalMaybe`](FormalMaybe.md)<`T`\>

Constructs a [FormalMaybe](FormalMaybe.md) from a nullish input.

**`Example`**

```ts
const arr = ['apple', 'banana', 'orange', ...]
const fruit = FormalMaybe.from(arr.find(v => v == 'pear'));
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v?` | [`Maybe`](../modules.md#maybe)<`T`\> | The nullish object to wrap in a [FormalMaybe](FormalMaybe.md) |

#### Returns

[`FormalMaybe`](FormalMaybe.md)<`T`\>

The newly constructed [FormalMaybe](FormalMaybe.md)

#### Defined in

[maybe.ts:131](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/maybe.ts#L131)
# Class: Result<T, E\>

An object which can either be in an `Ok` state, or an `Err` state, with an associated value, `T`

## Type parameters

| Name |
| :------ |
| `T` |
| `E` |

## Constructors

### constructor

`Private` **new Result**<`T`, `E`\>(`tuple`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tuple` | [``true``, `T`] \| [``false``, `E`] |

#### Defined in

[result.ts:7](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L7)

## Properties

### tuple

 `Private` **tuple**: [``true``, `T`] \| [``false``, `E`]

#### Defined in

[result.ts:7](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L7)

## Methods

### and

**and**(`res`): [`Result`](Result.md)<`T`, `E`\>

Returns `res` if the [Result](Result.md) is `Ok`, otherwise returns the inner `Err` value of the [Result](Result.md)

**`Example`**

```ts
const a: Result.Ok(10);
const b: Result.Err('foo');

console.log(a.and(v => Result.Ok(v * 2))); // Ok(20)
console.log(v.and(v => Result.Ok(v * 2))); // Err('foo')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | [`Result`](Result.md)<`T`, `E`\> |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

[result.ts:131](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L131)

___

### andThen

**andThen**<`U`\>(`fn`): [`Result`](Result.md)<`U`, `E`\>

Calls and returns the value of `fn` if `this` is `Ok`, otherwise returns `this`;

**`Example`**

```ts
function div(n1: number, n2: number) {
 if (n2 == 0) return Result.Err('divide by zero');
 else return Result.Ok(n1 / n2);
}

console.log(div(20, 2).andThen(n => div(n, 2))); // Ok(5)
console.log(div(20, 0).andThen(n => div(n, 2))); // Err('divide by zero');
```

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`v`: `T`) => [`Result`](Result.md)<`U`, `E`\> |

#### Returns

[`Result`](Result.md)<`U`, `E`\>

#### Defined in

[result.ts:169](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L169)

___

### contains

**contains**(`v`): `boolean`

Returns `true` if the [Result](Result.md) `Ok` state equals the given value.

**`Example`**

```ts
console.log(Result.Ok('foo').contains('foo')); // true
console.log(Result.Ok('foobar').contains('foo')); // false
console.log(Result.Err('foo').contains('foo')) // false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

#### Returns

`boolean`

#### Defined in

[result.ts:253](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L253)

___

### containsErr

**containsErr**(`v`): `boolean`

Returns `true` if the [Result](Result.md) `Err` value equals the given value.

**`Example`**

```ts
console.log(Result.Ok('foo').contains('foo')); // true
console.log(Result.Ok('foobar').contains('foo')); // false
console.log(Result.Err('foo').contains('foo')) // false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `E` |

#### Returns

`boolean`

#### Defined in

[result.ts:268](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L268)

___

### equals

**equals**(`res`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | [`Result`](Result.md)<`T`, `E`\> |

#### Returns

`boolean`

#### Defined in

[result.ts:273](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L273)

___

### err

**err**(): [`Maybe`](../modules.md#maybe)<`E`\>

Returns the inner value of the [Result](Result.md) in an `Err` state, otherwise `null`

**`Example`**

```ts
const res: Result<string, string> = ...;
if (res.isErr()) console.log(`result failed with: ${res.err()}`);
```

#### Returns

[`Maybe`](../modules.md#maybe)<`E`\>

#### Defined in

[result.ts:100](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L100)

___

### inner

`Private` **inner**(): `T` \| `E`

#### Returns

`T` \| `E`

#### Defined in

[result.ts:32](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L32)

___

### isErr

**isErr**(): `boolean`

Returns `true` is the [Result](Result.md) in in an `Err` state.

**`Example`**

```ts
const res: Result<string, string> = ...;
if (res.isErr()) console.log('an error occured!');
```

#### Returns

`boolean`

#### Defined in

[result.ts:73](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L73)

___

### isOk

**isOk**(): `boolean`

Returns `true` if the [Result](Result.md) is in an `Ok` state.

**`Example`**

```ts
const res: Result<string, string> = ...;
if (res.isOk()) console.log('passed!');
```

#### Returns

`boolean`

#### Defined in

[result.ts:60](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L60)

___

### map

**map**<`J`, `K`\>(`mapOk`, `mapErr`): [`Result`](Result.md)<`J`, `K`\>

Transforms a `Result<T, E>` into a `Result<J, K>` by specifying a mapper function `(v: T) => J` and
`(v: E) => K`.

**`Example`**

```ts
const res: Result<number, { msg: string }> = ...;
const mapped: Result<string, string> = res.map((v: number) => v.toString(), JSON.stringify);
```

#### Type parameters

| Name |
| :------ |
| `J` |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapOk` | (`v`: `T`) => `J` |
| `mapErr` | (`v`: `E`) => `K` |

#### Returns

[`Result`](Result.md)<`J`, `K`\>

#### Defined in

[result.ts:46](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L46)

___

### ok

**ok**(): [`Maybe`](../modules.md#maybe)<`T`\>

Returns the inner value if the [Result](Result.md) in in an `Ok` state, otherwise `null`

**`Example`**

```ts
const res: Result<string, string> = ...;
if (res.isOk()) console.log(`result: ${res.ok()}`);
```

#### Returns

[`Maybe`](../modules.md#maybe)<`T`\>

#### Defined in

[result.ts:86](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L86)

___

### or

**or**(`res`): [`Result`](Result.md)<`T`, `E`\>

If `this` is `Ok`, return `this`. Otherwise, return the other given [Result](Result.md), `res`;

**`Example`**

```ts
function div(n1: number, n2: number) {
 if (n2 == 0) return Result.Err('divide by zero');
 else return Result.Ok(n1 / n2);
}

console.log(div(10, 2).or(Result.Ok(0))) // Ok(5)
console.log(div(10, 0).or(Result.Ok(0))) // Ok(0)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | [`Result`](Result.md)<`T`, `E`\> |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

[result.ts:150](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L150)

___

### orElse

**orElse**<`F`\>(`fn`): [`Result`](Result.md)<`T`, `F`\>

Calls and returns the value of `fn` if the [Result](Result.md) is an `Err`, otherwise returns the `Ok` value of `this`.

**`Example`**

```ts
const square = (v: number) => Result.Ok(v * v);
const err = (v: number) => Result.Err(v);

console.log(Result.Ok(2).orElse(square)); // Ok(2)
console.log(Result.Err(2).orElse(square)); // Ok(4)
console.log(Result.Ok(3).orElse(square).orElse(err)) // Ok(9)
```

#### Type parameters

| Name |
| :------ |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`v`: `E`) => [`Result`](Result.md)<`T`, `F`\> |

#### Returns

[`Result`](Result.md)<`T`, `F`\>

#### Defined in

[result.ts:187](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L187)

___

### toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[result.ts:277](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L277)

___

### transpose

**transpose**(): [`Maybe`](../modules.md#maybe)<[`Result`](Result.md)<`T`, `E`\>\>

Maps a `Result.Ok(null)` to `null`, otherwise return self.

**`Example`**

```ts
const res: Result<Maybe<string>, string> = ...;
const m: Maybe<Result<string, string>> = res.transpose();
```

#### Returns

[`Maybe`](../modules.md#maybe)<[`Result`](Result.md)<`T`, `E`\>\>

#### Defined in

[result.ts:114](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L114)

___

### unwrap

**unwrap**(): `T`

Returns the contained `Ok` value of the [Result](Result.md). If the [Result](Result.md) in an `Err`,
throws a generic error.

**`Example`**

```ts
console.log(Result.Ok('foo').unwrap()); // 'foo'
console.log(Result.Err('bar').unwrap()); // ERROR!
```

#### Returns

`T`

#### Defined in

[result.ts:202](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L202)

___

### unwrapOr

**unwrapOr**(`v`): `T`

Returns the contained `Ok` value of the [Result](Result.md). If the [Result](Result.md) is an `Err`,
then returns the given value `v`.

**`Example`**

```ts
const a = Result.Err('foo');
const b = Result.Ok('fizz');

console.log(a.unwrapOr('bar')); // 'bar'
console.log(b.unwrapOr('bar')); // 'fizz'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

#### Returns

`T`

#### Defined in

[result.ts:220](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L220)

___

### unwrapOrElse

**unwrapOrElse**(`fn`): `T`

Returns the contained `Ok` value of the [Result](Result.md). If the [Result](Result.md) is an `Err`,
then returns the result of the given `fn`, called with the `Err` value.

**`Example`**

```ts
const a = Result.Ok(15);
const b = Result.Err(15);

console.log(a.unwrapOrElse(err => 'some value')); // 15
console.log(b.unwrapOrElse(err => err.toString())); // '15'
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`err`: `E`) => `T` |

#### Returns

`T`

#### Defined in

[result.ts:238](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L238)

___

### Err

`Static` **Err**<`T`, `E`\>(`v`): [`Result`](Result.md)<`T`, `E`\>

Constructs a [Result](Result.md) object in the `Err` state around the given value.

**`Example`**

```ts
console.log(Result.Err('yikes! something went wrong').isOk()); // false

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `E` |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

[result.ts:28](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L28)

___

### Ok

`Static` **Ok**<`T`, `E`\>(`v`): [`Result`](Result.md)<`T`, `E`\>

Contructs a [Result](Result.md) object in the `Ok` state around the given value.

**`Example`**

```ts
console.log(Result.Ok('foo').isOk()); // true
```

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

[result.ts:17](https://github.com/bryx-inc/ts-utils/blob/99d5f46/src/result.ts#L17)
