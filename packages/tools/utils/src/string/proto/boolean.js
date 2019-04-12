/**
* @module @svizzle/utils/string/proto/boolean
*/

import * as _ from "lamb";

/**
 * Return true if the input string starts with the test string
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
