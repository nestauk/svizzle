/**
* @module @svizzle/file/read
*/

import fs from "fs";
import path from "path";
import util from "util";

import {csvParse, tsvParse} from "d3-dsv";

import {filterJsonExtensions} from "./path";

/**
 * [node environment]
 * Read the file at the provided path and return a promise.
 *
 * @function
 * @arg {string} filePath
 * @arg {string} encoding
 * @return {promise}
 *
 * @example
readFile("source/path.txt")
.then(x => console.log(x))
.catch(err => console.error(err));
// <Buffer 49 27 6d ...0a>

readFile("source/path.txt", 'utf-8')
.then(x => console.log(x))
.catch(err => console.error(err));
// "the file content"
 * @version 0.4.0
 */
export const readFile = util.promisify(fs.readFile);

/**
 * [node environment]
 * Read a directory at the provided path and return a promise.
 *
 * @function
 * @arg {string} dirPath
 * @return {promise}
 *
 * @example
readFile("source/dir/")
.then(x => console.log(x))
.catch(err => console.error(err));
// ['dir1', 'dir2', 'file1.txt', 'file2.txt', 'folder1', 'folder2']
 * @version 0.4.0
 */
export const readDir = util.promisify(fs.readdir);

/**
 * [node environment]
 * Return a promise that reads and then parses a csv file.
 * You can use create a conversionFn using transformValues() from @svizzle/utils
 *
 * @function
 * @arg {string} csvPath - The filepath of the CSV file to read.
 * @arg {function} conversionFn - A function invoked for each row to convert columns values.
 * @see https://github.com/d3/d3-dsv#dsv_parse
 * @return {promise}
 *
 * @example
 * readCsv("source/path", row => ({
 *   name: row.name,
 *   amount: Number(row.amount)
 * }))
 * .then(x => console.log(x))
 * .catch(err => console.error(err));
 * // [{name: "annie", amount: 200}, {name: "joe", amount: 100}]
 *
 * @version 0.1.0
 */
export const readCsv = (csvPath, conversionFn) =>
    readFile(csvPath, "utf-8")
    .then(str => csvParse(str, conversionFn));

/**
 * [node environment]
 * Return a promise that reads and then parses a tsv file.
 * You can use create a conversionFn using transformValues() from @svizzle/utils
 *
 * @function
 * @arg {string} tsvPath - The filepath of the TSV file to read.
 * @arg {function} conversionFn - A function invoked for each row to convert columns values.
 * @see https://github.com/d3/d3-dsv#dsv_parse
 * @return {promise}
 *
 * @example
 * readTsv("source/path", row => ({
 *   name: row.name,
 *   amount: Number(row.amount)
 * }))
 * .then(x => console.log(x))
 * .catch(err => console.error(err));
 * // [{name: "annie", amount: 200}, {name: "joe", amount: 100}]
 *
 * @version 0.3.0
 */
export const readTsv = (tsvPath, conversionFn) =>
    readFile(tsvPath, "utf-8")
    .then(str => tsvParse(str, conversionFn));

/**
 * Return a promise that reads and then parses a json file.
 * [node environment]
 *
 * @function
 * @arg {string} jsonPath - The filepath of the JSON file to read.
 * @return {promise}
 *
 * @example
 * readJson("source/path")
 * .then(x => console.log(x))
 * .catch(err => console.error(err));
 * // [{name: "annie", amount: 200}, {name: "joe", amount: 100}]
 *
 * @version 0.1.0
 */
export const readJson = jsonPath =>
    readFile(jsonPath, "utf-8")
    .then(str => JSON.parse(str));

/**
 * Return a promise returning an array of objects of the json files of a directory.
 * [node environment]
 *
 * @function
 * @arg {string} dirPath - The path of the directory containing the JSON files to read.
 * @return {promise}
 *
 * @example
 * readJson("source/path/")
 * .then(x => console.log(x))
 * .catch(err => console.error(err));
 * // [{contentof: "json1"}, {contentof: "json2"}, {contentof: "json3"}]
 *
 * @version 0.1.0
 */
export const readJsonDir = dirPath =>
    readDir(dirPath, "utf8")
    .then(filterJsonExtensions)
    .then(filenames => Promise.all(
        filenames.map(filename => {
            const filepath = path.join(dirPath, filename);

            return readFile(filepath, "utf-8").then(JSON.parse)
        })
    ));
