import {strict as assert} from "assert";

import * as _ from "lamb";

import {objectToKeyValueArrayWith} from "./[any-any]-[object-array]";

describe("Function -> (Object -> Array)", function() {
  describe("objectToKeyValueArrayWith", function() {
    it("should return a function expecting an object and returning an array of {key, value} objects", function() {
      const convertToArray = objectToKeyValueArrayWith(_.getKey('a'));
      const obj = {k1: {a: 1}, k2: {a: 2}};

      assert.deepStrictEqual(
        convertToArray(obj),
        [{key: "k1", value: 1}, {key: "k2", value: 2}]
      );
    });
  });
});
