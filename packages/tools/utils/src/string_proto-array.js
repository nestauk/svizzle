/**
* @module @svizzle/utils/string_proto-array
*/

import * as _ from 'lamb';

/**
 * Return an array splitting the input string with the provided separator or regex
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split|String.prototype.split},
 {@link module:@svizzle/utils/string-[string-array].makeSplitBy|makeSplitBy},
 {@link module:@svizzle/utils/string-[string-array].makeSplitStringBy|makeSplitStringBy},
 {@link module:@svizzle/utils/string-array.splitByDot|splitByDot},
 {@link module:@svizzle/utils/string-array.splitByEOL|splitByEOL},
 {@link module:@svizzle/utils/string-array.splitBySemiColon|splitBySemiColon}
 *
 * @function
 * @arg {string} string - The input string
 * @arg {stringOrRegex} stringOrRegex - Separator or regex
 * @return {array}
 *
 * @example
> split('a-b-c', '-')
['a', 'b', 'c']
 *
 * @version 0.1.0
 */
export const split = _.generic(String.prototype.split);
