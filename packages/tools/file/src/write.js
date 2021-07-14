/**
* @module @svizzle/file/write
*/

import fs from 'fs';
import stream from 'stream';
import util from 'util';

import * as _ from 'lamb';

const finished = util.promisify(stream.finished);

/**
 * [node environment]
 * Return a promise that writes the provided string to the provided path.
 *
 * @function
 * @arg {string} filePath
 * @arg {string|Buffer|Uint8Array} data - item to write to file
 * @arg {string} [encoding='utf8'] - Encoding {@link https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings|supported by Node Buffer}
 * @return {promise} - @sideEffects: fs.writeFile
 *
 * @example
 *
> writeFile('./foo.txt', JSON.stringify({a: 1, b: 2, c:3}))
.then(() => console.log('saved'))
.catch(err => console.error(err));

$ cat foo.txt
{'a':1,'b':2,'c':3}
$ base64 foo.txt
eyJhIjoxLCJiIjoyLCJjIjozfQ==

> writeFile('./foo.txt', JSON.stringify({a: 1, b: 2, c:3}), 'base64')
.then(x => console.log(x))
.catch(err => console.error(err));

$ cat foo.txt
kV?s
$ base64 foo.txt
a1b2cw==
 *
 * @since 0.5.0
 */
export const writeFile = util.promisify(fs.writeFile);

/**
 * Return a function that expects an object and returns a promise that writes
 * to the provided filepath.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected object
 * @arg {number} indent - The amount of blanks to indent the output file
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> promiseThatReturnsAnObject()
.then(saveObj('destination/path'))
.catch(err => console.error(err));
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/file/write.saveObjects|saveObjects}
 * @see {@link module:@svizzle/file/write.saveObjPassthrough|saveObjPassthrough}
 * @see {@link module:@svizzle/file/write.saveString|saveString}
 * @see {@link module:@svizzle/file/write.saveStringPassthrough|saveStringPassthrough}
 */
export const saveObj = (filepath, indent = 0) => object =>
	writeFile(filepath, JSON.stringify(object, null, indent), 'utf8');

/**
 * Return a function that expects an object and returns a promise that writes
 * to the provided filepath and returns the object.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected object
 * @arg {number} indent - The amount of blanks to indent the output file
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> promiseThatReturnsAnObject()
.then(saveObjPassthrough('destination/path'))
.catch(err => console.error(err));
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 * @see {@link module:@svizzle/file/write.saveObjects|saveObjects}
 * @see {@link module:@svizzle/file/write.saveString|saveString}
 * @see {@link module:@svizzle/file/write.saveStringPassthrough|saveStringPassthrough}
 */
export const saveObjPassthrough = (filepath, indent = 0) =>
	object =>
		writeFile(filepath, JSON.stringify(object, null, indent), 'utf8')
		.then(() => object);

/**
 * Return a function that expects a string and returns a promise that writes
 * to the provided filepath.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected string
 * @return {function} - String -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> promiseThatReturnsAString()
.then(saveString('destination/path'))
.catch(err => console.error(err));
 *
 * @since 0.7.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 * @see {@link module:@svizzle/file/write.saveObjects|saveObjects}
 * @see {@link module:@svizzle/file/write.saveObjPassthrough|saveObjPassthrough}
 * @see {@link module:@svizzle/file/write.saveStringPassthrough|saveStringPassthrough}
 */
export const saveString = filepath =>
	string => writeFile(filepath, string, 'utf8');

/**
 * Return a function that expects a string and returns a promise that writes
 * to the provided filepath and returns the string.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected string
 * @return {function} - String -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> promiseThatReturnsAString()
.then(saveStringPassthrough('destination/path'))
.catch(err => console.error(err));
 *
 * @since 0.7.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 * @see {@link module:@svizzle/file/write.saveObjects|saveObjects}
 * @see {@link module:@svizzle/file/write.saveObjPassthrough|saveObjPassthrough}
 * @see {@link module:@svizzle/file/write.saveString|saveString}
 */
export const saveStringPassthrough = filepath =>
	string => writeFile(filepath, string, 'utf8').then(() => string);

/**
 * Return a function that expects a response and returns a promise that saves
 * the response body to the provided filepath.
 * [node environment]
 *
 * @function
 * @arg {string} filepath - The filepath where to save the body of the expected response.
 * @return {function} - Response -> Promise - @sideEffects: fs.createWriteStream
 *
 * @example
> promiseThatReturnsAResponse()
.then(saveResponse('destination/path'))
.catch(err => console.error(err));
 *
 * @since 0.1.0
 */
export const saveResponse = filepath => response => {
	const dest = fs.createWriteStream(filepath);

	return finished(response.body.pipe(dest));
}

/**
 * Return a promise that resolves when all the provided objects have been written
 * with the provided indentation in the correspondent file paths.
 * [node environment]
 *
 * @function
 * @arg {Object[]} outputs - {filepath, object, indentation}[]
 * @arg {string} outputs[].filepath - path where to save `object`
 * @arg {string} outputs[].object - object to write in `filepath`
 * @arg {number} [outputs[].indentation=2] - The amount of blanks to indent the output file
 * @return {promise} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> saveObjects({
	{
		filepath: OUT_PATH_detectedChangesById,
		object: detectedChangesById
	},
	{
		filepath: OUT_PATH_hierarchy,
		object: hierarchy,
		indentation: 0
	},
})
.catch(err => console.error(err));
 *
 * @since 0.12.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 * @see {@link module:@svizzle/file/write.saveObjPassthrough|saveObjPassthrough}
 * @see {@link module:@svizzle/file/write.saveString|saveString}
 * @see {@link module:@svizzle/file/write.saveStringPassthrough|saveStringPassthrough}
 */
export const saveObjects = array => Promise.all([
	_.map(array, ({filepath, object, indentation = 2}) =>
		saveObj(filepath, indentation)(object)
		.then(() => console.log(`Saved ${filepath}`))
	)
]);	// FIXME: untested, but works in an /atlas script
