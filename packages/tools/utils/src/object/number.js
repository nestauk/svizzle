import * as _ from "lamb";

import {
    arrayMax,
    arrayMaxBy,
    arrayMaxWith,
    arrayMin,
    arrayMinBy,
    arrayMinWith
} from "../array/number";
import {getLength} from "../iterable/number";

/* max */

/**
 * Return the size of the provided object
 *
 * @function
 * @arg {object} object
 * @return {number} size
 *
 * @example getObjSize({a: 1, b: 2}) // 2
 *
 * @version 0.1.0
 */
export const getObjSize = _.pipe([_.keys, getLength]);

/**
 * Return the max of the provided object values
 *
 * @function
 * @arg {object} object
 * @return {number} max
 *
 * @example valuesMax({a: -3, b: 2, c: 1}) // 2
 *
 * @version 0.1.0
 */
export const valuesMax = _.pipe([
    _.values,
    arrayMax
]);

/**
 * Return a function expecting an array of objects and returning the max of values by the provided key
 * The same can be done by `valuesMaxWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function}
 *
 * @example
const maxByK1 = valuesMaxBy("k1");
maxByK1({a: {k1: 1, k2: 20}, b: {k1: 3,  k2: 2}}) // 3
maxByK1({a: {k1: 9, k2: 12}, b: {k1: 7,  k2: 2}}) // 7
 *
 * @version 0.1.0
 */
export const valuesMaxBy = key => _.pipe([
    _.values,
    arrayMaxBy(key)
]);

/**
 * Return a function expecting an object of objects and returning the max of values by the provided key
 * The same can be done by `valuesMaxWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {function} fn
 * @return {function}
 *
 * @example
const maxWithAbsSin = valuesMaxWith(_.pipe([Math.sin, Math.abs]));
maxWithAbsSin({a: -Math.PI/2, b: -Math.PI/4})) // 1
maxWithAbsSin({a: -Math.PI/4, b: -Math.PI/6})) // 0.7071067811865475
 *
 * @version 0.1.0
 */
export const valuesMaxWith = fn => _.pipe([
    _.values,
    arrayMaxWith(fn)
]);

/* min */

/**
 * Return the min of the provided object values
 *
 * @function
 * @arg {object} object
 * @return {number} max
 *
 * @example valuesMin({a: -3, b: 2, c: 1}) // -3
 *
 * @version 0.1.0
 */
export const valuesMin = _.pipe([
    _.values,
    arrayMin
]);

/**
 * Return a function expecting an object of objects and returning the min of values by the provided key
 * The same can be done by `valuesMinWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function}
 *
 * @example
const minByK1 = valuesMinBy("k1");
minByK1({a: {k1: 1, k2: 20}, b: {k1: 3,  k2: 2}}) // 1
minByK1({a: {k1: 9, k2: 12}, b: {k1: 7,  k2: 2}}) // 7
 *
 * @version 0.1.0
 */
export const valuesMinBy = key => _.pipe([
    _.values,
    arrayMinBy(key)
]);

/**
 * Return a function expecting an object of objects and returning the min of values by the provided key
 * The same can be done by `valuesMinWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {function} fn
 * @return {function}
 *
 * @example
const minWithAbsSin = valuesMinWith(_.pipe([Math.sin, Math.abs]));
minWithAbsSin({a: -Math.PI/2, b: -Math.PI/4})) // 0.7071067811865475
minWithAbsSin({a: -Math.PI/4, b: -Math.PI/6})) // 0.49999999999999994
 *
 * @version 0.1.0
 */
export const valuesMinWith = fn => _.pipe([
    _.values,
    arrayMinWith(fn)
]);
