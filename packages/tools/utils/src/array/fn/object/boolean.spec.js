import {strict as assert} from "assert";

import {isPathValue} from "./boolean";

describe("Array -> (Object -> Array)", function() {
  describe("isPathValue", function() {
    it("should check that the value at the provided path is equal to the provided value", function() {
      const isDefaultStatus = isPathValue(['item.status', 'default']);

      assert.deepStrictEqual(
        isDefaultStatus({item: {status: 'active'}, id: 123}),
        false
      );
      assert.deepStrictEqual(
        isDefaultStatus({item: {status: 'default'}, id: 123}),
        true
      );
    });
  });
});
