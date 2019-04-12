/**
* @module @svizzle/utils/string/fn/string/string
*/

import * as _ from "lamb";

/**
 * Return a function that prepends the provided string to the input string
 *
 * @function
 * @arg {string} prefix - The string to be prepended
 * @return {function}
 *
 * @example
 * const prefixed = prepend("prefix")
 * prefixed('A') // "prefixA"
 * prefixed('B') // "prefixB"
 *
 * @version 0.1.0
 */
export const prepend = prefix => string => prefix + string;
