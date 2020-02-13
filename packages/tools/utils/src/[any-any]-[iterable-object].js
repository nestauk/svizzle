/**
* @module @svizzle/utils/[any-any]-[iterable-object]
*/

/**
 * Return a function expecting an pair and returning a {key, value} object
 * using the provided accessor to get the `value`.
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Iterable -> Object
 *
 * @example
const objectifySelfSum = pairToKeyValueObjectWith(x => x + x);
const objectifyGetA = pairToKeyValueObjectWith(_.getKey('a'));
function func () {
  return objectifyGetA(arguments);
}
objectifyGetA([])             // {key: undefined, value: undefined}
objectifyGetA([1])            // {key: 1, value: undefined}
objectifyGetA([1, {a: 2}])    // {key: 1, value: 2}
objectifyGetA([1, {a: 2}, 3]) // {key: 1, value: 2}
func()                        // {key: undefined, value: undefined}
func(1)                       // {key: 1, value: undefined}
func(1, {a: 2})               // {key: 1, value: 2}
func(1, {a: 2}, 3)            // {key: 1, value: 2}

objectifySelfSum("")          // {key: undefined, value: undefined}
objectifySelfSum("a")         // {key: "a", value: undefined}
objectifySelfSum("ab")        // {key: "a", value: "bb"}
objectifySelfSum("abc")       // {key: "a", value: "bb"}
 *
 * @version 0.3.0
 */
export const pairToKeyValueObjectWith =
  accessor => ([key, item]) => ({
    key,
    value: item && accessor(item)
  });
