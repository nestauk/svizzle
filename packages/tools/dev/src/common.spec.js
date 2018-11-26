import {strict as assert} from "assert";

import {
    renameToCss,
    renameToMinJs,
    renameToMjs,
    makeBanner
} from "./common";

describe("dev: common", function() {
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
                makeBanner({name: "foo", version: "0.1.0"}),
                "// foo v0.1.0 - © 2019 Nesta"
            );
        });
    });
});
