import {strict as assert} from "assert";

import {trim} from "./string.proto-string";

describe("String -> String", function() {
    describe("trim", function() {
        it("should return a function that trims the input string", function() {
            assert.deepStrictEqual(trim(" abc \n "), "abc");
            assert.deepStrictEqual(trim(" abc "), "abc");
            assert.deepStrictEqual(trim("abc "), "abc");
            assert.deepStrictEqual(trim(" abc"), "abc");
            assert.deepStrictEqual(trim("\nabc"), "abc");
            assert.deepStrictEqual(trim("abc\n"), "abc");
            assert.deepStrictEqual(trim("\nabc\n"), "abc");
        });
    });
});
