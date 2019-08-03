/**
* @module @svizzle/utils/array/fn/array/array
*/

import * as _ from "lamb";
import {__} from "lamb";

/**
 * Return a function expecting an array and that applies the provided transforms to its elements
 *
 * @function
 * @arg {array} transforms - array of functions
 * @return {function}
 *
 * @example
let transformer = makeArrayTransformer([x => x * 20, x => x + 3]);
transformer([2, 2]) // [40, 5]
let transformer = makeArrayTransformer([x => x * 20]);
transformer([1, 1, 1, 1, 1]) // [20]
let transformer = makeArrayTransformer([x => x * 20, x => x + 3]);
transformer([1]) // [20]
 *
 * @version 0.1.0
 */
export const makeArrayTransformer = fnArr => _.pipe([
    _.partial(_.zip, [fnArr, __]),
    _.mapWith(([fn, arg]) => fn(arg))
]);

/**
 * Return a function expecting an array and removing items at the provided indices
 *
 * @function
 * @arg {array} indices
 * @return {function}
 *
 * @example
const removeIndices = removeAt([3, 4, 8])
const removeIndices([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
// [0, 1, 2, 5, 6, 7, 9]
 *
 * @version 0.1.0
 */
export const removeAt = indices => _.reduceWith(
    (acc, v, i, array) => {
        if (i !== acc.next) {
            acc.result.push(v);
        } else {
            acc.next = acc.indices[++acc.cursor];
        }

        if (i === array.length - 1) {
          return acc.result;
        }

        return acc;
    },
    {result: [], indices, next: indices[0], cursor: 0}
);
