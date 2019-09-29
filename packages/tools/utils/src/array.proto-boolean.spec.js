import {strict as assert} from "assert";

import {includes} from "./array.proto-boolean";

describe("(prototype) Array -> (Any -> Boolean)", function() {
    describe("includes", function() {
        it("return an function expecting a value and returning true if it is included in the provided array", function() {
            assert.deepStrictEqual(includes([0, 1, 2], 2), true);
            assert.deepStrictEqual(includes([0, 1, 2], 3), false);
        });
    });
});
