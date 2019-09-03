import {strict as assert} from "assert";
import path from "path";
import * as _ from "lamb";

import {
  readCsv,
  readDir,
  readFile,
  readTsv,
  readJson,
  readJsonDir
} from "./read";

describe("read", function() {
    describe("readFile", function() {
      const aTxt = "I'm a text file\nfor you to read\n";
        it("should read the file at the provided path and return a promise – no encoding",
            async function() {
                const txtPath = path.resolve(__dirname, "../test_assets", "a.txt");
                const buffer = await readFile(txtPath);
                const expected = Buffer.from(aTxt);
                assert.deepStrictEqual(buffer, expected);
            }
        );
        it("should read the file at the provided path and return a promise – with encoding",
            async function() {
                const txtPath = path.resolve(__dirname, "../test_assets", "a.txt");
                const txt = await readFile(txtPath, 'utf-8');
                assert.deepStrictEqual(txt, aTxt);
            }
        );
    });
    describe("readDir", function() {
        const dirItems = [
          'a.txt',
          'a1.json',
          'aDir',
          'ab.csv',
          'ab.tsv',
          'b2.json',
          'multi.json',
        ];
        it("should read a directory at the provided path and return a promise",
            async function() {
                const dirPath = path.resolve(__dirname, "../test_assets");
                const items = await readDir(dirPath, 'utf-8');
                assert.deepStrictEqual(items, dirItems);
            }
        );
    });
    describe("readCsv", function() {
        it("should return a promise that reads and then parses a csv file",
            async function() {
                const csvPath = path.resolve(__dirname, "../test_assets", "ab.csv");
                const conversionFn = row => ({
                    a: row.a,
                    b: Number(row.b)
                });
                const csv = await readCsv(csvPath, conversionFn);

                const csvParsed = [{a: "foo", b: 1}, {a: "bar", b: 2}];
                csvParsed.columns = ["a", "b"];

                assert.deepStrictEqual(csv, csvParsed);
            }
        );
    });
    describe("readTsv", function() {
        it("should return a promise that reads and then parses a tsv file",
            async function() {
                const tsvPath = path.resolve(__dirname, "../test_assets", "ab.tsv");
                const conversionFn = row => ({
                    a: row.a,
                    b: Number(row.b)
                });
                const tsv = await readTsv(tsvPath, conversionFn);

                const tsvParsed = [{a: "foo", b: 1}, {a: "bar", b: 2}];
                tsvParsed.columns = ["a", "b"];

                assert.deepStrictEqual(tsv, tsvParsed);
            }
        );
    });
    describe("readJson", function() {
        it("should return a promise that reads and then parses a json file",
            async function() {
                const aPath = path.resolve(__dirname, "../test_assets", "a1.json");
                const a = await readJson(aPath);
                assert.deepStrictEqual(a, {a: 1});

                const bPath = path.resolve(__dirname, "../test_assets", "b2.json");
                const b = await readJson(bPath);
                assert.deepStrictEqual(b, {b: 2});
            }
        );
    });
    describe("readJsonDir", function() {
        it("should return a promise returning an array of objects of the json files of a directory",
            async function() {
                const dirPath = path.resolve(__dirname, "../test_assets");
                const jsons = await readJsonDir(dirPath);
                assert.deepStrictEqual(jsons, [{a: 1}, {b: 2}, {a: 1, b: 2}]);
            }
        );
    });
});
