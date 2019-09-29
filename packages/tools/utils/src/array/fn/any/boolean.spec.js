import {strict as assert} from "assert";

import * as _ from "lamb";

import {makeIsIncluded} from "./boolean";

describe("Array -> (Any -> Boolean)", function() {
    describe("makeIsIncluded", function() {
        it("return a function returning true if the passed value is found in the provided array", function() {
            const isIncluded = makeIsIncluded([1, 2, 3]);

            assert.deepStrictEqual(isIncluded(1), true);
            assert.deepStrictEqual(isIncluded(4), false);
        });
    });
});
