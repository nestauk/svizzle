import {strict as assert} from "assert";

import {
    concat,
    removeAt,
    swap,
    toggleItem
} from "./array";

describe("array -> array", function() {
    describe("concat", function() {
        const arr1 = [0, 1, 2, 3, 4];
        const arr2 = [5, 6, 7, 8, 9];

        it("should concatenate 2 arrays", function() {
            assert.deepStrictEqual(
                concat(arr1, arr2),
                [...arr1, ...arr2]
            );
        });
        it("should concatenate 4 arrays", function() {
            assert.deepStrictEqual(
                concat(arr1, arr2, arr1, arr2),
                [...arr1, ...arr2, ...arr1, ...arr2]
            );
        });
        it("should concatenate empty arrays", function() {
            assert.deepStrictEqual(
                concat([], []),
                []
            );
        });
        it("should concatenate array and an empty array", function() {
            assert.deepStrictEqual(
                concat(arr1, []),
                arr1
            );
        });
        it("should concatenate an empty array and an array", function() {
            assert.deepStrictEqual(
                concat([], arr1),
                arr1
            );
        });
    });

    describe("removeAt", function() {
        const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const arr2 = [0, 1, 2];

        it("should remove values at the provided indices", function() {
            const removeIndices = removeAt([3, 4, 8]);
            assert.deepStrictEqual(
                removeIndices(arr1),
                [0, 1, 2, 5, 6, 7, 9]
            );
        });
        it("should remove values the first index", function() {
            const removeIndices = removeAt([0]);
            assert.deepStrictEqual(
                removeIndices(arr1),
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            );
        });
        it("should remove values the last index", function() {
            const removeIndices = removeAt([9]);
            assert.deepStrictEqual(
                removeIndices(arr1),
                [0, 1, 2, 3, 4, 5, 6, 7, 8]
            );
        });
        it("should remove values if the indices array is longer than the array", function() {
            const removeIndices = removeAt([1, 2, 3, 4]);
            assert.deepStrictEqual(
                removeIndices(arr2),
                [0]
            );
        });
        it("should not remove values if the indices outseide the array range", function() {
            const removeIndices = removeAt([3, 4]);
            assert.deepStrictEqual(
                removeIndices(arr2),
                arr2
            );
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
