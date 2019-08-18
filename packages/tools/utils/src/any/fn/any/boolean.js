/**
* @module @svizzle/utils/any/fn/any/boolean
*/

import * as _ from "lamb";

/**
 * Return a function that returns true if the input is different from the provided value.
 *
 * @function
 * @arg {*} any
 * @return {function} predicate - Any -> Boolean
 *
 * @example
const isNotTwo = isNot(2);

isNotTwo(3); // true
isNotTwo(2); // false
 *
 * @version v0.3.0
 */
export const isNot = x => _.not(_.is(x));
