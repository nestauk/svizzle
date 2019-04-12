/**
* @module @svizzle/utils/object/boolean
*/

import * as _ from "lamb";

import {is0, isGT0} from "../number/boolean";
import {getObjSize} from "./number";

/**
 * Return `true` if the object is empty.
 *
 * {}  => true
 *
 * @function
 * @arg {object} object
 * @return {boolean}
 *
 * @example
 * isObjEmpty({}) => true
 * isObjEmpty({a: 1}) => false
 *
 * @version 0.1.0
 */
export const isObjEmpty = _.pipe([getObjSize, is0]);

/**
 * Return `true` if the object is not empty.
 *
 * {a: 1}  => true
 *
 * @function
 * @arg {object} object
 * @return {boolean}
 *
 * @example
 * isObjEmpty({a: 1}) => true
 * isObjEmpty({}) => false
 *
 * @version 0.1.0
 */
export const isObjNotEmpty = _.pipe([getObjSize, isGT0]);
