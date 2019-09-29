/**
* @module @svizzle/utils/any-any
*/

import * as _ from "lamb";

import {isValidNumber} from "./any-boolean";

/**
 * Return an empty array if the input is undefined or identity otherwise.
 *
 * @function
 * @arg {*} any
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
