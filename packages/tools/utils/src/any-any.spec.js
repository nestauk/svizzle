import {strict as assert} from "assert";

import {makeEmptyArrayIfUndefined, toFloatOrIdentity} from "./any-any";

function returnArgs () {
    return arguments;
}

describe("Any -> Any", function() {
    describe("Any -> number|identity", function() {
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

    describe("Any -> identity|array", function() {
        describe("makeEmptyArrayIfUndefined", function() {
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
});
