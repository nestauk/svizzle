/**
* @module @svizzle/utils/array/fn/object/array
*/

import * as _ from "lamb";
import {__} from "lamb";

/**
 * Return a function expecting an object and returning an array of values corresponding to the provided keys.
 *
 * @function
 * @arg {array} keys - Array of keys
 * @return {function}
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
