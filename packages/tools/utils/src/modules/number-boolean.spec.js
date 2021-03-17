import {strict as assert} from 'assert';

import {
	is0,
	is1,
	isGT0,
	isGT1
} from './number-boolean';

describe('Number -> Boolean', function() {
	describe('is0', function() {
		it('should return true if the provided number is 0', function() {
			assert.deepStrictEqual(is0(0), true);
		});
	});
	describe('is1', function() {
		it('should return true if the provided number is 1', function() {
			assert.deepStrictEqual(is1(1), true);
		});
	});
	describe('isGT0', function() {
		it('should return true if the provided number is greater than 0', function() {
			assert.deepStrictEqual(isGT0(1), true);
		});
	});
	describe('isGT1', function() {
		it('should return true if the provided number is greater than 1', function() {
			assert.deepStrictEqual(isGT1(2), true);
		});
	});
});
