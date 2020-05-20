import {strict as assert} from "assert";

import {
	makePosition2D,
	getDistance2D,
	getTwoPointsCenter
} from "./2DPoint";

describe("2DPoint", function() {
	describe("makePosition2D", function() {
		it("should create a point object from an array", function() {
			assert.deepStrictEqual(
				makePosition2D([1, 2]),
				{x: 1, y: 2}
			);
		});
	});
	describe("getDistance2D", function() {
		it("should return the distance between 2 points", function() {
			assert.deepStrictEqual(
				getDistance2D({x: 1, y: 1}, {x: 2, y: 2}),
				1.4142135623730951
			);
		});
		it("should return zero as the distance between 2 coincident points", function() {
			assert.deepStrictEqual(
				getDistance2D({x: 1, y: 1}, {x: 1, y: 1}),
				0
			);
		});
	});
	describe("getTwoPointsCenter", function() {
		it("should return two points center", function() {
			assert.deepStrictEqual(
				getTwoPointsCenter({x: 1, y: 1}, {x: 3, y: 3}),
				{x: 2, y: 2}
			);
		});
	});
});
