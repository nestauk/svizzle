/**
* @module @svizzle/utils/array-[object-boolean]
*/

import * as _ from 'lamb';
import {isNot} from './any-[any-boolean]';

/**
 * Return a predicate expecting an object and returning `true` if the value at the provided `key` is the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`
 *
 * @function
 * @arg {array} pair - [key, value]
 * @return {function} predicate - Object -> Boolean
 *
 * @example
> isUSA = isKeyValue(['country_id', 'US'])
> isUSA({country_id: 'GB', id: 123})
false
> isUSA({country_id: 'US', id: 456})
true
 *
 * @since 0.3.0
 */
export const isKeyValue = ([key, value]) => _.pipe([_.getKey(key), _.is(value)]);

/**
 * Return a predicate expecting an object and returning `true` if the value at the provided `key` is not the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`
 *
 * @function
 * @arg {array} pair - [key, value]
 * @return {function} predicate - Object -> Boolean
 *
 * @example
> isNotUSA = isNotKeyValue(['country_id', 'US'])
> isNotUSA({country_id: 'GB', id: 123})
true
> isNotUSA({country_id: 'US', id: 456})
false
 *
 * @since 0.3.0
 */
export const isNotKeyValue = ([key, value]) => _.pipe([_.getKey(key), isNot(value)]);

/**
 * Return a predicate expecting an object and returning `true` if the value at the provided `path` is the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`
 *
 * @function
 * @arg {array} pair - [path, value]
 * @return {function} predicate - Object -> Boolean
 *
 * @example
> isDefaultStatus = isPathValue(['item.status', 'default'])
> isDefaultStatus({item: {status: 'active'}, id: 123})
false
> isDefaultStatus({item: {status: 'default'}, id: 456})
true
 *
 * @since 0.3.0
 */
export const isPathValue = ([path, value]) => _.pipe([_.getPath(path), _.is(value)]);

/**
 * Return a predicate expecting an object and returning `true` if the value at the provided `path` is not the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`
 *
 * @function
 * @arg {array} pair - [path, value]
 * @return {function} predicate - Object -> Boolean
 *
 * @example
> isNotDefaultStatus = isNotPathValue(['item.status', 'default'])
> isNotDefaultStatus({item: {status: 'active'}, id: 123})
true
> isNotDefaultStatus({item: {status: 'default'}, id: 456})
false
 *
 * @since 0.3.0
 */
export const isNotPathValue = ([path, value]) => _.pipe([_.getPath(path), isNot(value)]);
