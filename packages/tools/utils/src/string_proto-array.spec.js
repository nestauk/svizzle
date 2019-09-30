import {strict as assert} from "assert";

import {split} from "./string_proto-array";

describe("(prototype) String -> Array", function() {
    describe("split", function() {
        it("should return a function that splits the input string with the separator string", function() {
            const array = split("a-b-c", "-");
            assert.deepStrictEqual(array, ["a", "b", "c"]);
        });
    });
});
