import {strict as assert} from "assert";

import {pairToKeyValueObject} from "./iterable-object";

describe("Iterable -> Object", function() {
	describe("pairToKeyValueObject", function() {
		describe("array", function() {
			it("should return the {key, value} object of a pair array", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject(["a", 2]),
					{key: "a", value: 2}
				);
				assert.deepStrictEqual(
					pairToKeyValueObject([1, 2]),
					{key: 1, value: 2}
				);
			});
			it("should return the {key, value} object of an array longer than 2", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject(["a", 2, "b"]),
					{key: "a", value: 2}
				);
			});
			it("should return the {key, value} object of an array of length 1", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject(["a"]),
					{key: "a", value: undefined}
				);
			});
			it("should return {key, value} with undefined values of a empty array", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject([]),
					{key: undefined, value: undefined}
				);
			});
		});
		describe("string", function() {
			it("should return the {key, value} object of a string of 2 chars", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject("a2"),
					{key: "a", value: "2"}
				);
				assert.deepStrictEqual(
					pairToKeyValueObject("12"),
					{key: "1", value: "2"}
				);
			});
			it("should return the {key, value} object of a string longer than 2", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject("a2b"),
					{key: "a", value: "2"}
				);
			});
			it("should return the {key, value} object of a single character", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject("a"),
					{key: "a", value: undefined}
				);
			});
			it("should return {key, value} with undefined values of a empty string", function() {
				assert.deepStrictEqual(
					pairToKeyValueObject(""),
					{key: undefined, value: undefined}
				);
			});
		});
		describe("arguments", function() {
			function func () {
				return pairToKeyValueObject(arguments);
			}
			it("should return the {key, value} object of 2 arguments", function() {
				assert.deepStrictEqual(
					func(1, 2),
					{key: 1, value: 2}
				);
			});
			it("should return the {key, value} object of more than 2 arguments", function() {
				assert.deepStrictEqual(
					func(1, 2, 3),
					{key: 1, value: 2}
				);
			});
			it("should return the {key, value} object of more than 1 argument", function() {
				assert.deepStrictEqual(
					func(1),
					{key: 1, value: undefined}
				);
			});
			it("should return {key, value} with undefined values for no argument", function() {
				assert.deepStrictEqual(
					func(),
					{key: undefined, value: undefined}
				);
			});
		});

	});
});
