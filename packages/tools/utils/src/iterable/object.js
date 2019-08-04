/**
* @module @svizzle/utils/iterable/object
*/

/**
 * Return the {key, value} object from a pair
 *
 * @function
 * @arg {iterable} iterable
 * @return {number}
 *
 * @example
function func () {
  return pairToKeyValueObject(arguments);
}
func()                          // {key: undefined, value: undefined}
func(1)                         // {key: 1, value: undefined}
func(1, 2)                      // {key: 1, value: 2}
func(1, 2, 3)                   // {key: 1, value: 2}
pairToKeyValueObject([])        // {key: "undefined", value: "undefined"}
pairToKeyValueObject([1])       // {key: 1, value: undefined}
pairToKeyValueObject([1, 2])    // {key: 1, value: 2}
pairToKeyValueObject([1, 2, 3]) // {key: 1, value: 2}
pairToKeyValueObject("")        // {key: "undefined", value: "undefined"}
pairToKeyValueObject("a")       // {key: "a", value: "undefined"}
pairToKeyValueObject("ab")      // {key: "a", value: "b"}
pairToKeyValueObject("abc")     // {key: "a", value: "b"}
 *
 * @version 0.1.0
 */
export const pairToKeyValueObject = ([key, value]) => ({key, value});
