/**
* @module @svizzle/utils/string/boolean
*/

import * as _ from "lamb";

import {isIterableNotEmpty} from "../iterable/boolean";
import {trim} from "./proto/string";

/**
 * Return true if the trimmed string is not empty
 *
 * @function
 * @arg {string} - The input string
 * @return {boolean}
 *
 * @example
 * isTrimmedNotEmpty("  foo  ") // true
 * isTrimmedNotEmpty("  ") // false
 *
 * @version 0.1.0
 */
export const isTrimmedNotEmpty = _.pipe([
    trim,
    isIterableNotEmpty
]);
