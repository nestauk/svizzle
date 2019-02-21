import {strict as assert} from "assert";

import {
    joinWithDash,
    joinWithColon,
    joinWithSemicolon
} from "./string";

const arr = [0, 1, 2];

describe("Array -> String", function() {
    describe("joinWithDash", function() {
        it("should join an array with dashes", function() {
            assert.deepStrictEqual(joinWithDash(arr),"0-1-2");
        });
    });
    describe("joinWithColon", function() {
        it("should join an array with colons", function() {
            assert.deepStrictEqual(joinWithColon(arr),"0:1:2");
        });
    });
    describe("joinWithSemicolon", function() {
        it("should join an array with semicolons", function() {
            assert.deepStrictEqual(joinWithSemicolon(arr),"0;1;2");
        });
    });
});
