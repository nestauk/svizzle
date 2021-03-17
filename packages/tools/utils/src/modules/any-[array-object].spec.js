import {strict as assert} from 'assert';

import {makeKeyed} from './any-[array-object]';

describe('Any -> (Any -> Array)', function() {
	describe('toFloatOrIdentity', function() {
		it('should return a function expecting an array of keys and returning an object with the provided value as value of those keys', function() {
			const makeKeyedEmptyArray = makeKeyed([]);

			assert.deepStrictEqual(
				makeKeyedEmptyArray([1, 2]),
				{1: [], 2: []}
			);
			assert.deepStrictEqual(
				makeKeyedEmptyArray(['a', 'b']),
				{a: [], b: []}
			);
		});
	});
});
