/**
* @module @svizzle/dev/log/iterable-array
*/

import * as _ from 'lamb';

import {tapValue} from './string-[any-any]';

/**
 * Print the provided array and element and return the result of appending the element to the array
 *
 * @function
 * @arg {iterable} iterable
 * @arg {*} any
 * @return {array} - @sideEffects: console.log
 *
 * @example
> tapAppendTo([1, 2, 3], 4)
[1, 2, 3] // logged
4 // logged
[1, 2, 3, 4]

> tapAppendTo('abc', {a: 1})
'abc' // logged
{a: 1} // logged
['a', 'b', 'c', {a: 1}]
 *
 * @since 0.3.0
 */
export const tapAppendTo = _.tapArgs(
	_.appendTo,
	[tapValue(), tapValue()]
);
