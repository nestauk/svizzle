/**
* @module @svizzle/utils/[any-any]-[array-boolean]
*/

import areEquals from 'just-compare';

/**
 * Return a function returning `true` if all the items of an array are equal once processed with the provided `accessor`
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Array -> Boolean
 *
 * @example
> areEqualByValue = areEqualWith(getValue)
> areEqualByValue([
	{key: 'a', value: 1},
	{key: 'b', value: 1},
	{key: 'c', value: 1},
])
true
> areEqualByValue([
	{key: 'a', value: 1},
	{key: 'b', value: 2},
	{key: 'c', value: 3},
])
false
> areEqualByValue([
	{key: 'a', value: 1},
])
false
> areEqualByValue([])
false
 * @see {@link module:@svizzle/utils/array-boolean|areEqual}
 *
 * @since 0.21.0
 */
export const areEqualWith = accessor => array => {
	let result;

	if (array.length < 2) {
		result = false;
	} else {
		const values = [accessor(array[0])];
		let index = 1;
		result = true;
		while (result && index < array.length) {
			const value = accessor(array[index]);
			values.push(value);
			result = result && areEquals(values[index - 1], value);
			index++;
		}
	}

	return result;
};
