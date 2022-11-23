import {strict as assert} from 'node:assert';

import {regexOf, safeRegexOf} from './string-regexp.js';

describe('String -> RegExp', function () {
	describe('regexOf', function () {
		it('should return a regular expression based on the given string', function () {
			assert.deepStrictEqual(regexOf('foo'), /foo/giu);
		});
	});
	describe('safeRegexOf', function () {
		it('should return a safe regular expression based on the given string', function () {
			assert.deepStrictEqual(safeRegexOf('foo+bar'), /foo\+bar/giu);
		});
	});
});
