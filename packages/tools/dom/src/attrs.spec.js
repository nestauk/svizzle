import {strict as assert} from "assert";

import {makeStyle, toPx} from "./attrs";

describe("dom: attrs", function() {
    describe("makeStyle", function() {
        it("should create a style string from a style object with one property", function() {
            assert.deepStrictEqual(
                makeStyle({color: "red"}),
                "color:red"
            );
        });
        it("should create a style string from a style object with multiple properties", function() {
            assert.deepStrictEqual(
                makeStyle({color: "red", "font-size": "10px"}),
                "color:red;font-size:10px"
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