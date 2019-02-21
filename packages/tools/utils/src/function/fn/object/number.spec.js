import {strict as assert} from "assert";

import * as _ from "lamb";

import {valuesMaxWith, valuesMinWith} from "./number";

describe("Function -> (Object -> Number)", function() {
    describe("max/min", function() {
        const objectOfObjectjs1 = {a: {k1: 1, k2: 20}, b: {k1: 3,  k2: 2}};
        const objectOfObjectjs2 = {a: {k1: 9, k2: 12}, b: {k1: 7,  k2: 2}};

        const angles1 = {a: -Math.PI/2, b: -Math.PI/4};
        const angles2 = {a: -Math.PI/4, b: -Math.PI/6};

        describe("valuesMaxWith", function() {
            it("should return a function expecting an object of objects and returning the max of values by the provided key", function() {
                const maxWithAbsSin = valuesMaxWith(_.pipe([Math.sin, Math.abs]));

                assert.deepStrictEqual(maxWithAbsSin(angles1), 1);
                assert.deepStrictEqual(maxWithAbsSin(angles2), 0.7071067811865475);
            });
        });
        describe("valuesMinWith", function() {
            it("should return a function expecting an object of objects and returning the min of values by the provided key", function() {
                const minWithAbsSin = valuesMinWith(_.pipe([Math.sin, Math.abs]));

                assert.deepStrictEqual(minWithAbsSin(angles1), 0.7071067811865475);
                assert.deepStrictEqual(minWithAbsSin(angles2), 0.49999999999999994);
            });
        });
    });
});
