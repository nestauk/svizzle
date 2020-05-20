/**
* @module @svizzle/utils/array-[object-array]
*/

import * as _ from "lamb";

import {concat} from "./array_proto-array";

/**
 * Return a function expecting an object and returning an array of values corresponding to the provided keys.
 *
 * @function
 * @arg {array} keys - Array of keys
 * @return {function} - Object -> Array
 *
 * @example
const getCoordinates = makeKeysGetter(["lng", "lat"]);
getCoordinates({
    name: "London",
    lat: 51.507222,
    lng: -0.1275,
    population: 8825000
});
// [-0.1275, 51.507222]
 *
 * @version 0.1.0
 */
export const makeKeysGetter = _.pipe([
	_.mapWith(_.getKey),
	_.collect
]);

/**
 * Return a function expecting an object and concatenating values in the provided whitelisted keys.
 *
 * @function
 * @arg {array} keys - Array of keys
 * @return {function} - Object -> Array
 *
 * @example
const getProducts = pickAndConcatValues(['food', 'beverage']);
getProducts({
    food: ['bread', 'cheese', 'ham'],
    beverage: ['wine', 'water'],
    id: 'area1',
    value: 32.1,
});
// ['bread', 'cheese', 'ham', 'wine', 'water']
 *
 * @version 0.4.0
 */
export const pickAndConcatValues =
	whitelist => _.pipe([
		_.pickKeys(whitelist),
		_.values,
		_.apply(concat)
	]);
