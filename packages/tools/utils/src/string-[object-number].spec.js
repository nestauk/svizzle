import {strict as assert} from "assert";

import {valuesMaxBy, valuesMinBy} from "./string-[object-number]";

describe("String -> (Object -> Number)", function() {
	describe("max/min", function() {
		const objectOfObjectjs1 = {a: {k1: 1, k2: 20}, b: {k1: 3,  k2: 2}};
		const objectOfObjectjs2 = {a: {k1: 9, k2: 12}, b: {k1: 7,  k2: 2}};

		describe("valuesMaxBy", function() {
			it("should return the max of the provided object values", function() {
				const maxByK1 = valuesMaxBy("k1");

				assert.deepStrictEqual(maxByK1(objectOfObjectjs1), 3);
				assert.deepStrictEqual(maxByK1(objectOfObjectjs2), 9);
			});
			it("should return -Infinity if the key is not found in the values objects", function() {
				const maxByKey = valuesMaxBy("key");

				assert.deepStrictEqual(maxByKey(objectOfObjectjs1), -Infinity);
				assert.deepStrictEqual(maxByKey(objectOfObjectjs2), -Infinity);
			});
		});

		describe("valuesMinBy", function() {
			it("should return the max of the provided object values", function() {
				const minByK1 = valuesMinBy("k1");

				assert.deepStrictEqual(minByK1(objectOfObjectjs1), 1);
				assert.deepStrictEqual(minByK1(objectOfObjectjs2), 7);
			});
			it("should return Infinity if the key is not found in the values objects", function() {
				const minByKey = valuesMinBy("key");

				assert.deepStrictEqual(minByKey(objectOfObjectjs1), Infinity);
				assert.deepStrictEqual(minByKey(objectOfObjectjs2), Infinity);
			});
		});
	});
});
