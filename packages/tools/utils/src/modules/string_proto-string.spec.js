import {strict as assert} from 'assert';

import {sliceString, trim} from './string_proto-string';

describe('(prototype) String -> String', function() {
	describe('sliceString', function() {
		it('should return the portion of the provided string between the provided indices (first included, second excluded)', function() {
			assert.deepStrictEqual(sliceString('0123456789', 3), '3456789');
			assert.deepStrictEqual(sliceString('0123456789', 3, 5), '34');
			assert.deepStrictEqual(sliceString('0123456789', 3, -1), '345678');
		});
	});
	describe('trim', function() {
		it('should return a function that trims the input string', function() {
			assert.deepStrictEqual(trim(' abc \n '), 'abc');
			assert.deepStrictEqual(trim(' abc '), 'abc');
			assert.deepStrictEqual(trim('abc '), 'abc');
			assert.deepStrictEqual(trim(' abc'), 'abc');
			assert.deepStrictEqual(trim('\nabc'), 'abc');
			assert.deepStrictEqual(trim('abc\n'), 'abc');
			assert.deepStrictEqual(trim('\nabc\n'), 'abc');
		});
	});
});
