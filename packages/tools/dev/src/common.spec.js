import {strict as assert} from "assert";

import {
	renameToExtension,
	renameToCss,
	renameToMinJs,
	renameToMjs,
	makeBanner
} from "./common";

describe("dev: common", function() {
	describe("renameToExtension", function() {
		it("should return a function expecting the filepath to rename", function() {
			const renameToFoo = renameToExtension(".foo");

			assert.deepStrictEqual(
				renameToFoo("filepath.txt"),
				"filepath.foo"
			);
			assert.deepStrictEqual(
				renameToFoo("filepath.spec.txt"),
				"filepath.spec.foo"
			);
		});
	});
	describe("renameToCss", function() {
		it("should change extension from .js to .css", function() {
			assert.deepStrictEqual(
				renameToCss("foo.js"),
				"foo.css"
			);
		});
		it("should change extension from .bar.js to .bar.css", function() {
			assert.deepStrictEqual(
				renameToCss("foo.bar.js"),
				"foo.bar.css"
			);
		});
	});
	describe("renameToMinJs", function() {
		it("should change extension from .js to .min.js", function() {
			assert.deepStrictEqual(
				renameToMinJs("foo.js"),
				"foo.min.js"
			);
		});
		it("should change extension from .bar.js to .bar.min.js", function() {
			assert.deepStrictEqual(
				renameToMinJs("foo.bar.js"),
				"foo.bar.min.js"
			);
		});
	});
	describe("renameToMjs", function() {
		it("should change extension from .js to .mjs", function() {
			assert.deepStrictEqual(
				renameToMjs("foo.js"),
				"foo.mjs"
			);
		});
		it("should change extension from .bar.js to .bar.mjs", function() {
			assert.deepStrictEqual(
				renameToMjs("foo.bar.js"),
				"foo.bar.mjs"
			);
		});
	});
	describe("makeBanner", function() {
		it("should create a banner from a package.json-like object", function() {
			assert.deepStrictEqual(
				makeBanner({
					name: "svizzle",
					version: "0.1.0",
					author: "nestauk (https://www.nesta.org.uk/)"
				}),
				"// svizzle v0.1.0 - © 2020 nestauk (https://www.nesta.org.uk/)"
			);
			assert.deepStrictEqual(
				makeBanner({
					name: "svizzle",
					version: "0.1.0",
					author: {name: "nestauk", url: "https://www.nesta.org.uk/"}
				}),
				"// svizzle v0.1.0 - © 2020 nestauk"
			);
		});
	});
});
