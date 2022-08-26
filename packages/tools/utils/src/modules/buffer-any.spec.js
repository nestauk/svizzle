import {strict as assert} from 'assert';

import {jsonBufferToAny} from './buffer-any';

describe('Stream-Any', function () {
	describe('jsonBufferToAny', function () {
		it('should convert a buffer representing a json object into a javascript object', function () {
			const encoder = new TextEncoder();
			const buffer = encoder.encode('{"a": 1}');
			const actual = jsonBufferToAny(buffer);
			const expected = {a: 1};

			assert.deepStrictEqual(actual, expected);
		});
	});
});
