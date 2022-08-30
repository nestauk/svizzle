import {strict as assert} from 'assert';

import {makePostfixed, makePrefixed} from './string-[string-string]';

describe('String -> (String -> String)', function () {
	describe('makePostfixed', function () {
		it('should return a function that appends the provided string to the input string', function () {
			const postfixed = makePostfixed('---');
			assert.deepStrictEqual(postfixed('A'), 'A---');
			assert.deepStrictEqual(postfixed('B'), 'B---');
		});
	});
	describe('makePrefixed', function () {
		it('should return a function that prepends the provided string to the input string', function () {
			const prefixed = makePrefixed('---');
			assert.deepStrictEqual(prefixed('A'), '---A');
			assert.deepStrictEqual(prefixed('B'), '---B');
		});
	});
});
