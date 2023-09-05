import {strict as assert} from 'node:assert';

import * as _ from 'lamb';

import {hasKeyWith} from './[string-boolean]-[object-boolean].js';

describe('(String -> Boolean) -> (Object -> Boolean)', function () {
	describe('hasKeyWith', function () {
		it('should return a function expecting an object and returning `true` if the input object has a key satisfying the provided predicate', function () {
			const hasA = hasKeyWith(_.is('a'));

			assert.deepStrictEqual(
				hasA({a: 2, b: 4, c: 3}),
				true
			);
			assert.deepStrictEqual(
				hasA({b: 4, c: 3}),
				false
			);
		});
	});
})
