import {strict as assert} from 'assert';

import {getEndOfLineLength} from './string-number';

describe('String -> Number', function() {
	describe('getEndOfLineLength', function() {
		it('should return 0 if the input string has no end of line', function() {
			assert.deepStrictEqual(getEndOfLineLength('hello'), 0);
		});
		it('should return 1 if the input string has the Unix end of line', function() {
			assert.deepStrictEqual(getEndOfLineLength('hello\n'), 1);
		});
		it('should return 1 if the input string has the Windows end of line', function() {
			assert.deepStrictEqual(getEndOfLineLength('hello\r\n'), 2);
		});
	});
});
