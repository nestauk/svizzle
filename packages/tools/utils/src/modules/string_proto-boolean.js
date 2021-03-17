/**
* @module @svizzle/utils/string_proto-boolean
*/

import * as _ from 'lamb';

/**
 * Return true if the input string ends with the test string
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith|String.prototype.endsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeEndsWith|makeEndsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeStringEndsWith|makeStringEndsWith}
 *
 * @function
 * @arg {string} string - The input string
 * @arg {string} string - The test string
 * @return {boolean} - True if the input string ends with the test string
 *
 * @example
> endsWith('Ping', 'ing')
true
> endsWith('Pong', 'ing')
false
 *
 * @version 0.5.0
 */
export const endsWith = _.generic(String.prototype.endsWith);

/**
 * Return true if the input string starts with the test string
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith|String.prototype.startsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeStartsWith|makeStartsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeStringStartsWith|makeStringStartsWith}
 *
 * @function
 * @arg {string} string - The input string
 * @arg {string} string - The test string
 * @return {boolean} - True if the input string starts with the test string
 *
 * @example
> startsWith('Ping', 'Pin')
true
> startsWith('Pong', 'Pin')
false
 *
 * @version 0.1.0
 */
export const startsWith = _.generic(String.prototype.startsWith);
