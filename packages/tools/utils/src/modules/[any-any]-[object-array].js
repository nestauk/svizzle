/**
* @module @svizzle/utils/[any-any]-[object-array]
*/

import * as _ from 'lamb';

import {pairToKeyValueObjectWith} from './[any-any]-[iterable-object]';

/**
* Return a function expecting an object and returning an array of {key, value} objects
* using the provided accessor to get the `value` of each object.
*
* @function
* @arg {function} accessor - Any -> Any
* @return {function} - Object -> Array
*
* @example
> obj = {k1: {a: 1}, k2: {a: 2}}
> convertToArray = objectToKeyValueArrayWith(_.getKey('a'))
> convertToArray(obj)
[{key: 'k1', value: 1}, {key: 'k2', value: 2}]
 *
 * @version 0.3.0
 */
export const objectToKeyValueArrayWith = accessor => _.pipe([
	_.pairs,
	_.mapWith(pairToKeyValueObjectWith(accessor))
]);

/**
* Return a function expecting an object and returning an array of its value
* processed with the provided function.
* Although the obvious cases can be achieved by mapping on the object _.values,
* this can be useful when we need to use keys too.
*
* @function
* @arg {function} processor - Any -> Any
* @return {function} - Object -> Array
*
* @example
> triplicatedValues = valuesWith(_.add(3));
> triplicatedValues({a: 1, b: 2, c: 3})
[3, 6, 9]

> getFoos = valuesWith(_.getKey('foo'));
> getFoos({a: {foo: 1, bar: 2}, b: {foo: 15, bar: -3}, c: {foo: 4, bar: 12}})
[1, 15, 4]

> keysAndValues = valuesWith((value, key) => `${value} (${key})`);
> keysAndValues({a: 3, b: 5})
['3 (a)', '5 (b)']
 *
 * @version 0.12.0
 */
export const valuesWith = processor => _.pipe([
	_.mapValuesWith(processor),
	_.values,
]);
