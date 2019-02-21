/**
* @module @svizzle/request/json
*/

import * as _ from "lamb";
import {json, text} from "d3-fetch";
import {text as textRequest, json as jsonRequest} from "d3-request";
import {ndjsonToArray} from "@svizzle/utils";

/* json */

/**
 * Return a request to a JSON file as a promise.
 * Depending on `useFetch` uses the Fetch API or the XMLHttpRequest API.
 *
 * @function
 * @arg {string} url - The URL for the request (GET).
 * @arg {boolean} useFetch -
 *      Use the Fetch API? (default = `true`).
 *      Useful to pass `Modernizr.fetch` to disable the Fetch API if not available.
 * @return {promise}
 *
 * @example
 * requestJson("json/url")
 * .then(x => console.log(x))
 * .catch(err => console.error(err));
 *
 * @example
 * async function foo() {
 *   const x = await requestJson("json/url");
 *   // ...;
 * }
 *
 * @version 0.1.0
 */
export const requestJson = (url, useFetch = true) => useFetch
    ? json(url)
    : new Promise((resolve, reject) => {
        jsonRequest(url, (error, json) => {
            if (error) { reject(error) };
            resolve(json);
        });
    });

/* ndjson */

/**
 * Return a request to a ndjson file as a promise.
 * Depending on `useFetch` uses the Fetch API or the XMLHttpRequest API.
 *
 * @function
 * @arg {string} url - The URL for the request (GET).
 * @arg {boolean} useFetch -
 *      Use the Fetch API? (default = `true`).
 *      Useful to pass `Modernizr.fetch` to disable the Fetch API if not available.
 * @return {promise}
 *
 * @example
 * requestNdjson("ndjson/url")
 * .then(x => console.log(x))
 * .catch(err => console.error(err));
 *
 * @example
 * async function foo() {
 *   const x = await requestNdjson("ndjson/url");
 *   // ...;
 * }
 *
 * @version 0.1.0
 */
export const requestNdjson = (url, useFetch = true) =>
    (useFetch
        ? text(url)
        : new Promise((resolve, reject) => {
            textRequest(url, (error, text) => {
                if (error) { reject(error) };
                resolve(text);
            });
        })
    )
    .then(ndjsonToArray);
