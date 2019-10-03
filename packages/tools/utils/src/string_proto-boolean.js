/**
* @module @svizzle/utils/string_proto-boolean
*/

import * as _ from "lamb";

/**
 * Return true if the input string ends with the test string
 * @see [String.prototype.endsWith]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith}
 *
 * @function
 * @arg {string} string - The input string
 * @arg {string} string - The test string
 * @return {boolean} - True if the input string ends with the test string
 *
 * @example
 * endsWith("Ping", "ing") // true
 * endsWith("Pong", "ing") // false
 *
 * @version 0.5.0
 */
export const endsWith = _.generic(String.prototype.endsWith);

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
 * startsWith("Ping", "Pin") // true
 * startsWith("Pong", "Pin") // false
 *
 * @version 0.1.0
 */
export const startsWith = _.generic(String.prototype.startsWith);
