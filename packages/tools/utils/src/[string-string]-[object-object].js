/**
* @module @svizzle/utils/[string-string]-[object-object]
*/

import * as _ from 'lamb';

/**
 * Return a function expecting an object and returning a new object with keys renamed with the provided function.
 *
 * @function
 * @arg {function} renameFn - (String -> String) the function renaming keys
 * @return {function} - (Object -> Object) the function renaming the object keys
 *
 * @example
> const rename = renameKeysWith(prepend('--'));
> rename({foo: 1, bar: 2})
{'--foo': 1, '--bar': 2}
 *
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#renameWith
 * @version 0.8.0
 */
export const renameKeysWith = renameFn => _.pipe([
	_.pairs,
	_.mapWith(([key, value]) => [renameFn(key), value]),
	_.fromPairs
]);
