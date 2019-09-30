/**
* @module @svizzle/utils/iterable-array
*/

import * as _ from "lamb";

import {tapValue} from "./string-[any-any]";

/**
 * Print the provided array and element and return the result of appending the element to the array
 *
 * @function
 * @arg {iterable} iterable
 * @arg {*} any
 * @return {array}
 *
 * @example
tapAppendTo([1, 2, 3], 4)
// logs: [1, 2, 3]
// logs: 4
// => [1, 2, 3, 4]

tapAppendTo("abc", {a: 1})
// logs: "abc"
// logs: {a: 1}
// => ["a", "b", "c", {a: 1}]
 *
 * @version 0.1.0
 */
export const tapAppendTo = _.tapArgs(
    _.appendTo,
    [tapValue(), tapValue()]
);
