import * as _ from 'lamb';

/**
* @module @svizzle/utils/[string-boolean]-[object-object]
*/

/**
 * Return a function expecting an object and returning a new object with only
 * the keys satisfying the provided predicate
 *
 * @function
 * @arg {predicate}
 * @return {function} - Object -> Object
 *
 * @example
> keysStartWithA = pickIfKeyWith(makeStartsWith('a'))
> keysStartWithA({a: 1, aa: 2, b: 0, c: 0})
{a: 1, aa: 2}
> keysStartWithA({b: 0, c: 0})
{}
 *
 * @since 0.20.0
 */
export const pickIfKeyWith = predicate => _.pipe([
	_.pairs,
	_.filterWith(_.pipe([_.head, predicate])),
	_.fromPairs
]);

/**
 * Return a function expecting an object and returning a new object without
 * the keys satisfying the provided predicate
 *
 * @function
 * @arg {predicate}
 * @return {function} - Object -> Object
 *
 * @example
> keysDontStartWithA = skipIfKeyWith(makeStartsWith('a'))
> keysDontStartWithA({a: 1, aa: 2, b: 0, c: 0})
{b: 0, c: 0}
> keysStartWithA({b: 0, c: 0})
{b: 0, c: 0}
 *
 * @since 0.20.0
 */
export const skipIfKeyWith = predicate => _.pipe([
	_.pairs,
	_.filterWith(_.pipe([_.head, _.not(predicate)])),
	_.fromPairs
]);
