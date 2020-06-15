/**
* @module @svizzle/utils/array-[array-object]
*/

import * as _ from "lamb";

/**
 * Return a function expecting an array of values and returning an object assigning the values to the provided keys.
 *
 * @function
 * @arg {array} keys - Array of keys
 * @return {function} - Array -> Object
 *
 * @example
const makeWithLatLng = makeWithKeys(["lng", "lat"]);
makeWithLatLng([1, 2]); // {lng: 1, lat: 2}
makeWithLatLng([10, 20]); // {lng: 10, lat: 20}
 *
 * @version 0.2.0
 * @see {@link module:@svizzle/utils/array-[array-object].makeWithValues|makeWithValues}
 * @see {@link module:@svizzle/utils/array-[any-object].makeWith|makeWith}
 */
export const makeWithKeys = keys => _.partial(_.make, [keys, _.__]);

/**
 * Return a function expecting an array of keys and returning an object assigning the keys to the provided values.
 *
 * @function
 * @arg {array} values - Array of values
 * @return {function} - Array -> Object
 *
 * @example
const makeWithTheseValues = makeWithValues([1, 2]);
makeWithTheseValues(["lng", "lat"]); // {lng: 1, lat: 2}
makeWithTheseValues(["foo", "bar"]); // {foo: 1, bar: 2}
 *
 * @version 0.2.0
 * @see {@link module:@svizzle/utils/array-[array-object].makeWithKeys|makeWithKeys}
 * @see {@link module:@svizzle/utils/array-[any-object].makeWith|makeWith}
 */
export const makeWithValues = values => _.partial(_.make, [_.__, values]);
