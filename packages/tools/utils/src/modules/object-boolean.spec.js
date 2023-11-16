import {strict as assert} from 'node:assert';

import {
	areValuesEqual,
	hasObjSize1,
	hasSomeNullValues,
	isObjEmpty,
	isObjNotEmpty
} from './object-boolean.js';

describe('Object -> Boolean', function () {
	describe('areValuesEqual', function () {
		it('should return `true` if all values of the provided object are equal', function () {
			assert.deepStrictEqual(areValuesEqual({a: 1, b: 1, c: 1}), true);
			assert.deepStrictEqual(areValuesEqual({a: [1, 2], b: [1, 2], c: [1, 2]}), true);
		});
		it('should return `false` if some values of the provided object are different', function () {
			assert.deepStrictEqual(areValuesEqual({a: 1, b: 2, c: 3}), false);
			assert.deepStrictEqual(areValuesEqual({a: [1, 2], b: [1, 3], c: [1, 2]}), false);
		});
		it('should return `false` if the object has size 1', function () {
			assert.deepStrictEqual(areValuesEqual({a: 1}), false);
		});
		it('should return `false` if the object is empty', function () {
			assert.deepStrictEqual(areValuesEqual({}), false);
		});
	});
	describe('hasObjSize1', function () {
		it('should return `false` if the object is empty', function () {
			assert.deepStrictEqual(hasObjSize1({}), false);
		});
		it('should return `true` if the object has size 1', function () {
			assert.deepStrictEqual(hasObjSize1({a: 1}), true);
		});
		it('should return `false` if the object is longer than 1', function () {
			assert.deepStrictEqual(hasObjSize1({a: 1, b: 2}), false);
		});
	});
	describe('hasSomeNullValues', function () {
		it('should return false is the provided object has no properties being `null`', function () {
			assert.deepStrictEqual(hasSomeNullValues({a: 1}), false);
			assert.deepStrictEqual(hasSomeNullValues({a: 1, b: undefined}), false);
		});
		it('should return true is some of the provided object properties are `null`', function () {
			assert.deepStrictEqual(
				hasSomeNullValues({a: 1, b: undefined, c: null}),
				true
			);
		});
	});
	describe('isObjEmpty', function () {
		it('should return `true` if the object is empty', function () {
			assert.deepStrictEqual(isObjEmpty({}), true);
		});
		it('should return `false` if the object is not empty', function () {
			assert.deepStrictEqual(isObjEmpty({a: 1}), false);
		});
	});
	describe('isObjNotEmpty', function () {
		it('should return `true` if the object is not empty', function () {
			assert.deepStrictEqual(isObjNotEmpty({a: 1}), true);
		});
		it('should return `false` if the object is not empty', function () {
			assert.deepStrictEqual(isObjNotEmpty({}), false);
		});
	});
});
