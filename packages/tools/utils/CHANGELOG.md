## `@svizzle/utils` v0.3.0 (next)

- updated docs

### Any -> (Array -> Object)

- added `makeKeyed`

### Array -> Array

- added `getFirstAndLast`

### Array -> Object

- added `keyValueArrayToObject`


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

### any ->

*any*

- `makeEmptyArrayIfUndefined`
- `toFloatOrIdentity`
- `tapValue`
- `tapType`
- `tapTypeAndValue`

*boolean*

- `isArray`
- `isNumber`
- `isObject`
- `isString`
- `isNotNaN`
- `isValidNumber`
- `toNumberisValidNumber`
- `toFloatIsValidNumber`

*string*

- `stringify`

### array ->

*array*

- `concat`
- `removeAt`
- `swap`
- `toggleItem`

*boolean*

- `areAllTruthy`
- `areSomeTruthy`

*function*

- `makeKeysGetter`
- `makeIsWithinRange`
- `makeArrayTransformer`

*number*

- `makeRandomNumInRange`
- `arrayMax`
- `arrayMaxBy`
- `arrayMaxWith`
- `arrayMin`
- `arrayMinBy`
- `arrayMinWith`

*object*

- `makeKeyedZeroes`
- `makeOccurrences`
- `makeAllOccurrences`

*string*

- `join`
- `joinWith`
- `joinWithDash`
- `joinWithColon`
- `joinWithSemicolon`

### iterable ->

*array*

- `tapAppendTo`

*boolean*

- `isIterableEmpty`
- `isIterableNotEmpty`
- `hasIterableLength1`
- `isIterableLongerThan1`

*number*

- `getLength`

*object*

- `pairToKeyValueObject`

### number ->

*boolean*

- `is0`
- `is1`
- `isGT0`
- `isGT1`

### object ->

*array*

- `objectToKeyValueArray`
- `getTruthyKeys`

*boolean*

- `isObjEmpty`
- `isObjNotEmpty`

*function*

- `applyFnMap`
- `transformValues`

*number*

- `getObjSize`
- `valuesMax`
- `valuesMaxBy`
- `valuesMaxWith`
- `valuesMin`
- `valuesMinBy`
- `valuesMinWith`

*object*

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

### string ->

*array*

- `split`
- `makeSplitStringBy`
- `makeSplitBy`
- `splitByDot`
- `splitByEOL`
- `splitBySemiColon`
- `makeLines`
- `makeRows`
- `ndjsonToArray`

*boolean*

- `isTrimmedNotEmpty`
- `startsWith`

*string*

- `prepend`
- `trim`
