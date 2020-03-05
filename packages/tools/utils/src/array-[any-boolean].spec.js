import {strict as assert} from "assert";

import {makeOccursIn, makeIsIncluded} from "./array-[any-boolean]";

describe("Array -> (Any -> Boolean)", function() {
  describe("makeOccursIn", function() {
    it("return a function returning true if the passed array is found in the provided array", function() {
      const isContained = makeOccursIn([
        [1, 2, 3], [1, 2, 3, 4], [5, 6, 7, 6, 5]
      ]);

      assert.deepStrictEqual(isContained([1, 2, 3]), true);
      assert.deepStrictEqual(isContained([1, 2]), false);
    });
    it("return a function returning true if the passed object is found in the provided array", function() {
      const isContained = makeOccursIn([
        {a: 1}, {a: 2}, {a: {b: {c: 3}}}, {b: 1}
      ]);

      assert.deepStrictEqual(isContained({a: {b: {c: 3}}}), true);
      assert.deepStrictEqual(isContained({a: 3}), false);
    });
  });
  describe("makeIsIncluded", function() {
    it("return a function returning true if the passed primitive value is found in the provided array", function() {
      const isIncluded = makeIsIncluded([1, 2, 3]);

      assert.deepStrictEqual(isIncluded(1), true);
      assert.deepStrictEqual(isIncluded(4), false);
    });
  });
});
