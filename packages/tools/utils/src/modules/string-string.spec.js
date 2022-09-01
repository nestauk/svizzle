import {strict as assert} from 'node:assert';

import {capitalize, trimLastNewline} from './string-string.js';

describe('String -> String', function () {
	describe('capitalize', function () {
		it('should capitalise the input string', function () {
			assert.deepStrictEqual(capitalize('hello'), 'Hello');
		});
	});
	describe('trimLastNewline', function () {
		it('should not trim the last char if it\'s not a newline', function () {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc'), 'a\nb\nc');
		});
		it('should trim the last char if it\'s a newline char (Unix)', function () {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc\n'), 'a\nb\nc');
		});
		it('should trim just one newline char at the end of the string (Unix)', function () {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc\n\n'), 'a\nb\nc\n');
		});
		it('should trim the last two chars if it has a Windows newline', function () {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc\r\n'), 'a\nb\nc');
		});
		it('should trim just the last two chars if it has a Windows newline', function () {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc\n\r\n'), 'a\nb\nc\n');
		});
	});
});
