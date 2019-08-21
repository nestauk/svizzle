import {strict as assert} from "assert";

import * as _ from "lamb";

import {hasObjSize1, isObjEmpty, isObjNotEmpty} from "./boolean";

describe("Object -> Boolean", function() {
    describe("hasObjSize1", function() {
        it("should return `false` if the object is empty", function() {
            assert.deepStrictEqual(hasObjSize1({}), false);
        });
        it("should return `true` if the object has size 1", function() {
            assert.deepStrictEqual(hasObjSize1({a: 1}), true);
        });
        it("should return `false` if the object is longer than 1", function() {
          assert.deepStrictEqual(hasObjSize1({a: 1, b: 2}), false);
        });
    });
    describe("isObjEmpty", function() {
        it("should return `true` if the object is empty", function() {
            assert.deepStrictEqual(isObjEmpty({}), true);
        });
        it("should return `false` if the object is not empty", function() {
            assert.deepStrictEqual(isObjEmpty({a: 1}), false);
        });
    });
    describe("isObjNotEmpty", function() {
        it("should return `true` if the object is not empty", function() {
            assert.deepStrictEqual(isObjNotEmpty({a: 1}), true);
        });
        it("should return `false` if the object is not empty", function() {
            assert.deepStrictEqual(isObjNotEmpty({}), false);
        });
    });
});
