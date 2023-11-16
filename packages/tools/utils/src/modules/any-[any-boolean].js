/**
* @module @svizzle/utils/any-[any-boolean]
*/

import areEquals from 'just-compare';
import * as _ from 'lamb';

/**
 * Return a function that returns true if the input is different from the provided value.
 *
 * @function
 * @arg {*} any
 * @return {function} predicate - Any -> Boolean
 *
 * @example
> isNotTwo = isNot(2)
> isNotTwo(3)
true
> isNotTwo(2)
false
 *
 * @since v0.3.0
 */
export const isNot = x => _.not(_.is(x));

/**
 * Return a function that returns true if the input value is equal to the provided value.
 * This can be used to compare objects and arrays, but if the input value is of native type {@link https://ascartabelli.github.io/lamb/module-lamb.html#is|_.is} or {@link https://ascartabelli.github.io/lamb/module-lamb.html#isSVZ|_.isSVZ} should be used.
 *
 * @function
 * @arg {*} any
 * @return {function} predicate - Any -> Boolean
 *
 * @example
> isEqualToObj = isEqualTo({a: 1, b: [1,2]})
> isEqualToObj({a: 1, b: [1, 2]})
true
> isEqualToObj({a: 1, b: [1, 2, 3})
false
> isEqualToArray = isEqualTo([1, 2, {a: 1}])
> isEqualToArray([1, 2, {a: 1}])
true
> isEqualToArray([1, 2, {a: 1}, 3])
false
 *
 * @since v0.8.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#is
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#isSVZ
 */
export const isEqualTo = _.curry(areEquals);
