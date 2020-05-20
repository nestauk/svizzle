import {strict as assert} from "assert";

import {makePosition3D} from "./3D";

describe("3DPoint", function() {
	describe("makePosition3D", function() {
		it("should create a point object from an array", function() {
			assert.deepStrictEqual(makePosition3D([1, 2, 3]), {x: 1, y: 2, z: 3});
		});
	});
});
