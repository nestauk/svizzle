/**
* @module @svizzle/utils/array-boolean
*/

import * as _ from 'lamb';

/**
 * Return true if all elements of the provided array are truthy
 *
 * @function
 * @arg {array} array
 * @return {boolean}
 *
 * @example
> areAllTruthy([true, true])
true
> areAllTruthy([1, [], [1, 2], {}, {a: 1}, 'a'])
true
> areAllTruthy([false, true])
false
> areAllTruthy([0, {a: 1}])
false
> areAllTruthy(['', {a: 1}])
false
 *
 * @since 0.1.0
 */
export const areAllTruthy = _.every(_.identity);

/**
 * Return true if some elements of the provided array are truthy
 *
 * @function
 * @arg {array} array
 * @return {boolean}
 *
 * @example
> areSomeTruthy([false, true])
true
> areSomeTruthy([0, false, []])
true
> areSomeTruthy([0, false, [1, 2]])
true
> areSomeTruthy([0, false, {}])
true
> areSomeTruthy([0, false, {a: 1}])
true
> areSomeTruthy([0, false, 'a'])
true
> areSomeTruthy([0, ''])
> false
 *
 * @since 0.1.0
 */
export const areSomeTruthy = _.some(_.identity);
