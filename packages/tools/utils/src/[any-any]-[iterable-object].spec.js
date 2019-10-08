import {strict as assert} from "assert";

import * as _ from "lamb";

import {pairToKeyValueObjectWith} from "./[any-any]-[iterable-object]";

describe("Function -> (Iterable -> Object)", function() {
  describe("pairToKeyValueObjectWith", function() {
    it("should return a function expecting an pair and returning a {key, value} object", function() {
      const objectifySelfSum = pairToKeyValueObjectWith(x => x + x);

      assert.deepStrictEqual(
        objectifySelfSum(""),
        {key: undefined, value: undefined}
      );
      assert.deepStrictEqual(
        objectifySelfSum("a"),
        {key: "a", value: undefined}
      );
      assert.deepStrictEqual(
        objectifySelfSum("ab"),
        {key: "a", value: "bb"}
      );
      assert.deepStrictEqual(
        objectifySelfSum("abc"),
        {key: "a", value: "bb"}
      );

      const objectifyGetA = pairToKeyValueObjectWith(_.getKey('a'));
      function func () {
       return objectifyGetA(arguments);
      }

      assert.deepStrictEqual(
        objectifyGetA([]),
        {key: undefined, value: undefined}
      );
      assert.deepStrictEqual(
        objectifyGetA([1]),
        {key: 1, value: undefined}
      );
      assert.deepStrictEqual(
        objectifyGetA([1, {a: 2}]),
        {key: 1, value: 2}
      );
      assert.deepStrictEqual(
        objectifyGetA([1, {a: 2}, 3]),
        {key: 1, value: 2}
      );
      assert.deepStrictEqual(
        func(),
        {key: undefined, value: undefined}
      );
      assert.deepStrictEqual(
        func(1),
        {key: 1, value: undefined}
      );
      assert.deepStrictEqual(
        func(1, {a: 2}),
        {key: 1, value: 2}
      );
      assert.deepStrictEqual(
        func(1, {a: 2}, 3),
        {key: 1, value: 2}
      );
    });
  });
});
