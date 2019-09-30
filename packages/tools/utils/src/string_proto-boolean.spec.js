import {strict as assert} from "assert";

import {startsWith} from "./string_proto-boolean";

describe("String -> Boolean", function() {
    describe("startsWith", function() {
        it("should return true true if a string starts with the provided string", function() {
            assert.deepStrictEqual(startsWith("Fooooo", "Foo"), true);
        });
        it("should return false if a string doesn't start with the provided string", function() {
            assert.deepStrictEqual(startsWith("Fooooo", "foo"), false);
        });
    });
});
