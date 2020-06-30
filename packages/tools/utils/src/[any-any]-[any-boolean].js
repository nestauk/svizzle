/**
* @module @svizzle/utils/[any-any]-[any-boolean]
*/

import * as _ from 'lamb';

import {
	isArray,
	isNotNaN,
	isNotNil,
	isNotNull,
	isNumber,
	isObject,
	isString,
	isValidNumber,
	toFloatIsValidNumber,
	toNumberisValidNumber,
} from './any-boolean.js';

/**
 * Return a function returning true if the accessed value is an array
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isArrayWith(getValue)({key: 'a', value: [1, 2]}) // true
 *
 * @version 0.5.0
 */
export const isArrayWith = accessor => _.pipe([accessor, isArray]);

/**
 * Return a function returning true if the accessed value is null of undefined
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isNilWith(getValue)({key: 'a', value: null}) // true
isNilWith(getValue)({key: 'a'}) // true
 *
 * @version 0.5.0
 */
export const isNilWith = accessor => _.pipe([accessor, _.isNil]);

/**
 * Return a function returning true if the accessed value is not NaN
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isNotNaNWith(getValue)({key: 'a', value: 1}) // true
 *
 * @version 0.5.0
 */
export const isNotNaNWith = accessor => _.pipe([accessor, isNotNaN]);

/**
 * Return a function returning true if the accessed value is not null of undefined
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isNotNilWith(getValue)({key: 'a', value: 1}) // true
 *
 * @version 0.5.0
 */
export const isNotNilWith = accessor => _.pipe([accessor, isNotNil]);

/**
 * Return a function returning true if the accessed value is not null
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isNotNullWith(getValue)({key: 'a', value: 1}) // true
 *
 * @version 0.5.0
 */
export const isNotNullWith = accessor => _.pipe([accessor, isNotNull]);

/**
 * Return a function returning true if the accessed value is null
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isNullWith(getValue)({key: 'a', value: null}) // true
 *
 * @version 0.5.0
 */
export const isNullWith = accessor => _.pipe([accessor, _.isNull]);

/**
 * Return a function returning true if the accessed value is a number
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isNumberWith(getValue)({key: 'a', value: 1}) // true
isNumberWith(getValue)({key: 'a', value: 'a'}) // false
 *
 * @version 0.5.0
 */
export const isNumberWith = accessor => _.pipe([accessor, isNumber]);

/**
 * Return a function returning true if the accessed value is an object
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isObjectWith(getValue)({key: 'a', value: {a: 1}}) // true
isObjectWith(getValue)({key: 'a', value: 'a'}) // false
 *
 * @version 0.5.0
 * @see {@link module:@svizzle/utils/any-boolean.isObject|isObject}
 */
export const isObjectWith = accessor => _.pipe([accessor, isObject]);

/**
 * Return a function returning true if the accessed value is a string
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isStringWith(getValue)({key: 'a', value: 'a'}) // false
isStringWith(getValue)({key: 'a', value: 1}) // false
 *
 * @version 0.5.0
 */
export const isStringWith = accessor => _.pipe([accessor, isString]);

/**
 * Return a function returning true if the accessed value is undefined
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isUndefinedWith(getValue)({key: 'a', value: 'a'}) // false
isUndefinedWith(getValue)({key: 'a', value: 1}) // false
 *
 * @version 0.5.0
 */
export const isUndefinedWith = accessor => _.pipe([accessor, _.isUndefined]);

/**
 * Return a function returning true if the accessed value is a valid number
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isValidNumberWith(getValue)({key: 'a', value: 'a'}) // false
isValidNumberWith(getValue)({key: 'a', value: 1}) // false
 *
 * @version 0.5.0
 * @see {@link module:@svizzle/utils/any-boolean.isValidNumber|isValidNumber}
 */
export const isValidNumberWith = accessor => _.pipe([accessor, isValidNumber]);

/**
 * Return a function returning true if the accessed value can be turned into a valid number
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isToNumberValidNumberWith(getValue)({key: 'a', value: '123'}) // true
isToNumberValidNumberWith(getValue)({key: 'a', value: '123px'}) // false
 *
 * @version 0.5.0
 * @see {@link module:@svizzle/utils/any-boolean.toNumberisValidNumber|toNumberisValidNumber}
 */
export const isToNumberValidNumberWith =
  accessor => _.pipe([accessor, toNumberisValidNumber]);

/**
 * Return a function returning true if the accessed value can be turned into a valid number
 *
 * @function
 * @arg {function} accessor
 * @return {function} - Any -> Boolean
 *
 * @example
isToFloatValidNumberWith(getValue)({key: 'a', value: [1]}) // true
isToFloatValidNumberWith(getValue)({key: 'a', value: []}) // false
 *
 * @version 0.5.0
 * @see {@link module:@svizzle/utils/any-boolean.isToFloatValidNumberWith|isToFloatValidNumberWith}
 */
export const isToFloatValidNumberWith =
  accessor => _.pipe([accessor, toFloatIsValidNumber]);
