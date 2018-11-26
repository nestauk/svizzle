import {strict as assert} from "assert";

import {
    makeLines,
    makeRows,
    makeSplitBy,
    makeSplitStringBy,
    ndjsonToArray,
    split,
    splitByDot,
    splitByEOL,
    splitBySemiColon
} from "./array";

describe("string -> array", function() {
    describe("makeLines", function() {
        it("should return rows in a string", function() {
            const rows1 = makeLines("A,B\n1,2\n3,4\n");
            const rows2 = makeLines("A,B\n1,2\n3,4");
            const expected = ["A,B", "1,2", "3,4"];

            assert.deepEqual(rows1, expected);
            assert.deepEqual(rows2, expected);
        });
    });
    describe("makeRows", function() {
        it("should return rows in a string excluding the first line (the header)", function() {
            const rows1 = makeRows("A,B\n1,2\n3,4\n");
            const rows2 = makeRows("A,B\n1,2\n3,4");
            const expected = ["1,2", "3,4"];

            assert.deepEqual(rows1, expected);
            assert.deepEqual(rows2, expected);
        });
        it("should return an empty array if the provided string has just one line", function() {
            const rows = makeRows("A,B\n");
            assert.deepEqual(rows, []);
        });
    });
    describe("ndjsonToArray", function() {
        it("should return the json object from a ndjson string", function() {
            const array = ndjsonToArray('{"a":1}\n{"b":2}\n\n');
            assert.deepEqual(array, [{a: 1}, {b: 2}]);
        });
    });
    describe("splitting", function() {
        describe("split", function() {
            it("should return a function that splits the input string with the separator string", function() {
                const array = split("a-b-c", "-");
                assert.deepEqual(array, ["a", "b", "c"]);
            });
        });
        describe("makeSplitStringBy", function() {
            it("should return a function expecting a separator or regex o split the provided string", function() {
                const splitStringBy = makeSplitStringBy("a.b-c,d:e");

                assert.deepEqual(splitStringBy(":"), ["a.b-c,d", "e"]);
                assert.deepEqual(splitStringBy("-"), ["a.b", "c,d:e"]);
            });
        });
        describe("makeSplitBy", function() {
            it("should return a function expecting a string to be split using the provided separator or regex", function() {
                const splitByDoubleDot = makeSplitBy("..");

                assert.deepEqual(
                    splitByDoubleDot("aa...a..a.a.aa.....aa.."),
                    ["aa", ".a", "a.a.aa", "", ".aa", ""]
                );
            });
        });
        describe("splitByDot", function() {
            it("should return an array by splitting by '.'", function() {
                const array = splitByDot("a.b.c");
                assert.deepEqual(array, ["a", "b", "c"]);
            });
        });
        describe("splitByEOL", function() {
            it("should return an array by splitting by '\\n'", function() {
                const array = splitByEOL("a\nb\nc");
                assert.deepEqual(array, ["a", "b", "c"]);
            });
        });
        describe("splitBySemiColon", function() {
            it("should return an array by splitting by ';'", function() {
                const array = splitBySemiColon("a;b;c");
                assert.deepEqual(array, ["a", "b", "c"]);
            });
        });
    });
});
