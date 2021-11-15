/**
* @module @svizzle/utils/string-[array-array]
*/

import * as _ from 'lamb';

/**
 * Return a function expecting an array of objects and plucking the provided array
 * with the input path
 *
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#pluck
 *
 * @function
 * @arg {string} path
 * @return {function} - String -> (Array -> Array)
 *
 * @example
> getABs = pluckPath('a.b')
> getABs([{a: {b: -1, label: 'foo'}}, {a: {b: 4, label: 'bar'}}])
[-1, 4]
> getABs([{a: {label: 'foo'}}, {a: {b: 2}}])
[undefined, 2]
 *
 * @since 0.16.0
 */
export const pluckPath = path => _.mapWith(_.getPath(path));
