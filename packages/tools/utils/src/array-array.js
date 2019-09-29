/**
* @module @svizzle/utils/array-array
*/

import * as _ from "lamb";
import isEqual from "just-compare";

/**
 * Return an array containing the first and the last element of the provided array.
 *
 * @function
 * @arg {array} array
 * @return {array}
 *
 * @example getFirstAndLast([0, 1, 2, 3, 4]) // [0, 4]
 *
 * @version 0.3.0
 */
export const getFirstAndLast = _.collect([_.head, _.last]);

/**
 * Return a copy of the array with values at the provided indices swapped
 *
 * @function
 * @arg {array} array
 * @arg {integer} index1
 * @arg {integer} index2
 * @return {array}
 *
 * @example swap([0, 1, 2, 3, 4, 5], 1, 4) // [0, 4, 2, 3, 1, 5]
 *
 * @version 0.1.0
 */
export const swap = (array, indexA, indexB) => _.reduce(
    array,
    (acc, item, index, _array) => {
        if (index === indexA) {
            acc.push(_array[indexB]);
        } else if (index === indexB) {
            acc.push(_array[indexA]);
        } else {
            acc.push(item);
        }

        return acc;
    },
    []
);

/**
 * Return a copy of the provided array without all instances of the provided item
 * if the items is in the array or appending the item otherwise.
 *
 * @function
 * @arg {array} array
 * @arg {*} item
 * @return {array}
 *
 * @example
const arr0 =  [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
const arrNo0 =   [1, 2, 3, 4,    1, 2, 3, 4];
const arrTail0 = [1, 2, 3, 4,    1, 2, 3, 4, 0];
const arrTailObj = [1, 2, 3, 4, 1, 2, 3, 4, {a: 1}];

toggleItem(arr0, 0) // arrNo0
toggleItem(arrNo0, 0) // arrTail0
toggleItem(arrNo0, {a: 1}) // arrTailObj
toggleItem(arrTailObj, {a: 1}) // arrNo0
 *
 * @version 0.1.0
 */
export const toggleItem = (array, item) => {
    let found = false;

    let result = _.reduce(array, (acc, x) => {
        if (isEqual(x, item)) {
            found = true;
        } else {
            acc.push(x);
        }

        return acc;
    }, []);

    if (!found) {
        result.push(item);
    }

    return result;
};
