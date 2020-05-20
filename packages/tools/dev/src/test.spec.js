import {strict as assert} from "assert";

import {makePrinter} from "./test";

describe("dev: test", function() {
	describe("makePrinter", function() {
		it("should return a console.log interceptor", function() {
			const printer = makePrinter();
			printer.init();

			console.log("foo")

			assert.deepStrictEqual(printer.getLog(), [["foo"]]);
			printer.restore();
		});
		it("should be able to intercept logs of multiple variables", function() {
			const printer = makePrinter();
			printer.init();

			console.log("foo", "bar");

			assert.deepStrictEqual(printer.getLog(), [["foo", "bar"]]);
			printer.restore();
		});
		it("should be able to intercept multiple logs", function() {
			const printer = makePrinter();
			printer.init();

			console.log("foo", "bar");
			console.log("asd", "sdf");

			assert.deepStrictEqual(printer.getLog(), [
				["foo", "bar"],
				["asd", "sdf"]
			]);
			printer.restore();
		});

		it("should be able to reset the log array", function() {
			const printer = makePrinter();
			printer.init();

			console.log("foo", "bar");
			printer.reset();

			assert.deepStrictEqual(printer.getLog(), []);
			printer.restore();
		});
		// it("should be able to restore console.log", function() {
		//     const printer = makePrinter();
		//     printer.init();
		//     printer.restore();
		//
		//     assert.deepStrictEqual(console.log, printer.print);
		// });
	});
});
