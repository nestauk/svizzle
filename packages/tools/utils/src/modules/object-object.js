/**
* @module @svizzle/utils/object-object
*/

import * as _ from 'lamb';

import {toFloatOrIdentity} from './any-any';
import {concat} from './array_proto-array';
import {mergeWith} from './[any-any]-[object-object]';

/* map values */

/**
 * Return a copy of the object with values converted to float.
 * Use if absolutely sure all values can be turned into numbers to avoid `NaN`s,
 * otherwise use `mapValuesToFloatPossibly`.
 *
 * @function
 * @arg {object} object
 * @return {object}
 *
 * @example
> mapValuesToFloat({a: '1.2px', b: '20px'})
{a: 1.2, b: 20}
> mapValuesToFloat({a: '1.2', b: 'h2o'})
{a: 1.2, b: NaN}
 *
 * @since 0.1.0
 */
export const mapValuesToFloat = _.mapValuesWith(parseFloat);

/**
 * Return the object with values converted to numbers where possible
 *
 * @function
 * @arg {object} object
 * @return {object}
 *
 * @example
> mapValuesToFloatPossibly({a: '1.2', b: '2px', c: 'h2o'})
{a: 1.2, b: 2, c: 'h2o'}
 *
 * @since 0.1.0
 */
export const mapValuesToFloatPossibly = _.mapValuesWith(toFloatOrIdentity);

/**
 * Return a copy of the object with values converted to numbers.
 * Use if absolutely sure all values can be turned into numbers to avoid `NaN`s,
 * otherwise use `mapValuesToFloatPossibly`.
 *
 * @function
 * @arg {object} object
 * @return {object}
 *
 * @example
> mapValuesToNumber({a: '1.2', b: '2'})
{a: 1.2, b: 2}
> mapValuesToNumber({a: '1.2', b: '2s'})
{a: 1.2, b: NaN}
 *
 * @since 0.1.0
 */
export const mapValuesToNumber = _.mapValuesWith(Number);

/**
 * Return the merge of the two provided objects adding values of correspondent keys
 *
 * @function
 * @arg {object} baseObject - The base object
 * @arg {object} objectToMerge - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example
> mergeWithSum({a: 1, b: 2}, {a: 10, c: 1})
{a: 11, b: 2, c: 1}
 *
 * @since 0.1.0
 */
export const mergeWithSum = mergeWith(_.sum);

/**
 * Return the merge of the two provided objects merging values of correspondent keys
 *
 * @function
 * @arg {object} baseObject - The base object
 * @arg {object} objectToMerge - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

> obj1 = {A: {a: 1}, B: {b: 1}}
> obj2 = {A: {b: 10}, B: {a: 10}}
> mergeWithMerge(obj1, obj2)
{A: {a: 1, b: 10}, B: {a: 10, b: 1}}
 *
 * @since 0.1.0
 */
export const mergeWithMerge = mergeWith(_.merge);

/**
 * Return the merge of the two provided objects concatenating values of correspondent keys
 *
 * @function
 * @arg {object} baseObject - The base object
 * @arg {object} objectToMerge - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

> obj1 = {a: [1, 2, 3], b: [4, 5, 6]}
> obj2 = {a: [1, 2, 3], b: [4, 5, 6]}
> mergeWithConcat(obj1, obj2)
{a: [1, 2, 3, 1, 2, 3], b: [4, 5, 6, 4, 5, 6]}
 *
 * @since 0.1.0
 */
export const mergeWithConcat = mergeWith(concat);

/**
 * Return the merge of the two provided objects appending values of correspondent keys
 *
 * @function
 * @arg {object} baseObject - The base object
 * @arg {object} objectToMerge - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example
> obj1 = {a: [1, 2, 3], b: [4, 5, 6]}
> obj2 = {a: 4, b: [7]}
> mergeWithAppendTo(obj1, obj2)
{a: [1, 2, 3, 4], b: [4, 5, 6, [7]]}
 *
 * @since 0.1.0
 */
export const mergeWithAppendTo = mergeWith(_.appendTo);

/**
 * Return a copy of the object without falsy values
 *
 * @function
 * @arg {object} object - The input object
 * @return {object} object - The object with truthy values
 *
 * @example
> pickIfTruthy({a: true, b: true, c: false})
{a: true, b: true}
> pickIfTruthy({a: 1, b: 0, c: false})
{a: 1}
> pickIfTruthy({a: [1, 2], b: {a: 1}, c: false})
{a: [1, 2], b: {a: 1}}
 *
 * @since 0.2.0
 */
export const pickIfTruthy = _.pickIf(_.identity);

/**
 * Return an object with swapped keys and values.
 * Note that if there are duplicate values, since the keys of the resulting object have to be unique, the last occurrence of each value would be used but depending on the interpreter implementation the output keys might vary.
 *
 * @function
 * @arg {object}
 * @return {object}
 *
 * @example
// unique values
> swapKeyValue({a: 1, b: 2, c: 'd'})
{1: 'a', 2: 'b', d: 'c'}

// duplicate values
> swapKeyValue({a: 1, b: 2, c: 'd', e: 1})
{2: 'b', d: 'c', 1: 'e'}
 *
 * @since 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].indexValuesWith|indexValuesWith}
 */
export const swapKeyValue = _.pipe([
	_.pairs,
	_.mapWith(_.reverse),
	_.fromPairs
]);
