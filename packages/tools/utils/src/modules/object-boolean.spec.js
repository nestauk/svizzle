import {strict as assert} from 'assert';

import {
	hasObjSize1,
	hasSomeNullValues,
	isObjEmpty,
	isObjNotEmpty
} from './object-boolean';

describe('Object -> Boolean', function() {
	describe('hasObjSize1', function() {
		it('should return `false` if the object is empty', function() {
			assert.deepStrictEqual(hasObjSize1({}), false);
		});
		it('should return `true` if the object has size 1', function() {
			assert.deepStrictEqual(hasObjSize1({a: 1}), true);
		});
		it('should return `false` if the object is longer than 1', function() {
			assert.deepStrictEqual(hasObjSize1({a: 1, b: 2}), false);
		});
	});
	describe('hasSomeNullValues', function() {
		it('should return false is the provided object has no properties being `null`', function() {
			assert.deepStrictEqual(hasSomeNullValues({a: 1}), false);
			assert.deepStrictEqual(hasSomeNullValues({a: 1, b: undefined}), false);
		});
		it('should return true is some of the provided object properties are `null`', function() {
			assert.deepStrictEqual(
				hasSomeNullValues({a: 1, b: undefined, c: null}),
				true
			);
		});
	});
	describe('isObjEmpty', function() {
		it('should return `true` if the object is empty', function() {
			assert.deepStrictEqual(isObjEmpty({}), true);
		});
		it('should return `false` if the object is not empty', function() {
			assert.deepStrictEqual(isObjEmpty({a: 1}), false);
		});
	});
	describe('isObjNotEmpty', function() {
		it('should return `true` if the object is not empty', function() {
			assert.deepStrictEqual(isObjNotEmpty({a: 1}), true);
		});
		it('should return `false` if the object is not empty', function() {
			assert.deepStrictEqual(isObjNotEmpty({}), false);
		});
	});
});
