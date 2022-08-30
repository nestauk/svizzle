import {strict as assert} from 'assert';

import {getShorter} from './array-iterable';

describe('Array -> Any', function () {
	describe('getShorter', function () {
		it('should return the shorter of the provided items', function () {
			assert.deepStrictEqual(
				getShorter([[1, 2], [1], [1, 2, 3], ['a']]),
				[1]
			);
			assert.deepStrictEqual(
				getShorter([[], [1], [2], []]),
				[]
			);
			assert.deepStrictEqual(
				getShorter(['abc', 'a', [1]]),
				'a'
			);
			assert.deepStrictEqual(
				getShorter(['bc', 'g', '']),
				''
			);
		});
		it('should return the first in a pair of items of same length', function () {
			assert.deepStrictEqual(
				getShorter([[3, 4], [1, 2]]),
				[3, 4]
			);
			assert.deepStrictEqual(
				getShorter(['b', 'a']),
				'b'
			);
		});
		it('should return undefined if we provide an empty iterable', function () {
			assert.deepStrictEqual(
				getShorter([]),
				undefined
			);
			assert.deepStrictEqual(
				getShorter(''),
				undefined
			);
		});
	});
});
