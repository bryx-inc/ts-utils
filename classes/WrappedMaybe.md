# Class: WrappedMaybe<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

**new WrappedMaybe**<`T`\>(`inner`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `inner` | `T` |

#### Defined in

[maybe.ts:403](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L403)

## Properties

### inner

 `Private` **inner**: `T`

#### Defined in

[maybe.ts:403](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L403)

## Methods

### also

**also**(`fn`): [`WrappedMaybe`](WrappedMaybe.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`it`: `T`) => `unknown` |

#### Returns

[`WrappedMaybe`](WrappedMaybe.md)<`T`\>

#### Defined in

[maybe.ts:437](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L437)

___

### if

**if**(`predicate`): ``null`` \| [`WrappedMaybe`](WrappedMaybe.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`it`: `T`) => `boolean` |

#### Returns

``null`` \| [`WrappedMaybe`](WrappedMaybe.md)<`T`\>

#### Defined in

[maybe.ts:419](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L419)

___

### let

**let**<`E`\>(`mapping`): [`WrappedMaybe`](WrappedMaybe.md)<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | (`it`: `T`) => `E` |

#### Returns

[`WrappedMaybe`](WrappedMaybe.md)<`E`\>

#### Defined in

[maybe.ts:405](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L405)

___

### take

**take**(): `T`

#### Returns

`T`

#### Defined in

[maybe.ts:442](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L442)

**take**<`E`\>(`mapping?`): `E`

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping?` | (`it`: `T`) => `E` |

#### Returns

`E`

#### Defined in

[maybe.ts:443](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L443)

___

### takeIf

**takeIf**(`predicate`): ``null`` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`it`: `T`) => `boolean` |

#### Returns

``null`` \| `T`

#### Defined in

[maybe.ts:409](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L409)

___

### takeUnless

**takeUnless**(`predicate`): ``null`` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`it`: `T`) => `boolean` |

#### Returns

``null`` \| `T`

#### Defined in

[maybe.ts:414](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L414)

___

### try

**try**<`E`\>(`mapping`): ``null`` \| [`WrappedMaybe`](WrappedMaybe.md)<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | (`it`: `T`) => `E` |

#### Returns

``null`` \| [`WrappedMaybe`](WrappedMaybe.md)<`E`\>

#### Defined in

[maybe.ts:429](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L429)

___

### tryTake

**tryTake**<`E`\>(`mapping`): ``null`` \| `E`

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | (`it`: `T`) => `E` |

#### Returns

``null`` \| `E`

#### Defined in

[maybe.ts:433](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L433)

___

### unless

**unless**(`predicate`): ``null`` \| [`WrappedMaybe`](WrappedMaybe.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`it`: `T`) => `boolean` |

#### Returns

``null`` \| [`WrappedMaybe`](WrappedMaybe.md)<`T`\>

#### Defined in

[maybe.ts:424](https://github.com/bryx-inc/ts-utils/blob/f75df9e/src/maybe.ts#L424)
