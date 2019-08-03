import {strict as assert} from "assert";

import {getFirstAndLast, swap, toggleItem} from "./array";

describe("Array -> Array", function() {
    describe("getFirstAndLast", function() {
        const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        it("should return an array containing the first and the last element of the provided array", function() {
            assert.deepStrictEqual(getFirstAndLast(arr1), [0, 9]);
        });
        it("should return an empty array if passed an empty array", function() {
            assert.deepStrictEqual(getFirstAndLast([0]), [0, 0]);
        });
        it("should return an array containing `undefined` repeated 2 times if passed an single value array", function() {
            assert.deepStrictEqual(getFirstAndLast([]), [undefined, undefined]);
        });
    });
    describe("swap", function() {
        const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        it("should swap intermediate indices", function() {
            assert.deepStrictEqual(
                swap(arr1, 3, 7),
                [0, 1, 2, 7, 4, 5, 6, 3, 8, 9] // 3 <-> 7
            );
        });
        it("should swap first and second", function() {
            assert.deepStrictEqual(
                swap(arr1, 0, 1),
                [1, 0, 2, 3, 4, 5, 6, 7, 8, 9] // 0 <-> 1
            );
        });
        it("should swap first and last", function() {
            assert.deepStrictEqual(
                swap(arr1, 0, 9),
                [9, 1, 2, 3, 4, 5, 6, 7, 8, 0] // 0 <-> 9
            );
        });
    });

    describe("toggleItem", function() {
        const arr0 = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
        const arrNo0 = [1, 2, 3, 4, 1, 2, 3, 4];
        const arrTail0 = [1, 2, 3, 4, 1, 2, 3, 4, 0];
        const arrTailObj = [1, 2, 3, 4, 1, 2, 3, 4, {a: 1}];
        const arrTailStr = [1, 2, 3, 4, 1, 2, 3, 4, "a1"];

        it("should remove instances of the item if it's in the array", function() {
            assert.deepStrictEqual(
                toggleItem(arr0, 0),
                arrNo0
            );
        });
        it("should add the item if it's not in the array", function() {
            assert.deepStrictEqual(
                toggleItem(arrNo0, 0),
                arrTail0
            );
        });
        it("should add the item if it's not in the array (obj)", function() {
            assert.deepStrictEqual(
                toggleItem(arrNo0, {a: 1}),
                arrTailObj
            );
            assert.deepStrictEqual(
                toggleItem(arrNo0, "a1"),
                arrTailStr
            );
        });

        it("should remove the item if it's not in the array (obj)", function() {
            assert.deepStrictEqual(
                toggleItem(arrTailObj, {a: 1}),
                arrNo0
            );
            assert.deepStrictEqual(
                toggleItem(arrTailStr, "a1"),
                arrNo0
            );
        });
    });
});
