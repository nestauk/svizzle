import {strict as assert} from 'assert';

import {hasValue} from './any-[object-boolean]';

describe('Any -> (Object -> Boolean)', function() {
	describe('hasValue', function() {
		it('should return a function that returns true if at least one of the input object properties has the provided value – number', function() {
			const hasTwo = hasValue(2);

			assert.deepStrictEqual(
				hasTwo({a: 1, b: 2}),
				true
			);
			assert.deepStrictEqual(
				hasTwo({a: 1, b: 3}),
				false
			);
		});
		it('should return a function that returns true if at least one of the input object properties has the provided value – array', function() {
			const hasEmptyList = hasValue([]);

			assert.deepStrictEqual(
				hasEmptyList({a: 1, b: []}),
				true
			);
			assert.deepStrictEqual(
				hasEmptyList({a: 1, b: 3}),
				false
			);
		});
	});
});
