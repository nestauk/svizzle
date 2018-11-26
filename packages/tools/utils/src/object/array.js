import * as _ from "lamb";

import {pairToKeyValueObject} from "../iterable/object";

/**
 * Return an array of {key, value} objects from an object
 *
 *
 * @function
 * @arg {number}
 * @return {boolean}
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
 * @arg {object} - The input object
 * @return {array} - The keys correspondent to truthy values
 *
 * @example
getTruthyKeys({a: true, b: true, c: false}) // ["a", "b"]
getTruthyKeys({a: 1, b: 0, c: false})   // ["a"]
getTruthyKeys({a: [1, 2], b: {a: 1}, c: false})   // ["a", "b"]
 *
 * @version 0.1.0
 */
export const getTruthyKeys = _.pipe([
    _.pickIf(_.identity),
    _.keys
]);
