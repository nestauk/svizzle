import {strict as assert} from 'node:assert';

import {areValuesEqualWith} from './[any-any]-[object-boolean].js';
import {getValue} from './object-any.js';

describe('(Any -> Any) -> (Object -> Boolean)', function () {
	describe('areValuesEqualWith', function () {
		it('should return a function expecting an object and returning `true` if its values once processed with the provided `accessor` function are all equal', function () {
			const areValuesEqual = areValuesEqualWith(getValue);

			assert.deepStrictEqual(
				areValuesEqual({
					a: {key: 'a', value: 1},
					b: {key: 'b', value: 1},
				}),
				true
			);
			assert.deepStrictEqual(
				areValuesEqual({
					a: {key: 'a', value: 1},
					b: {key: 'b', value: 2},
				}),
				false
			);
		});
	});
});
