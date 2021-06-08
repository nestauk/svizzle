/**
* @module @svizzle/utils/string-[string-string]
*/

/**
 * Return a function that appends the provided string to the input string
 *
 * @function
 * @arg {string} postfix - The string to be appended
 * @return {function} - String -> String
 *
 * @example
> postfixed = makePostfixed('---')
> postfixed('A')
'A---'
> postfixed('B')
'B---'
 *
 * @since 0.12.0
 * @see {@link module:@svizzle/utils/string-[string-string].makePrefixed|makePrefixed}
 */
export const makePostfixed = postfix => string => string + postfix;

/**
 * Return a function that prepends the provided string to the input string
 *
 * @function
 * @arg {string} prefix - The string to be prepended
 * @return {function} - String -> String
 *
 * @example
> prefixed = makePrefixed('---')
> prefixed('A')
'---A'
> prefixed('B')
'---B'
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/string-[string-string].makePostfixed|makePostfixed}
 */
export const makePrefixed = prefix => string => prefix + string;
