/**
* @module @svizzle/utils/array-number
*/

import * as _ from 'lamb';

import {arraySumWith} from './[any-number]-[array-number].js';
import {getLength} from './iterable-number.js';
import {getValue} from './object-any.js';

/**
 * Return a random number in the specified range.
 *
 * @function
 * @arg {array} range
 * @return {number}
 *
 * @example
> makeRandomNumInRange(1.2, 7.4)
4.2
 *
 * @since 0.1.0
 */
export const makeRandomNumInRange = ([min, max]) =>
	min + (max - min) * Math.random();

/**
 * Return the max of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy},
 {@link module:@svizzle/utils/[any-number]-[array-number].arrayMaxWith|arrayMaxWith}
 *
 * @function
 * @arg {array} array
 * @return {number} max
 *
 * @example
> arrayMax([-1, -2, 0, 1, 2])
2
 *
 * @since 0.1.0
 */
export const arrayMax = _.apply(Math.max);

/**
 * Return the min of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy},
 {@link module:@svizzle/utils/[any-number]-[array-number].arrayMinWith|arrayMinWith}
 *
 * @function
 * @arg {array} array
 * @return {number} min
 *
 * @example
> arrayMin([-1, -2, 0, 1, 2])
-2
 *
 * @since 0.1.0
 */
export const arrayMin = _.apply(Math.min);

/**
 * Return the sum of the numbers in the provided array
 *
 * @function
 * @arg {array} array
 * @return {number} sum
 *
 * @example
> arraySum([1, -2, 3, -4, 5])
3
> arraySum([])
0
 *
 * @since 0.3.0
 */
export const arraySum = _.reduceWith(_.sum, 0);

/**
 * Return the average of the numbers in the provided array
 *
 * @function
 * @arg {array} – number[]
 * @return {number}
 *
 * @example
> arrayAverage([1, 23, 6])
10
 *
 * @since 0.11.0
 */
export const arrayAverage = _.pipe([
	_.collect([arraySum, getLength]),
	_.apply(_.divide),
]);

/**
 * Return the average of values of a {key, value}[] array
 *
 * @function
 * @arg {array} - {key, value}[]
 * @return {number}
 *
 * @example
> keyValueArrayAverage([
	{key: 'a', value: 1},
	{key: 'b', value: 23},
	{key: 'c', value: 6},
])
10
 *
 * @since 0.11.0
 */
export const keyValueArrayAverage = _.pipe([
	_.collect([arraySumWith(getValue), getLength]),
	_.apply(_.divide),
]);
