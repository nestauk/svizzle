/**
* @module @svizzle/file/read
*/

import fs from "fs";
import path from "path";
import util from "util";

import {
  dsvFormat,
  csvParse,
  csvParseRows,
  tsvParse,
  tsvParseRows
} from "d3-dsv";

import {filterJsonExtensions} from "./path";

/**
 * [node environment]
 * Return a promise that reads the file at the provided path.
 *
 * @function
 * @arg {string} filePath
 * @arg {string} [encoding=null] - Encoding {@link https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings|supported by Node Buffer}
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
 * Return a promise that reads the directory at the provided path.
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
 * You can create a conversionFn using transformValues() from @svizzle/utils
 *
 * @function
 * @arg {string} csvPath - The filepath of the CSV file to read.
 * @arg {function} conversionFn - A function invoked for each row to convert columns values.
 * @arg {boolean} [withHeader=true] - Does the first line contain the header?
 * @see https://github.com/d3/d3-dsv#dsv_parse
 * @return {promise}
 * @example
// source/withHeader.csv
name,amount
annie,200
joe,100
readCsv("source/withHeader.csv", row => ({
  name: row.name,
  amount: Number(row.amount)
}))
.then(x => console.log(x))
.catch(err => console.error(err));
// [{name: "annie", amount: 200}, {name: "joe", amount: 100}]

// source/withNoHeader.csv
annie,200
joe,100
readCsv("source/withNoHeader.csv", row => ({
  name: row.name,
  amount: Number(row.amount)
}), false)
.then(x => console.log(x))
.catch(err => console.error(err));
// [{name: "annie", amount: 200}, {name: "joe", amount: 100}]
 * @version 0.1.0
 */
export const readCsv = (
  csvPath,
  conversionFn = _.identity,
  withHeader = true
) =>
    readFile(csvPath, "utf-8")
    .then(str => withHeader
      ? csvParse(str, conversionFn)
      : csvParseRows(str, conversionFn)
    );

/**
 * [node environment]
 * Return a promise that reads and then parses a csv file.
 * You can create a conversionFn using transformValues() from @svizzle/utils
 *
 * @function
 * @arg {string} csvPath - The filepath of the CSV file to read.
 * @arg {function} conversionFn - A function invoked for each row to convert columns values.
 * @arg {boolean} [withHeader=true] - Does the first line contain the header?
 * @see https://github.com/d3/d3-dsv#dsv_parse
 * @return {promise}
 *
 * @example
// source/withHeader.txt
name;amount
annie;200
joe;100

readDsv("source/withHeader.txt", ({name, amount}) => ({
  name,
  amount: Number(amount)
}), ";")
.then(x => console.log(x))
.catch(err => console.error(err));
// [{name: "annie", amount: 200}, {name: "joe", amount: 100}]

// source/withNoHeader.txt
annie|200
joe|100
readDsv("source/withNoHeader.txt", ([name, amount]) => ({
  name,
  amount: Number(amount)
}), "|", false)
.then(x => console.log(x))
.catch(err => console.error(err));
// [{name: "annie", amount: 200}, {name: "joe", amount: 100}]
 *
 * @version 0.4.0
 */
export const readDsv = (
  filePath,
  conversionFn = _.identity,
  separator,
  withHeader = true
) =>
  readFile(filePath, "utf-8")
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
 *
 * @function
 * @arg {string} tsvPath - The filepath of the TSV file to read.
 * @arg {function} conversionFn - A function invoked for each row to convert columns values,
 * @arg {boolean} [withHeader=true] - Does the first line contain the header?
 * @see https://github.com/d3/d3-dsv#dsv_parse
 * @return {promise}
 *
 * @example
// source/withHeader.txt
name\tamount
annie\t200
joe\t100

readTsv("source/withHeader.txt", ({name, amount}) => ({
 name,
 amount: Number(amount)
}))
.then(x => console.log(x))
.catch(err => console.error(err));
// [{name: "annie", amount: 200}, {name: "joe", amount: 100}]

// source/withNoHeader.txt
annie\t200
joe\t100
readTsv("source/withNoHeader.txt", ([name, amount]) => ({
 name,
 amount: Number(amount)
}), false)
.then(x => console.log(x))
.catch(err => console.error(err));
// [{name: "annie", amount: 200}, {name: "joe", amount: 100}]
 *
 * @version 0.3.0
 */
export const readTsv = (
  tsvPath,
  conversionFn = _.identity,
  withHeader = true
) =>
    readFile(tsvPath, "utf-8")
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
 * Return a promise returning an array of objects of the json files of a directory, not recursively.
 * [node environment]
 *
 * @function
 * @arg {string} dirPath - The path of the directory containing the JSON files to read.
 * @return {promise}
 *
 * @example
 * readJsonDir("source/path/")
 * .then(x => console.log(x))
 * .catch(err => console.error(err));
 * // [json1, json, json3, ...]
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
