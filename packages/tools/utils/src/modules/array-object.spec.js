import {strict as assert} from 'assert';

import {
	keyValueArrayToObject,
	makeAllOccurrences,
	makeIndexByKey,
	makeKeyedFalse,
	makeKeyedTrue,
	makeKeyedZeroes,
	makeOccurrences,
	mergeObjects,
} from './array-object';

describe('Array -> Object', function() {
	describe('keyValueArrayToObject', function() {
		it('should return an object built using `key`s and `value`s from the objects in the provided array', function() {
			assert.deepStrictEqual(
				keyValueArrayToObject([
					{key: 'ITA', value: 0},
					{key: 'FRA', value: 0},
					{key: 'BRA', value: 0},
					{key: 'GER', value: 1},
					{key: 'USA', value: 1},
				]),
				{
					'ITA': 0,
					'FRA': 0,
					'BRA': 0,
					'GER': 1,
					'USA': 1
				}
			);
		});
	});
	describe('makeIndexByKey', function() {
		it('should return an object with the provided array elements as keys and all values equal to their index in the array - strings', function() {
			assert.deepStrictEqual(
				makeIndexByKey(['a', 'b']),
				{a: 0, b: 1}
			);
		});
		it('should return an object with the provided array elements as keys and all values equal to their index in the array - numbers', function() {
			assert.deepStrictEqual(
				makeIndexByKey([2, -4]),
				{'2': 0, '-4': 1}
			);
		});
		it('should return an object with the provided array elements as keys and all values equal to their index in the array - arrays', function() {
			assert.deepStrictEqual(
				makeIndexByKey([[1,2,3], [3,4,5], [1,2,3]]),
				{'3,4,5': 1, '1,2,3': 2}
			);
			assert.deepStrictEqual(
				makeIndexByKey([[1,2,{a:1}], [3,4,5], [1,2,3]]),
				{'1,2,[object Object]': 0, '3,4,5': 1, '1,2,3': 2}
			);
		});
		it('should return an object with the provided array elements as keys and all values equal to their index in the array - objects', function() {
			assert.deepStrictEqual(
				makeIndexByKey([{a: 1}, {b: 2}, {c: 3}]),
				{'[object Object]': 2}
			);
		});
	});
	describe('makeKeyedFalse', function() {
		it('should return an object with the provided array elements as keys and all values equal to false', function() {
			assert.deepStrictEqual(
				makeKeyedFalse(['a', 'b']),
				{a: false, b: false}
			);
		});
	});
	describe('makeKeyedTrue', function() {
		it('should return an object with the provided array elements as keys and all values equal to true', function() {
			assert.deepStrictEqual(
				makeKeyedTrue(['a', 'b']),
				{a: true, b: true}
			);
		});
	});
	describe('makeKeyedZeroes', function() {
		it('should return an object with the provided array elements as keys and all values equal to zero', function() {
			assert.deepStrictEqual(
				makeKeyedZeroes(['a', 'b']),
				{a: 0, b: 0}
			);
			assert.deepStrictEqual(
				makeKeyedZeroes([1, 2]),
				{'1': 0, '2': 0}
			);
		});
	});
	describe('makeOccurrences', function() {
		it('should create an object of occurrences from an array of objects given an array of target keys', function() {
			assert.deepStrictEqual(
				makeOccurrences([
					{a: 1, b: 1},
					{b: 1},
					{a: 1},
					{c: 1, b: 1}
				], ['a']),
				{a: 2}
			);
			assert.deepStrictEqual(
				makeOccurrences([
					{a: 1, b: 1},
					{b: 1},
					{a: 1},
					{c: 1, b: 1}
				], ['a', 'b']),
				{a: 2, b: 3}
			);
		});
		it('should create an object with zero occurrences if some target keys aren\'t found', function() {
			assert.deepStrictEqual(
				makeOccurrences([
					{a: 1, b: 1},
					{b: 1},
				], ['b', 'c']),
				{b: 2, c: 0}
			);
		});
	});
	describe('makeAllOccurrences', function() {
		it('should create an object of occurrences from an array of objects', function() {
			assert.deepStrictEqual(
				makeAllOccurrences([
					{a: 1, b: 1},
					{b: 1},
					{a: 1},
					{c: 1, b: 1}
				]),
				{a: 2, b: 3, c: 1}
			);
		});
	});
	describe('mergeObjects', function() {
		it('should merge all the objects in the provided array', function() {
			assert.deepStrictEqual(
				mergeObjects([{a: 1}, {a: 6, b: -1}, {b: 1}]),
				{a: 6, b: 1}
			);
			assert.deepStrictEqual(
				mergeObjects([{b: 1}, {a: 6, b: -1}, {a: 1}]),
				{a: 1, b: -1}
			);
		});
	});
});
