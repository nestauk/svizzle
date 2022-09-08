/**
* @module @svizzle/file/read
*/

import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';

import {exportedJsObjToAny} from '@svizzle/utils';
import {
	dsvFormat,
	csvParse,
	csvParseRows,
	tsvParse,
	tsvParseRows
} from 'd3-dsv';
import {filterWith, fromPairs, identity} from 'lamb';
import {load as parseYaml} from 'js-yaml';

import {filterJsonExtensions} from './path.js';

/**
 * [node environment]
 * Return a promise that reads the file at the provided path.
 *
 * @function
 * @arg {string} filePath
 * @arg {string} [encoding=null] - Encoding {@link https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings|supported by Node Buffer}
 * @return {promise} - @sideEffects: fs.readFile
 *
 * @example
> readFile('source/path.txt')
.then(x => console.log(x))
.catch(err => console.error(err))

<Buffer 49 27 6d ...0a>

> readFile('source/path.txt', 'utf-8')
.then(x => console.log(x))
.catch(err => console.error(err))

'the file content'
 * @since 0.4.0
 */
export const readFile = util.promisify(fs.readFile);

/**
 * [node environment]
 * Return a promise that reads the directory at the provided path.
 *
 * @function
 * @arg {string} dirPath
 * @return {promise} - @sideEffects: fs.readdir
 *
 * @example
> readDir('source/dir/')
.then(x => console.log(x))
.catch(err => console.error(err))

['dir1', 'dir2', 'file1.txt', 'file2.txt', 'folder1', 'folder2']
 * @since 0.4.0
 */
export const readDir = util.promisify(fs.readdir);

/**
 * [node environment]
 * Return a promise that reads files in the given directory with a file path satisfying the provided criteria, returning the array with their content parsed with the provided parser.
 *
 * @function
 * @arg {string} dirPath - the directory path
 * @arg {function} filterPathFn - (String -> Boolean) predicate to filter the filepaths (e.g. ()
 * @arg {function} parseFn - (String -> Any) target file parser
 * @return {promise} - @sideEffects: fs.readdir, fs.readFile
 *
 * @example
$ ls -a source/dir
.   01.csv  foo.txt  .foo
..  02.csv  bar.json
$ cat source/dir/.foo
hidden foo
$ cat source/dir/foo.txt
foo
$ cat source/dir/bar.json
{"a": 1}
$ cat source/dir/01.csv
a,b
foo,1
bar,2
$ cat source/dir/02.csv
foo,1
bar,2

> readDirFiles('source/dir/')
.then(x => console.log(x))
.catch(err => console.error(err))

[
	'a,b\nfoo,1\nbar,2',
	'foo,1\nbar,2',
	'foo',
	'{"a": 1}',
	'hidden foo'
]

> readDirFiles('source/dir/', isPathCSV)
.then(x => console.log(x))
.catch(err => console.error(err))

['a,b\nfoo,1\nbar,2', 'foo,1\nbar,2']

> readDirFiles('source/dir/', isPathCSV, d3.csvParseRows)
.then(x => console.log(x))
.catch(err => console.error(err))

[
	[['a', 'b'], ['foo', '1'], ['bar', '2']],
	[['foo', '1'], ['bar', '2']]
]
 * @since 0.9.0
 */
export const readDirFiles = (
	dirPath,
	filterPathFn,
	parseFn
) =>
	readDir(dirPath, 'utf8')
	.then(filterPathFn ? filterWith(filterPathFn) : identity)
	.then(filenames => Promise.all(
		filenames.map(filename => {
			const filepath = path.join(dirPath, filename);
			const promise = readFile(filepath, 'utf-8')

			return parseFn ? promise.then(parseFn) : promise
		})
	));

/**
 * [node environment]
 * Return a promise that reads files in the given directory with a file path satisfying the provided criteria, returning their content parsed with the provided parser indexed by file name.
 * From v0.10.0, `withFilepathAsKey` drives what to get as keys.
 *
 * @function
 * @arg {string} dirPath - the directory path
 * @arg {function} filterPathFn - (String -> Boolean) predicate to filter the filepaths (e.g. ()
 * @arg {function} parseFn - (String -> Any) target file parser
 * @arg {boolean} [withFilepathAsKey=false] - defaults to `false`, to return objects with file names as keys; if `true`, keys are file paths.
 * @return {promise} - @sideEffects: fs.readdir, fs.readFile
 *
 * @example
$ ls -a test_assets/
.   .foo  ab.csv    foo.txt
..  .bar  rows.csv  bar.json
$ cat test_assets/ab.csv
a,b
foo,1
bar,2
$ cat test_assets/rows.csv
foo,1
bar,2

> readDirFilesIndexed('source/dir/', isPathCSV, d3.csvParseRows)
.then(x => console.log(x))
.catch(err => console.error(err))

{
	'ab.csv': [['a', 'b'], ['foo', '1'], ['bar', '2']],
	'rows.csv': [['foo', '1'], ['bar', '2']]
}
 * @since 0.9.0
 */
export const readDirFilesIndexed = (
	dirPath,
	filterPathFn,
	parseFn,
	withFilepathAsKey = false
) =>
	readDir(dirPath, 'utf8')
	.then(filterPathFn ? filterWith(filterPathFn) : identity)
	.then(filenames => Promise.all(
		filenames.map(filename => {
			const filepath = path.join(dirPath, filename);

			return readFile(filepath, 'utf-8')
			.then(content => [
				withFilepathAsKey ? filepath : filename,
				parseFn ? parseFn(content) : content
			]);
		})
	))
	.then(fromPairs)

/**
 * [node environment]
 * Return a promise that reads and then parses a csv file.
 * You can create a conversionFn using transformValues() from @svizzle/utils
 * @see https://github.com/d3/d3-dsv#dsv_parse
 *
 * @function
 * @arg {string} csvPath - The filepath of the CSV file to read.
 * @arg {function} [conversionFn=x=>x] - A function invoked for each row to convert columns values.
 * @arg {boolean} [withHeader=true] - Does the first line contain the header?
 * @return {promise} - @sideEffects: fs.readFile
 *
 * @example
$ cat source/withHeader.csv
name,amount
annie,200
joe,100

> readCsv('source/withHeader.csv', row => ({
	name: row.name,
	amount: Number(row.amount)
}))
.then(x => console.log(x))
.catch(err => console.error(err))

[{name: 'annie', amount: 200}, {name: 'joe', amount: 100}]

$ cat source/withNoHeader.csv
annie,200
joe,100

> readCsv('source/withNoHeader.csv', row => ({
	name: row.name,
	amount: Number(row.amount)
}), false)
.then(x => console.log(x))
.catch(err => console.error(err))

[{name: 'annie', amount: 200}, {name: 'joe', amount: 100}]
 * @since 0.1.0
 */
export const readCsv = (
	csvPath,
	conversionFn = x => x,
	withHeader = true
) =>
	readFile(csvPath, 'utf-8')
	.then(str => withHeader
		? csvParse(str, conversionFn)
		: csvParseRows(str, conversionFn)
	);

/**
 * [node environment]
 * Return a promise that reads and then parses a file.
 * You can create a conversionFn using transformValues() from @svizzle/utils
 * @see https://github.com/d3/d3-dsv#dsv_parse
 *
 * @function
 * @arg {string} csvPath - The filepath of the CSV file to read.
 * @arg {string} separator - Separator string.
 * @arg {function} [conversionFn=x=>x] - A function invoked for each row to convert columns values.
 * @arg {boolean} [withHeader=true] - Does the first line contain the header?
 * @return {promise} - @sideEffects: fs.readFile
 *
 * @example
$ cat source/withHeader.txt
name;amount
annie;200
joe;100

> readDsv('source/withHeader.txt', ({name, amount}) => ({
	name,
	amount: Number(amount)
}), ';')
.then(x => console.log(x))
.catch(err => console.error(err))

[{name: 'annie', amount: 200}, {name: 'joe', amount: 100}]

$ cat source/withNoHeader.txt
annie|200
joe|100

> readDsv('source/withNoHeader.txt', ([name, amount]) => ({
	name,
	amount: Number(amount)
}), '|', false)
.then(x => console.log(x))
.catch(err => console.error(err))

[{name: 'annie', amount: 200}, {name: 'joe', amount: 100}]
 *
 * @since 0.4.0
 */
export const readDsv = (
	filePath,
	separator,
	conversionFn = x => x,
	withHeader = true
) =>
	readFile(filePath, 'utf-8')
	.then(str => {
		const parser = dsvFormat(separator);

		return withHeader
			? parser.parse(str, conversionFn)
			: parser.parseRows(str, conversionFn)
	});

/**
 * [node environment]
 * Return a promise that reads and then parses a tsv file.
 * You can create a conversionFn using transformValues() from @svizzle/utils
 * @see https://github.com/d3/d3-dsv#dsv_parse
 *
 * @function
 * @arg {string} tsvPath - The filepath of the TSV file to read.
 * @arg {function} [conversionFn=x=>x] - A function invoked for each row to convert columns values,
 * @arg {boolean} [withHeader=true] - Does the first line contain the header?
 * @return {promise} - @sideEffects: fs.readFile
 *
 * @example
$ cat source/withHeader.txt
name\tamount
annie\t200
joe\t100

> readTsv('source/withHeader.txt', ({name, amount}) => ({
	name,
	amount: Number(amount)
}))
.then(x => console.log(x))
.catch(err => console.error(err))

[{name: 'annie', amount: 200}, {name: 'joe', amount: 100}]

$ cat source/withNoHeader.txt
annie\t200
joe\t100

> readTsv('source/withNoHeader.txt', ([name, amount]) => ({
	name,
	amount: Number(amount)
}), false)
.then(x => console.log(x))
.catch(err => console.error(err))

[{name: 'annie', amount: 200}, {name: 'joe', amount: 100}]
 *
 * @since 0.3.0
 */
export const readTsv = (
	tsvPath,
	conversionFn = x => x,
	withHeader = true
) =>
	readFile(tsvPath, 'utf-8')
	.then(str => withHeader
		? tsvParse(str, conversionFn)
		: tsvParseRows(str, conversionFn)
	);

/**
 * Return a promise that reads and then parses a json file.
 * [node environment]
 *
 * @function
 * @arg {string} jsonPath - The filepath of the JSON file to read.
 * @return {promise} - @sideEffects: fs.readFile
 *
 * @example
> readJson('source/filepath.json')
.then(x => console.log(x))
.catch(err => console.error(err))

[{name: 'annie', amount: 200}, {name: 'joe', amount: 100}]
 *
 * @since 0.1.0
 */
export const readJson = jsonPath =>
	readFile(jsonPath, 'utf-8')
	.then(str => JSON.parse(str));

/**
 * Return a promise returning an array of objects of the JSON files of a
 * directory, not recursively.
 * [node environment]
 *
 * @function
 * @arg {string} dirPath - The path of the directory containing the JSON files to read.
 * @return {promise} - @sideEffects: fs.readdir, fs.readFile
 *
 * @example
> readJsonDir('source/path/')
.then(x => console.log(x))
.catch(err => console.error(err))

[{'a': 1}, '{'a': 2}', '{'a': 2}']
 *
 * @since 0.1.0
 */
export const readJsonDir = dirPath =>
	readDir(dirPath, 'utf8')
	.then(filterJsonExtensions)
	.then(filenames => Promise.all(
		filenames.map(filename => {
			const filepath = path.join(dirPath, filename);

			return readFile(filepath, 'utf-8').then(JSON.parse)
		})
	));

/**
 * Return a promise that reads and then parses a YAML file.
 * [node environment]
 *
 * @function
 * @arg {string} yamlPath - The filepath of the YAML file to read.
 * @return {promise} - @sideEffects: fs.readFile
 *
 * @example
> readYaml('source/filepath.yaml')
.then(x => console.log(x))
.catch(err => console.error(err))

{
	foo: [{a: 1}, {b: 2}],
	bar: [1, 2, 3],
}
 *
 * @since 0.13.0
 */
export const readYaml = yamlPath =>
	readFile(yamlPath, 'utf-8')
	.then(parseYaml);

// TODO document, test
export const readExportedJson = jsFilePath =>
	readFile(jsFilePath, 'utf-8')
	.then(exportedJsObjToAny);
