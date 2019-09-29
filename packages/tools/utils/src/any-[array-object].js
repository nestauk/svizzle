/**
* @module @svizzle/utils/any-[array-object]
*/

import * as _ from "lamb";

/**
 * Return a function expecting an array of keys and returning an object with the provided value as value of those keys.
 *
 * @function
 * @arg {*} value
 * @return {function} function - Array -> Object
 *
 * @example
const makeKeyedEmptyArray = makeKeyed([])
makeKeyedEmptyArray([1, 2]) -> {1: [], 2: []}
makeKeyedEmptyArray(["a", "b"]) -> {a: [], b: []}
 *
 * @version 0.3.0
 */
export const makeKeyed = value => _.pipe([
    _.collect([_.identity, _.mapWith(_.always(value))]),
    _.apply(_.make)
]);
