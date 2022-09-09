/**
* @module @svizzle/file/write
*/

import fs from 'node:fs';
import stream from 'node:stream';
import util from 'node:util';

import {dump as toYamlString} from 'js-yaml';
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
 * [node environment]
 * Return a function that expects an object and returns a promise that writes
 * the input object to the provided filepath.
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected object
 * @arg {(number|string)} [indent=0] - The amount of spaces or the string to be used to indent
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> obj = {a: 1, b: 2}
> promiseThatReturnsTheObject()
.then(saveObj('destination/path.json'))
.catch(err => console.error(err));

$ cat destination/path.json
{"a": 1, "b": 2}

> promiseThatReturnsTheObject()
.then(saveObj('destination/path.json', 2))
.catch(err => console.error(err));

$ cat destination/path.json
{
  "a": 1,
  "b": 2
}

> promiseThatReturnsTheObject()
.then(saveObj('destination/path.json', '\t'))
.catch(err => console.error(err));

$ cat destination/path.json
{
	"a": 1,
	"b": 2
}
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/file/write.saveObjects|saveObjects}
 * @see {@link module:@svizzle/file/write.saveObjPassthrough|saveObjPassthrough}
 * @see {@link module:@svizzle/file/write.saveYaml|saveYaml}
 * @see {@link module:@svizzle/file/write.saveYamlPassthrough|saveYamlPassthrough}
 */
export const saveObj = (filepath, indent = 0) => object =>
	writeFile(filepath, JSON.stringify(object, null, indent), 'utf8');

/**
 * [node environment]
 * Return a function that expects an object and returns a promise that writes
 * the input object to the provided filepath and returns the object.
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected object
 * @arg {(number|string)} [indent=0] - The amount of spaces or the string to be used to indent
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> obj = {a: 1, b: 2}
> promiseThatReturnsTheObject()
.then(saveObjPassthrough('destination/path.json'))
.then(x => console.log(x))
.catch(err => console.error(err));
{a: 1, b: 2}

$ cat destination/path.js
export default {"a": 1, "b": 2};

> promiseThatReturnsTheObject()
.then(saveObjPassthrough('destination/path.json', 2))
.then(x => console.log(x))
.catch(err => console.error(err));
{a: 1, b: 2}

$ cat destination/path.js
export default {
  "a": 1,
  "b": 2
};

> promiseThatReturnsTheObject()
.then(saveObjPassthrough('destination/path.json', '\t'))
.then(x => console.log(x))
.catch(err => console.error(err));
{a: 1, b: 2}

$ cat destination/path.js
export default {
	"a": 1,
	"b": 2
};
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 * @see {@link module:@svizzle/file/write.saveObjects|saveObjects}
 * @see {@link module:@svizzle/file/write.saveYaml|saveYaml}
 * @see {@link module:@svizzle/file/write.saveYamlPassthrough|saveYamlPassthrough}
 */
export const saveObjPassthrough = (filepath, indent = 0) =>
	object =>
		writeFile(filepath, JSON.stringify(object, null, indent), 'utf8')
		.then(() => object);

/**
 * [node environment]
 * Return a function that expects a string and returns a promise that writes
 * to the provided filepath.
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
 * @see {@link module:@svizzle/file/write.saveStringPassthrough|saveStringPassthrough}
 */
export const saveString = filepath =>
	string => writeFile(filepath, string, 'utf8');

/**
 * [node environment]
 * Return a function that expects a string and returns a promise that writes
 * to the provided filepath and returns the string.
 *
 * @function
 * @arg {string} filepath - The filepath where to save the expected string
 * @return {function} - String -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> promiseThatReturnsAString()
.then(saveStringPassthrough('destination/path'))
.then(x => console.log(x))
.catch(err => console.error(err));
 *
 * @since 0.7.0
 * @see {@link module:@svizzle/file/write.saveString|saveString}
 */
export const saveStringPassthrough = filepath =>
	string => writeFile(filepath, string, 'utf8').then(() => string);

/**
 * [node environment]
 * Return a function that expects a response and returns a promise that saves
 * the response body to the provided filepath.
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
 * [node environment]
 * Return a promise that resolves when all the provided objects have been written
 * in the correspondent file paths, each with the provided indentation.
 *
 * @function
 * @arg {Object[]} outputs - {filepath, object, indentation}[]
 * @arg {string} outputs[].filepath - path where to save `object`
 * @arg {string} outputs[].object - object to write in `filepath`
 * @arg {(number|string)} [outputs[].indentation=0] - The amount of spaces or the string to be used to indent
 * @return {promise} - Object -> Promise - @sideEffects: fs.writeFile, console.log
 *
 * @example
> saveObjects([
	{
		filepath: filepath1,
		object: object1
	},
	{
		filepath: filepath2,
		object: object2,
		indentation: 2
	},
	{
		filepath: filepath3,
		object: object3,
		indentation: '\t'
	}
])
.catch(err => console.error(err));
 *
 * @since 0.12.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 */
export const saveObjects = array => Promise.all([
	_.map(array, ({filepath, object, indentation = 0}) =>
		saveObj(filepath, indentation)(object)
		.then(() => console.log(`Saved ${filepath}`))
	)
]);	// FIXME: untested, but works in an /atlas script

/**
 * [node environment]
 * Return a function that expects an object and returns a promise that writes
 * to the provided YAML filepath.
 *
 * @function
 * @arg {string} yamlPath - The YAML filepath where to save the expected object
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> obj = {a: 1, b: 2}
> promiseThatReturnsTheObject()
.then(saveYaml('destination/path.yaml'))
.catch(err => console.error(err));

$ cat destination/path.yaml
- a: 1
- b: 2
 *
 * @since 0.13.0
 * @see {@link module:@svizzle/file/write.saveOb|saveOb}
 * @see {@link module:@svizzle/file/write.saveObjPassthrough|saveObjPassthrough}
 */
export const saveYaml = filepath => object =>
	writeFile(filepath, toYamlString(object), 'utf8');

/**
 * [node environment]
 * Return a function that expects an object and returns a promise that writes
 * to the provided YAML filepath and returns the object.
 *
 * @function
 * @arg {string} yamlPath - The YAML filepath where to save the expected object
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> obj = {a: 1, b: 2}
> promiseThatReturnsTheObject()
.then(saveYamlPassthrough('destination/path.yaml'))
.then(x => console.log(x))
.catch(err => console.error(err));
{a: 1, b: 2}

$ cat destination/path.yaml
- a: 1
- b: 2
 *
 * @since 0.13.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 * @see {@link module:@svizzle/file/write.saveObjects|saveObjects}
 */
export const saveYamlPassthrough = filepath => object =>
	writeFile(filepath, toYamlString(object), 'utf8')
	.then(() => object);

/**
 * [node environment]
 * Return a function that expects an object and returns a promise that writes
 * the input object as an exported object in a javascript file to the provided
 * filepath.
 *
 * @function
 * @arg {string} jsFilepath - The javascript filepath where to save the expected object
 * @arg {(number|string)} [indent=0] - The amount of spaces or the string to be used to indent
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> obj = {a: [1, 2], b: [3, 4]}
>
> promiseThatReturnsTheObject()
.then(saveExportedObj('destination/path.js'))
.catch(err => console.error(err));

$ cat destination/path.js
export default {"a": [1, 2], "b": [3, 4]};

> promiseThatReturnsTheObject()
.then(saveExportedObj('destination/path.js', 2))
.catch(err => console.error(err));

$ cat destination/path.js
export default {
  "a": [
    1,
    2
  ],
  "b": [
    3,
    4
  ]
};

> promiseThatReturnsTheObject()
.then(saveExportedObj('destination/path.js', '\t'))
.catch(err => console.error(err));

$ cat destination/path.js
export default {
	"a": [
		1,
		2
	],
	"b": [
		3,
		4
	]
};
 *
 * @since 0.14.0
 * @see {@link module:@svizzle/file/write.saveObj|saveObj}
 */
export const saveExportedObj = (filepath, indent = 0) =>
	object => writeFile(
		filepath,
		`export default ${JSON.stringify(object, null, indent)}\n`,
		'utf8'
	);

/**
 * [node environment]
 * Return a function that expects an object and returns a promise that writes
 * the input object as an exported object in a javascript file to the provided
 * filepath and returns the object.
 *
 * @function
 * @arg {string} jsFilepath - The javascript filepath where to save the expected object
 * @arg {(number|string)} [indent=0] - The amount of spaces or the string to be used to indent
 * @return {function} - Object -> Promise - @sideEffects: fs.writeFile
 *
 * @example
> obj = {a: [1, 2], b: [3, 4]}
>
> promiseThatReturnsTheObject()
.then(saveExportedObjPassthrough('destination/path.js'))
.then(x => console.log(x))
.catch(err => console.error(err));
{a: [1, 2], b: [3, 4]}

$ cat destination/path.js
export default {"a": [1, 2], "b": [3, 4]};

> promiseThatReturnsTheObject()
.then(saveExportedObjPassthrough('destination/path.js', 2))
.then(x => console.log(x))
.catch(err => console.error(err));
{a: [1, 2], b: [3, 4]}

$ cat destination/path.js
export default {
  "a": [
    1,
    2
  ],
  "b": [
    3,
    4
  ]
};

> promiseThatReturnsTheObject()
.then(saveExportedObj('destination/path.js', '\t'))
.then(x => console.log(x))
.catch(err => console.error(err));
{a: [1, 2], b: [3, 4]}

$ cat destination/path.js
export default {
	"a": [
		1,
		2
	],
	"b": [
		3,
		4
	]
};
 * @since 0.14.0
 * @see {@link module:@svizzle/file/write.saveObjPassthrough|saveObjPassthrough}
 */
export const saveExportedObjPassthrough = (filepath, indent = 0) =>
	object => writeFile(
		filepath,
		`export default ${JSON.stringify(object, null, indent)}\n`,
		'utf8'
	).then(() => object);


/**
 * [node environment]
 * Return a promise that resolves when all the provided objects have been
 * written as javascript files in the correspondent file paths, each with the
 * provided indentation.
 *
 * @function
 * @arg {Object[]} outputs - {filepath, object, indentation}[]
 * @arg {string} outputs[].filepath - path where to save `object`
 * @arg {string} outputs[].object - object to write in `filepath`
 * @arg {(number|string)} [outputs[].indentation=0] - The amount of spaces or the string to be used to indent
 * @return {promise} - @sideEffects: fs.writeFile, console.log
 *
 * @example
> saveExportedObjects([
	{
		filepath: filepath1,
		object: object1
	},
	{
		filepath: filepath2,
		object: object2,
		indentation: 2
	},
])
.catch(err => console.error(err));
 *
 * @since 0.14.0
 * @see {@link module:@svizzle/file/write.saveExportedObj|saveExportedObj}
 */
export const saveExportedObjects = array => Promise.all([
	_.map(array, ({filepath, object, indentation = 0}) =>
		saveExportedObj(filepath, indentation)(object)
		.then(() => console.log(`Saved ${filepath}`))
	)
]);
