/**
* @module @svizzle/request/json
*/

import {ndjsonToArray} from '@svizzle/utils';
import {text} from 'd3-fetch';

/* ndjson */

/**
 * Return a request to a ndjson file as a promise.
 * Depending on `useFetch` uses the Fetch API or the XMLHttpRequest API.
 *
 * @function
 * @arg {string} url - The URL for the request (GET).
 * @arg {boolean} [useFetch=true] -
 *      Use the Fetch API? (default = `true`).
 *      Useful to pass `Modernizr.fetch` to disable the Fetch API if not available.
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
