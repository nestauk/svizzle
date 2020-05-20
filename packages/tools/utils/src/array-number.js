/**
* @module @svizzle/utils/array-number
*/

import * as _ from "lamb";

/* random */

/**
 * Return a random number in the specified range.
 *
 * @function
 * @arg {array} range
 * @return {number}
 *
 * @example
 * makeRandomNumInRange(1.2, 7.4) // 4.2
 *
 * @version 0.1.0
 */
export const makeRandomNumInRange = ([min, max]) =>
	min + (max - min) * Math.random();

/* max */

/**
 * Return the max of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy},
 {@link module:@svizzle/utils/[any-number]:accumcb-[array-number].arrayMaxWith|arrayMaxWith}
 *
 * @function
 * @arg {array} array
 * @return {number} max
 *
 * @example arrayMax([-1, -2, 0, 1, 2]) // 2
 *
 * @version 0.1.0
 */
export const arrayMax = _.apply(Math.max);

/* min */

/**
 * Return the min of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy},
 {@link module:@svizzle/utils/[any-number]:accumcb-[array-number].arrayMinWith|arrayMinWith}
 *
 * @function
 * @arg {array} array
 * @return {number} min
 *
 * @example arrayMin([-1, -2, 0, 1, 2]) // -2
 *
 * @version 0.1.0
 */
export const arrayMin = _.apply(Math.min);

/**
 * Return the sum of the elements of the provided array
 *
 * @function
 * @arg {array} array
 * @return {number} sum
 *
 * @example
arraySum([1, -2, 3, -4, 5]) // 3
arraySum([]) // 0
 *
 * @version 0.3.0
 */
export const arraySum = _.reduceWith(_.sum, 0);
