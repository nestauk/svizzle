/**
* @module @svizzle/utils/function-[object-array]
*/

import * as _ from "lamb";

import {pairToKeyValueObjectWith} from "./[any-any]-[iterable-object]";

/**
* Return a function expecting an object and returning an array of {key, value} objects
* using the provided accessor to get the `value` of each object.
*
* @function
* @arg {function} accessor
* @return {function} - Object -> Array
*
* @example
const obj = {k1: {a: 1}, k2: {a: 2}}
const convertToArray = objectToKeyValueArrayWith(_.getKey('a'));
convertToArray(obj) // [{key: "k1", value: 1}, {key: "k2", value: 2}]
 *
 * @version 0.3.0
 */
export const objectToKeyValueArrayWith = accessor => _.pipe([
    _.pairs,
    _.mapWith(pairToKeyValueObjectWith(accessor))
]);
