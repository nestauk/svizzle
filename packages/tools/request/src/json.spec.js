import {strict as assert} from 'assert';

import nock from 'nock';
import fetch from 'node-fetch';

import {requestNdjson} from './json';

global.fetch = fetch;

describe('requestNdjson', function() {
	const ndjson = '{"a":1}\n{"b":2}\n\n';
	const array = [{a: 1}, {b: 2}];

	it('should return a request to a ndjson file as a promise (with Fetch)',
		async function() {
			nock('http://this.test')
			.get('/ndjson')
			.reply(200, ndjson);

			const response = await requestNdjson('http://this.test/ndjson');

			assert.deepStrictEqual(response, array);
		}
	);
});
