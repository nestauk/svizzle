import {strict as assert} from 'assert';

import {capitalize, trimLastNewline} from './string-string';

describe('String -> String', function() {
	describe('capitalize', function() {
		it('should capitalise the input string', function() {
			assert.deepStrictEqual(capitalize('hello'), 'Hello');
		});
	});
	describe('trimLastNewline', function() {
		it("should not trim the last char if it's not a newline", function() {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc'), 'a\nb\nc');
		});
		it("should trim the last char if it's a newline", function() {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc\n'), 'a\nb\nc');
		});
		it('should just one newline at the end of the string', function() {
			assert.deepStrictEqual(trimLastNewline('a\nb\nc\n\n'), 'a\nb\nc\n');
		});
	});
});
