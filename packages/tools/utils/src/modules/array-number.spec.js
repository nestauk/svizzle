import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {
	arrayAverage,
	arrayMax,
	arrayMin,
	arraySum,
	keyValueArrayAverage,
	makeRandomNumInRange,
} from './array-number';
import {makeIsWithinRange} from './array-[number-boolean]';

describe('Array -> Number', function() {
	describe('max/min', function() {
		const numArray = [-1, -2, 0, 1, 2];

		describe('arrayMax', function() {
			it('should return the max of the numbers in the provided array', function() {
				assert.deepStrictEqual(arrayMax(numArray), 2);
			});
		});

		describe('arrayMin', function() {
			it('should return the min of an array of numbers', function() {
				assert.deepStrictEqual(arrayMin(numArray), -2);
			});
		});
	});

	describe('arraySum', function() {
		it('should return the sum of the numbers in the provided array', function() {
			assert.deepStrictEqual(arraySum([1, -2, 3, -4, 5]), 3);
		});
		it('should return 0 if an empty array is provided', function() {
			assert.deepStrictEqual(arraySum([]), 0);
		});
	});

	describe('arrayAverage', function() {
		it('should return the average of the numbers in the provided array', function() {
			assert.deepStrictEqual(arrayAverage([1, 23, 6]), 10);
		});
	});
	describe('keyValueArrayAverage', function() {
		it('should return the average of values of a {key, value}[] array', function() {
			assert.deepStrictEqual(keyValueArrayAverage([
				{key: 'a', value: 1},
				{key: 'b', value: 23},
				{key: 'c', value: 6},
			]), 10);
		});
	});

	describe('random', function() {
		describe('makeRandomNumInRange', function() {
			it('should return a number within the specified range', function() {
				_.forEach(_.range(0, 1e5), () => {
					const range = [100 * Math.random(), 100 + 100 * Math.random()];
					const randomNumber = makeRandomNumInRange(range);
					const isWithinRange = makeIsWithinRange(range);

					assert.deepStrictEqual(isWithinRange(randomNumber), true);
				})
			});
		});
	});
});
