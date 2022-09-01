import {strict as assert} from 'node:assert';

import {endsWithNewLine, isTrimmedNotEmpty} from './string-boolean.js';

describe('String -> Boolean', function () {
	describe('endsWithNewLine', function () {
		it('should return true if the string ends with a newline (Unix)', function () {
			assert.deepStrictEqual(endsWithNewLine('abc\n'), true);
		});
		it('should return true if the string ends with a newline (Windows)', function () {
			assert.deepStrictEqual(endsWithNewLine('abc\r\n'), true);
		});
		it('should return false if the string does not end with a newline', function () {
			assert.deepStrictEqual(endsWithNewLine('abc'), false);
		});
	});
	describe('isTrimmedNotEmpty', function () {
		it('should return true with "foo"', function () {
			assert.deepStrictEqual(isTrimmedNotEmpty('foo'), true);
		});
		it('should return true with "  foo  "', function () {
			assert.deepStrictEqual(isTrimmedNotEmpty('  foo  '), true);
		});
		it('should return false with ""', function () {
			assert.deepStrictEqual(isTrimmedNotEmpty(''), false);
		});
		it('should return false with "  "', function () {
			assert.deepStrictEqual(isTrimmedNotEmpty('  '), false);
		});
	});
});
