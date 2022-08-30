import {strict as assert} from 'assert';

import {
	concatValues,
	getTruthyValuesKeys,
	makeKeyedValuesPermutations,
	objectToKeyValueArray,
} from './object-array';

describe('Object -> Array', function () {
	describe('concatValues', function () {
		it('should concatenate the values of the provided objects', function () {
			assert.deepStrictEqual(
				concatValues({a: [1, 2, 3], b: [4, 5, 6]}),
				[1, 2, 3, 4, 5, 6]
			);
		});
	});
	describe('getTruthyValuesKeys', function () {
		it('should return the keys with a true value', function () {
			assert.deepStrictEqual(
				getTruthyValuesKeys({a: true, b: true, c: false}),
				['a', 'b']
			);
		});
		it('should return the keys with a truthy value', function () {
			assert.deepStrictEqual(
				getTruthyValuesKeys({a: 1, b: 0, c: false}),
				['a']
			);
			assert.deepStrictEqual(
				getTruthyValuesKeys({a: [1, 2], b: {a: 1}, c: false}),
				['a', 'b']
			);
		});
	});
	describe('makeKeyedValuesPermutations', function () {
		it('should return an array of the permutations of the provided object values items, by key', function () {
			const obj = {a: [0, 1], b: [2, 3], c: [4, 5]};
			const expected = [
				{a: 0, b: 2, c: 4}, {a: 1, b: 2, c: 4},
				{a: 0, b: 3, c: 4}, {a: 1, b: 3, c: 4},
				{a: 0, b: 2, c: 5}, {a: 1, b: 2, c: 5},
				{a: 0, b: 3, c: 5}, {a: 1, b: 3, c: 5}
			];
			assert.deepStrictEqual(makeKeyedValuesPermutations(obj), expected);
		});
		it('should filter out non valid values before creating permutations', function () {
			const obj = {a: [0, 1], b: [], c: [4, 5], d: 1, e: 'string'};
			const expected = [
				{a: 0, c: 4}, {a: 1, c: 4},
				{a: 0, c: 5}, {a: 1, c: 5}
			];
			assert.deepStrictEqual(makeKeyedValuesPermutations(obj), expected);
		});
		it('should return an empty array if none of the values are valid', function () {
			const obj = {a: [], b: [], c: {k: 1}, d: 1, e: 'string'};
			const expected = [];
			assert.deepStrictEqual(makeKeyedValuesPermutations(obj), expected);
		});
	});
	describe('objectToKeyValueArray', function () {
		it('should return an array of {key, value} objects from an object', function () {
			assert.deepStrictEqual(
				objectToKeyValueArray({k1: 'v1', k2: 'v2'}),
				[{key: 'k1', value: 'v1'}, {key: 'k2', value: 'v2'}]
			);
		});
	});
});
