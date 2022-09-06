/**
* @module @svizzle/request/json
*/

import {ndjsonToArray} from '@svizzle/utils';
import {text} from 'd3-fetch';

/* ndjson */

/**
 * Return a request to a ndjson file as a promise.
 *
 * @function
 * @arg {string} url - The URL for the request (GET).
 * @return {promise}
 *
 * @example
requestNdjson('ndjson/url')
	.then(x => console.log(x))
	.catch(err => console.error(err));

async function foo() {
	const x = await requestNdjson('ndjson/url');
	// ...;
}
 *
 * @since 0.1.0
 */
export const requestNdjson = url => text(url).then(ndjsonToArray);
