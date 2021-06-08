/**
* @module @svizzle/utils/number-[number-number]
*/

/**
 * Return a function that rounds the input number to the provided number of digits.
 * @see https://github.com/d3/d3-path/issues/10#issuecomment-262577521
 *
 * @function
 * @arg {number} precision - Must be an integer
 * @return {function} - Number -> Number
 *
 * @example
> roundTo2 = roundTo(2)
> roundTo2(2.41285)
2.41
> roundTo2(2.41785)
2.42
 * @since 0.6.0
 */
export const roundTo = precision => x => Number(x.toFixed(precision));
