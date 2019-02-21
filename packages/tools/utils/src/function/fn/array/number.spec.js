import {strict as assert} from "assert";

import * as _ from "lamb";

import {arrayMaxWith, arrayMinWith} from "./number";

describe("Function -> (Array -> Number)", function() {
    describe("max/min", function() {
        const numArray = [-1, -2, 0, 1, 2];
        const objArray = [
            {a: -1, b: -1},
            {a: 0, b: 0},
            {a: 1, b: 1},
            {a: 2, b: -2}
        ];
        describe("arrayMaxWith", function() {
            it("should return a function expecting an array of objects and returning the max of results of applying the provided fuction on all of the array items", function() {
                const maxWithAbsSin = arrayMaxWith(_.pipe([Math.sin, Math.abs]));

                assert.deepStrictEqual(
                    maxWithAbsSin([-Math.PI/2, -Math.PI/4]),
                    1
                );
                assert.deepStrictEqual(
                    maxWithAbsSin([Math.PI/4, Math.PI/6]),
                    0.7071067811865475
                );
            });
        });
        describe("arrayMinWith", function() {
            it("should return a function expecting an array of objects and returning the min of results of applying the provided fuction on all of the array items", function() {
                const minWithAbsSin = arrayMinWith(_.pipe([Math.sin, Math.abs]));

                assert.deepStrictEqual(
                    minWithAbsSin([-Math.PI/2, -Math.PI/4]),
                    0.7071067811865475
                );
                assert.deepStrictEqual(
                    minWithAbsSin([Math.PI/4, Math.PI/6]),
                    0.49999999999999994
                );
            });
        });
    });
});
