/**
* @module @svizzle/utils/iterable-boolean
*/

import * as _ from "lamb";

import {is0, is1, isGT0, isGT1} from "./number-boolean";

import {getLength} from "./iterable-number";

/**
 * Use to check if an iterable is empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
 * "string" => false
 * "" => true
 * [1, 2] => false
 * [] => true
 * function func () {
 *   return isIterableEmpty(arguments);
 * }
 * func() // => true
 * func(1, 2) // => false
 *
 * @version 0.1.0
 */
export const isIterableEmpty = _.pipe([getLength, is0]);

/**
 * Use to check if an iterable is not empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
 * "string" => true
 * "" => false
 * [1, 2] => true
 * [] => false
 * function func () {
 *   return isIterableNotEmpty(arguments);
 * }
 * func() // => false
 * func(1, 2) // => true
 *
 * @version 0.1.0
 */
export const isIterableNotEmpty = _.pipe([getLength, isGT0]);

/**
 * Use to check if an iterable has a single element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
 * "1" => true
 * "two" => false
 * [1] => true
 * [1, 2] => false
 * function func () {
 *   return hasIterableLength1(arguments);
 * }
 * func() // => false
 * func(1) // => true
 * func(1, 2) // => false
 *
 * @version 0.1.0
 */
export const hasIterableLength1 = _.pipe([getLength, is1]);

/**
 * Use to check if an iterable has more than an element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
 * "1" => false
 * "two" => true
 * [1] => false
 * [1, 2] => true
 * function func () {
 *   return isIterableLongerThan1(arguments);
 * }
 * func() // => false
 * func(1) // => false
 * func(1, 2) // => true
 *
 * @version 0.1.0
 */
export const isIterableLongerThan1 = _.pipe([getLength, isGT1]);
