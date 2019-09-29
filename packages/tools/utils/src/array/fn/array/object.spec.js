import {strict as assert} from "assert";

import * as _ from "lamb";

import {
  makeWithKeys,
  makeWithValues
} from "./object";

describe("Array -> (Array -> Object)", function() {
    describe("makeWithKeys", function() {
        it("should return a function expecting an array of values and returning an object assigning the values to the provided keys", function() {
            const makeWithLatLng = makeWithKeys(["lng", "lat"]);

            assert.deepStrictEqual(
                makeWithLatLng([1, 2]),
                {lng: 1, lat: 2}
            );
            assert.deepStrictEqual(
                makeWithLatLng([10, 20]),
                {lng: 10, lat: 20}
            );
        });
    });
    describe("makeWithValues", function() {
        it("should return a function expecting an array of keys and returning an object assigning the keys to the provided values", function() {
          const makeWithTheseValues = makeWithValues([1, 2]);

            assert.deepStrictEqual(
                makeWithTheseValues(["lng", "lat"]),
                {lng: 1, lat: 2}
            );
            assert.deepStrictEqual(
                makeWithTheseValues(["foo", "bar"]),
                {foo: 1, bar: 2}
            );
        });
    });
});
