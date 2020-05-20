import {strict as assert} from "assert";

import {
	vectorLength2D,
	makeVectorFeatures
} from "./2DVector";

describe("2DVector", function() {
	describe("vectorLength2D", function() {
		it("should calculate a vector length", function() {
			assert.deepStrictEqual(vectorLength2D(1, 1), 1.4142135623730951);
		});
		it("should return zero for the zero vector", function() {
			assert.deepStrictEqual(vectorLength2D(0, 0), 0);
		});
	});
	describe("makeVectorFeatures", function() {
		it("should return a vector features", function() {
			assert.deepStrictEqual(
				makeVectorFeatures({x: 1, y: 1}),
				{
					length: 1.4142135623730951,
					versor: {x: 0.7071067811865475, y: 0.7071067811865475}
				}
			);
		});
		it("should return features with null versor for the zero vector", function() {
			assert.deepStrictEqual(
				makeVectorFeatures({x: 0, y: 0}),
				{length: 0, versor: {x: 0, y: 0}}
			);
		});
	});
});
