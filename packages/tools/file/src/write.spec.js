import {strict as assert} from "assert";
import path from "path";

import nock from "nock";
import tempy from "tempy";
import fetch from "node-fetch";
global.fetch = fetch;

import {requestJson} from "@svizzle/request";

import {readJson} from "./read";
import {saveObj, saveObjPassthrough, saveResponse} from "./write";

describe("write", function() {
    describe("saveObj", function() {
        it("should return a function that expects an object and returns a promise that writes to the provided filepath",
            async function() {
                const jsonPath = path.resolve(__dirname, "../test_assets", "a1.json");
                const tmpFilepath = tempy.file();

                await readJson(jsonPath).then(saveObj(tmpFilepath));
                const writtenJson = await readJson(tmpFilepath);

                assert.deepStrictEqual(writtenJson, {a: 1});
            }
        );
    });
    describe("saveObjPassthrough", function() {
        it("should return a function that expects an object and returns a promise that writes to the provided filepath and then returns the object",
            async function() {
                const jsonPath = path.resolve(__dirname, "../test_assets", "a1.json");
                const tmpFilepath = tempy.file();

                const returnedJson =
                    await readJson(jsonPath)
                    .then(saveObjPassthrough(tmpFilepath));

                const writtenJson = await readJson(tmpFilepath);

                assert.deepStrictEqual(writtenJson, {a: 1});
                assert.deepStrictEqual(returnedJson, {a: 1});
            }
        );
    });
    describe("saveResponse", function() {
        it("should return a function that expects a response and returns a promise that saves the response body to the provided filepath",
            async function() {
                const tmpFilepath = tempy.file();
                const obj = {a: 1, b: 2};

                nock("http://this.test")
                .get('/json')
                .reply(200, obj);

                await fetch("http://this.test/json")
                .then(saveResponse(tmpFilepath));

                const writtenJson = await readJson(tmpFilepath);

                assert.deepStrictEqual(writtenJson, obj);
            }
        );
    });
});
