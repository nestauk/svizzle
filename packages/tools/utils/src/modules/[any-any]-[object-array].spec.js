import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {
	objectToKeyValueArrayWith,
	valuesWith
} from './[any-any]-[object-array]';

describe('(Any -> Any) -> (Object -> Array)', function () {
	describe('objectToKeyValueArrayWith', function () {
		it('should return a function expecting an object and returning an array of {key, value} objects', function () {
			const convertToArray = objectToKeyValueArrayWith(_.getKey('a'));
			const obj = {k1: {a: 1}, k2: {a: 2}};

			assert.deepStrictEqual(
				convertToArray(obj),
				[{key: 'k1', value: 1}, {key: 'k2', value: 2}]
			);
		});
	});
	describe('valuesWith', function () {
		it('should return a function expecting an object and returning an array of its value processed with the provided function', function () {
			const triplicatedValues = valuesWith(_.add(3));

			assert.deepStrictEqual(
				triplicatedValues({a: 1, b: 2, c: 3}),
				[4, 5, 6]
			);

			const getFoos = valuesWith(_.getKey('foo'));
			const obj = {
				a: {foo: 1, bar: 2},
				b: {foo: 15, bar: -3},
				c: {foo: 4, bar: 12}
			};

			assert.deepStrictEqual(getFoos(obj), [1, 15, 4]);
		});
		it('should return a function expecting an object and returning an array of its value processed with the provided function - using keys', function () {
			const keysAndValues = valuesWith((value, key) => `${value} (${key})`);

			assert.deepStrictEqual(
				keysAndValues({a: 3, b: 5}),
				['3 (a)', '5 (b)']
			);
		});
	});
});
