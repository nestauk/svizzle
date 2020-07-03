import {strict as assert} from 'assert';

import {
	isKeyValue,
	isNotKeyValue,
	isNotPathValue,
	isPathValue,
} from './array-[object-boolean]';

describe('Array -> (Object -> Array)', function() {
	describe('isKeyValue', function() {
		it('should return a predicate expecting an object and returning `true` if the value at the provided `key` is the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`', function() {
			const isUSA = isKeyValue(['country_id', 'US']);

			assert.deepStrictEqual(
				isUSA({country_id: 'GB', id: 123}),
				false
			);
			assert.deepStrictEqual(
				isUSA({country_id: 'US', id: 456}),
				true
			);
		});
	});
	describe('isKeyNotValue', function() {
		it('should return a predicate expecting an object and returning `true` if the value at the provided `key` is not the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`', function() {
			const isNotUSA = isNotKeyValue(['country_id', 'US']);

			assert.deepStrictEqual(
				isNotUSA({country_id: 'GB', id: 123}),
				true
			);
			assert.deepStrictEqual(
				isNotUSA({country_id: 'US', id: 456}),
				false
			);
		});
	});
	describe('isPathValue', function() {
		it('should return a predicate expecting an object and returning `true` if the value at the provided `path` is the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`', function() {
			const isDefaultStatus = isPathValue(['item.status', 'default']);

			assert.deepStrictEqual(
				isDefaultStatus({item: {status: 'active'}, id: 123}),
				false
			);
			assert.deepStrictEqual(
				isDefaultStatus({item: {status: 'default'}, id: 456}),
				true
			);
		});
	});
	describe('isNotPathValue', function() {
		it('should return a predicate expecting an object and returning `true` if the value at the provided `path` is not the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`', function() {
			const isNotDefaultStatus = isNotPathValue(['item.status', 'default']);

			assert.deepStrictEqual(
				isNotDefaultStatus({item: {status: 'active'}, id: 123}),
				true
			);
			assert.deepStrictEqual(
				isNotDefaultStatus({item: {status: 'default'}, id: 456}),
				false
			);
		});
	});
});
