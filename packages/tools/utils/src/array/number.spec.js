import {strict as assert} from "assert";

import * as _ from "lamb";

import {
    arrayMax,
    arrayMaxBy,
    arrayMaxWith,
    arrayMin,
    arrayMinBy,
    arrayMinWith,
    makeRandomNumInRange
} from "./number";

import {makeIsWithinRange} from "./function";

describe("array -> number", function() {
    describe("max/min", function() {
        const numArray = [-1, -2, 0, 1, 2];
        const objArray = [
            {a: -1, b: -1},
            {a: 0, b: 0},
            {a: 1, b: 1},
            {a: 2, b: -2}
        ];

        describe("max", function() {
            describe("arrayMax", function() {
                it("should return the max of the numbers in the provided array", function() {
                    assert.deepStrictEqual(arrayMax(numArray), 2);
                });
            });
            describe("arrayMaxBy", function() {
                it("should return a function expecting an array of numbers and returning the max of values by the provided key", function() {
                    const maxByA = arrayMaxBy("a");
                    const maxByB = arrayMaxBy("b");

                    assert.deepStrictEqual(maxByA(objArray), 2);
                    assert.deepStrictEqual(maxByB(objArray), 1);
                });
                it("should return a function returning `-Infinity` if `key` is not found in the array objects", function() {
                    const maxByC = arrayMaxBy("key");

                    assert.deepStrictEqual(maxByC(objArray), -Infinity);
                });
            });
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
        });

        describe("min", function() {
            describe("arrayMin", function() {
                it("should return the min of an array of numbers", function() {
                    assert.deepStrictEqual(arrayMin(numArray), -2);
                });
            });
            describe("arrayMinBy", function() {
                it("should return a function expecting an array of numbers and returning the min of values by the provided key", function() {
                    const minByA = arrayMinBy("a");
                    const minByB = arrayMinBy("b");

                    assert.deepStrictEqual(minByA(objArray), -1);
                    assert.deepStrictEqual(minByB(objArray), -2);
                });
                it("should return a function returning `Infinity` if `key` is not found in the array objects", function() {
                    const minByC = arrayMinBy("key");

                    assert.deepStrictEqual(minByC(objArray), Infinity);
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

    describe("random", function() {
        describe("makeRandomNumInRange", function() {
            it("should return a number within the specified range", function() {
                _.forEach(_.range(0, 1e5), () => {
                    const range = [100 * Math.random(), 100 + 100 * Math.random()];
                    const randomNumber = makeRandomNumInRange(range);
                    const isWithinRange = makeIsWithinRange(range);

                    assert.deepStrictEqual(isWithinRange(randomNumber), true);
                })
            });
        });
    });
});
