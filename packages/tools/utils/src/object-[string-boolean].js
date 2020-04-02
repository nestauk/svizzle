/**
* @module @svizzle/utils/object-[string-boolean]
*/

import * as _ from "lamb";

/**
 * Return a function that checks if the expected string is a key of the provided object
 *
 * @function
 * @arg {object} object
 * @return {function} - String -> Boolean
 *
 * @example
> const isKeyOfObj = isKeyOf({a: 1, b: 2});
> isKeyOfObj('a') // true
> isKeyOfObj('c') // false
 *
 * @version 0.7.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#hasKey
 */
export const isKeyOf = obj => key => _.has(obj, key);
