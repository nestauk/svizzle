import {strict as assert} from "assert";

import * as _ from "lamb";

import {
    getObjSize,
    valuesMax,
    valuesMaxBy,
    valuesMaxWith,
    valuesMin,
    valuesMinBy,
    valuesMinWith
} from "./number";

describe("object -> number", function() {
    describe("getObjSize", function() {
        it("should return the size of the provided object", function() {
            assert.deepEqual(getObjSize({}), 0);
            assert.deepEqual(getObjSize({a: 1, b: 2}), 2);
        });
    });

    describe("max/min", function() {
        const objectOfObjectjs1 = {a: {k1: 1, k2: 20}, b: {k1: 3,  k2: 2}};
        const objectOfObjectjs2 = {a: {k1: 9, k2: 12}, b: {k1: 7,  k2: 2}};

        describe("max", function() {
            describe("valuesMax", function() {
                it("should return the max of the provided object values", function() {
                    assert.deepEqual(valuesMax({a: -3, b: 2, c: 1}), 2);
                });
            });
            describe("valuesMaxBy", function() {
                it("should return the max of the provided object values", function() {
                    const maxByK1 = valuesMaxBy("k1");

                    assert.deepEqual(maxByK1(objectOfObjectjs1), 3);
                    assert.deepEqual(maxByK1(objectOfObjectjs2), 9);
                });
                it("should return -Infinity if the key is not found in the values objects", function() {
                    const maxByKey = valuesMaxBy("key");

                    assert.deepEqual(maxByKey(objectOfObjectjs1), -Infinity);
                    assert.deepEqual(maxByKey(objectOfObjectjs2), -Infinity);
                });
            });
            describe("valuesMaxWith", function() {
                it("should return a function expecting an object of objects and returning the max of values by the provided key", function() {
                    const angles1 = {a: -Math.PI/2, b: -Math.PI/4};
                    const angles2 = {a: -Math.PI/4, b: -Math.PI/6};
                    const maxWithAbsSin = valuesMaxWith(_.pipe([Math.sin, Math.abs]));

                    assert.deepEqual(maxWithAbsSin(angles1), 1);
                    assert.deepEqual(maxWithAbsSin(angles2), 0.7071067811865475);
                });
            });
        });

        describe("min", function() {
            describe("valuesMin", function() {
                it("should return the max of the provided object values", function() {
                    assert.deepEqual(valuesMin({a: -3, b: 2, c: 1}), -3);
                });
            });
            describe("valuesMinBy", function() {
                it("should return the max of the provided object values", function() {
                    const minByK1 = valuesMinBy("k1");

                    assert.deepEqual(minByK1(objectOfObjectjs1), 1);
                    assert.deepEqual(minByK1(objectOfObjectjs2), 7);
                });
                it("should return Infinity if the key is not found in the values objects", function() {
                    const minByKey = valuesMinBy("key");

                    assert.deepEqual(minByKey(objectOfObjectjs1), Infinity);
                    assert.deepEqual(minByKey(objectOfObjectjs2), Infinity);
                });
            });

        });
    });
});
