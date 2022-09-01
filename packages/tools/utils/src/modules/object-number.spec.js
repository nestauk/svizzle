import {strict as assert} from 'node:assert';

import {
	getObjSize,
	valuesMax,
	valuesMin
} from './object-number.js';

describe('Object -> Number', function () {
	describe('getObjSize', function () {
		it('should return the size of the provided object', function () {
			assert.deepStrictEqual(getObjSize({}), 0);
			assert.deepStrictEqual(getObjSize({a: 1, b: 2}), 2);
		});
	});

	describe('max/min', function () {
		describe('valuesMax', function () {
			it('should return the max of the provided object values', function () {
				assert.deepStrictEqual(valuesMax({a: -3, b: 2, c: 1}), 2);
			});
		});

		describe('valuesMin', function () {
			it('should return the max of the provided object values', function () {
				assert.deepStrictEqual(valuesMin({a: -3, b: 2, c: 1}), -3);
			});
		});
	});
});
