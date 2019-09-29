import {strict as assert} from "assert";

import {isTrimmedNotEmpty} from "./string-boolean";

describe("String -> Boolean", function() {
    describe("isTrimmedNotEmpty", function() {
        it("should return true with 'foo'", function() {
            assert.deepStrictEqual(isTrimmedNotEmpty("foo"), true);
        });
        it("should return true with '  foo  '", function() {
            assert.deepStrictEqual(isTrimmedNotEmpty("  foo  "), true);
        });
        it("should return false with ''", function() {
            assert.deepStrictEqual(isTrimmedNotEmpty(""), false);
        });
        it("should return false with '  '", function() {
            assert.deepStrictEqual(isTrimmedNotEmpty("  "), false);
        });
    });
});
