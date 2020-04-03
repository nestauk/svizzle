import {strict as assert} from "assert";

import {
  getFirstAndLast,
  inclusiveRange,
  makeBiPermutations,
  sortValueAscKeyAsc,
  sortValueAscKeyDesc,
  sortValueDescKeyAsc,
  sortValueDescKeyDesc,
  swap,
  toggleItem
} from "./array-array";

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
    describe("inclusiveRange", function() {
      it("return the range within the provided limits, both limits being included", function() {
        assert.deepStrictEqual(inclusiveRange([2, 5]), [2, 3, 4, 5]);
        assert.deepStrictEqual(inclusiveRange([2, 12]), [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        assert.deepStrictEqual(inclusiveRange([2, 12, 2]), [2, 4, 6, 8, 10, 12]);
        assert.deepStrictEqual(inclusiveRange([2, 11, 2]), [2, 4, 6, 8, 10]);
      });
      it("return an array if limits are equal", function() {
        assert.deepStrictEqual(inclusiveRange([1, 1]), [1]);
      });
      it("return an empty array if limits are an empty array", function() {
        assert.deepStrictEqual(inclusiveRange([]), []);
      });
    });
    describe("makeBiPermutations", function() {
      it("should return the permutations of pairs of the provided items.", function() {
        const items = [
          {foo: "a"},
          {foo: "b"},
          {bar: "c"},
          {bar: "d"}
        ];
        const actual = makeBiPermutations(items);
        const expected = [
          [{foo: "a"}, {foo: "b"}],
          [{foo: "a"}, {bar: "c"}],
          [{foo: "a"}, {bar: "d"}],
          [{foo: "b"}, {bar: "c"}],
          [{foo: "b"}, {bar: "d"}],
          [{bar: "c"}, {bar: "d"}]
        ];
        assert.deepStrictEqual(actual, expected);
      });
      it("should return an empty array if provided an empty array", function() {
        const actual = makeBiPermutations([]);
        assert.deepStrictEqual(actual, []);
      });
    });
    describe("sorting", function() {
      const items = [
        {key: 'b', value: 1},
        {key: 'a', value: 4},
        {key: 'a', value: -30},
        {key: 'a', value: 1},
      ];
      describe("sortValueAscKeyAsc", function() {
        it("should return a copy of the provided array with items sorted by `value` (ascending) then by `key` (ascending)", function() {
          const actual = sortValueAscKeyAsc(items);
          const expected = [
            {key: 'a', value: -30},
            {key: 'a', value: 1},
            {key: 'b', value: 1},
            {key: 'a', value: 4},
          ];
          assert.deepStrictEqual(actual, expected);
        });
      });
      describe("sortValueAscKeyDesc", function() {
        it("should return a copy of the provided array with items sorted by `value` (ascending) then by `key` (descending)", function() {
          const actual = sortValueAscKeyDesc(items);
          const expected = [
            {key: 'a', value: -30},
            {key: 'b', value: 1},
            {key: 'a', value: 1},
            {key: 'a', value: 4},
          ];
          assert.deepStrictEqual(actual, expected);
        });
      });
      describe("sortValueDescKeyAsc", function() {
        it("should return a copy of the provided array with items sorted by `value` (descending) then by `key` (ascending)", function() {
          const actual = sortValueDescKeyAsc(items);
          const expected = [
            {key: 'a', value: 4},
            {key: 'a', value: 1},
            {key: 'b', value: 1},
            {key: 'a', value: -30},
          ];
          assert.deepStrictEqual(actual, expected);
        });
      });
      describe("sortValueDescKeyDesc", function() {
        it("should return a copy of the provided array with items sorted by `value` (descending) then by `key` (descending)", function() {
          const actual = sortValueDescKeyDesc(items);
          const expected = [
            {key: 'a', value: 4},
            {key: 'b', value: 1},
            {key: 'a', value: 1},
            {key: 'a', value: -30},
          ];
          assert.deepStrictEqual(actual, expected);
        });
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
