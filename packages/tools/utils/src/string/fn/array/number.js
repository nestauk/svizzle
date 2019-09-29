/**
* @module @svizzle/utils/string/fn/array/number
*/

import * as _ from "lamb";

/**
 * Return a function expecting an array of objects and returning the max of values by the provided key.
 * The same can be done by `arrayMaxWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function} - Array -> Number
 *
 * @example

 const maxByA = arrayMaxBy("a");
 maxByA([{a: -1, b: -1}, {a: 0, b: 0}]) // 0
 maxByA([{a: 1, b: 1}, {a: 2, b: -2}]) // 2

 *
 * @version 0.1.0
 */
export const arrayMaxBy = key => _.reduceWith((max, item) => {
    const value = item[key];

    return value > max ? value : max;

    // no need to check if _.has(item, key) because:
    // undefined > -Infinity === false
}, -Infinity);


/**
 * Return a function expecting an array of objects and returning the min of values by the provided key
 * The same can be done by `arrayMinWith(_.getKey(key))` but here we avoid invoking a function for all the items.
 *
 * @function
 * @arg {string} key
 * @return {function} - Array -> Number
 *
 * @example
const minByA = arrayMinBy("a");
minByA([{a: -1, b: -1}, {a: 0, b: 0}]) // -1
minByA([{a: 1, b: 1}, {a: 2, b: -2}]) // 1
 *
 * @version 0.1.0
 */
export const arrayMinBy = key => _.reduceWith((min, item) => {
    const value = item[key];

    return value < min ? value : min;

    // no need to check if _.has(item, key) because:
    // undefined < Infinity === false
}, Infinity);