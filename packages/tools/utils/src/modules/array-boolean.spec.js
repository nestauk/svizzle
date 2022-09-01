import {strict as assert} from 'node:assert';

import {
	areAllTruthy,
	areSomeTruthy
} from './array-boolean.js';

describe('Array -> Boolean', function () {
	describe('areAllTruthy', function () {
		it('should return true if all elements of the provided array are true', function () {
			assert.deepStrictEqual(
				areAllTruthy([true, true]),
				true
			);
		});
		it('should return true if all elements of the provided array are truthy', function () {
			assert.deepStrictEqual(
				areAllTruthy([1, [], [1, 2], {}, {a: 1}, 'a']),
				true
			);
		});
		it('should return false if not all elements of the provided array are true', function () {
			assert.deepStrictEqual(
				areAllTruthy([false, true]),
				false
			);
		});
		it('should return false if not all elements of the provided array are truthy', function () {
			assert.deepStrictEqual(
				areAllTruthy([0, {a: 1}]),
				false
			);
			assert.deepStrictEqual(
				areAllTruthy([-0, {a: 1}]),
				false
			);
			assert.deepStrictEqual(
				areAllTruthy(['', {a: 1}]),
				false
			);
		});
	});
	describe('areSomeTruthy', function () {
		it('should return true if some elements of the provided array are true', function () {
			assert.deepStrictEqual(
				areSomeTruthy([true, false]),
				true
			);
		});
		it('should return true if some elements of the provided array are truthy', function () {
			assert.deepStrictEqual(
				areSomeTruthy([1, 0]),
				true
			);
			assert.deepStrictEqual(
				areSomeTruthy([0, false, []]),
				true
			);
			assert.deepStrictEqual(
				areSomeTruthy([0, false, [1, 2]]),
				true
			);
			assert.deepStrictEqual(
				areSomeTruthy([0, false, {}]),
				true
			);
			assert.deepStrictEqual(
				areSomeTruthy([0, false, {a: 1}]),
				true
			);
			assert.deepStrictEqual(
				areSomeTruthy([0, false, 'a']),
				true
			);
		});
		it('should return false if none of the elements of the provided array are true', function () {
			assert.deepStrictEqual(
				areSomeTruthy([false, false]),
				false
			);
		});
		it('should return false if none of the elements of the provided array are truthy', function () {
			assert.deepStrictEqual(
				areSomeTruthy([0, null, undefined]),
				false
			);
		});
	});
});
