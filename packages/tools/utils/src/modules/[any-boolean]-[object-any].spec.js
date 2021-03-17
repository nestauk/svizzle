import {strict as assert} from 'assert';

import {findValueWith} from './[any-boolean]-[object-any]';
import {isKeyValue} from './array-[object-boolean]';

describe('(Any -> Boolean) -> (Object -> Any)', function() {
	describe('findValueWith', function() {
		it('should return a function expecting an array and returning a new array with all items satisfying the provided predicate in the tail, in the same relative order they were in the input array', function() {
			const findFirstOdd = findValueWith(x => x % 2 === 1);
			let actual = findFirstOdd({a: 2, b: 4, c: 3, d: 6, e: 7});
			let expected = 3;

			assert.deepStrictEqual(actual, expected);

			const findItem = findValueWith(isKeyValue(['max', 10]));
			actual = findItem({
				a: {id: 'foo', min: 1, max: 2},
				b: {id: 'bar', min: -1, max: 10},
				c: {id: 'baz', min: -4, max: 10}
			});
			expected = {id: 'bar', min: -1, max: 10};

			assert.deepStrictEqual(actual, expected);
		});
	});
});
