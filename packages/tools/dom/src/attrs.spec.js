import {strict as assert} from "assert";

import {makeStyle, makeStyleVars, toPx} from "./attrs";

describe("@svizzle/dom/attrs", function() {
	describe("makeStyle", function() {
		it("should create a style string from a style object - with one property", function() {
			assert.deepStrictEqual(
				makeStyle({color: "red"}),
				"color:red"
			);
		});
		it("should create a style string from a style object - with multiple properties", function() {
			assert.deepStrictEqual(
				makeStyle({color: "red", "font-size": "10px"}),
				"color:red;font-size:10px"
			);
		});
		it("should create a style string from a style object - with multiple properties, some being null or undefined", function() {
			assert.deepStrictEqual(
				makeStyle({
					"background-color": null,
					color: "red",
					"font-size": "10px",
					"font-weight": "null",
					opacity: undefined,
				}),
				"color:red;font-size:10px;font-weight:null"
			);
		});
	});
	describe("makeStyleVars", function() {
		it('should return a style string with hyphenate CSS variables derived from the keys of the expected object - with one property', function() {
			assert.deepStrictEqual(
				makeStyleVars({color: 'red'}),
				'--color:red'
			);
		});
		it('should return a style string with hyphenate CSS variables derived from the keys of the expected object – with multiple properties', function() {
			assert.deepStrictEqual(
				makeStyleVars({color: "red", "font-size": "10px"}),
				"--color:red;--font-size:10px"
			);
		});
		it("should return a style string with hyphenate CSS variables derived from the keys of the expected object – with multiple properties, some being null or undefined", function() {
			assert.deepStrictEqual(
				makeStyleVars({
					"background-color": null,
					color: "red",
					"font-size": "10px",
					"font-weight": "null",
					opacity: undefined,
				}),
				"--color:red;--font-size:10px;--font-weight:null"
			);
		});
	});
	describe("toPx", function() {
		it("should convert from number to pixels", function() {
			assert.deepStrictEqual(toPx(10), "10px");
			assert.deepStrictEqual(toPx(0), "0px");
		});
	});
});
