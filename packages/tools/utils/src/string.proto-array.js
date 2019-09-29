/**
* @module @svizzle/utils/string.proto-array
*/

import * as _ from "lamb";

/**
 * Return an array splitting the input string with the provided separator or regex
 *
 * @function
 * @arg {string} string - The input string
 * @arg {stringOrRegex} stringOrRegex - Separator or regex
 * @return {array}
 *
 * @example
 * split("a-b-c", "-") // ["a", "b", "c"]
 *
 * @version 0.1.0
 */
export const split = _.generic(String.prototype.split);
