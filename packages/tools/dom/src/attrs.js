/**
* @module @svizzle/dom/attrs
*/

import * as _ from 'lamb';

import {joinWithColon, joinWithSemicolon, makePrefixed} from '@svizzle/utils';

/**
 * Return a style string from an object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
> makeStyle({color: 'red', 'font-size': '10px'})
'color:red;font-size:10px'
 *
 * @version 0.1.0
 */
export const makeStyle = _.pipe([
	_.skipIf(_.isNil),
	_.pairs,
	_.mapWith(joinWithColon),
	joinWithSemicolon
]);

/**
 * Return a style string with hyphenate CSS variables derived from the keys of the expected object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
> makeStyleVars({foo: 'red', 'bar': '10px'})
'--foo:red;--bar:10px'
 *
 * @version 0.4.0
 */
export const makeStyleVars = _.pipe([
	_.skipIf(_.isNil),
	_.pairs,
	_.mapWith(_.pipe([joinWithColon, makePrefixed('--')])),
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
 * @example
> toPx(10)
'10px'
 *
 * @version 0.1.0
 */
export const toPx = number => `${number}px`
