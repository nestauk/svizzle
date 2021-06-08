/**
* @module @svizzle/utils/any-string
*/

/**
 * Return a string representation of the input with indentation = 2.
 *
 * @function
 * @arg {*} any
 * @return {string}
 * @example
> stringify([{a: 1}, {a: 2}])
[
	{
		"a": 1
	},
	{
		"a": 2
	}
]
 *
 *
 * @since 0.1.0
 */
export const stringify = x => JSON.stringify(x, null, 2);
