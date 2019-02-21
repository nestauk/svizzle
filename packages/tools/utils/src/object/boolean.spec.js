import {strict as assert} from "assert";

import * as _ from "lamb";

import {isObjEmpty, isObjNotEmpty} from "./boolean";

describe("Object -> Boolean", function() {
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
