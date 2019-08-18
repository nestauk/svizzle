/**
* @module @svizzle/utils/array/proto/boolean
*/

import * as _ from "lamb";

/**
 * Return an function expecting a value and returning true if it is included in the provided array
 *
 * @function
 * @arg {array} array
 * @arg {any} any
 * @return {boolean}
 *
 * @example includes([0, 1, 2], 2) // true
 * @example includes([0, 1, 2], 3) // false
 *
 * @version 0.3.0
 */
export const includes = _.generic(Array.prototype.includes);
