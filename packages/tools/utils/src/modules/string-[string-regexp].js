import rescape from 'escape-string-regexp';

/**
 * Creates a regular expression using the flags provided
 * @arg {string} flags - flags to be used for creating regexps
 * @return {function} - String -> RegExp
 *
 * @example
> const regex = makeRegexOf('giu')('foo+bar')
/foo+bar/giu
 */
export const makeRegexOf = flags =>
	string => new RegExp(string, flags);

/**
 * Creates an escaped regular expression using the flags provided to prevent
 * regexp injections from source strings
 * @arg {string} flags - flags to be used for creating regexps
 * @return {function} - String -> RegExp
 *
 * @example
> regex = makeSafeRegexOf('giu')('foo+bar')
/foo\+bar/giu
 */
export const makeSafeRegexOf = flags =>
	string => new RegExp(rescape(string), flags);
