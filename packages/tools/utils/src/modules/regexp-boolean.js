/**
 * Returns true if the provided RegExp is empty
 * @arg {RegExp} regexp
 * @return {boolean} - true if RegExp is empty
 */
export const isRegexpEmpty = regexp => regexp.source === '(?:)';

/**
 * Returns true if the provided RegExp is not empty
 * @arg {RegExp} regexp
 * @return {boolean} - true if RegExp is not empty
 */
export const isRegexpNotEmpty = regexp => regexp.source !== '(?:)';
