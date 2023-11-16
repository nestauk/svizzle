import {strict as assert} from 'node:assert';

import {areEqualWith} from './[any-any]-[array-boolean].js';
import {getValue} from './object-any.js';

describe('(Any -> Any) -> (Array -> Boolean)', function () {
	describe('areEqualWith', function () {
		const areEqualByValue = areEqualWith(getValue);
		it('should return a function returning `true` if all the items of an array are equal once processed with the provided `accessor`', function () {
			assert.deepStrictEqual(
				areEqualByValue([
					{key: 'a', value: 1},
					{key: 'b', value: 1},
					{key: 'c', value: 1},
				]),
				true
			);
			assert.deepStrictEqual(
				areEqualByValue([
					{key: 'a', value: 1},
					{key: 'b', value: 2},
					{key: 'c', value: 3},
				]),
				false
			);
		});
		it('should return a function returning `false` if the provided array has less than 2 items', function () {
			assert.deepStrictEqual(
				areEqualByValue([
					{key: 'a', value: 1},
				]),
				false
			);
			assert.deepStrictEqual(
				areEqualByValue([]),
				false
			);
		});
	});
});
