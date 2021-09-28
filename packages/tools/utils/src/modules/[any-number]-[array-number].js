/**
* @module @svizzle/utils/[any-number]-[array-number]
*/

import * as _ from 'lamb';

import {getLength} from './iterable-number';
import {isNumber} from './any-boolean';

/**
 * Return a function expecting an array and summing the numbers obtained
 * from applying the provided accessor to the array items.
 * Note that it skips items where the accessor does not return a number.
 *
 * @function
 * @arg {function} accessor - Any -> Number
 * @return {function} - Array -> Number
 *
 * @example
> sumValues = arraySumWith(_.getKey('a'))
> sumValues([{a: 1}, {a: 2}, {a: 3}])
6
> sumValues([{a: 1}, {a: 2}, {a: 'hey'}])
3
> sumValues([{a: 1}, {a: 2}, {notA: 3}])
3
> sumValues([{a: 'hey'}, {notA: 'b'}, {notA: 3}])
0
 *
 * @since 0.16.0
 */
export const arraySumWith = accessor => _.reduceWith((acc, item) => {
	const value = accessor(item);

	return acc + (isNumber(value) ? value : 0);
}, 0)

/**
 * Return the average of values of a {key, value}[] array
 *
 * @function
 * @arg {function} accessor - Any -> Number
 * @return {function} - Array -> Number
 *
 * @example
> makeAverageOfA = makeAverageWith(_.getKey('a'));
> makeAverageOfA([
	{a: 1, b: 2},
	{a: 10, b: 7},
	{a: 7, b: 9},
])
> makeAverageOfA([
	{a: 11, b: 4},
	{a: 7, b: 9},
	{a: 9, b: 0},
])
9
 *
 * @since 0.11.0
 */
export const makeAverageWith = accessor => _.pipe([
	_.collect([arraySumWith(accessor), getLength]),
	_.apply(_.divide),
]);
