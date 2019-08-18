import {strict as assert} from "assert";

import {isNot} from './boolean';

describe("Any -> (Any -> Boolean)", function() {
    describe("isnt", function() {
        it("should return true if the input number is different from the provided value", function() {
            const isNotTwo = isNot(2);

            assert.deepStrictEqual(isNotTwo(3), true);
            assert.deepStrictEqual(isNotTwo(2), false);
        });
        it("should return true if the input string is different from the provided value", function() {
            const isNotFoo = isNot('foo');

            assert.deepStrictEqual(isNotFoo('boo'), true);
            assert.deepStrictEqual(isNotFoo('foo'), false);
        });
    });
});
