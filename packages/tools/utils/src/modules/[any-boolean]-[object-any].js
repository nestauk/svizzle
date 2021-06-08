/**
* @module @svizzle/utils/[any-boolean]-[object-any]
*/

import * as _ from 'lamb';

/**
 * Return a function expecting an object and returning the first of its values
 * satisfying the provided predicate
 *
 * @function
 * @arg {predicate}
 * @return {function} - Object -> Any
 *
 * @example
> findFirstOdd = findValueWith(x => x % 2 === 1);
> findFirstOdd({a: 2, b: 4, c: 3, d: 6, e: 7})
3
> findItem = findValueWith(isKeyValue(['max', 10]))
> findItem({a: {id: 'foo', min: 1, max: 2}, b: {id: 'bar', min: -1, max: 10}, c: {id: 'baz', min: -4, max: 10}})
{id: 'bar', min: -1, max: 10}
 *
 * @since 0.12.0
 */
export const findValueWith = predicate => _.pipe([
	_.values,
	_.findWhere(predicate)
]);
