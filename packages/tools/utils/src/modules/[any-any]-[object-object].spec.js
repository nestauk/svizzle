import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {
	groupValuesWith,
	indexValuesWith,
	mergeWith
} from './[any-any]-[object-object]';

describe('(Any -> Any) -> (Object -> Object)', function() {
	describe('groupValuesWith', function() {
		it('Return a function expecting an object and returning an object grouping its values using the provided accessor – single values', function() {
			const regroupedByX = groupValuesWith(obj => obj.x);

			const obj = {
				a: {x: 1, y: 2},
				b: {x: 3, y: 4},
				c: {x: 'a', y: 6},
				d: {x: 1, y: 8},
			};
			const expected = {
				1: [{x: 1, y: 2}, {x: 1, y: 8}],
				3: [{x: 3, y: 4}],
				a: [{x: 'a', y: 6}],
			};

			assert.deepStrictEqual(regroupedByX(obj), expected);
		});
		it('Return a function expecting an object and returning an object grouping its values using the provided accessor – values being arrays', function() {
			const regroupedByX = groupValuesWith(obj => obj.x);

			const obj = {
				a: [{x: 1, y: 2}, {x: 3, y: 4}],
				b: [{x: 'a', y: 6}, {x: 1, y: 8}],
			};
			const expected = {
				1: [{x: 1, y: 2}, {x: 1, y: 8}],
				3: [{x: 3, y: 4}],
				a: [{x: 'a', y: 6}],
			};

			assert.deepStrictEqual(regroupedByX(obj), expected);
		});
	});

	describe('indexValuesWith', function() {
		it('Return a function expecting an object and returning an index of all its values – single values', function() {
			const reindexedByX = indexValuesWith(obj => obj.x);

			const obj = {
				a: {x: 'unique1', y: 2},
				b: {x: 'unique2', y: 4},
				c: {x: 'unique3', y: 6},
				d: {x: 'unique4', y: 8}
			};
			const expected = {
				unique1: {x: 'unique1', y: 2},
				unique2: {x: 'unique2', y: 4},
				unique3: {x: 'unique3', y: 6},
				unique4: {x: 'unique4', y: 8},
			};

			assert.deepStrictEqual(reindexedByX(obj), expected);
		});
		it('Return a function expecting an object and returning an index of all its values – values being arrays', function() {
			const reindexedByX = indexValuesWith(obj => obj.x);

			const obj = {
				a: [{x: 'unique1', y: 2}, {x: 'unique2', y: 4}],
				b: [{x: 'unique3', y: 6}, {x: 'unique4', y: 8}],
			};
			const expected = {
				unique1: {x: 'unique1', y: 2},
				unique2: {x: 'unique2', y: 4},
				unique3: {x: 'unique3', y: 6},
				unique4: {x: 'unique4', y: 8},
			};

			assert.deepStrictEqual(reindexedByX(obj), expected);
		});
	});

	describe('mergeWith', function() {
		it('should return a function expecting two objects to merge using the provided merge function', function() {
			const mergeWithSubtract = mergeWith(_.subtract);

			const merged = mergeWithSubtract(
				{a: 8, b: 3},
				{a: 5, b: 2, c: 7}
			);
			const expected =
                {a: 3, b: 1, c: 7};

			assert.deepStrictEqual(merged, expected);
		});
	});
});
