/**
* @module @svizzle/utils/string/fn/string/array
*/

import * as _ from "lamb";

import {split} from "../../proto/array";

/**
 * Return a function expecting a separator or regex to split the provided string
 *
 * @function
 * @arg {string} string - String to split
 * @return {function} - String -> Array
 *
 * @example
 * const splitStringBy = makeSplitStringBy("a.b-c,d:e");
 *
 * splitStringBy(":") // [ "a.b-c,d", "e" ]
 * splitStringBy("-") // [ "a.b", "c,d:e" ]
 *
 * @version 0.1.0
 */
export const makeSplitStringBy = _.curry(split, 2);

/**
 * Return a function expecting a string to be split using the provided separator or regex
 *
 * @function
 * @arg {stringOrRegex} stringOrRegex - Separator or regex
 * @return {function} - String -> Array
 *
 * @example
 * const splitByDoubleDot = makeSplitBy("..");
 *
 * splitByDoubleDot("aa...a..a.a.aa.....aa..")
 * // ["aa", ".a", "a.a.aa", "", ".aa", ""]
 *
 * @version 0.1.0
 */
export const makeSplitBy = _.curryRight(split, 2);
