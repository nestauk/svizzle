import {strict as assert} from "assert";

import {
    makeLines,
    makeRows,
    ndjsonToArray,
    splitByDot,
    splitByEOL,
    splitBySemiColon
} from "./string-array";

describe("String -> Array", function() {
    describe("makeLines", function() {
        it("should return rows in a string", function() {
            const rows1 = makeLines("A,B\n1,2\n3,4\n");
            const rows2 = makeLines("A,B\n1,2\n3,4");
            const expected = ["A,B", "1,2", "3,4"];

            assert.deepStrictEqual(rows1, expected);
            assert.deepStrictEqual(rows2, expected);
        });
    });
    describe("makeRows", function() {
        it("should return rows in a string excluding the first line (the header)", function() {
            const rows1 = makeRows("A,B\n1,2\n3,4\n");
            const rows2 = makeRows("A,B\n1,2\n3,4");
            const expected = ["1,2", "3,4"];

            assert.deepStrictEqual(rows1, expected);
            assert.deepStrictEqual(rows2, expected);
        });
        it("should return an empty array if the provided string has just one line", function() {
            const rows = makeRows("A,B\n");
            assert.deepStrictEqual(rows, []);
        });
    });
    describe("ndjsonToArray", function() {
        it("should return the json object from a ndjson string", function() {
            const array = ndjsonToArray('{"a":1}\n{"b":2}\n\n');
            assert.deepStrictEqual(array, [{a: 1}, {b: 2}]);
        });
    });
    describe("splitting", function() {
        describe("splitByDot", function() {
            it("should return an array by splitting by '.'", function() {
                const array = splitByDot("a.b.c");
                assert.deepStrictEqual(array, ["a", "b", "c"]);
            });
        });
        describe("splitByEOL", function() {
            it("should return an array by splitting by '\\n'", function() {
                const array = splitByEOL("a\nb\nc");
                assert.deepStrictEqual(array, ["a", "b", "c"]);
            });
        });
        describe("splitBySemiColon", function() {
            it("should return an array by splitting by ';'", function() {
                const array = splitBySemiColon("a;b;c");
                assert.deepStrictEqual(array, ["a", "b", "c"]);
            });
        });
    });
});
