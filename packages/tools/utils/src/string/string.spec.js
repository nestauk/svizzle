import {strict as assert} from "assert";

import {prepend, trim} from "./string";

describe("string -> string", function() {
    describe("prepend", function() {
        it("should return a function that prepends the provided string to the input string", function() {
            const prependFoo = prepend("foo");
            assert.deepEqual(prependFoo("A"), "fooA");
            assert.deepEqual(prependFoo("B"), "fooB");
        });
    });
    describe("trim", function() {
        it("should return a function that trims the input string", function() {
            assert.deepEqual(trim(" abc \n "), "abc");
            assert.deepEqual(trim(" abc "), "abc");
            assert.deepEqual(trim("abc "), "abc");
            assert.deepEqual(trim(" abc"), "abc");
            assert.deepEqual(trim("\nabc"), "abc");
            assert.deepEqual(trim("abc\n"), "abc");
            assert.deepEqual(trim("\nabc\n"), "abc");
        });
    });
});
