/**
* @module @svizzle/dom/attrs
*/

import {pairs, mapWith, pipe} from "lamb";

import {
    isNumber,
    joinWithColon,
    joinWithSemicolon
} from "@svizzle/utils";

/**
 * Return a style string from an object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
makeStyle({color: "red", "font-size": "10px"})
// "color:red;font-size:10px"
 *
 * @version 0.1.0
 */
export const makeStyle = pipe([
    pairs,
    mapWith(joinWithColon),
    joinWithSemicolon
]);

/**
 * Return a px representation of the received number.
 * Throws an error if the input is not a number.
 *
 * @function
 * @arg {number} number
 * @return {string}
 *
 * @example toPx(10) // "10px"
 *
 * @version 0.1.0
 */
export const toPx = number => `${number}px`
