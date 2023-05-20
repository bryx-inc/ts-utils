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

[result.ts:7](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L7)

## Properties

### tuple

 `Private` **tuple**: [``true``, `T`] \| [``false``, `E`]

#### Defined in

[result.ts:7](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L7)

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

[result.ts:131](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L131)

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

[result.ts:169](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L169)

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

[result.ts:253](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L253)

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

[result.ts:268](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L268)

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

[result.ts:273](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L273)

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

[result.ts:100](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L100)

___

### inner

`Private` **inner**(): `T` \| `E`

#### Returns

`T` \| `E`

#### Defined in

[result.ts:32](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L32)

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

[result.ts:73](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L73)

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

[result.ts:60](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L60)

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

[result.ts:46](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L46)

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

[result.ts:86](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L86)

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

[result.ts:150](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L150)

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

[result.ts:187](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L187)

___

### toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[result.ts:277](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L277)

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

[result.ts:114](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L114)

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

[result.ts:202](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L202)

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

[result.ts:220](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L220)

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

[result.ts:238](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L238)

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

[result.ts:28](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L28)

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

[result.ts:17](https://github.com/bryx-inc/ts-utils/blob/eac80e4/src/result.ts#L17)
