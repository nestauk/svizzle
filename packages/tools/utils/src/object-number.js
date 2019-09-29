/**
* @module @svizzle/utils/object-number
*/

import * as _ from "lamb";

import {arrayMax, arrayMin} from "./array-number";
import {getLength} from "./iterable-number";

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
