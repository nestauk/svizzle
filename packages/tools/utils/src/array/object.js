/**
* @module @svizzle/utils/array/object
*/

import * as _ from "lamb";

/**
 * Return an object with the provided array elements as keys and all values equal to zero
 *
 * @function
 * @arg {array} array
 * @return {object} keyedZeroes
 *
 * @example
makeKeyedZeroes([1, 2]) -> {1: 0, 2: 0}
makeKeyedZeroes(["a", "b"]) -> {a: 0, b: 0}
 *
 * @version 0.1.0
 */
export const makeKeyedZeroes = _.pipe([
    _.collect([_.identity, _.mapWith(_.always(0))]),
    _.apply(_.make)
]);

/**
 * Return an object of occurences of objects in the provided array containing the provided keys
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} occurrences - occurrences of objects with the given keys
 *
 * @example
const objects = [{a: 1}, {a: 6, b: -1}, {a: 2, b: 0, c: 1}, {c: 4, e: 2}];

makeOccurrences(objects, ["a", "b"]) // {a: 3, b: 2}
makeOccurrences(objects, ["c", "e"]) // {c: 2, e: 1}
makeOccurrences(objects, ["k", "a"]) // {k: 0, a: 3}
 *
 * @version 0.1.0
 */
export const makeOccurrences = (items, keys) => _.reduce(items,
    (acc, item) => {
        _.forEach(keys, key => {
            if (_.has(item, key)) {
                acc[key] += 1;
            }
        });

        return acc;
    },
    makeKeyedZeroes(keys)
);

/**
 * Return an object of occurences of all the keys contained in the objects in the provided array
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} occurrences - occurrences of keys
 *
 * @example
const objects = [{a: 1}, {a: 6, b: -1}, {a: 2, b: 0, c: 1}, {c: 4, e: 2}];

makeAllOccurrences(objects) // {a: 3, b: 2, c: 2, e: 1}
 *
 * @version 0.1.0
 */
export const makeAllOccurrences = (items) => _.reduce(items,
    (acc, item) => {
        _.forEach(_.keys(item), key => {
            if (_.has(acc, key)) {
                acc[key] += 1;
            } else {
                acc[key] = 1;
            }
        });

        return acc;
    },
    {}
);

// (items[], keys[]) => {key, value}[]
// export const makeOccurrencesKeyValueArray = _.pipe([
//     makeOccurrences,
//     objectToKeyValueArray
// ]);
// FIXME dependency cycles with objUtils
