/**
* @module @svizzle/utils/string-[string-array]
*/

import * as _ from 'lamb';

import {split} from './string_proto-array.js';
import {trim} from './string_proto-string.js';

/**
 * Return a function expecting a separator or regex to split the provided string
 *
 * @function
 * @arg {string} string - String to split
 * @return {function} - String -> Array
 *
 * @example
> splitStringBy = makeSplitStringBy('a.b-c,d:e')
> splitStringBy(':')
['a.b-c,d', 'e']
> splitStringBy('-')
['a.b', 'c,d:e']
 *
 * @since 0.1.0
 */
export const makeSplitStringBy = _.curry(split, 2);

/**
 * Return a function expecting a string to be split using the provided separator or regex
 * @see
 {@link module:@svizzle/utils/string-array.splitByDot|splitByDot},
 {@link module:@svizzle/utils/string-array.splitByEOL|splitByEOL},
 {@link module:@svizzle/utils/string-array.splitBySemiColon|splitBySemiColon},
 *
 * @function
 * @arg {stringOrRegex} stringOrRegex - Separator or regex
 * @return {function} - String -> Array
 *
 * @example
> splitByDoubleDot = makeSplitBy('..')
> splitByDoubleDot('aa...a..a.a.aa.....aa..')
> ['aa', '.a', 'a.a.aa', '', '.aa', '']
 *
 * @since 0.1.0
 */
export const makeSplitBy = _.curryRight(split, 2);

/**
 * Return a function that splits the expected string and trims all the elements
 * of the returned array
 * @see {@link module:@svizzle/utils/string-[string-array].makeSplitBy|makeSplitBy}
 *
 * @function
 * @arg {string} separator
 * @return {function} - String -> Array
 *
 * @example
> trimSplitByDoubleDot = makeTrimmedSplitBy('..')
>
> trimSplitByDoubleDot('  aa ..\ta\n..a')
['aa', 'a', 'a']
>
> trimSplitByDoubleDot('  aa ...\na..a.a.aa\n.....\taa..\n')
['aa', '.\na', 'a.a.aa', '', '.\taa', '']
 *
 * @since 0.19.0
 */
export const makeTrimmedSplitBy = separator => _.pipe([
	_.splitBy(separator),
	_.mapWith(trim)
]);
