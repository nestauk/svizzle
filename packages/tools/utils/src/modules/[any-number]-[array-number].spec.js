import {strict as assert} from 'node:assert';

import * as _ from 'lamb';

import {
	arrayMaxWith,
	arrayMinWith,
	arraySumWith,
	makeAverageWith,
} from './[any-number]-[array-number].js';

describe('(Any -> Number) -> (Array -> Number)', function () {
	describe('arrayMaxWith', function () {
		it('should return a function expecting an array of objects and returning the max of results of applying the provided fuction on all of the array items', function () {
			const maxWithAbsSin = arrayMaxWith(_.pipe([Math.sin, Math.abs]));

			assert.deepStrictEqual(
				maxWithAbsSin([-Math.PI/2, -Math.PI/4]),
				1
			);
			assert.deepStrictEqual(
				maxWithAbsSin([Math.PI/4, Math.PI/6]),
				0.7071067811865475
			);
		});
	});
	describe('arrayMinWith', function () {
		it('should return a function expecting an array of objects and returning the min of results of applying the provided fuction on all of the array items', function () {
			const minWithAbsSin = arrayMinWith(_.pipe([Math.sin, Math.abs]));

			assert.deepStrictEqual(
				minWithAbsSin([-Math.PI/2, -Math.PI/4]),
				0.7071067811865475
			);
			assert.deepStrictEqual(
				minWithAbsSin([Math.PI/4, Math.PI/6]),
				0.49999999999999994
			);
		});
	});
	describe('arraySumWith', function () {
		const sumValues = arraySumWith(_.getKey('a'));
		it('should return the a function expecting an array and summing the numbers obtained from applying the provided accessor to the array items', function () {
			assert.deepStrictEqual(sumValues([
				{a: 1},
				{a: 2},
				{a: 3},
			]), 6);
		});
		it('should skip items where the accessor does not return a number', function () {
			assert.deepStrictEqual(sumValues([
				{a: 1},
				{a: 2},
				{a: 'hey'},
			]), 3);
			assert.deepStrictEqual(sumValues([
				{a: 1},
				{a: 2},
				{notA: 3},
			]), 3);
			assert.deepStrictEqual(sumValues([
				{a: 'hey'},
				{notA: 'b'},
				{notA: 3},
			]), 0);
		});
		it('should return zero when passed an empty array', function () {
			assert.deepStrictEqual(sumValues([]), 0);
		});
	});
	describe('makeAverageWith', function () {
		const makeAverageOfA = makeAverageWith(_.getKey('a'));

		it('should return a function expecting an array of objects and returning the max of results of applying the provided fuction on all of the array items', function () {

			assert.deepStrictEqual(makeAverageOfA([
				{a: 1, b: 2},
				{a: 10, b: 7},
				{a: 7, b: 9},
			]), 6);
			assert.deepStrictEqual(makeAverageOfA([
				{a: 11, b: 4},
				{a: 7, b: 9},
				{a: 9, b: 0},
			]), 9);
		});
		it('should return zero when passed an empty array', function () {
			assert.deepStrictEqual(makeAverageOfA([]), 0);
		});
	})
})
