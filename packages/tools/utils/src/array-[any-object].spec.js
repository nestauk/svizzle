import {strict as assert} from "assert";

import * as _ from "lamb";

import {makeWith} from "./array-[any-object]";

describe("Array -> (Any -> Object)", function() {
	describe("makeWith", function() {
		it("should return a function expecting an array and that applies the provided transforms to its elements", function() {
			const makeCircle = makeWith([
				["radius", "perimeter", "area"],
				[_.identity, r => 2 * Math.PI * r, r => Math.PI * Math.pow(r, 2)]
			]);

			assert.deepStrictEqual(
				makeCircle(3),
				{radius: 3, perimeter: 18.84955592153876, area: 28.274333882308138}
			);
			assert.deepStrictEqual(
				makeCircle(4),
				{radius: 4, perimeter: 25.132741228718345, area: 50.26548245743669}
			);
		});
	});
});
