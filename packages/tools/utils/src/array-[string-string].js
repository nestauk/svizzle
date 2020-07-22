/**
* @module @svizzle/utils/array-[string-string]
*/

import * as _ from 'lamb';
import {sliceString} from './string_proto-string';

/**
 * Return a function extracting the portion of a string between the provided indices (first included, second excluded).
 * @see {@link module:@svizzle/utils/string_proto-string.sliceString|sliceString}
 *
 * @function
 * @arg {number[]} range - [beginIndex, endIndex]
 * @arg {number} range.0 - The zero-based index at which to begin extraction
 * @arg {number} [range.1] - Optional. The zero-based index before which to end extraction. If negative, starts counting from the end.
 * @return {function} - Function - String -> Boolean
 *
 * @example
> slicer = sliceStringAt([3, 5])
> slicer('0123456789')
'34'
> slicer('abcdef')
'de'
 *
 * @version 0.5.0
 */
export const sliceStringAt = arr => _.partial(sliceString, [_.__, ...arr]);
