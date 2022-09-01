/**
* @module @svizzle/utils/[any-boolean]-[array-array]
*/

import * as _ from 'lamb';

import {concat} from './array_proto-array.js';

/**
 * Return a function expecting an array and returning a new array with all items
 * satisfying the provided predicate in the tail, in the same relative order
 * they were in the input array.
 *
 * @function
 * @arg {predicate}
 * @return {function} - Array -> Array
 *
 * @example
> raiseOdds = raiseWith(x => x % 2 === 1);
> raiseOdds([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
[0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
 *
 * @since 0.11.0
 */
export const raiseWith = predicate => _.pipe([
	_.partitionWith(_.not(predicate)),
	_.apply(concat)
]);
