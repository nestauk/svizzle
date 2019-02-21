/**
* @module @svizzle/utils/iterable/object
*/

/**
 * Return the {key, value} object from a pair
 *
 * @function
 * @arg {iterable}
 * @return {number}
 *
 * @example
 * [] => {key: "undefined", value: "undefined"}
 * [1] => {key: 1, value: undefined}
 * [1, 2] => {key: 1, value: 2}
 * [1, 2, 3] => {key: 1, value: 2}
 * "" => {key: "undefined", value: "undefined"}
 * "a" => {key: "a", value: "undefined"}
 * "ab" => {key: "a", value: "b"}
 * "abc" => {key: "a", value: "b"}
 * function func () {
 *   return pairToKeyValueObject(arguments);
 * }
 * func() // => {key: undefined, value: undefined}
 * func(1) // => {key: 1, value: undefined}
 * func(1, 2) // => {key: 1, value: 2}
 * func(1, 2, 3) // => {key: 1, value: 2}
 *
 * @version 0.1.0
 */
export const pairToKeyValueObject = ([key, value]) => ({key, value});
