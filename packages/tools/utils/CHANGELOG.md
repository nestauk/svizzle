## `@svizzle/utils` v0.5.0 (next)

- added linting
- updated docs

### (Any -> Array) -> (Array -> Array)

- renamed `reduceFromArr` -> `reduceFromEmptyArray`
- renamed `reduceFromObj` -> `reduceFromEmptyObject`

### (Any -> Object) -> (Array -> Object)

- added makeAllOccurrencesWith

### Any -> Boolean

- added `isArguments`

### Array -> (Any -> Any)

- added `tapWith`

### Array -> (Any -> Boolean)

- added `makeIsContained`

### Array -> (String -> String)

- added `sliceStringAt`

### Array -> Iterable

- added `getShorter`

### Array -> Objects

- added `mergeObjects`

### String -> (Any -> Any)

- added `tapMessage`

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
