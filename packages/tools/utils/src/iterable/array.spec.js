import {strict as assert} from "assert";

import {makePrinter} from "@svizzle/dev";

import {tapAppendTo} from "./array";

describe("iterable -> array", function() {
    let printer;
    before(function () {
        printer = makePrinter();
        printer.init();
    });
    beforeEach(function () {
        printer.reset();
    });
    after(function () {
        printer.restore();
    });

    describe("tapAppendTo", function() {
        it("should print the provided array and element and return the result of appending the element to the array", function() {
            const actual = tapAppendTo([1, 2, 3], 4);
            const expected = [1, 2, 3, 4];
            const expectedLog = [
                [[1, 2, 3]],
                [4]
            ];

            assert.deepStrictEqual(actual, expected);
            assert.deepStrictEqual(printer.getLog(), expectedLog);
        });
        it("should print the provided string and element and return the result of appending the element to the array", function() {
            const actual = tapAppendTo("abc", 4);
            const expected = ["a", "b", "c", 4];
            const expectedLog = [
                ["abc"],
                [4]
            ];

            assert.deepStrictEqual(actual, expected);
            assert.deepStrictEqual(printer.getLog(), expectedLog);
        });
    });
});
