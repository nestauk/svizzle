import {strict as assert} from 'node:assert';

import {
	joinWithBlank,
	joinWithDash,
	joinWithColon,
	joinWithSemicolon
} from './array-string.js';

const arr = [0, 1, 2];

describe('Array -> String', function () {
	describe('joinWithBlank', function () {
		it('should join an array with blanks', function () {
			assert.deepStrictEqual(joinWithBlank(arr), '0 1 2');
		});
	});
	describe('joinWithDash', function () {
		it('should join an array with dashes', function () {
			assert.deepStrictEqual(joinWithDash(arr), '0-1-2');
		});
	});
	describe('joinWithColon', function () {
		it('should join an array with colons', function () {
			assert.deepStrictEqual(joinWithColon(arr), '0:1:2');
		});
	});
	describe('joinWithSemicolon', function () {
		it('should join an array with semicolons', function () {
			assert.deepStrictEqual(joinWithSemicolon(arr), '0;1;2');
		});
	});
});
