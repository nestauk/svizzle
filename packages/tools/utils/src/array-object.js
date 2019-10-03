/**
* @module @svizzle/utils/array-object
*/

import * as _ from "lamb";
import {makeKeyed} from "./any-[array-object]";
import {reduceFromEmptyObject} from "./function-[array-any]";

/**
 * Return an object built using 'key's and 'value's from the objects in the provided array
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} object
 *
 * @example
const objects = [
  {key: "ITA", value: 0},
  {key: "FRA", value: 0},
  {key: "BRA", value: 0},
  {key: "GER", value: 1},
  {key: "USA", value: 1},
];

keyValueArrayToObject(objects)
// => {
  "ITA": 0,
  "FRA": 0,
  "BRA": 0,
  "GER": 1,
  "USA": 1
}
 *
 * @version 0.3.0
 */
export const keyValueArrayToObject = objects => _.reduce(objects,
    (acc, {key, value}) => {
        acc[key] = value;
        return acc;
    },
    {}
);

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
export const makeKeyedZeroes = makeKeyed(0);

/**
 * Return an object of occurrences of keys in the provided array containing the provided keys
 *
 * @function
 * @arg {array} objects - array of objects
 * @arg {array} keys - array of keys
 * @return {object} occurrences - occurrences of keys
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
 * Return an object of occurrences of all the keys contained in the objects in the provided array
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
export const makeAllOccurrences = reduceFromEmptyObject((acc, item) => {
  _.forEach(_.keys(item), key => {
    if (_.has(acc, key)) {
      acc[key] += 1;
    } else {
      acc[key] = 1;
    }
  });

  return acc;
});

// (items[], keys[]) => {key, value}[]
// export const makeOccurrencesKeyValueArray = _.pipe([
//     makeOccurrences,
//     objectToKeyValueArray
// ]);
// FIXME dependency cycles with objUtils

/**
 * Merge all the objects in the provided array.
 * The result depends on the order of the objects in the array.
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} - merged objects
 *
 * @example
mergeObjects([{a: 1}, {a: 6, b: -1}, {b: 1}]) // {a: 6, b: 1}
mergeObjects([{b: 1}, {a: 6, b: -1}, {a: 1}]) // {a: 1, b: -1}
 *
 * @version 0.5.0
 */
export const mergeObjects = reduceFromEmptyObject((acc, item) => {
  _.forEach(_.pairs(item), ([key, value]) => {
    acc[key] = value;
  });

  return acc;
});
// IDEA merging from right just new keys might be faster
