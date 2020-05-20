/**
* @module @svizzle/utils/array-[number-boolean]
*/

import * as _ from "lamb";

/**
 * Return a function expecting a number and returning true if the number is within the provided range.
 * Note that the range is inclusive.
 *
 * @function
 * @arg {array} range - Array of two numbers
 * @return {function} predicate - Number -> Boolean
 *
 * @example
const isWithinRange = makeIsWithinRange([0, 5]);
isWithinRange(2) // true
isWithinRange(5) // true
isWithinRange(8) // false
 *
 * @version 0.1.0
 */
export const makeIsWithinRange = range => _.allOf([
	_.isGTE(range[0]),
	_.isLTE(range[1])
]);
