/**
* @module @svizzle/utils/array-[any-boolean]
*/

import * as _ from "lamb";

import {includes} from "./array_proto-boolean";

/**
 * Return a function returning true if the passed value is found in the provided array
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
