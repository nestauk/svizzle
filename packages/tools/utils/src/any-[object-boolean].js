/**
* @module @svizzle/utils/any-[object-boolean]
*/

import * as _ from 'lamb';
import {isEqualTo} from './any-[any-boolean]';

/**
 * Return a function that returns true if at least one of the input object properties has the provided value.
 *
 * @function
 * @arg {*} Any
 * @return {function} predicate - (Object -> Boolean)
 *
 * @example
> hasTwo = hasValue(2)
> hasTwo({a: 1, b: 2})
true
> hasTwo({a: 1, b: 3})
false

> hasEmptyList = hasValue([])
> hasEmptyList({a: 1, b: []})
true
> hasEmptyList({a: 1, b: 3})
false
 *
 * @version v0.8.0
 */
export const hasValue = value => _.pipe([
	_.pairs,
	_.some(_.pipe([_.getAt(1), isEqualTo(value)]))
]);
