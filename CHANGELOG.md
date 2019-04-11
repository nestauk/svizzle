# Svizzle changelog

## `@svizzle/file` v0.3.0

- add `readTsv`

## 20190411

- docs:
   - use "docdash" as the jsdoc template
   - add a serve script

- dev:
   - add development guidelines
   - allow versioning from `dev` only

## `@svizzle/dev` v0.2.0

- add `renameToExtension`
- more generic `makeBanner`

## `@svizzle/dom` v0.2.0

- changed `toPx` to not throw anymore
- should fix an import from `vendor`

## `@svizzle/file` v0.2.0

- `saveObj` and `saveObjPassthrough` accept a `indent` argument

## `@svizzle/geo` v0.2.0

- `makeToPointFeature` and `makeToGeoPoints` accept a `propsTransformer` argument

## `@svizzle/request` v0.1.1

- removed `vendor/` from the build

## `@svizzle/utils` v0.2.0

- added missing tests and docs

- moved functions returning functions in `fn/` directories.

  For example `makeKeysGetter`:
  - expects an array and returns a function that expects an object and returns an array;
  - hence it's in `utils/src/array/fn/object/array.js`.

- moved functions derived from Javascript types in `proto/` directories.

### Any -> Boolean

- added `isNotNil`

### Array -> (Any -> Object)

- added `makeWith`

### Array -> (Array -> Object)

- added `makeWithKeys`, `makeWithValues`

### Object -> Array

- renamed `getTruthyKeys` to `getTruthyValuesKeys`

### Object -> Object

- added `pickIfTruthy`


## `@svizzle/dev` v0.1.0

- `makeBanner`
- `makePrinter`
- `renameToCss`
- `renameToMinJs`
- `renameToMjs`

## `@svizzle/dom` v0.1.0

- `getElementGeometry`
- `makeStyle`
- `moveNode`
- `toPx`

## `@svizzle/file` v0.1.0

- `filterJsonExtensions`
- `hasAnyExtensionOf`
- `readCsv`
- `readJson`
- `readJsonDir`
- `renameToExtension`
- `saveObj`
- `saveObjPassthrough`
- `saveResponse`

## `@svizzle/geo` v0.1.0

- `getOrMakeBBox`
- `makeCentroids`
- `makeToPointFeature`
- `makeToGeoPoints`
- `setGeometryPrecision`

## `@svizzle/geometry` v0.1.0

- `getDistance2D`
- `getTwoPointsCenter`
- `linkVector`
- `makeLinkVector`
- `makePosition2D`
- `makePosition3D`
- `makeVectorFeatures`
- `vectorLength2D`

## `@svizzle/request` v0.1.0

- `requestJson`
- `requestNdjson`

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
