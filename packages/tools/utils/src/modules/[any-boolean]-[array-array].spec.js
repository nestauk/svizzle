import {strict as assert} from 'assert';

import {raiseWith} from './[any-boolean]-[array-array]';

describe('(Any -> Boolean) -> (Array -> Array)', function () {
	describe('raiseWith', function () {
		it('should return a function expecting an array and returning a new array with all items satisfying the provided predicate in the tail, in the same relative order they were in the input array', function () {
			const raiseOdds = raiseWith(x => x % 2 === 1);
			let actual = raiseOdds([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			let expected = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

			assert.deepStrictEqual(actual, expected);
		});
	});
});
