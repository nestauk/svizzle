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
> postfixed = makePostfix('---')
> postfixed('A')
'A---'
> postfixed('B')
'B---'
 *
 * @version 0.12.0
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
 * @version 0.1.0
 */
export const makePrefixed = prefix => string => prefix + string;
