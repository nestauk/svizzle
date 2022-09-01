/**
* @module @svizzle/utils/[any-any]-[object-number]
*/

import * as _ from 'lamb';

import {arrayMaxWith, arrayMinWith} from './[any-number]-[array-number].js';

/**
 * Return a function expecting an object, applying the provided function to its values and returning the largest of the results.
 *
 * @function
 * @arg {function} fn
 * @return {function} - Object -> Number
 *
 * @example
> maxWithAbsSin = valuesMaxWith(_.pipe([Math.sin, Math.abs]))
> maxWithAbsSin({a: -Math.PI/2, b: -Math.PI/4}))
1
> maxWithAbsSin({a: -Math.PI/4, b: -Math.PI/6}))
0.7071067811865475
 *
 * @since 0.1.0
 */
export const valuesMaxWith = fn => _.pipe([
	_.values,
	arrayMaxWith(fn)
]);

/**
 * Return a function expecting an object, applying the provided function to its values and returning the lowest of the results.
 *
 * @function
 * @arg {function} fn
 * @return {function} - Object -> Number
 *
 * @example
> minWithAbsSin = valuesMinWith(_.pipe([Math.sin, Math.abs]))
> minWithAbsSin({a: -Math.PI/2, b: -Math.PI/4}))
0.7071067811865475
> minWithAbsSin({a: -Math.PI/4, b: -Math.PI/6}))
0.49999999999999994
 *
 * @since 0.1.0
 */
export const valuesMinWith = fn => _.pipe([
	_.values,
	arrayMinWith(fn)
]);
