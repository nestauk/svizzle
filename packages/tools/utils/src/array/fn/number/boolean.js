/**
* @module @svizzle/utils/array/fn/number/boolean
*/

import * as _ from "lamb";
import {__} from "lamb";

/**
 * Return a function expecting a number returning true if the number is within the provided range.
 *
 * @function
 * @arg {array} range - range, Array of two numbers
 * @return {function}
 *
 * @example
const isWithinRange = makeIsWithinRange([0, 5]);
isWithinRange(2) // true
isWithinRange(8) // false
 *
 * @version 0.1.0
 */
export const makeIsWithinRange = range => _.allOf([
    _.isGTE(range[0]),
    _.isLTE(range[1])
]);
