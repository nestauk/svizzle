/**
* @module @svizzle/utils/any-string
*/

/**
 * Return a string representation of the input with indentation = 2.
 *
 * @function
 * @arg {*} any
 * @return {string}
 *
 * @version 0.1.0
 */
export const stringify = x => JSON.stringify(x, null, 2);
