import {strict as assert} from "assert";

import * as _ from "lamb";

import {objectToKeyValueArray, getTruthyValuesKeys} from "./array";

describe("Object -> Array", function() {
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
