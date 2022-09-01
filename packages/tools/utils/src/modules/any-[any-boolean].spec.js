import {strict as assert} from 'node:assert';

import {isEqualTo, isNot} from './any-[any-boolean].js';

describe('Any -> (Any -> Boolean)', function () {
	describe('isEqualTo', function () {
		it('should return a function that returns true if the input value is equal to the provided value – object', function () {
			const obj1 = {a: 1, b: [1,2]};
			const obj2 = {a: 1, b: [1, 2, 3]};
			const isEqualToObj = isEqualTo(obj1);

			assert.deepStrictEqual(isEqualToObj(obj1), true);
			assert.deepStrictEqual(isEqualToObj(obj2), false);
		});
		it('should return a function that returns true if the input value is equal to the provided value – array', function () {
			const arr1 = [1, 2, {a: 1}];
			const arr2 = [1, 2, {a: 1}, 3];
			const isEqualToArray = isEqualTo(arr1);

			assert.deepStrictEqual(isEqualToArray(arr1), true);
			assert.deepStrictEqual(isEqualToArray(arr2), false);
		});
	});
	describe('isNot', function () {
		it('should return true if the input number is different from the provided value', function () {
			const isNotTwo = isNot(2);

			assert.deepStrictEqual(isNotTwo(3), true);
			assert.deepStrictEqual(isNotTwo(2), false);
		});
		it('should return true if the input string is different from the provided value', function () {
			const isNotFoo = isNot('foo');

			assert.deepStrictEqual(isNotFoo('boo'), true);
			assert.deepStrictEqual(isNotFoo('foo'), false);
		});
	});
});
