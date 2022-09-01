/**
* @module @svizzle/utils/string-[object-number]
*/

import * as _ from 'lamb';

import {arrayMaxBy, arrayMinBy} from './string-[array-number].js';

/**
 * Return a function expecting an object of objects and returning the max of values by the provided key.
 * The same can be done by `valuesMaxWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function} - Object -> Number
 *
 * @example
> maxByK1 = valuesMaxBy('k1')
> maxByK1({a: {k1: 1, k2: 20}, b: {k1: 3,  k2: 2}})
3
> maxByK1({a: {k1: 9, k2: 12}, b: {k1: 7,  k2: 2}})
7
 *
 * @since 0.1.0
 */
export const valuesMaxBy = key => _.pipe([
	_.values,
	arrayMaxBy(key)
]);

/**
 * Return a function expecting an object of objects and returning the min of values by the provided key.
 * The same can be done by `valuesMinWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function} - Object -> Number
 *
 * @example
> minByK1 = valuesMinBy('k1')
> minByK1({a: {k1: 1, k2: 20}, b: {k1: 3,  k2: 2}})
1
> minByK1({a: {k1: 9, k2: 12}, b: {k1: 7,  k2: 2}})
7
 *
 * @since 0.1.0
 */
export const valuesMinBy = key => _.pipe([
	_.values,
	arrayMinBy(key)
]);
