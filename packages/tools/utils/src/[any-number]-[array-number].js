/**
* @module @svizzle/utils/[any-number]-[array-number]
*/

import * as _ from 'lamb';

import {getLength} from './iterable-number';
import {arraySum} from './array-number';

/**
 * Return the average of values of a {key, value}[] array
 *
 * @function
 * @arg {array} – {key, value}[]
 * @return {number}
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
 * @version 0.11.0
 */
export const makeAverageWith = getter => _.pipe([
	_.collect([
		_.pipe([_.mapWith(getter), arraySum]),
		getLength
	]),
	_.apply(_.divide),
]);
