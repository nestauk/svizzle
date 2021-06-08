/**
* @module @svizzle/utils/number-boolean
*/

import * as _ from 'lamb';

/**
 * Return `true` if the input number is 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is0(0)
true
> is0(2)
false
 *
 * @since 0.1.0
 */
export const is0 = _.is(0);

/**
 * Return `true` if the input number is 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is1(1)
true
> is1(2)
false
 *
 * @since 0.1.0
 */
export const is1 = _.is(1);

/**
 * Return `true` if the input number is greater than 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT0(-1)
false
> isGT0(2)
true
 *
 * @since 0.1.0
 */
export const isGT0 = _.isGT(0);

/**
 * Return `true` if the input number is greater than 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT1(0)
false
> isGT1(2)
true
 *
 * @since 0.1.0
 */
export const isGT1 = _.isGT(1);
