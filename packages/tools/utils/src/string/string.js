import * as _ from "lamb";

/* edit */

/**
 * Return a function that prepends the provided string to the input string
 *
 * @function
 * @arg {string} - The string to be prepended
 * @return {function}
 *
 * @example
 * const prependFoo = prepend("foo")
 * prependFoo('A') // "fooA"
 * prependFoo('B') // "fooB"
 *
 * @version 0.1.0
 */
export const prepend = pre => string => pre + string;

/**
 * Return a function that trims the input string
 *
 * @function
 * @arg {string}
 * @return {string}
 *
 * @example
 * trim("   abc   \n  ") // "abc"
 *
 * @version 0.1.0
 */
export const trim = _.generic(String.prototype.trim);
