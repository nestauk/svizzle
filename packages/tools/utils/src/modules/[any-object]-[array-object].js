/**
* @module @svizzle/utils/[any-object]-[array-object]
*/

import * as _ from 'lamb';

import {reduceFromEmptyObject} from './[any-any]:accumcb-[array-any]';

/**
 * Return a function expecting an array and returning an object of occurrences
 * of all the keys contained in the property reachable with the provided accessor
 * in the items of the provided array
 *
 * @function
 * @arg {function} accessor - (Any -> Object) the accessor to get the object to inspect
 * @return {function} - (Array -> Object) the function to gather the keys occurrencies
 *
 * @example
> items = [
  {foo: 1, bar: {a: 1}},
  {foo: 1, bar: {a: 6, b: -1}},
  {foo: 1, bar: {a: 2, b: 0, c: 1}},
  {foo: 1, bar: {c: 4, e: 2}},
]
> makeAllOccurrences = makeAllOccurrencesWith(_.getKey('bar'))
> makeAllOccurrences(items)
{a: 3, b: 2, c: 2, e: 1}
 *
 * @see {@link module:@svizzle/utils/array-object.makeAllOccurrences|makeAllOccurrences},
 * @version 0.5.0
 */
export const makeAllOccurrencesWith = accessor =>
	reduceFromEmptyObject((acc, item) => {
		_.forEach(_.keys(accessor(item)), key => {
			if (_.has(acc, key)) {
				acc[key] += 1;
			} else {
				acc[key] = 1;
			}
		});

		return acc;
	});
