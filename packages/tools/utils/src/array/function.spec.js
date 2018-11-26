import {strict as assert} from "assert";

import * as _ from "lamb";

import {
    makeKeysGetter,
    makeIsWithinRange,
    makeArrayTransformer
} from "./function";

describe("array -> function", function() {
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
    describe("makeIsWithinRange()", function() {
        it("should return a function expecting a number returning true if the number is within the provided range", function() {
            const isWithinRange = makeIsWithinRange([0, 5]);

            assert.deepStrictEqual(isWithinRange(2), true);
            assert.deepStrictEqual(isWithinRange(8), false);
        });
    });

    describe("makeArrayTransformer()", function() {
        it("should return a function expecting an array and that applies the provided transforms to its elements", function() {
            const transformer1 = makeArrayTransformer([x => x * 20, x => x + 3]);
            assert.deepStrictEqual(
                transformer1([2, 2]),
                [40, 5]
            );

            const transformer2 = makeArrayTransformer([_.identity, parseFloat]);
            assert.deepStrictEqual(
                transformer2(["width", "32px"]),
                ["width", 32]
            );
        });
        it("should return a function expecting an array shorter than the transforms array and that returns an array of the same length of the provided array", function() {
            const transformer = makeArrayTransformer([x => x * 20]);

            assert.deepStrictEqual(
                transformer([1, 1, 1, 1, 1]),
                [20]
            );
        });
        it("should return a function expecting an array longer than the transforms array and that returns an array of the same length of the provided array", function() {
            const transformer = makeArrayTransformer([x => x * 20, x => x + 3]);

            assert.deepStrictEqual(
                transformer([1]),
                [20]
            );
        });
    });
});
