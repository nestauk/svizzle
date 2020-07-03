/**
* @module @svizzle/utils/iterable-number
*/

import * as _ from 'lamb';

/**
 * Get the length of the iterable
 *
 * @function
 * @arg {iterable} iterable
 * @return {number}
 *
 * @example
> getLength('a')
1
> getLength('two')
3
> getLength([10])
1
> getLength([3, 7])
2
> function func () {
	return getLength(arguments);
}
> func()
0
> func()
0
> func('a', 'b')
2
 *
 * @version 0.1.0
 */
export const getLength = _.getKey('length');
