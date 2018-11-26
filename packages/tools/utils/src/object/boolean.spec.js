import {strict as assert} from "assert";

import * as _ from "lamb";

import {isObjEmpty, isObjNotEmpty} from "./boolean";

describe("object -> boolean", function() {
    describe("isObjEmpty", function() {
        it("should return `true` if the object is empty", function() {
            assert.deepEqual(isObjEmpty({}), true);
        });
        it("should return `false` if the object is not empty", function() {
            assert.deepEqual(isObjEmpty({a: 1}), false);
        });
    });
    describe("isObjNotEmpty", function() {
        it("should return `true` if the object is not empty", function() {
            assert.deepEqual(isObjNotEmpty({a: 1}), true);
        });
        it("should return `false` if the object is not empty", function() {
            assert.deepEqual(isObjNotEmpty({}), false);
        });
    });
});
