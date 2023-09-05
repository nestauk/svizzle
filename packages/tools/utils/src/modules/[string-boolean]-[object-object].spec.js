import {strict as assert} from 'node:assert';

import {
	pickIfKeyWith,
	skipIfKeyWith,
} from './[string-boolean]-[object-object].js';
import {makeStartsWith} from './string-[string-boolean].js';

describe('(String -> Boolean) -> (Object -> Object)', function () {
	describe('pickIfKeyWith', function () {
		it('should return a function expecting an object and returning a new object with only the keys satisfying the provided predicate', function () {
			const keysStartWithA = pickIfKeyWith(makeStartsWith('a'));

			assert.deepStrictEqual(
				keysStartWithA({a: 1, aa: 2, b: 0, c: 0}),
				{a: 1, aa: 2}
			);
			assert.deepStrictEqual(
				keysStartWithA({b: 0, c: 0}),
				{}
			);
		});
	});
	describe('skipIfKeyWith', function () {
		it('should return a function expecting an object and returning a new object without the keys satisfying the provided predicate', function () {
			const keysDontStartWithA = skipIfKeyWith(makeStartsWith('a'));

			assert.deepStrictEqual(
				keysDontStartWithA({a: 1, aa: 2, b: 0, c: 0}),
				{b: 0, c: 0}
			);
			assert.deepStrictEqual(
				keysDontStartWithA({b: 0, c: 0}),
				{b: 0, c: 0}
			);
		});
	});
})
