/**
* @module @svizzle/utils/string-[array-string]
*/

import * as _ from "lamb";

import {join} from "./array_proto-string";

/**
 * Return a function expecting an array to join with the provided separator
 *
 * @function
 * @arg {string} separator
 * @return {function} - Array -> String
 *
 * @example
const joinWithAt = joinWith("@");
joinWithAt([0, 1, 2]) // "1@2@3"
 *
 * @version 0.1.0
 */
export const joinWith = separator => _.partial(join, [_.__, separator]);
