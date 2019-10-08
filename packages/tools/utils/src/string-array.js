/**
* @module @svizzle/utils/string-array
*/

import * as _ from "lamb";

import {reduceFromEmptyArray} from "./function-[array-any]";
import {trim} from "./string_proto-string";
import {isTrimmedNotEmpty} from "./string-boolean";
import {makeSplitBy} from "./string-[string-array]";

/**
 * Return an array by splitting by "."
 * @see {@link module:@svizzle/utils/string-[string-array].makeSplitBy|makeSplitBy}
 *
 * @function
 * @arg {string} string
 * @return {array}
 *
 * @example
 * splitByDot("a.b.c") // ["a", "b", "c"]
 *
 * @version 0.1.0
 */
export const splitByDot = makeSplitBy(".");

/**
 * Return an array by splitting by "\n"
 * @see {@link module:@svizzle/utils/string-[string-array].makeSplitBy|makeSplitBy}
 *
 * @function
 * @arg {string} string
 * @return {array}
 *
 * @example
 * splitByDot("a\nb\nc") // ["a", "b", "c"]
 *
 * @version 0.1.0
 */
export const splitByEOL = makeSplitBy("\n");

/**
 * Return an array by splitting by ";"
 * @see {@link module:@svizzle/utils/string-[string-array].makeSplitBy|makeSplitBy}
 *
 * @function
 * @arg {string} string
 * @return {array}
 *
 * @example
 * splitBySemiColon("A;B;C") // ["A", "B", "C"]
 *
 * @version 0.1.0
 */
export const splitBySemiColon = makeSplitBy(";");

/**
 * Return rows in a string
 *
 * @function
 * @arg {string} string
 * @return {array}
 *
 * @example
 * makeRows("A,B\n1,2\n3,4\n") // ["A,B", "1,2", "3,4"]
 *
 * @version 0.1.0
 */
export const makeLines = _.pipe([
    trim,
    splitByEOL
]);

/**
 * Return rows in a string excluding the first line (the header).
 * Useful for CSVs.
 *
 * @function
 * @arg {string} string
 * @return {array}
 *
 * @example
 * makeRows("A,B\n1,2\n3,4\n") // ["1,2", "3,4"]
 *
 * @version 0.1.0
 */
export const makeRows = _.pipe([
    trim,
    splitByEOL,
    _.tail
]);

/* ndjson */

/**
 * Return an array from a ndjson string
 *
 * @function
 * @arg {string} ndjsonString
 * @return {array}
 *
 * @example
 * ndjsonToArray('{"a":1}\n{"b":2}\n\n') // [{a: 1}, {b: 2}]
 *
 * @version 0.1.0
 */
export const ndjsonToArray = _.pipe([
    splitByEOL,
    reduceFromEmptyArray((array, str) => {
        if (isTrimmedNotEmpty(str)) {
            array.push(JSON.parse(str))
        }

        return array;
    })
]);
