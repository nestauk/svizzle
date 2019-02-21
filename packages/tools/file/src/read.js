/**
* @module @svizzle/file/read
*/

import fs from "fs";
import path from "path";
import util from "util";

import {csvParse} from "d3-dsv";

import {filterJsonExtensions} from "./path";

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

/**
 * Return a promise that reads and then parses a csv file.
 * You can use create a conversionFn using transformValues() from @svizzle/utils
 * [node environment]
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
