/**
* @module @svizzle/utils/string-[string-boolean]
*/

import * as _ from "lamb";

import {endsWith, startsWith} from "./string_proto-boolean";

/**
 * Return a function expecting a base string and checking if it ends with the provided search string.
 *
 * @function
 * @arg {string} - The search string
 * @return {function} - String -> Boolean
 *
 * @example
 * const endsWithExclamationMark = makeEndsWith("!");
 *
 * endsWithExclamationMark("Hi!") // true
 * endsWithExclamationMark("Who?") // false
 *
 * @version 0.5.0
 */
export const makeEndsWith = _.curryRight(endsWith, 2);

/**
 * Return a function expecting a search string and checking if the provided base string ends with the search string.
 *
 * @function
 * @arg {string} base - String to check
 * @return {function} - String -> Boolean
 *
 * @example
 * const stringEndsWith = makeStringEndsWith("Hi!");
 *
 * stringEndsWith("!") // true
 * stringEndsWith("?") // false
 *
 * @version 0.5.0
 */
export const makeStringEndsWith = _.curry(endsWith, 2);

/**
 * Return a function expecting a base string and checking if it starts with the provided search string.
 *
 * @function
 * @arg {string} - The search string
 * @return {function} - String -> Boolean
 *
 * @example
 * const startsWithHash = makeStartsWith("#");
 *
 * startsWithHash("# this is a bash comment") // true
 * startsWithHash("This is not") // false
 *
 * @version 0.5.0
 */
export const makeStartsWith = _.curryRight(startsWith, 2);

/**
 * Return a function expecting a search string and checking if the provided base string starts with the search string.
 *
 * @function
 * @arg {string} base - String to check
 * @return {function} - String -> Boolean
 *
 * @example
 * const stringStartsWith = makeStringStartsWith("Hi!");
 *
 * stringStartsWith("H") // true
 * stringStartsWith("h") // false
 *
 * @version 0.5.0
 */
export const makeStringStartsWith = _.curry(startsWith, 2);
