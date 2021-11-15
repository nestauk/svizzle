/**
* @module @svizzle/utils/array-[array-array]
*/

import * as _ from 'lamb';

/**
 * Return a function expecting an array and that applies the provided transforms to its elements
 *
 * @function
 * @arg {array} transforms - array of functions
 * @return {function} - Array -> Array
 *
 * @example
> transformer = makeArrayTransformer([x => x * 20, x => x + 3])
> transformer([2, 2])
[40, 5]
> transformer = makeArrayTransformer([x => x * 20])
> transformer([1, 1, 1, 1, 1])
[20]
> transformer = makeArrayTransformer([x => x * 20, x => x + 3])
> transformer([1])
[20]
 *
 * @since 0.1.0
 */
export const makeArrayTransformer = fnArr => _.pipe([
	_.partial(_.zip, [fnArr, _.__]),
	_.mapWith(([fn, arg]) => fn(arg))
]);

/**
 * Return a function plucking the provided keys from the expected array
 *
 * @function
 * @arg {array} keys - array of keys to pluck
 * @return {function} - Array -> Array
 *
 * @example
> select = pluckKeys(['a', 'k'])
> select([
	{a: 1, b: 2, c: 3, k: 4},
	{a: 5, b: 8},
])
[{a: 1, k: 4}, {a: 5}]
 *
 * @since 0.8.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#pluck
 */
export const pluckKeys = keys => _.mapWith(_.pick(keys));

/**
 * Return a function expecting an array and removing items at the provided indices
 *
 * @function
 * @arg {array} indices
 * @return {function} - Array -> Array
 *
 * @example
> removeIndices = removeAt([3, 4, 8])
> removeIndices([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
[0, 1, 2, 5, 6, 7, 9]
 *
 * @since 0.1.0
 */
export const removeAt = indices => _.reduceWith(
	(acc, v, i, array) => {
		if (i !== acc.next) {
			acc.result.push(v);
		} else {
			acc.next = acc.indices[++acc.cursor];
		}

		if (i === array.length - 1) {
			return acc.result;
		}

		return acc;
	},
	{result: [], indices, next: indices[0], cursor: 0}
);
