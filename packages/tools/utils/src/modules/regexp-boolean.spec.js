import {strict as assert} from 'node:assert';

import {isRegexpEmpty, isRegexpNotEmpty} from './regexp-boolean.js';

describe('Regexp -> Boolean', () => {
	describe('isRegexpEmpty', () => {
		it('should return true if regex is empty', () => {
			assert.deepStrictEqual(isRegexpEmpty(/(?:)/u), true);
		});

		it('should return false if regex is not empty', () => {
			assert.deepStrictEqual(isRegexpEmpty(/^a/u), false);
		});
	});

	describe('isRegexpNotEmpty', () => {
		it('should return true if regex is not empty', () => {
			assert.deepStrictEqual(isRegexpNotEmpty(/^a/u), true);
		});

		it('should return false if regex is empty', () => {
			assert.deepStrictEqual(isRegexpNotEmpty(/(?:)/u), false);
		});
	});
});
