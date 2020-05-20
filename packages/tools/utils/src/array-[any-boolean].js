/**
* @module @svizzle/utils/array-[any-boolean]
*/

import isEqual from "just-compare";
import * as _ from "lamb";

import {includes} from "./array_proto-boolean";

/**
 * Return a function returning true if the passed value is found in the provided array
 * This function is ideal to check the presence of array or objects.
 * To check primitive values best using {@link module:@svizzle/utils/array-[any-boolean].makeIsIncluded|makeIsIncluded}.
 *
 * @function
 * @arg {array} array - Array possibly containing arrays/objects
 * @return {function} predicate - Any -> Boolean
 *
 * @example
const isOneOfThoseArrays = makeOccursIn([
  [1, 2, 3], [1, 2, 3, 4], [5, 6, 7, 6, 5]
]);
isOneOfThoseArrays([1, 2, 3]) // true
isOneOfThoseArrays([1, 2]) // false

const isOneOfThoseObjects = makeOccursIn([
  {a: 1}, {a: 2}, {a: {b: {c: 3}}}, {b: 1}
]);
isOneOfThoseObjects({a: {b: {c: 3}}}) // true
isOneOfThoseObjects({a: 3}) // false
 *
 * @version 0.5.0
 */
export const makeOccursIn = array =>
	input => _.someIn(array, elem => isEqual(elem, input));


/**
 * Return a function returning true if the passed (primitive) value is found in the provided array
 * To check non-primitive values please use {@link module:@svizzle/utils/array-[any-boolean].makeOccursIn|makeOccursIn}.
 *
 * @function
 * @arg {array} array - Array
 * @return {function} predicate - Any -> Boolean
 *
 * @example
const isIncluded = makeIsIncluded([1, 2, 3]);
isIncluded(1) // true
isIncluded(4) // false
 *
 * @version 0.3.0
 * @see {@link module:@svizzle/utils/array_proto-boolean.includes|includes}
 */
export const makeIsIncluded = array => _.partial(includes, [array, _.__]);
