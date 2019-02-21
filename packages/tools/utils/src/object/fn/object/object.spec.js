import {strict as assert} from "assert";

import * as _ from "lamb";

import {joinWith} from "../../../string/fn/array/string";
import {
  applyFnMap,
  makeMergeKeyValue,
  mergeObj,
  transformValues,
} from "./object";

describe("Object -> (Object -> Object)", function() {
    describe("applyFnMap", function() {
        it("should return a function expecting an object to be used as the argument of the provided functions", function() {
            const format = applyFnMap({
                fullname: _.pipe([
                    _.collect([_.getKey("fname"), _.getKey("lname")]),
                    joinWith(" ")
                ]),
                coords: _.collect([_.getKey("lng"), _.getKey("lat")])
            });

            assert.deepStrictEqual(
                format({fname: "John", lname: "Woo", lng: 1, lat: 2}),
                {fullname: "John Woo", coords: [1, 2]}
            );
        });
    });

    describe("transformValues", function() {
        it("should return a function expecting an object and applying the functions in the provided object to the correspondent object values", function() {
            const conversionFn = transformValues({
                name: _.identity,
                a: _.pipe([Number, Math.sqrt]),
                b: Number,
                width: parseFloat
            });

            assert.deepStrictEqual(
                conversionFn({name: "foo", a: "9", b: "2", width: "10px"}),
                {name: "foo", a: 3, b: 2, width: 10}
            );
        });
    });

    describe("mergeObj", function() {
        it("should return a function expecting an object to merge with the input object", function() {
            const mergeB = mergeObj({b: 2});

            assert.deepStrictEqual(mergeB({a: 1}), {a: 1, b: 2});
            assert.deepStrictEqual(mergeB({a: 1, b: 1}), {a: 1, b: 2});
        });
    });

    describe("makeMergeKeyValue", function() {
        const mergeFooValue = makeMergeKeyValue("foo", {b: -2, c: -3});

        it("should merge the value to an existing object at the provided key", function() {
            const merged = mergeFooValue({
                foo: {a: 1, b: 2},
                bar: {k: 1}
            });
            const expected = {
                foo: {a: 1, b: -2, c: -3},
                bar: {k: 1}
            };

            assert.deepStrictEqual(merged, expected);
        });
        it("should merge the value to a non-existing object at the provided key", function() {
            const merged = mergeFooValue({
                bar: {k: 1}
            });
            const expected = {
                foo: {b: -2, c: -3},
                bar: {k: 1}
            };

            assert.deepStrictEqual(merged, expected);
        });
    });
});
