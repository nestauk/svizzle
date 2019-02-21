import {strict as assert} from "assert";

import {makeKeysGetter} from "./array";

describe("Array -> (Object -> Array)", function() {
    describe("makeKeysGetter()", function() {
        const getCoordinates = makeKeysGetter(["lng", "lat"]);

        it("should return a function expecting an object and returning an array of values corresponding to the provided keys", function() {
            assert.deepStrictEqual(
                getCoordinates({
                    name: "London",
                    lat: 51.507222,
                    lng: -0.1275,
                    population: 8825000
                }),
                [-0.1275, 51.507222]
            );
        });
        it("the returned array should contain undefineds for keys not contained in the provided object", function() {
            assert.deepStrictEqual(
                getCoordinates({
                    name: "London",
                    lng: -0.1275,
                    population: 8825000
                }),
                [-0.1275, undefined]
            );
            assert.deepStrictEqual(
                getCoordinates({
                    name: "London",
                    population: 8825000
                }),
                [undefined, undefined]
            );
        });
    });
});
