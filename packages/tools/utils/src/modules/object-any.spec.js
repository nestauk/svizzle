import {strict as assert} from 'assert';

import {getId, getKey, getValue, getValues} from './object-any';

describe('Object -> Any', function () {
	describe('getters', function () {
		it('should get `id`', function () {
			assert.deepStrictEqual(
				getId({id: 'foo', name: 'bar'}),
				'foo'
			);
		});
		it('should get `key`', function () {
			assert.deepStrictEqual(
				getKey({key: 'foo', value: 'bar'}),
				'foo'
			);
		});
		it('should get `value`', function () {
			assert.deepStrictEqual(
				getValue({key: 'foo', value: 'bar'}),
				'bar'
			);
		});
		it('should get `values`', function () {
			assert.deepStrictEqual(
				getValues({key: 'foo', values: [0, 1, 2, 3]}),
				[0, 1, 2, 3]
			);
		});
	});
});
