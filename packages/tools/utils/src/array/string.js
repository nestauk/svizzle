/**
* @module @svizzle/utils/array/string
*/

import * as _ from "lamb";

import {join} from "./proto/string";
import {joinWith} from "../string/fn/array/string";

/**
 * Return a string joining the provided array items with a dash
 *
 * @function
 * @arg {array}
 * @return {string}
 *
 * @example joinWithDash(["a", "b", "c"]) // "a-b-c"
 *
 * @version 0.1.0
 */
export const joinWithDash = joinWith("-");

/**
 * Return a string joining the provided array items with a colon
 *
 * @function
 * @arg {array}
 * @return {string}
 *
 * @example joinWithColon(["a", "b", "c"]) // "a:b:c"
 *
 * @version 0.1.0
 */
export const joinWithColon = joinWith(":");

/**
 * Return a string joining the provided array items with a semicolon
 *
 * @function
 * @arg {array}
 * @return {string}
 *
 * @example joinWithSemicolon(["a", "b", "c"]) // "a;b;c"
 *
 * @version 0.1.0
 */
export const joinWithSemicolon = joinWith(";");
