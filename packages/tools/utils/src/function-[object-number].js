/**
* @module @svizzle/utils/function-[object-number]
*/

import * as _ from "lamb";

import {arrayMaxWith, arrayMinWith} from "./function-[array-number]";

/**
 * Return a function expecting an object of objects and returning the max of values by the provided key
 * The same can be done by `valuesMaxWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {function} fn
 * @return {function} - Object -> Number
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

/**
 * Return a function expecting an object of objects and returning the min of values by the provided key
 * The same can be done by `valuesMinWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {function} fn
 * @return {function} - Object -> Number
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
