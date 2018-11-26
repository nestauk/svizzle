import * as _ from "lamb";

import {isIterableNotEmpty} from "../iterable/boolean";
import {trim} from "./string";

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

/**
 * Return true if the input string starts with the test string
 *
 * @function
 * @arg {string} - The input string
 * @arg {string} - The test string
 * @return {boolean} - True if the input string starts with the test string
 *
 * @example
 * startsWith("Fooooo", "Foo") // true
 * startsWith("Fooooo", "foo") // false
 *
 * @version 0.1.0
 */
export const startsWith = _.generic(String.prototype.startsWith);
