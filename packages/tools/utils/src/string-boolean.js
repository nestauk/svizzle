/**
* @module @svizzle/utils/string-boolean
*/

import * as _ from "lamb";

import {isIterableNotEmpty} from "./iterable-boolean";
import {trim} from "./string_proto-string";
import {makeEndsWith} from "./string-[string-boolean]";

/**
 * Return true if the string ends with a newline
 *
 * @function
 * @arg {string} string - The input string
 * @return {boolean}
 *
 * @example
 * endsWithNewLine("abc") // false
 * endsWithNewLine("abc\n") // true
 *
 * @version 0.5.0
 */
export const endsWithNewLine = makeEndsWith('\n');

/**
 * Return true if the trimmed string is not empty
 *
 * @function
 * @arg {string} string - The input string
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
