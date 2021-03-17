import {strict as assert} from 'assert';

import {
	makeEndsWith,
	makeStringEndsWith,
	makeStartsWith,
	makeStringStartsWith
} from './string-[string-boolean]';

describe('String -> (String -> Boolean)', function() {
	describe('makeEndsWith', function() {
		it('should return a function expecting a base string and checking if it ends with the provided search string', function() {
			const endsWithExclamationMark = makeEndsWith('!');

			assert.deepStrictEqual(endsWithExclamationMark('Hi!'), true);
			assert.deepStrictEqual(endsWithExclamationMark('Who?'), false);
		});
	});
	describe('makeStringEndsWith', function() {
		it('should return a function expecting a search string and checking if the provided base string ends with the search string', function() {
			const stringEndsWith = makeStringEndsWith('Hi!');

			assert.deepStrictEqual(stringEndsWith('!'), true);
			assert.deepStrictEqual(stringEndsWith('?'), false);
		});
	});
	describe('makeStartsWith', function() {
		it('should return a function expecting a base string and checking if it starts with the provided search string', function() {
			const startsWithHash = makeStartsWith('#');

			assert.deepStrictEqual(
				startsWithHash('# this is a bash comment'),
				true
			);
			assert.deepStrictEqual(
				startsWithHash('This is not'),
				false
			);
		});
	});
	describe('makeStringStartsWith', function() {
		it('should return a function expecting a search string and checking if the provided base string starts with the search string', function() {
			const stringStartsWith = makeStringStartsWith('Hi!');

			assert.deepStrictEqual(stringStartsWith('H'), true);
			assert.deepStrictEqual(stringStartsWith('h'), false);
		});
	});
});
