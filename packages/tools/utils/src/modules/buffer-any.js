/**
* @module @svizzle/utils/buffer-any
*/

import {exportedJsObjToAny} from './string-any.js';

/**
 * Convert a buffer representing a json object into a javascript object
 *
 * @function
 * @arg {typedArray} - the input buffer
 * @return {*} - the decoded buffer
 *
 * @example
> encoder = new TextEncoder()
undefined
> buffer = encoder.encode('{"a": 1}')
Uint8Array(8) [
  123, 34, 97,  34,
  58, 32, 49, 125
]
> jsonBufferToAny(buffer)
{ a: 1 }
 *
 * @since 0.17.0
 */
export const jsonBufferToAny = (buffer, encoding = 'utf-8') => {
	const decoder = new TextDecoder(encoding);

	return JSON.parse(decoder.decode(buffer))
}

// TODO document and add tests
export const exportedObjBufferToAny = (buffer, encoding = 'utf-8') => {
	const decoder = new TextDecoder(encoding);
	const jsStr = decoder.decode(buffer);
	const json = exportedJsObjToAny(jsStr);

	return json;
}
