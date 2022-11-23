import {makeRegexOf, makeSafeRegexOf} from './string-[string-regexp].js';

/**
 * Return a regular expression based on the given string
 *
 * @arg {string} string - The string to create a regular expression for.
 * @return {RegExp} The regular expression created from the given string.
 *
 * @example
> regexOf('foo')
/foo/giu
 */
export const regexOf = string => makeRegexOf('giu')(string);

/**
 * Return a safe regular expression based on the given string
 *
 * @arg {string} string - The string to create a regular expression for.
 * @return {RegExp} The regular expression created from the given string, with any special characters escaped.
 *
 * @example
> safeRegexOf('foo+bar')
/foo\+bar/giu
 */
export const safeRegexOf = string => makeSafeRegexOf('giu')(string);
