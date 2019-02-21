/**
* @module @svizzle/utils/array/fn/array/object
*/

import * as _ from "lamb";
import {__} from "lamb";

/**
 * Return a function expecting an array of values and returning an object assigning the values to the provided keys.
 *
 * @function
 * @arg {array} keys - Array of keys
 * @return {function}
 *
 * @example
const makeWithLatLng = makeWithKeys(["lng", "lat"]);
makeWithLatLng([1, 2]); // {lng: 1, lat: 2}
makeWithLatLng([10, 20]); // {lng: 10, lat: 20}
 *
 * @version 0.2.0
 */
export const makeWithKeys = keys => _.partial(_.make, [keys, __]);

/**
 * Return a function expecting an array of keys and returning an object assigning the keys to the provided values.
 *
 * @function
 * @arg {array} values - Array of values
 * @return {function}
 *
 * @example
const makeWithTheseValues = makeWithValues([1, 2]);
makeWithTheseValues(["lng", "lat"]); // {lng: 1, lat: 2}
makeWithTheseValues(["foo", "bar"]); // {foo: 1, bar: 2}
 *
 * @version 0.2.0
 */
export const makeWithValues = values => _.partial(_.make, [__, values]);
