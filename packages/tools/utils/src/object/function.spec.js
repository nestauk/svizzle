import {strict as assert} from "assert";

import * as _ from "lamb";

import {joinWith} from "../array/string";
import {
    applyFnMap,
    transformValues
} from "./function";

describe("object -> function", function() {
    describe("applyFnMap", function() {
        it("should return a function expecting an object to be used as the argument of the provided functions", function() {
            const format = applyFnMap({
                fullname: _.pipe([
                    _.collect([_.getKey("fname"), _.getKey("lname")]),
                    joinWith(" ")
                ]),
                coords: _.collect([_.getKey("lng"), _.getKey("lat")])
            });

            assert.deepEqual(
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

            assert.deepEqual(
                conversionFn({name: "foo", a: "9", b: "2", width: "10px"}),
                {name: "foo", a: 3, b: 2, width: 10}
            );
        });
    });
});
