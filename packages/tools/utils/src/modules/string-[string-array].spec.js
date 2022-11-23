import {strict as assert} from 'node:assert';

import {
	makeSplitBy,
	makeSplitStringBy,
	makeTrimmedSplitBy,
} from './string-[string-array].js';

describe('String -> (String -> Array)', function () {
	describe('makeSplitStringBy', function () {
		it('should return a function expecting a separator or regex o split the provided string', function () {
			const splitStringBy = makeSplitStringBy('a.b-c,d:e');

			assert.deepStrictEqual(splitStringBy(':'), ['a.b-c,d', 'e']);
			assert.deepStrictEqual(splitStringBy('-'), ['a.b', 'c,d:e']);
		});
	});
	describe('makeSplitBy', function () {
		it('should return a function expecting a string to be split using the provided separator or regex', function () {
			const splitByDoubleDot = makeSplitBy('..');

			assert.deepStrictEqual(
				splitByDoubleDot('aa...a..a.a.aa.....aa..'),
				['aa', '.a', 'a.a.aa', '', '.aa', '']
			);
		});
	});
	describe('makeTrimmedSplitBy', function () {
		it('should return a function that splits the expected string and trims all the elements of the returned array', function () {
			const trimSplitByDoubleDot = makeTrimmedSplitBy('..');

			assert.deepStrictEqual(
				trimSplitByDoubleDot('  aa ..\ta\n..a'),
				['aa', 'a', 'a']
			);
			assert.deepStrictEqual(
				trimSplitByDoubleDot('  aa ...\na..a.a.aa\n.....\taa..\n'),
				['aa', '.\na', 'a.a.aa', '', '.\taa', '']
			);
		});
	});
});
