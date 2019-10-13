/**
* @module @svizzle/utils/array-string
*/

import {joinWith} from "./string-[array-string]";

/**
 * Return a string joining the provided array items with a dash
 * @see {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example joinWithDash(["a", "b", "c"]) // "a-b-c"
 *
 * @version 0.1.0
 */
export const joinWithDash = joinWith("-");

/**
 * Return a string joining the provided array items with a colon
 * @see {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example joinWithColon(["a", "b", "c"]) // "a:b:c"
 *
 * @version 0.1.0
 */
export const joinWithColon = joinWith(":");

/**
 * Return a string joining the provided array items with a semicolon
 * @see {@link module:@svizzle/utils/string-[array-string].joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example joinWithSemicolon(["a", "b", "c"]) // "a;b;c"
 *
 * @version 0.1.0
 */
export const joinWithSemicolon = joinWith(";");
