import * as _ from "lamb";

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
export const makeStyle = _.pipe([
    _.pairs,
    _.mapWith(joinWithColon),
    joinWithSemicolon
]);

/**
 * Return a style string from an object
 *
 * @function
 * @arg {number} number
 * @return {string}
 *
 * @example toPx(10) // "10px"
 *
 * @version 0.1.0
 */
export const toPx = number => {
    if (isNumber(number)) {
        return `${number}px`;
    } else {
        throw "toPx: please input a number";
    }
}

/*
// IDEA if value is an obj, convert with appropriate fn()
may be unefficient for primitive values though
{color: "red", "font-size": {fn: toPx, 10}} => "color:red;font-size:10px;"
*/
