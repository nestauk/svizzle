import {strict as assert} from "assert";

import {
    isArray,
    isNumber,
    isObject,
    isString,
    isNotNaN,
    isValidNumber,
    toNumberisValidNumber,
    toFloatIsValidNumber,
} from "./boolean";

function returnArgs () {
    return arguments;
}

describe("any -> boolean", function() {
    describe("isArray", function() {
        it("should return true if the input is an array", function() {
            assert.deepStrictEqual(isArray([]), true);
            assert.deepStrictEqual(isArray([1, 2]), true);
        });
        it("should return false if the input is not an array", function() {
            assert.deepStrictEqual(isArray(true), false);
            assert.deepStrictEqual(isArray(1), false);
            assert.deepStrictEqual(isArray(NaN), false);
            assert.deepStrictEqual(isArray(Infinity), false);
            assert.deepStrictEqual(isArray({a: 1}), false);
            assert.deepStrictEqual(isArray("foo"), false);
            assert.deepStrictEqual(isArray(returnArgs()), false);
        });
    });
    describe("isNumber", function() {
        it("should return true if the input is a number", function() {
            assert.deepStrictEqual(isNumber(1), true);
            assert.deepStrictEqual(isNumber(NaN), true);
            assert.deepStrictEqual(isNumber(Infinity), true);
        });
        it("should return false if the input is not a number", function() {
            assert.deepStrictEqual(isNumber(true), false);
            assert.deepStrictEqual(isNumber([1, 2]), false);
            assert.deepStrictEqual(isNumber({a: 1}), false);
            assert.deepStrictEqual(isNumber("foo"), false);
            assert.deepStrictEqual(isNumber(returnArgs()), false);
        });
    });
    describe("isObject", function() {
        it("should return true if the input is an object", function() {
            assert.deepStrictEqual(isObject({}), true);
            assert.deepStrictEqual(isObject({a: 1}), true);
        });
        it("should return false if the input is not an object", function() {
            assert.deepStrictEqual(isObject(true), false);
            assert.deepStrictEqual(isObject(1), false);
            assert.deepStrictEqual(isObject(NaN), false);
            assert.deepStrictEqual(isObject(Infinity), false);
            assert.deepStrictEqual(isObject([1, 2]), false);
            assert.deepStrictEqual(isObject("foo"), false);
            assert.deepStrictEqual(isObject(returnArgs()), false);
        });
    });
    describe("isString", function() {
        it("should return true if the input is an object", function() {
            assert.deepStrictEqual(isString(""), true);
            assert.deepStrictEqual(isString("foo"), true);
        });
        it("should return false if the input is not an object", function() {
            assert.deepStrictEqual(isString(true), false);
            assert.deepStrictEqual(isString(1), false);
            assert.deepStrictEqual(isString(NaN), false);
            assert.deepStrictEqual(isString(Infinity), false);
            assert.deepStrictEqual(isString([1, 2]), false);
            assert.deepStrictEqual(isString({a: 1}), false);
            assert.deepStrictEqual(isString(returnArgs()), false);
        });
    });
    describe("isNotNaN", function() {
        it("should return true is the input is not a NaN", function() {
            assert.deepStrictEqual(isNotNaN(1), true);
            assert.deepStrictEqual(isNotNaN(Infinity), true);
            assert.deepStrictEqual(isNotNaN("123"), true);
            assert.deepStrictEqual(isNotNaN(true), true);
        });
        it("should return false if the input is a NaN", function() {
            assert.deepStrictEqual(isNotNaN("123a"), false);
            assert.deepStrictEqual(isNotNaN("foo"), false);
            assert.deepStrictEqual(isNotNaN([1, 2]), false);
            assert.deepStrictEqual(isNotNaN({a: 1}), false);
            assert.deepStrictEqual(isNotNaN(returnArgs()), false);
            assert.deepStrictEqual(isNotNaN(undefined), false);

            assert.deepStrictEqual(isNotNaN(NaN), false);
        });
    });
    describe("isValidNumber", function() {
        // 👍
        it("should return true is the input is a valid number (including not being NaN)", function() {
            [
                1,
                1.2,
                Infinity,
            ].forEach(x => {
                assert.deepStrictEqual(isValidNumber(x), true);
            });
        });

        // 👎
        it("should return false is the input is a not valid number (including being NaN)", function() {
            [
                [],
                [123],
                [1, 2],
                {a: 1},
                "",
                "123",
                "123abc",
                "foo",
                true,
                null,
                undefined,
                NaN,
                returnArgs(),
                returnArgs(1),
                returnArgs(1, 2),
                returnArgs(1, 2, 3)
            ].forEach(x => {
                assert.deepStrictEqual(isValidNumber(x), false);
            });
        });
    });
    describe("toNumberisValidNumber", function() {
        // 👍
        it("should return true if the input, converted to Number, is indeed a number", function() {
            [
                [],
                [2],
                "",
                "123",
                null,
                true,
            ].forEach(x => {
                assert.deepStrictEqual(toNumberisValidNumber(x), true);
            });
        });

        // 👎
        it("should return false if the input, converted to Number, is not a number", function() {
            [
                {a: 1},
                [1, 2],
                "123abc",
                "foo",
                undefined,
                returnArgs(),
                returnArgs(1),
                returnArgs(1, 2),
                returnArgs(1, 2, 3)
            ].forEach(x => {
                assert.deepStrictEqual(toNumberisValidNumber(x), false);
            });
        });
    });
    describe("toFloatIsValidNumber", function() {
        // 👍
        it("should return true if the input, parsed to float, is a valid number", function() {
            [
                [1],
                [1, 2],
                [1, 2, 3],
                "123",
                "123abc",
            ].forEach(x => {
                assert.deepStrictEqual(toFloatIsValidNumber(x), true);
            });
        });

        // 👎
        it("should return false if the input, parsed to float, is not a valid number", function() {
            [
                [],
                "",
                "foo",
                {a: 1},
                true,
                null,
                undefined,
                returnArgs(),
                returnArgs(1),
                returnArgs(1, 2),
                returnArgs(1, 2, 3)
            ].forEach(x => {
                assert.deepStrictEqual(toFloatIsValidNumber(x), false);
            });
        });
    });
});
