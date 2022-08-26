## `@svizzle/utils` v0.17.0 (next)

- added `sanitize`
- added `sortObjectKeysAsc`, `sortObjectKeysDesc`
- added `jsonBufferToAny`
- use `_.head` instead of `_.getAt(0)`
- removed `:` from some files names
- arg rename from `accumcb` to `reduceCb`
- content from `accumcb[any-number]-[array-number].js` -> `[any-number]-[array-number].js`
- `constructor-[accumcb[any-any]-[array-any]].js` -> `constructor-[reduceCb[any-any]-[array-any]].js`
- `accumcb[any-any]-[array-any].js` -> `reduceCb[any-any]-[array-any].js`

## `@svizzle/utils` v0.16.0

- added `arraySumWith`, `pluckPath`, `updateKeys`
- moved `applyFnMap` to `src/modules/object-[any-object]`
- support object spread in builds

## `@svizzle/utils` v0.15.0

- added `isPromise`
- updated some dependencies

## `@svizzle/utils` v0.14.0

- updated some dev dependencies

### Any -> Undefined

- added `noop`

### Array -> (Any-Any)

- added `truthynessTo`


## `@svizzle/utils` v0.13.0

- updated some dev dependencies
- removed `joinWith`, now provided by `lamb`

### (Any -> Array) -> (Array -> Object)

- add `makeArrayToObjectWith`

### Array -> String

- add `joinWithBlank`


## `@svizzle/utils` v0.12.0

### (Any -> Any) -> (Object -> Array)

- add `valuesWith`

### (Any -> Boolean) -> (Object -> Any)

- add `findValueWith`

### Any -> Boolean

- add `isFunction`

### Array -> Object

- add `makeIndexByKey`

### String -> String

- add `makePostfixed`
- rename `prepend` to `makePrefixed`


## `@svizzle/utils` v0.11.1

- fix a dep cycle introduced earlier


## `@svizzle/utils` v0.11.0

- add a npm script to check that we're exporting all modules from `./src`

### (Any -> Boolean) -> (Array -> Array)

- add `raiseWith` (was originally provided in `v0.10.0` but I forgot to export `src/[any-boolean]-[array-array]` in that release)

### (Any -> Number) -> (Array -> Number)

- add `makeAverageWith`

### Array -> Number

- add `arrayAverage`, `keyValueArrayAverage`


## `@svizzle/utils` v0.10.0

### Any -> Boolean

- add `negate`

## `@svizzle/utils` v0.9.0

### (String -> String) -> (Object -> Object)

- add `renameKeysWith` (was added in the `0.8.0` release but without exporting its module)

### Any -> (Object -> Boolean)

- add `hasValue` (was added in the `0.8.0` release but without exporting its module)

### Array -> Array

- add `setIndexAsKey`

### Array -> Object

- add `makeKeyedFalse`
- add `makeKeyedTrue`

### String -> Number

- add `getEndOfLineLength` (was added in the `0.8.0` release but without exporting its module)

### Object -> (Object -> Object)

- add `makeMergeAppliedFnMap`


## `@svizzle/utils` v0.8.1

- build: remove comments from `.mjs` files

## `@svizzle/utils` v0.8.0

- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible
- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

### (Any -> Any):accumcb -> (Array -> Any)

- add tests to make sure `reduceFromArr` and `reduceFromObj` return a new instance of the initial value every time they get called

### Any -> (Any -> Boolean)

- add `isEqualTo`

### Array -> (Array -> Array)

- add `pluckKeys`

### Array -> (Object -> Object)

- add `pluckValuesKeys`

### Array -> Array

- Fix `inclusiveRange` returning an empty array when the extent has 2 zeroes

### Object -> Boolean

- add `hasSomeNullValues`
- add tests to `endsWithNewLine` to check Windows line ending

### String -> String

- add `capitalize`
- make `trimLastNewline` compatible with Windows line ending


## `@svizzle/utils` v0.7.1

### Array -> Array

- `inclusiveRange` returns a single valued array when the values of the provided extent are equal

## `@svizzle/utils` v0.7.0

### Array -> Array

- add `inclusiveRange`

### Object -> (String -> Boolean)

- add `isKeyOf`

## `@svizzle/utils` v0.6.0

### (Any -> Any) -> (Object -> Object)

- add `groupValuesWith`
- add `indexValuesWith`

### Array -> (Any -> Boolean)

- renamed `makeIsContained` to `makeOccursIn`

### Array -> (Object -> Object)

- added `applyTransformsSequence`

### Object -> (Object -> Object)

- add `transformPaths`
- `transformValues`: assume identity for missing keys

### Object -> Object

- add `swapKeyValue`


## `@svizzle/utils` v0.5.0

- move `lamb` to `peerDependencies`
- updated docs

### (Any -> Any) -> (Any -> Boolean)

- added `isArrayWith`
- added `isNilWith`
- added `isNotNaNWith`
- added `isNotNilWith`
- added `isNotNullWith`
- added `isNullWith`
- added `isNumberWith`
- added `isObjectWith`
- added `isStringWith`
- added `isUndefinedWith`
- added `isValidNumberWith`
- added `isToNumberValidNumberWith`
- added `isToFloatValidNumberWith`

### (Any -> Array) -> (Any -> Array)

- added `makeBiPermutationsWith`

### (Any -> Array) -> (Array -> Array)

- renamed `reduceFromArr` -> `reduceFromEmptyArray`
- renamed `reduceFromObj` -> `reduceFromEmptyObject`

### (Any -> Object) -> (Array -> Object)

- added makeAllOccurrencesWith

### Any -> Boolean

- added `isArguments`

### Array -> (Any -> Boolean)

- added `makeIsContained`

### Array -> (String -> String)

- added `sliceStringAt`

### Array -> Array

- added `makeBiPermutations`
- added `sortValueAscKeyAsc`
- added `sortValueAscKeyDesc`
- added `sortValueDescKeyAsc`
- added `sortValueDescKeyDesc`

### Array -> Iterable

- added `getShorter`

### Array -> Objects

- added `mergeObjects`

### Iterable -> Array

- move `tapAppendTo` to /dev

### String -> (Any -> Any)

- move `tapValue` to /dev
- move `tapType` to /dev
- move `tapTypeAndValue` to /dev

### String -> (String -> Boolean)

- added `makeEndsWith`
- added `makeStartsWith`
- added `makeStringEndsWith`
- added `makeStringStartsWith`

### String -> Boolean

- added `endsWith`
- added `endsWithNewLine`

### String -> String

- added `sliceString`


## `@svizzle/utils` v0.4.0

- switched to a flat layout, easier to use and makes it easier to read the doc
- updated docs

### Any -> Boolean

- added `isNotNull`

### Array -> (Object -> Array)

- added `pickAndConcatValues`

### Array -> (String -> Boolean)

- added `containsOneOf`

### Object -> Any

- added `getId`
- added `getKey`
- added `getValue`

### Object -> Array

- added `concatValues`

## `@svizzle/utils` v0.3.0

- updated docs

### Any -> Any

- `tapValue`, `tapType`, `tapTypeAndValue` now expect an optional string and return a tap function

### Any -> (Any -> Boolean)

- added `isNot`

### Any -> (Array -> Object)

- added `makeKeyed`

### Array -> Array

- added `getFirstAndLast`

### Array -> Boolean (proto)

- added `includes`

### Array -> Number

- added `arraySum`

### Array -> (Any -> Boolean)

- added `makeIsIncluded`

### Array -> (Number -> Number)

- added `makePolynomial`

### Array -> Object

- added `keyValueArrayToObject`

### Array -> (Object -> Boolean)

- added `isKeyValue`
- added `isNotKeyValue`
- added `isPathValue`
- added `isNotPathValue`

### Contructor -> ((Any -> Any):accumcb -> (Array -> Any))

- added `reduceTo`

### (Any -> Any):accumcb -> (Array -> Any)

- added `reduceFromArr`
- added `reduceFromObj`

### (Any -> Any) -> (Object -> Array)

- added `objectToKeyValueArrayWith`

### (Any -> Any) -> (Iterable -> Object)

- added `pairToKeyValueObjectWith`

### Object -> Boolean

- added `hasObjSize1`


## `@svizzle/utils` v0.2.0

- added missing tests and docs

- moved functions returning functions in `fn/` directories.

  For example `makeKeysGetter`:
  - expects an array and returns a function that expects an object and returns an array;
  - hence it's in `utils/src/array/fn/object/array.js`.

- moved functions derived from Javascript types in `proto/` directories.

### Any -> Boolean

- added `isNotNil`

### Array -> (Any -> Object)

- added `makeWith`

### Array -> (Array -> Object)

- added `makeWithKeys`, `makeWithValues`

### Object -> Array

- renamed: `getTruthyKeys` -> `getTruthyValuesKeys`

### Object -> Object

- `pickIfTruthy`


## `@svizzle/utils` v0.1.0

### Any -> Any

- `makeEmptyArrayIfUndefined`
- `toFloatOrIdentity`
- `tapValue`
- `tapType`
- `tapTypeAndValue`

### Any -> Boolean

- `isArray`
- `isNumber`
- `isObject`
- `isString`
- `isNotNaN`
- `isValidNumber`
- `toNumberisValidNumber`
- `toFloatIsValidNumber`

### Any -> String

- `stringify`

### Array -> Array

- `concat`
- `removeAt`
- `swap`
- `toggleItem`

### Array -> Boolean

- `areAllTruthy`
- `areSomeTruthy`

### Array -> Function

- `makeKeysGetter`
- `makeIsWithinRange`
- `makeArrayTransformer`

### Array -> Number

- `makeRandomNumInRange`
- `arrayMax`
- `arrayMaxBy`
- `arrayMaxWith`
- `arrayMin`
- `arrayMinBy`
- `arrayMinWith`

### Array -> Object

- `makeKeyedZeroes`
- `makeOccurrences`
- `makeAllOccurrences`

### Array -> String

- `join`
- `joinWith`
- `joinWithDash`
- `joinWithColon`
- `joinWithSemicolon`

### Iterable -> Array

- `tapAppendTo`

### Iterable -> Boolean

- `isIterableEmpty`
- `isIterableNotEmpty`
- `hasIterableLength1`
- `isIterableLongerThan1`

### Iterable -> Number

- `getLength`

### Iterable -> Object

- `pairToKeyValueObject`

### Number -> Boolean

- `is0`
- `is1`
- `isGT0`
- `isGT1`

### Object -> Array

- `objectToKeyValueArray`
- `getTruthyKeys`

### Object -> Boolean

- `isObjEmpty`
- `isObjNotEmpty`

### Object -> Function

- `applyFnMap`
- `transformValues`

### Object -> Number

- `getObjSize`
- `valuesMax`
- `valuesMaxBy`
- `valuesMaxWith`
- `valuesMin`
- `valuesMinBy`
- `valuesMinWith`

### Object -> Object

- `mapValuesToFloat`
- `mapValuesToFloatPossibly`
- `mapValuesToNumber`
- `mergeObj`
- `makeMergeKeyValue`
- `mergeWith`
- `mergeWithSum`
- `mergeWithMerge`
- `mergeWithConcat`
- `mergeWithAppendTo`

### String -> Array

- `split`
- `makeSplitStringBy`
- `makeSplitBy`
- `splitByDot`
- `splitByEOL`
- `splitBySemiColon`
- `makeLines`
- `makeRows`
- `ndjsonToArray`

### String -> Boolean

- `isTrimmedNotEmpty`
- `startsWith`

### String -> String

- `prepend`
- `trim`
