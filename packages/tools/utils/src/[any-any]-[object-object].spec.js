import {strict as assert} from "assert";

import * as _ from "lamb";

import {mergeWith} from "./[any-any]-[object-object]";

describe("(Any -> Any) -> (Object -> Object)", function() {
    describe("mergeWith", function() {
        it("should return a function expecting two objects to merge using the provided merge function", function() {
            const mergeWithSubtract = mergeWith(_.subtract);

            const merged = mergeWithSubtract(
                {a: 8, b: 3},
                {a: 5, b: 2, c: 7}
            );
            const expected =
                {a: 3, b: 1, c: 7};

            assert.deepStrictEqual(merged, expected);
        });
    });
});
