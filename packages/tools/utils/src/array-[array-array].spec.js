import {strict as assert} from "assert";

import * as _ from "lamb";

import {
  makeArrayTransformer,
  removeAt
} from "./array-[array-array]";

describe("Array -> (Array -> Array)", function() {
    describe("makeArrayTransformer", function() {
        it("should return a function expecting an array and that applies the provided transforms to its elements", function() {
            const transformer1 = makeArrayTransformer([x => x * 20, x => x + 3]);
            assert.deepStrictEqual(
                transformer1([2, 2]),
                [40, 5]
            );

            const transformer2 = makeArrayTransformer([_.identity, parseFloat]);
            assert.deepStrictEqual(
                transformer2(["width", "32px"]),
                ["width", 32]
            );
        });
        it("should return a function expecting an array shorter than the transforms array and that returns an array of the same length of the provided array", function() {
            const transformer = makeArrayTransformer([x => x * 20]);

            assert.deepStrictEqual(
                transformer([1, 1, 1, 1, 1]),
                [20]
            );
        });
        it("should return a function expecting an array longer than the transforms array and that returns an array of the same length of the provided array", function() {
            const transformer = makeArrayTransformer([x => x * 20, x => x + 3]);

            assert.deepStrictEqual(
                transformer([1]),
                [20]
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
        it("should remove the value at the first index", function() {
            const removeIndices = removeAt([0]);
            assert.deepStrictEqual(
                removeIndices(arr1),
                [1, 2, 3, 4, 5, 6, 7, 8, 9]
            );
        });
        it("should remove the value at the last index", function() {
            const removeIndices = removeAt([9]);
            assert.deepStrictEqual(
                removeIndices(arr1),
                [0, 1, 2, 3, 4, 5, 6, 7, 8]
            );
        });
        it("should ignore indices greater than the max index in the array", function() {
            const removeIndices = removeAt([1, 2, 3, 4]);
            assert.deepStrictEqual(
                removeIndices(arr2),
                [0]
            );
        });
        it("should not remove values if the indices outside the array range", function() {
            const removeIndices = removeAt([3, 4]);
            assert.deepStrictEqual(
                removeIndices(arr2),
                arr2
            );
        });
    });
});
