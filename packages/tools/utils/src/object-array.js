/**
* @module @svizzle/utils/object-array
*/

import * as _ from "lamb";

import {reduceFromEmptyArray} from "./[any-any]:accumcb-[array-any]";
import {isArray} from "./any-boolean";
import {concat} from './array_proto-array';
import {isIterableNotEmpty} from "./iterable-boolean";
import {pairToKeyValueObject} from "./iterable-object";
import {pickIfTruthy} from "./object-object";

/**
 * Concatenate the values of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
concatValues({a: [1, 2, 3], b: [4, 5, 6]})
// [1, 2, 3, 4, 5, 6]
 *
 * @version 0.4.0
 */
export const concatValues = _.pipe([_.values, _.apply(concat)]);

/**
 * Return an array of the permutations of the provided object values items, by key.
 * Note that this function assumes the provided object values are arrays.
 *
 * @function
 * @arg {object} object - {string: any[]}
 * @return {array} - object[]
 *
 * @example
 > makeKeyedValuesPermutations({a: [0, 1], b: [2, 3], c: [4, 5]})
[
  {a: 0, b: 2, c: 4}, {a: 1, b: 2, c: 4},
  {a: 0, b: 3, c: 4}, {a: 1, b: 3, c: 4},
  {a: 0, b: 2, c: 5}, {a: 1, b: 2, c: 5},
  {a: 0, b: 3, c: 5}, {a: 1, b: 3, c: 5}
]
 *
 * @version 0.6.0
 */
export const makeKeyedValuesPermutations = _.pipe([
	_.pairs,
	_.filterWith(_.pipe([
		_.last,
		_.allOf([isArray, isIterableNotEmpty])
	])),
	reduceFromEmptyArray((acc, [key, values]) => {
		const props = values.map(value => ({[key]: value}));

		return acc.length === 0
			? props
			: _.flatMap(
				props,
				prop => acc.map(obj => _.merge(obj, prop))
			);
	})
]);

/**
 * Return an array of {key, value} objects from an object
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
const obj = {k1: "v1", k2: "v2"}
objectToKeyValueArray(obj)
// [{key: "k1", value: "v1"}, {key: "k2", value: "v2"}]
 *
 * @version 0.1.0
 */
export const objectToKeyValueArray = _.pipe([
	_.pairs,
	_.mapWith(pairToKeyValueObject)
]);

/**
 * Return the keys of the provided object with a truthy value
 *
 * @function
 * @arg {object} object - The input object
 * @return {array} - The keys correspondent to truthy values
 *
 * @example
getTruthyValuesKeys({a: true, b: true, c: false}) // ["a", "b"]
getTruthyValuesKeys({a: 1, b: 0, c: false})   // ["a"]
getTruthyValuesKeys({a: [1, 2], b: {a: 1}, c: false})   // ["a", "b"]
 *
 * @version 0.1.0
 */
export const getTruthyValuesKeys = _.pipe([pickIfTruthy, _.keys]);
