import {strict as assert} from 'node:assert';

import {
	makeRegexOf,
	makeSafeRegexOf
} from './string-[string-regexp].js';

describe('String -> (String -> RegExp)', function () {
	describe('makeRegexOf', () => {
		it('returns a RegExp when called with flags and a string', () => {
			assert.deepStrictEqual(makeRegexOf('ui')('foo'), /foo/ui);
		});
	});

	describe('makeSafeRegexOf', () => {
		it('returns a RegExp when called with flags and a string', () => {
			assert.deepStrictEqual(makeSafeRegexOf('ui')('foo'), /foo/ui);
		});

		it('escapes the string before returning the RegExp', () => {
			assert.deepStrictEqual(makeSafeRegexOf('ui')('foo.*'), /foo\.\*/ui);
		});
	});
})
