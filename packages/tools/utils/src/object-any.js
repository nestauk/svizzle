/**
* @module @svizzle/utils/object-any
*/

import * as _ from "lamb";

/**
 * Retrieve the 'id' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {any} - object.id
 *
 * @example
getId({id: 'foo', name: 'bar'})
// 'foo'
 *
 * @version 0.4.0
 */
export const getId = _.getKey('id');

/**
 * Retrieve the 'key' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {any} - object.key
 *
 * @example
getKey({key: 'foo', value: 'bar'})
// 'foo'
 *
 * @version 0.4.0
 */
export const getKey = _.getKey('key');

/**
 * Retrieve the 'value' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {any} - object.value
 *
 * @example
getValue({key: 'foo', value: 'bar'})
// 'bar'
 *
 * @version 0.4.0
 */
export const getValue = _.getKey('value');

/**
 * Retrieve the 'values' property of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {any} - object.values
 *
 * @example
getValues({key: 'foo', values: [0, 1, 2, 3]})
// [0, 1, 2, 3]
 *
 * @version 0.4.0
 */
export const getValues = _.getKey('values');
