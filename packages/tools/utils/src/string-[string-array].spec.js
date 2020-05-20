import {strict as assert} from "assert";

import {makeSplitBy, makeSplitStringBy} from "./string-[string-array]";

describe("String -> (String -> Array)", function() {
	describe("makeSplitStringBy", function() {
		it("should return a function expecting a separator or regex o split the provided string", function() {
			const splitStringBy = makeSplitStringBy("a.b-c,d:e");

			assert.deepStrictEqual(splitStringBy(":"), ["a.b-c,d", "e"]);
			assert.deepStrictEqual(splitStringBy("-"), ["a.b", "c,d:e"]);
		});
	});
	describe("makeSplitBy", function() {
		it("should return a function expecting a string to be split using the provided separator or regex", function() {
			const splitByDoubleDot = makeSplitBy("..");

			assert.deepStrictEqual(
				splitByDoubleDot("aa...a..a.a.aa.....aa.."),
				["aa", ".a", "a.a.aa", "", ".aa", ""]
			);
		});
	});
});
