import {strict as assert} from "assert";

import {makeIsWithinRange} from "./array-[number-boolean]";

describe("Array -> (Number -> Boolean)", function() {
	describe("makeIsWithinRange", function() {
		it("should return a function expecting a number returning true if the number is within the provided range", function() {
			const isWithinRange = makeIsWithinRange([0, 5]);

			assert.deepStrictEqual(isWithinRange(-1), false);
			assert.deepStrictEqual(isWithinRange(0), true);
			assert.deepStrictEqual(isWithinRange(2), true);
			assert.deepStrictEqual(isWithinRange(5), true);
			assert.deepStrictEqual(isWithinRange(8), false);
		});
	});
});
