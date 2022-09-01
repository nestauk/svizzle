import {strict as assert} from 'node:assert';

import {makeBiPermutationsWith} from './[any-array]-[any-array].js';
import {getValue} from './object-any.js';

describe('(Any -> Array) -> (Any -> Array)', function () {
	describe('makeBiPermutationsWith', function () {
		it('should return a function returning the pair-permutations of the items returned by the provided accessor', function () {
			const makeBiPermutations = makeBiPermutationsWith(getValue);
			const object = {
				key: 'foobars',
				value: [
					{foo: 'a'},
					{foo: 'b'},
					{bar: 'c'},
					{bar: 'd'}
				]
			};
			const actual = makeBiPermutations(object);
			const expected = [
				[{foo: 'a'}, {foo: 'b'}],
				[{foo: 'a'}, {bar: 'c'}],
				[{foo: 'a'}, {bar: 'd'}],
				[{foo: 'b'}, {bar: 'c'}],
				[{foo: 'b'}, {bar: 'd'}],
				[{bar: 'c'}, {bar: 'd'}]
			];
			assert.deepStrictEqual(actual, expected);
		});
	});
});
