/**
* @module @svizzle/utils/array_proto-array
*/

import * as _ from "lamb";

/**
 * Return an array by concatenating the provided arrays
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.prototype.concat},
 {@link module:@svizzle/utils/object-array.concatValues|concatValues},
 {@link module:@svizzle/utils/array-[object-array].pickAndConcatValues|pickAndConcatValues},
 {@link module:@svizzle/utils/object-object.mergeWithConcat|mergeWithConcat}
 *
 * @function
 * @arg {...array} array
 * @return {array}
 *
 * @example concat([0, 1, 2], [3, 4], [5, 6]) // [0, 1, 2, 3, 4, 5, 6]
 *
 * @version 0.1.0
 */
export const concat = _.generic(Array.prototype.concat);
