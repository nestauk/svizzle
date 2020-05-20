import {strict as assert} from "assert";

import {sliceStringAt} from "./array-[string-string]";

describe("Array -> (String -> String)", function() {
	describe("sliceStringAt", function() {
		it("should return a function extracting the portion of a string between the provided indices (first included, second excluded)", function() {
			const slicer = sliceStringAt([3, 5]);

			assert.deepStrictEqual(slicer('0123456789'), '34');
			assert.deepStrictEqual(slicer('abcdef'), 'de');
		});
		it("should return a function extracting the portion of a string from the provided index (first included, second excluded & implicit)", function() {
			const slicer = sliceStringAt([3]);

			assert.deepStrictEqual(slicer('0123456789'), '3456789');
			assert.deepStrictEqual(slicer('abcdef'), 'def');
		});
	});
});
