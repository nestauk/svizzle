/**
* @module @svizzle/file/write
*/

import fs from "fs";
import stream from "stream";
import util from "util";

const finished = util.promisify(stream.finished);
const writeFile = util.promisify(fs.writeFile);

/**
 * Return a function that expects an object and returns a promise that writes
 * to the provided filepath.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected object
 * @arg {number} indent - The amount of blanks to indent the output file
 * @return {function}
 *
 * @example
 * promiseThatReturnsAnObject()
 * .then(saveObj("destination/path"))
 * .catch(err => console.error(err));
 *
 * @version 0.1.0
 */
export const saveObj = (filepath, indent = 0) => object =>
    writeFile(filepath, JSON.stringify(object, null, indent), "utf8");

/**
 * Return a function that expects an object and returns a promise that writes
 * to the provided filepath and then returns the object.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected object
 * @arg {number} indent - The amount of blanks to indent the output file
 * @return {function}
 *
 * @example
 * promiseThatReturnsAnObject()
 * .then(saveObjPassthrough("destination/path"))
 * .catch(err => console.error(err));
 *
 * @version 0.1.0
 */
export const saveObjPassthrough = (filepath, indent = 0) =>
  object =>
    writeFile(filepath, JSON.stringify(object, null, indent), "utf8")
    .then(() => object);

/**
 * Return a function that expects a response and returns a promise that saves
 * the response body to the provided filepath.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the body of the expected response.
 * @return {function}
 *
 * @example
 * promiseThatReturnsAResponse()
 * .then(saveResponse("destination/path"))
 * .catch(err => console.error(err));
 *
 * @version 0.1.0
 */
export const saveResponse = filepath => response => {
    const dest = fs.createWriteStream(filepath);

    return finished(response.body.pipe(dest));
}
