import {strict as assert} from 'node:assert';

import {
	hasIterableLength1,
	isIterableLongerThan1,
	isIterableEmpty,
	isIterableNotEmpty,
} from './iterable-boolean.js';

describe('Iterable -> Boolean', function () {
	describe('isIterableEmpty', function () {
		it('should return true if the provided string is empty', function () {
			assert.deepStrictEqual(isIterableEmpty(''), true);
		});
		it('should return true if the provided array is empty', function () {
			assert.deepStrictEqual(isIterableEmpty([]), true);
		});
		it('should return true if the arguments array is empty', function () {
			function func () {
				return isIterableEmpty(arguments);
			}
			assert.deepStrictEqual(func(), true);
		});
	});
	describe('isIterableNotEmpty', function () {
		it('should return true if the provided string is not empty', function () {
			assert.deepStrictEqual(isIterableNotEmpty('a'), true);
		});
		it('should return true if the provided array is not empty', function () {
			assert.deepStrictEqual(isIterableNotEmpty([1, 2]), true);
		});
		it('should return true if the arguments array is not empty', function () {
			function func () {
				return isIterableNotEmpty(arguments);
			}
			assert.deepStrictEqual(func(1, 2), true);
		});
	});
	describe('hasIterableLength1', function () {
		it('should return true if the provided string has length 1', function () {
			assert.deepStrictEqual(hasIterableLength1('a'), true);
		});
		it('should return true if the provided array has length 1', function () {
			assert.deepStrictEqual(hasIterableLength1([1]), true);
		});
		it('should return true if the arguments array has length 1', function () {
			function func () {
				return hasIterableLength1(arguments);
			}
			assert.deepStrictEqual(func(1), true);
		});
	});
	describe('isIterableLongerThan1', function () {
		it('should return true if the provided string is longer than 1', function () {
			assert.deepStrictEqual(isIterableLongerThan1('ab'), true);
		});
		it('should return true if the provided array is longer than 1', function () {
			assert.deepStrictEqual(isIterableLongerThan1([1, 2]), true);
		});
		it('should return true if the arguments array is longer than 1', function () {
			function func () {
				return isIterableLongerThan1(arguments);
			}
			assert.deepStrictEqual(func(1, 2), true);
		});
	});
});
