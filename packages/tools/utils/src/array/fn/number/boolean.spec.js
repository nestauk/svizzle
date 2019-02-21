import {strict as assert} from "assert";

import {makeIsWithinRange} from "./boolean";

describe("Array -> (Number -> Boolean)", function() {
    describe("makeIsWithinRange()", function() {
        it("should return a function expecting a number returning true if the number is within the provided range", function() {
            const isWithinRange = makeIsWithinRange([0, 5]);

            assert.deepStrictEqual(isWithinRange(2), true);
            assert.deepStrictEqual(isWithinRange(8), false);
        });
    });
});
