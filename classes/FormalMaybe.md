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

[maybe.ts:117](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L117)

## Properties

### v

 `Private` **v**: [`Maybe`](../modules.md#maybe)<`T`\>

#### Defined in

[maybe.ts:117](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L117)

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

[maybe.ts:276](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L276)

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

[maybe.ts:199](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L199)

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

[maybe.ts:237](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L237)

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

[maybe.ts:218](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L218)

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

[maybe.ts:258](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L258)

___

### take

**take**(): [`Maybe`](../modules.md#maybe)<`T`\>

Removes and returns the wrapped value from the `FormalMaybe` instance.
After calling this method, the `FormalMaybe` instance will be empty (`null`).

**`Example`**

```
const maybeValue = FormalMaybe.Some(42);
const value = maybeValue.take(); // value = 42, maybeValue is now empty

console.log(value); // 42
console.log(maybeValue.isNone()); // true
```

#### Returns

[`Maybe`](../modules.md#maybe)<`T`\>

The wrapped value if it exists, otherwise `null`.

#### Defined in

[maybe.ts:362](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L362)

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

[maybe.ts:295](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L295)

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

[maybe.ts:310](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L310)

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

[maybe.ts:326](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L326)

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

[maybe.ts:343](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L343)

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

[maybe.ts:376](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L376)

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

[maybe.ts:385](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L385)

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

[maybe.ts:182](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L182)

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

[maybe.ts:157](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L157)

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

[maybe.ts:131](https://github.com/bryx-inc/ts-utils/blob/b4061aa/src/maybe.ts#L131)
