import {strict as assert} from "assert";

import {
  concatValues,
  getTruthyValuesKeys,
  objectToKeyValueArray,
} from "./object-array";

describe("Object -> Array", function() {
    describe("concatValues", function() {
        it("should concatenate the values of the provided objects", function() {
            assert.deepStrictEqual(
                concatValues({a: [1, 2, 3], b: [4, 5, 6]}),
                [1, 2, 3, 4, 5, 6]
            );
        });
    });
    describe("objectToKeyValueArray", function() {
        it("should return an array of {key, value} objects from an object", function() {
            assert.deepStrictEqual(
                objectToKeyValueArray({k1: "v1", k2: "v2"}),
                [{key: "k1", value: "v1"}, {key: "k2", value: "v2"}]
            );
        });
    });
    describe("getTruthyValuesKeys", function() {
        it("should return the keys with a true value", function() {
            assert.deepStrictEqual(
                getTruthyValuesKeys({a: true, b: true, c: false}),
                ["a", "b"]
            );
        });
        it("should return the keys with a truthy value", function() {
            assert.deepStrictEqual(
                getTruthyValuesKeys({a: 1, b: 0, c: false}),
                ["a"]
            );
            assert.deepStrictEqual(
                getTruthyValuesKeys({a: [1, 2], b: {a: 1}, c: false}),
                ["a", "b"]
            );
        });
    });
});
