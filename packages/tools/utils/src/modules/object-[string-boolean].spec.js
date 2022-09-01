import {strict as assert} from 'node:assert';

import {isKeyOf} from './object-[string-boolean].js';

describe('Object -> (String -> Boolean)', function () {
	describe('isKeyOf', function () {
		it('should return a function that checks if the expected string is a key of the provided object', function () {
			const isKeyOfObj = isKeyOf({a: 1, b: 2});
			assert.strictEqual(isKeyOfObj('a'), true);
			assert.strictEqual(isKeyOfObj('c'), false);
		});
	});
});
