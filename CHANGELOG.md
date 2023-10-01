# @bryx-inc/ts-utils

## 1.64.0

### Minor Changes

-   1559ab5: Deprecate `DeepUnwrap` in favor of the more semantically correct `DeepUnwind`

## 1.63.0

### Minor Changes

-   12f6249: Auto-wrap string arguments passed to `throwError` with `new Error(...)`
-   12f6249: Adds `getObjByDeepKey` method

## 1.62.0

### Minor Changes

-   857bbd0: Auto-wrap string arguments passed to `throwError` with `new Error(...)`

## 1.61.0

### Minor Changes

-   4ea8c16: Adds `getObjEntries`

## 1.60.0

### Minor Changes

-   9e3721b: Adds support for the `iter` constructor to accept a `ReadonlyArray<T>` argument
-   9e3721b: Introduces `ChainableIterator` class and `iter(...)` constructor
-   9e3721b: Adds `ChainableIterator::dedup` method for dropping duplicate elements from iterators
-   9e3721b: Adds `Unique<U>` type for narrowing union types with duplicates

## 1.59.0

### Minor Changes

-   2f3bdd5: Introduces `ChainableIterator` class and `iter(...)` constructor

## 1.58.0

### Minor Changes

-   588ccce: Adds `Explode<T>` type
-   588ccce: Adds `rangeIter` generator

## 1.57.0

### Minor Changes

-   aaf6032: Adds `Explode<T>` type

## 1.56.0

### Minor Changes

-   5746819: Add objArrayEquals

## 1.55.0

### Minor Changes

-   4fa4145: Adds `MappedTuple` type
-   eed7a0d: Adds `Result.from`

## 1.54.1

### Patch Changes

-   4359c31: Fix `findAndSpliceArr` documentation

## 1.54.0

### Minor Changes

-   b4061aa: Introduce `findAndSpliceArr` method

## 1.53.0

### Minor Changes

-   e52ace6: Added `take()` method to instances of `FormalMaybe`

## 1.52.0

### Minor Changes

-   7422c43: Introduce `calcMs` method

## 1.51.0

### Minor Changes

-   b17c17f: mirgrate unsafe utilities to an `unsafe` block and deprecate non-unsafe-scoped `castUnsafe` and `getPropertyUnsafe`

## 1.50.0

### Minor Changes

-   c34ae2b: Introduce `MappedTupleWithAffixes` type

## 1.49.0

### Minor Changes

-   6daee72: Add `DeepRemoveReadonly` type

## 1.48.1

### Patch Changes

-   50e2a3a: add readonly support for `DeepUnwrap`

## 1.48.0

### Minor Changes

-   ceaeb8d: Add `mergeArrs` Array Function
-   90384af: Add `deepFlattenArr` Method

### Patch Changes

-   bb99ae9: Clean Up flatMapIntoDeepKey

## 1.47.0

### Minor Changes

-   9d89617: Add DedupArr and FlatMapIntoDeepKey array methods

## 1.46.0

### Minor Changes

-   10f7c44: Add ConcatTuple and ConcatReadonlyTuple utility types

## 1.45.3

### Patch Changes

-   00a3929: build library before publishing to actually include it in package

## 1.45.2

### Patch Changes

-   37cefbb: Actually Add Proper Release Script

## 1.45.1

### Patch Changes

-   4437032: Add Publish Script

## 1.45.0

### Minor Changes

-   e18d6e9: Migrate to GitHub
