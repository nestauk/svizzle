/**
* @module @svizzle/utils/iterable-boolean
*/

import * as _ from 'lamb';

import {is0, is1, isGT0, isGT1} from './number-boolean';

import {getLength} from './iterable-number';

/**
 * Use to check if an iterable is empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableEmpty('string')
false
> isIterableEmpty('')
true
> isIterableEmpty([1, 2])
false
> isIterableEmpty([])
true
> isIterableEmpty([])
true
> function func () {
	return isIterableEmpty(arguments);
}
> func()
true
> func(1, 2)
false
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
> isIterableNotEmpty('string')
true
> isIterableNotEmpty('')
false
> isIterableNotEmpty([1, 2])
true
> isIterableNotEmpty([])
false
> function func () {
	return isIterableNotEmpty(arguments);
}
> func()
false
> func(1, 2)
true
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
> hasIterableLength1('1')
true
> hasIterableLength1('two')
false
> hasIterableLength1([1])
true
> hasIterableLength1([1, 2])
false
> function func () {
	return hasIterableLength1(arguments);
}
> func()
false
> func(1)
true
> func(1, 2)
false
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
> isIterableLongerThan1('1')
false
> isIterableLongerThan1('two')
true
> isIterableLongerThan1([1])
false
> isIterableLongerThan1([1, 2])
true
> function func () {
	return isIterableLongerThan1(arguments);
}
> func()
false
> func(1)
false
> func(1, 2)
true
 *
 * @version 0.1.0
 */
export const isIterableLongerThan1 = _.pipe([getLength, isGT1]);
