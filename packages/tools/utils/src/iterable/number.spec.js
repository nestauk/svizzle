import {strict as assert} from "assert";

import {getLength} from "./number";

describe("iterable -> number", function() {
    describe("getLength", function() {
        it("should return the length of the string", function() {
            assert.deepStrictEqual(getLength(""), 0);
            assert.deepStrictEqual(getLength("a"), 1);
            assert.deepStrictEqual(getLength("abc"), 3);
        });
        it("should return true the length of the array", function() {
            assert.deepStrictEqual(getLength([]), 0);
            assert.deepStrictEqual(getLength([1]), 1);
            assert.deepStrictEqual(getLength([1, 2, 3]), 3);
        });
        it("should return true if the arguments array is empty", function() {
            function func () {
                return getLength(arguments);
            }
            assert.deepStrictEqual(func(), 0);
            assert.deepStrictEqual(func(1), 1);
            assert.deepStrictEqual(func(1, 2), 2);
        });
    });
});
