import * as _ from 'lamb';

import {isNotNil} from './any-boolean.js';

/**
* @module @svizzle/utils/[string-boolean]-[object-boolean]
*/

/**
 * Return a function expecting an object and returning `true` if the input
 * object has a key satisfying the provided predicate
 *
 * @function
 * @arg {predicate}
 * @return {function} - Object -> Boolean
 *
 * @example
> hasA = hasKeyWith(_.is('a'))
> hasA({a: 2, b: 4, c: 3})
true
> hasA({b: 4, c: 3})
false
 *
 * @since 0.20.0
 */
export const hasKeyWith = predicate => _.pipe([
	_.pairs,
	_.findWhere(_.pipe([_.head, predicate])),
	isNotNil
]);
