/**
* @module @svizzle/utils/object-boolean
*/

import * as _ from "lamb";

import {is0, is1, isGT0} from "./number-boolean";
import {getObjSize} from "./object-number";

/*
 * Return the size of the provided object
 *
 * @function
 * @arg {object} object
 * @return {boolean} boolean
 *
 * @example
hasObjSize1({}) // false
hasObjSize1({a: 1}) // true
hasObjSize1({a: 1, b: 2}) // false
 *
 * @version 0.3.0
 */
export const hasObjSize1 = _.pipe([getObjSize, is1]);


/**
 * Return `true` if the object is empty.
 *
 * {}  => true
 *
 * @function
 * @arg {object} object
 * @return {boolean} boolean
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
 * @return {boolean} boolean
 *
 * @example
 * isObjEmpty({a: 1}) => true
 * isObjEmpty({}) => false
 *
 * @version 0.1.0
 */
export const isObjNotEmpty = _.pipe([getObjSize, isGT0]);
