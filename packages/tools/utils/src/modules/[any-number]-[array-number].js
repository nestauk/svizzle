/**
* @module @svizzle/utils/[any-number]-[array-number]
*/

import * as _ from 'lamb';

import {getLength} from './iterable-number.js';
import {isNumber} from './any-boolean.js';

/**
 * Return a function expecting an array of objects and returning the max of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMax|arrayMax},
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example

> maxWithAbsSin = arrayMaxWith(_.pipe([Math.sin, Math.abs]))
> maxWithAbsSin([-Math.PI/2, -Math.PI/4])
1
> maxWithAbsSin([Math.PI/4, Math.PI/6])
0.7071067811865475

 *
 * @since 0.1.0
 */
export const arrayMaxWith = fn => _.reduceWith((max, item) => {
	const value = fn(item);

	return value > max ? value : max;
}, -Infinity);

/**
 * Return a function expecting an array of objects and returning the min of results
 * of applying the provided fuction on all of the array items
 * @see
 {@link module:@svizzle/utils/array-number.arrayMin|arrayMin},
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy}
 *
 * @function
 * @arg {function} fn
 * @return {function} - Array -> Number
 *
 * @example
> minWithAbsSin = arrayMinWith(_.pipe([Math.sin, Math.abs]))
> minWithAbsSin([-Math.PI/2, -Math.PI/4])
0.7071067811865475
> minWithAbsSin([Math.PI/4, Math.PI/6])
0.49999999999999994
 *
 * @since 0.1.0
 */
export const arrayMinWith = fn => _.reduceWith((min, item) => {
	const value = fn(item);

	return value < min ? value : min;
}, Infinity);

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
