import {strict as assert} from "assert";

import {arrayMaxBy, arrayMinBy} from "./string-[array-number]";

describe("String -> (Array -> Number)", function() {
	describe("max/min", function() {
		const objArray = [
			{a: -1, b: -1},
			{a: 0, b: 0},
			{a: 1, b: 1},
			{a: 2, b: -2}
		];

		describe("arrayMaxBy", function() {
			it("should return a function expecting an array of numbers and returning the max of values by the provided key", function() {
				const maxByA = arrayMaxBy("a");
				const maxByB = arrayMaxBy("b");

				assert.deepStrictEqual(maxByA(objArray), 2);
				assert.deepStrictEqual(maxByB(objArray), 1);
			});
			it("should return a function returning `-Infinity` if `key` is not found in the array objects", function() {
				const maxByC = arrayMaxBy("key");

				assert.deepStrictEqual(maxByC(objArray), -Infinity);
			});
		});
		describe("arrayMinBy", function() {
			it("should return a function expecting an array of numbers and returning the min of values by the provided key", function() {
				const minByA = arrayMinBy("a");
				const minByB = arrayMinBy("b");

				assert.deepStrictEqual(minByA(objArray), -1);
				assert.deepStrictEqual(minByB(objArray), -2);
			});
			it("should return a function returning `Infinity` if `key` is not found in the array objects", function() {
				const minByC = arrayMinBy("key");

				assert.deepStrictEqual(minByC(objArray), Infinity);
			});
		});
	});
});
