import {strict as assert} from "assert";

import {makePrinter} from "@svizzle/dev";

import {
    makeEmptyArrayIfUndefined,
    toFloatOrIdentity,
    tapValue,
    tapType,
    tapTypeAndValue
} from "./any";

function returnArgs () {
    return arguments;
}

describe("Any -> Any", function() {
    describe("number|identity", function() {
        describe("toFloatOrIdentity", function() {
            it("should return a number if the input can be converted to a float, identity otherwise", function() {
                assert.deepStrictEqual(toFloatOrIdentity("2"), 2);
                assert.deepStrictEqual(toFloatOrIdentity("2px"), 2);
                assert.deepStrictEqual(toFloatOrIdentity(""), "");
                assert.deepStrictEqual(toFloatOrIdentity("h2o"), "h2o");
                assert.deepStrictEqual(toFloatOrIdentity([1.1]), 1.1);
                assert.deepStrictEqual(toFloatOrIdentity([1.1, 2]), 1.1);
                assert.deepStrictEqual(toFloatOrIdentity([1.1, 2, 3]), 1.1);
                assert.deepStrictEqual(toFloatOrIdentity([]), []);
                assert.deepStrictEqual(toFloatOrIdentity({a: 1}), {a: 1});
                assert.deepStrictEqual(toFloatOrIdentity(true), true);
                assert.deepStrictEqual(toFloatOrIdentity(null), null);
                assert.deepStrictEqual(toFloatOrIdentity(undefined), undefined);

                // TODO
                // assert.deepStrictEqual(toFloatOrIdentity(returnArgs()), {});
                // assert.deepStrictEqual(toFloatOrIdentity(returnArgs(1)), {0: 1});
                // assert.deepStrictEqual(toFloatOrIdentity(returnArgs(1, 2)), {0: 1, 1: 2});
            });
        });
    });

    describe("array|identity", function() {
        describe("makeEmptyArrayIfUndefined()", function() {
            it("should create [] from undefined", function() {
                assert.deepStrictEqual(makeEmptyArrayIfUndefined(undefined), []);
            });
            it("should leave untouched if null", function() {
                assert.deepStrictEqual(makeEmptyArrayIfUndefined(null), null);
            });
            it("should leave untouched if defined", function() {
                assert.deepStrictEqual(makeEmptyArrayIfUndefined(4), 4);
                assert.deepStrictEqual(makeEmptyArrayIfUndefined([1, 2]), [1, 2]);
                assert.deepStrictEqual(makeEmptyArrayIfUndefined({a: 1}), {a: 1});
                assert.deepStrictEqual(makeEmptyArrayIfUndefined("str"), "str");
            });
        });
    });

    /* taps */

    describe("taps", function() {
        let printer;
        before(function () {
            printer = makePrinter();
            printer.init();
        });
        beforeEach(function () {
            printer.reset();
        });
        after(function () {
            printer.restore();
        });

        describe("tapValue", function() {
            it("should print and return the input", function() {
                const expected = [1, 2, 3];
                const actual = tapValue(expected);
                const expectedLog = [[expected]];

                assert.deepStrictEqual(actual, expected);
                assert.deepStrictEqual(printer.getLog(), expectedLog);
            });
        });
        describe("tapType", function() {
            it("should print the input type and return the input", function() {
                const actual = tapType([1, 2, 3]);
                const expected = [1, 2, 3];
                const expectedLog = [["Array"]];

                assert.deepStrictEqual(actual, expected);
                assert.deepStrictEqual(printer.getLog(), expectedLog);
            });
        });
        describe("tapTypeAndValue", function() {
            it("should print the input type and return the input", function() {
                const actual = tapTypeAndValue([1, 2, 3]);
                const expected = [1, 2, 3];
                const expectedLog = [["Array", expected]];

                assert.deepStrictEqual(actual, expected);
                assert.deepStrictEqual(printer.getLog(), expectedLog);
            });
        });
    });
});
