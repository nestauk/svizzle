/**
* @module @svizzle/utils/array.proto-array
*/

import * as _ from "lamb";

/**
 * Return an array by concatenating the provided arrays
 *
 * @function
 * @arg {array} array
 * @arg {array} array
 * @return {array}
 *
 * @example concat([0, 1, 2], [3, 4], [5, 6]) // [0, 1, 2, 3, 4, 5, 6]
 *
 * @version 0.1.0
 */
export const concat = _.generic(Array.prototype.concat);
