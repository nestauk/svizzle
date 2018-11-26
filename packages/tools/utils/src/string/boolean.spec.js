import {strict as assert} from "assert";

import {isTrimmedNotEmpty, startsWith} from "./boolean";

describe("string -> boolean", function() {
    describe("isTrimmedNotEmpty", function() {
        it("should return true with 'foo'", function() {
            assert.deepEqual(isTrimmedNotEmpty("foo"), true);
        });
        it("should return true with '  foo  '", function() {
            assert.deepEqual(isTrimmedNotEmpty("  foo  "), true);
        });
        it("should return false with ''", function() {
            assert.deepEqual(isTrimmedNotEmpty(""), false);
        });
        it("should return false with '  '", function() {
            assert.deepEqual(isTrimmedNotEmpty("  "), false);
        });
    });
    describe("startsWith", function() {
        it("should return true true if a string starts with the provided string", function() {
            assert.deepEqual(startsWith("Fooooo", "Foo"), true);
        });
        it("should return false if a string doesn't start with the provided string", function() {
            assert.deepEqual(startsWith("Fooooo", "foo"), false);
        });
    });
});
