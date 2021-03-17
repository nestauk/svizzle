/**
* @module @svizzle/utils/string-number
*/

/**
 * Return the length of the end of line, if any.
 *
 * @function
 * @arg {string}
 * @return {number}
 *
 * @example
> getEndOfLineLength('hello')
0
> getEndOfLineLength('hello\n')
1
> getEndOfLineLength('hello\r\n')
2
 *
 * @version 0.9.0
 */
export const getEndOfLineLength = s =>
	(/\r\n$/u).test(s) ? 2 : (/\n$/u).test(s) ? 1 : 0;
