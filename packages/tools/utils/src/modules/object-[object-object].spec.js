import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {roundTo} from './number-[number-number]';
import {joinWithBlank} from './array-string';
import {
	applyFnMap,
	makeMergeAppliedFnMap,
	makeMergeKeyValue,
	mergeObj,
	transformPaths,
	transformValues,
	updateKeys,
} from './object-[object-object]';

const roundTo2 = roundTo(2);

describe('Object -> (Object -> Object)', function() {
	describe('applyFnMap', function() {
		it('should return a function expecting an object to be used as the argument of the provided functions', function() {
			const object = {fname: 'John', lname: 'Woo', lng: 1, lat: 2};
			const format = applyFnMap({
				coords: _.collect([_.getKey('lng'), _.getKey('lat')]),
				fullname: _.pipe([
					_.collect([_.getKey('fname'), _.getKey('lname')]),
					joinWithBlank
				]),
			});

			assert.deepStrictEqual(
				format(object),
				{coords: [1, 2], fullname: 'John Woo'}
			);
		});
	});
	describe('makeMergeAppliedFnMap', function() {
		it('should return a function that applies the provided map to the expected object and merges te result to the object', function() {
			const enhancer = makeMergeAppliedFnMap({
				coords: _.collect([_.getKey('lng'), _.getKey('lat')]),
				fullname: _.pipe([
					_.collect([_.getKey('fname'), _.getKey('lname')]),
					joinWithBlank
				]),
				lat: obj => roundTo2(obj.lat),
				lng: obj => roundTo2(obj.lng),
			});
			const object = {
				fname: 'John',
				lat: 2.345434,
				lname: 'Woo',
				lng: 10.3425,
			};
			const expected = {
				coords: [10.3425, 2.345434],
				fname: 'John',
				fullname: 'John Woo',
				lat: 2.35,
				lname: 'Woo',
				lng: 10.34,
			};
			const actual = enhancer(object);

			assert.deepStrictEqual(actual, expected);
		});
	});

	describe('transformPaths', function() {
		it('should return a function that expects an object and applies the functions in the values of the input object to the values of the provided object found in the paths in the correspondent keys – orthogonal transforms', function() {
			const transform = transformPaths({
				'a.a2.a22': _.pipe([Number, Math.sqrt]),
				'a.a3': parseInt,
				'b.b2.b24': parseInt,
				'b.b4': parseInt,
			});
			const obj = {
				a: {
					a1: 'a1',
					a2: {
						a21: 'a21',
						a22: '9',
					},
					a3: '3px',
					a4: '2',
				},
				b: {
					b1: 'b1',
					b2: {
						b21: 'foo',
						b22: '9',
						b23: '2',
						b24: '24px'
					},
					b3: '2',
					b4: '4px'
				},
			};
			const expected = {
				a: {
					a1: 'a1',
					a2: {
						a21: 'a21',
						a22: 3,
					},
					a3: 3,
					a4: '2'
				},
				b: {
					b1: 'b1',
					b2: {
						b21: 'foo',
						b22: '9',
						b23: '2',
						b24: 24
					},
					b3: '2',
					b4: 4
				},
			};

			assert.deepStrictEqual(transform(obj), expected);
		});
	});

	describe('transformValues', function() {
		const obj = {
			name: 'foo',
			a: '9',
			b: '2',
			width: '10px'
		};
		it('should return a function expecting an object and applying the functions in the provided object to the correspondent object values', function() {
			const conversionFn = transformValues({
				name: _.identity,
				a: _.pipe([Number, Math.sqrt]),
				b: Number,
				width: parseFloat
			});

			assert.deepStrictEqual(conversionFn(obj), {
				name: 'foo',
				a: 3,
				b: 2,
				width: 10
			});
		});
		it('should assume identity for not provided keys', function() {
			const conversionFn = transformValues({
				a: _.pipe([Number, Math.sqrt]),
			});

			assert.deepStrictEqual(conversionFn(obj), {
				name: 'foo',
				a: 3,
				b: '2',
				width: '10px'
			});
		});
	});

	describe('updateKeys', function() {
		const update = updateKeys({
			keys: ['a', 'k', 'm'],
			updater: x => x * 2
		});
		it('should return a function that expects an object and applies the provided updater function to the values correspondent to the provided keys, leaving the other properties unchanged.', function() {
			const actual = update({a: 1, b: 2, d: 4, k: 7, m: 2});
			const expected = {a: 2, b: 2, d: 4, k: 14, m: 4};

			assert.deepStrictEqual(actual, expected);
		});
		it('should work when some of the provided keys are not in the input object', function() {
			const actual = update({a: 1, b: 2, d: 4});
			const expected = {a: 2, b: 2, d: 4};

			assert.deepStrictEqual(actual, expected);
		});
		it('should work when none of the provided keys are in the input object', function() {
			const actual = update({b: 2, d: 4});
			const expected = {b: 2, d: 4};

			assert.deepStrictEqual(actual, expected);
		});
		it('should work with empty input objects', function() {
			const actual = update({});
			const expected = {};

			assert.deepStrictEqual(actual, expected);
		});
		it('should not modify the input object', function() {
			const input = {a: 1, b: 2, d: 4, k: 7, m: 2};
			const ref = {...input};
			update(input);

			assert.deepStrictEqual(input, ref);
		});
	});

	describe('mergeObj', function() {
		it('should return a function expecting an object to merge with the input object', function() {
			const mergeB = mergeObj({b: 2});

			assert.deepStrictEqual(mergeB({a: 1}), {a: 1, b: 2});
			assert.deepStrictEqual(mergeB({a: 1, b: 1}), {a: 1, b: 2});
		});
	});

	describe('makeMergeKeyValue', function() {
		const mergeFooValue = makeMergeKeyValue('foo', {b: -2, c: -3});

		it('should merge the value to an existing object at the provided key', function() {
			const merged = mergeFooValue({
				foo: {a: 1, b: 2},
				bar: {k: 1}
			});
			const expected = {
				foo: {a: 1, b: -2, c: -3},
				bar: {k: 1}
			};

			assert.deepStrictEqual(merged, expected);
		});
		it('should merge the value to a non-existing object at the provided key', function() {
			const merged = mergeFooValue({
				bar: {k: 1}
			});
			const expected = {
				foo: {b: -2, c: -3},
				bar: {k: 1}
			};

			assert.deepStrictEqual(merged, expected);
		});
	});
});
