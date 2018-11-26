import * as _ from "lamb";

/**
 * Get the length of the iterable
 *
 * @function
 * @arg {iterable}
 * @return {number}
 *
 * @example
 * "a" => 1
 * "two" => 3
 * [10] => 1
 * [3, 7] => 2
 * function func () {
 *   return getLength(arguments);
 * }
 * func() // => 0
 * func("a", "b") // => 2
 *
 * @version 0.1.0
 */
export const getLength = _.getKey("length");
