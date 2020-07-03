import {strict as assert} from 'assert';

import {joinWith} from './string-[array-string]';

describe('String -> (Array -> String)', function() {
	describe('joinWith', function() {
		it('should return a function expecting an array to join with the provided separator', function() {
			const joinWithAt = joinWith('@');

			assert.deepStrictEqual(joinWithAt([0, 1, 2]), '0@1@2');
		});
	});
});
