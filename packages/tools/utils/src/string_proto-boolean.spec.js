import {strict as assert} from "assert";

import {endsWith, startsWith} from "./string_proto-boolean";

describe("(prototype) String -> Boolean", function() {
	describe("endsWith", function() {
		it("should return true if the input string ends with the test string", function() {
			assert.deepStrictEqual(endsWith("Ping", "ing"), true);
		});
		it("should return false if the input string doesn't end with the test string", function() {
			assert.deepStrictEqual(endsWith("Pong", "ing"), false);
		});
	});
	describe("startsWith", function() {
		it("should return true true if a string starts with the provided string", function() {
			assert.deepStrictEqual(startsWith("Ping", "Pin"), true);
		});
		it("should return false if a string doesn't start with the provided string", function() {
			assert.deepStrictEqual(startsWith("Pong", "Pin"), false);
		});
	});
});
