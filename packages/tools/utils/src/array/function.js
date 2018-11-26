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

/**
 * Return a function expecting a number returning true if the number is within the provided range.
 *
 * @function
 * @arg {array} range - range, Array of two numbers
 * @return {function}
 *
 * @example
const isWithinRange = makeIsWithinRange([0, 5]);
isWithinRange(2) // true
isWithinRange(8) // false
 *
 * @version 0.1.0
 */
export const makeIsWithinRange = range => _.allOf([
    _.isGTE(range[0]),
    _.isLTE(range[1])
]);

/**
 * Return a function expecting an array and that applies the provided transforms to its elements
 *
 * @function
 * @arg {array} transforms - array of functions
 * @return {function}
 *
 * @example
let transformer = makeArrayTransformer([x => x * 20, x => x + 3]);
transformer([2, 2]) // [40, 5]
let transformer = makeArrayTransformer([x => x * 20]);
transformer([1, 1, 1, 1, 1]) // [20]
let transformer = makeArrayTransformer([x => x * 20, x => x + 3]);
transformer([1]) // [20]
 *
 * @version 0.1.0
 */
export const makeArrayTransformer = fnArr => _.pipe([
    _.partial(_.zip, [fnArr, __]),
    _.mapWith(([fn, arg]) => fn(arg))
]);
