/**
* @module @svizzle/utils/string_proto-boolean
*/

import * as _ from "lamb";

/**
 * Return true if the input string starts with the test string
 * @see [String.prototype.startsWith]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith}
 *
 * @function
 * @arg {string} string - The input string
 * @arg {string} string - The test string
 * @return {boolean} - True if the input string starts with the test string
 *
 * @example
 * startsWith("Fooooo", "Foo") // true
 * startsWith("Fooooo", "foo") // false
 *
 * @version 0.1.0
 */
export const startsWith = _.generic(String.prototype.startsWith);
