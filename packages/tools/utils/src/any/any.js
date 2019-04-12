/**
* @module @svizzle/utils/any/any
*/

import * as _ from "lamb";

import {isValidNumber} from "./boolean";

/**
 * Return an empty array if the input is undefined or identity otherwise.
 *
 * @function
 * @arg {*} - any
 * @return {(*|array)}
 *
 * @example
 * undefined => []
 * [1, 2, 3] => [1, 2, 3]
 * {a: 1} => {a: 1}
 * "a" => "a"
 *
 * @version 0.1.0
 */
export const makeEmptyArrayIfUndefined = x => _.isUndefined(x) ? [] : x;

// export const makeEmptyArrayIfUndefined = _.condition(
//     _.isUndefined,
//     _.always([]),
//     _.identity
// );

/**
 * Return a number if the input can be converted to float, identity otherwise
 *
 * @function
 * @arg {*} any
 * @return {number|*}
 *
 * @example
toFloatOrIdentity("2") // 2
toFloatOrIdentity("2px") // 2
toFloatOrIdentity("") // ""
toFloatOrIdentity("h2o") // "h2o"
toFloatOrIdentity([1.1]) // 1.1
toFloatOrIdentity([1.1, 2]) // 1.1
toFloatOrIdentity([1.1, 2, 3]) // 1.1
toFloatOrIdentity([]) // []
toFloatOrIdentity({a: 1}) // {a: 1}
toFloatOrIdentity(true) // true
toFloatOrIdentity(null) // null
toFloatOrIdentity(undefined) // undefined
 * @version 0.1.0
 */
export const toFloatOrIdentity = x => {
    const parsed = parseFloat(x);

    return isValidNumber(parsed) ? parsed : x;
};

/* taps (TODO test these) */

/**
 * Print and return the input.
 *
 * @function
 * @arg {*} any
 * @return {*} Same as input
 *
 * @example
const doubleTriple = _.pipe([
  tapValue,
  mapWith(x => 2 * x),
  tapValue,
  mapWith(x => 3 * x),
  tapValue
])

doubleTriple([1,2,3])
// returns [6, 12, 18] and logs:
// [1, 2, 3]
// [2, 4, 6]
// [6, 12, 18]
 *
 * @version 0.1.0
 */
export const tapValue = x => {
    console.log(x);

    return x;
}

/**
 * Print the input type and return the input.
 *
 * @function
 * @arg {*} any
 * @return {*} Same as input
 *
 * @example
const size = _.pipe([
  tapType,
  _.values,
  tapType,
  _.getKey("length")
  tapType
])

size({a: 1, b: 2})
// returns "number" and logs:
// "object"
// "object"
// "number"
 *
 * @version 0.1.0
 */
export const tapType = x => {
    console.log(_.type(x));

    return x;
}

/**
 * Print the input type and value and return the input.
 *
 * @function
 * @arg {*} any
 * @return {*} Same as input
 *
 * @example
const size = _.pipe([
  tapTypeAndValue,
  _.values,
  tapTypeAndValue,
  _.getKey("length")
  tapTypeAndValue
])

size({a: 1, b: 2})
// returns 2, "number" and logs:
// "object, {a: 1, b: 2}"
// "object, [1, 2]"
// "number, 2"
 *
 * @version 0.1.0
 */
export const tapTypeAndValue = x => {
    console.log(_.type(x), x);

    return x;
}
