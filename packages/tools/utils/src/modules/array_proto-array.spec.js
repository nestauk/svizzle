import {strict as assert} from 'node:assert';

import {concat} from './array_proto-array.js';

describe('(prototype) Array -> Array', function () {
	describe('concat', function () {
		const arr1 = [0, 1, 2, 3, 4];
		const arr2 = [5, 6, 7, 8, 9];

		it('should concatenate 2 arrays', function () {
			assert.deepStrictEqual(
				concat(arr1, arr2),
				[...arr1, ...arr2]
			);
		});
		it('should concatenate 4 arrays', function () {
			assert.deepStrictEqual(
				concat(arr1, arr2, arr1, arr2),
				[...arr1, ...arr2, ...arr1, ...arr2]
			);
		});
		it('should concatenate empty arrays', function () {
			assert.deepStrictEqual(
				concat([], []),
				[]
			);
		});
		it('should concatenate array and an empty array', function () {
			assert.deepStrictEqual(
				concat(arr1, []),
				arr1
			);
		});
		it('should concatenate an empty array and an array', function () {
			assert.deepStrictEqual(
				concat([], arr1),
				arr1
			);
		});
	});
});
