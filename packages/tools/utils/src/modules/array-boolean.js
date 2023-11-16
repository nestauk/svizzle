/**
* @module @svizzle/utils/array-boolean
*/

import areEquals from 'just-compare';
import * as _ from 'lamb';

/**
 * Return true if all elements of the provided array are truthy
 *
 * @function
 * @arg {array} array
 * @return {boolean}
 *
 * @example
> areAllTruthy([true, true])
true
> areAllTruthy([1, [], [1, 2], {}, {a: 1}, 'a'])
true
> areAllTruthy([false, true])
false
> areAllTruthy([0, {a: 1}])
false
> areAllTruthy(['', {a: 1}])
false
 *
 * @since 0.1.0
 */
export const areAllTruthy = _.every(_.identity);

/**
 * Return true if some elements of the provided array are truthy
 *
 * @function
 * @arg {array} array
 * @return {boolean}
 *
 * @example
> areSomeTruthy([false, true])
true
> areSomeTruthy([0, false, []])
true
> areSomeTruthy([0, false, [1, 2]])
true
> areSomeTruthy([0, false, {}])
true
> areSomeTruthy([0, false, {a: 1}])
true
> areSomeTruthy([0, false, 'a'])
true
> areSomeTruthy([0, ''])
> false
 *
 * @since 0.1.0
 */
export const areSomeTruthy = _.some(_.identity);

/**
 * Return `true` if items in the provided array are equal
 *
 * @function
 * @arg {array} array
 * @return {boolean}
 *
 * @example
> areEqual([false, false, false])
true
> areEqual([true, false, false])
false
> areEqual([1, 1, 2])
false
> areEqual([{a: 1}, {a: 1}, {a: 1}])
true
> areEqual([[0], {a: 1}, 7])
false
> areEqual([[1, 2], [1, 2], [1, 2]])
true
> areEqual([
	{a: [1, {a: [1, 2]}]},
	{a: [1, {a: [1, 2]}]},
	{a: [1, {a: [1, 2]}]}
])
true
> areEqual([])
false
> areEqual([1])
false
 * @see {@link module:@svizzle/utils/[any-any]-[array-boolean]|areEqualWith}
 *
 * @since 0.21.0
 */
export const areEqual = array => {
	let result;

	if (array.length < 2) {
		result = false;
	} else {
		let index = 1;
		result = true;
		while (result && index < array.length) {
			result = result && areEquals(array[index - 1], array[index]);
			index++;
		}
	}

	return result;
};
