import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {applyTransformsSequence, pluckValuesKeys} from './array-[object-object]';

describe('Array -> (Object -> Object)', function() {
	describe('applyTransformsSequence', function() {
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

		it('should return a function that expects an object and applies the provided sequence of transforms to the values of the correspondent paths to the input object – orthogonal transforms', function() {
			const transform = applyTransformsSequence([
				['a.a2.a22', _.pipe([Number, Math.sqrt])],
				['a.a3', parseInt],
				['b.b2.b24', parseInt],
				['b.b4', parseInt],
			]);
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
		it('should return a function that expects an object and applies the provided sequence of transforms to the values of the correspondent paths to the input object - modifying modified paths', function() {
			const transform = applyTransformsSequence([
				['b', _.values],
				['b.1', _.values],
			]);
			const expected = {
				a: {
					a1: 'a1',
					a2: {
						a21: 'a21',
						a22: '9',
					},
					a3: '3px',
					a4: '2',
				},
				b: [
					'b1',
					[
						'foo',
						'9',
						'2',
						'24px',
					],
					'2',
					'4px'
				],
			};

			assert.deepStrictEqual(transform(obj), expected);
		});
		it('should return a function that expects an object and applies the provided sequence of transforms to the values of the correspondent paths to the input object - modifying paths multiple times', function() {
			const transform = applyTransformsSequence([
				['b', _.values],
				['b.1', _.values],
				['b', _.flatten],
			]);
			const expected = {
				a: {
					a1: 'a1',
					a2: {
						a21: 'a21',
						a22: '9',
					},
					a3: '3px',
					a4: '2',
				},
				b: [
					'b1',
					'foo',
					'9',
					'2',
					'24px',
					'2',
					'4px'
				],
			};

			assert.deepStrictEqual(transform(obj), expected);
		});
	});

	describe('pluckValuesKeys', function() {
		it('should return a function plucking the provided keys from the expected object values', function() {
			let select = pluckValuesKeys(['a', 'k']);
			let actual = select({
				foo: {a: 1, b: 2, c: 3, k: 4},
				bar: {a: 5, b: 6, c: 7, k: 8}
			});
			let expected = {
				foo: {a: 1, k: 4},
				bar: {a: 5, k: 8}
			};
			assert.deepStrictEqual(actual, expected);
		});
		it('should return a function plucking the provided keys from the expected object values – missing keys', function() {
			let select = pluckValuesKeys(['a', 'k']);
			let actual = select({
				foo: {a: 1, b: 2, c: 3, k: 4},
				bar: {a: 5, b: 8}
			});
			let expected = {
				foo: {a: 1, k: 4},
				bar: {a: 5}
			};
			assert.deepStrictEqual(actual, expected);
		});
	});
});
