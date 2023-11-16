/**
* @module @svizzle/utils/object-boolean
*/

import * as _ from 'lamb';

import {areEqual} from './array-boolean.js';
import {is0, is1, isGT0} from './number-boolean.js';
import {getObjSize} from './object-number.js';

/**
 * Return `true` if all values of the provided object are equal
 *
 * @function
 * @arg {object} object
 * @return {boolean} boolean
 *
 * @example
> areValuesEqual({a: 1, b: 1, c: 1})
true
> areValuesEqual({a: [1, 2], b: [1, 2], c: [1, 2]})
true
> areValuesEqual({a: 1, b: 2, c: 3})
false
> areValuesEqual({a: [1, 2], b: [1, 3], c: [1, 2]})
false
> areValuesEqual({a: 1})
false
> areValuesEqual({})
false
* @see {@link module:@svizzle/utils/[any-any]-[object-array]|areValuesEqualWith}
 *
 * @since 0.21.0
 */
export const areValuesEqual = _.pipe([_.values, areEqual]);

/*
 * Return the size of the provided object
 *
 * @function
 * @arg {object} object
 * @return {boolean} boolean
 *
 * @example
> hasObjSize1({})
false
> hasObjSize1({a: 1})
true
> hasObjSize1({a: 1, b: 2})
false
 *
 * @since 0.3.0
 */
export const hasObjSize1 = _.pipe([getObjSize, is1]);

/*
 * Return true if some of the provided object properties are `null`
 *
 * @function
 * @arg {object} object
 * @return {boolean} boolean
 *
 * @example
> hasSomeNullValues({a: 1})
false
> hasSomeNullValues({a: 1, b: undefined})
false
> hasSomeNullValues({a: 1, b: undefined, c: null})
true
 *
 * @since 0.8.0
 */
export const hasSomeNullValues = _.pipe([
	_.pairs,
	_.some(_.pipe([_.getAt(1), _.isNull])),
]);

/**
 * Return `true` if the object is empty.
 *
 * @function
 * @arg {object} object
 * @return {boolean} boolean
 *
 * @example
> isObjEmpty({})
true
> isObjEmpty({a: 1})
false
 *
 * @since 0.1.0
 */
export const isObjEmpty = _.pipe([getObjSize, is0]);

/**
 * Return `true` if the object is not empty.
 *
 * @function
 * @arg {object} object
 * @return {boolean} boolean
 *
 * @example
> isObjEmpty({a: 1})
true
> isObjEmpty({})
false
 *
 * @since 0.1.0
 */
export const isObjNotEmpty = _.pipe([getObjSize, isGT0]);
