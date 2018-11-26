import * as _ from "lamb";
import isequal from "lodash.isequal";

/**
 * Return a function expecting two array to concatenate
 *
 * @function
 * @arg {array} array
 * @arg {array} array
 * @return {array}
 *
 * @example concat([0, 1, 2], [3, 4]) // [0, 1, 2, 3, 4]
 *
 * @version 0.1.0
 */
export const concat = _.generic(Array.prototype.concat);

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
export const removeAt = indices => {
    const reducer = _.reduceWith((acc, v, i) => {
        if (i !== acc.next) {
            acc.new.push(v);
        } else {
            acc.next = acc.indices[++acc.cursor];
        }

        return acc;
    }, {new: [], indices, next: indices[0], cursor: 0});

    return _.pipe([reducer, _.getKey("new")]);
}

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
        if (isequal(x, item)) {
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
