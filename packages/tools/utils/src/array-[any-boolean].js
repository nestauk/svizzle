/**
* @module @svizzle/utils/array-[any-boolean]
*/

import isEqual from "just-compare";
import * as _ from "lamb";

import {includes} from "./array_proto-boolean";

/**
 * Return a function returning true if the passed value is found in the provided array
 * This function is ideal to check the presence of array or objects.
 * To check primitive values best using `makeIsIncluded`.
 *
 * @function
 * @arg {array} array - Array possibly containing arrays/objects
 * @return {function} predicate - Any -> Boolean
 *
 * @example
const isOneOfTheseArrays = makeIsContained([
  [1, 2, 3], [1, 2, 3, 4], [5, 6, 7, 6, 5]
]);
isOneOfTheseArrays([1, 2, 3]) // true
isOneOfTheseArrays([1, 2]) // false

const isOneOfTheseObjects = makeIsContained([
  {a: 1}, {a: 2}, {a: {b: {c: 3}}}, {b: 1}
]);
isOneOfTheseObjects({a: {b: {c: 3}}}) // true
isOneOfTheseObjects({a: 3}) // false
 *
 * @version 0.5.0
 */
export const makeIsContained = array =>
  input => _.someIn(array, elem => isEqual(elem, input));


/**
 * Return a function returning true if the passed (primitive) value is found in the provided array
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
 */
export const makeIsIncluded = array => _.partial(includes, [array, _.__]);
