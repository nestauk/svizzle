import {strict as assert} from "assert";

import nock from "nock";

import {requestJson, requestNdjson} from "./json";

import fetch from "node-fetch";
global.fetch = fetch;

describe("request: json", function() {
    describe("requestJson", function() {
        const obj = {a: 1, b: 2};

        it("should return a request to a JSON file as a promise (with Fetch)",
            async function() {
                nock("http://this.test")
                .get('/json')
                .reply(200, obj);

                const response = await requestJson("http://this.test/json");

                assert.deepStrictEqual(response, obj);
            }
        );
        // FIXME nock throws because of lowercase duplicate headers
        // "Error: Failed to convert header keys to lower case due to field name conflict: accept"
        // see https://github.com/nock/nock#header-field-names-are-case-insensitive
        // it("should return a request to a JSON file as a promise (with XMLHttpRequest)",
        //     async function() {
        //         nock("http://this.test")
        //         .log(console.log)
        //         .get('/json')
        //         .reply(200, obj)
        //
        //         const response = await requestJson("http://this.test/json", false);
        //
        //         assert.deepStrictEqual(response, obj);
        //     }
        // );
    });
    describe("requestNdjson", function() {
        const ndjson = '{"a":1}\n{"b":2}\n\n';
        const array = [{a: 1}, {b: 2}];

        it("should return a request to a ndjson file as a promise (with Fetch)",
            async function() {
                nock("http://this.test")
                .get('/ndjson')
                .reply(200, ndjson);

                const response = await requestNdjson("http://this.test/ndjson");

                assert.deepStrictEqual(response, array);
            }
        );
        // FIXME nock throws because of lowercase duplicate headers
        // "Error: Failed to convert header keys to lower case due to field name conflict: accept"
        // see https://github.com/nock/nock#header-field-names-are-case-insensitive
        // it("should return a request to a ndjson file as a promise (with XMLHttpRequest)",
        //     async function() {
        //         nock("http://this.test")
        //         .get('/ndjson')
        //         .reply(200, ndjson);
        //
        //         const response = await requestNdjson("http://this.test/ndjson", false);
        //
        //         assert.deepStrictEqual(response, array);
        //     }
        // );
    });
});
