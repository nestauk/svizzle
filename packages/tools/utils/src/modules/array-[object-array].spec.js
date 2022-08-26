import {strict as assert} from 'assert';

import {makeKeysGetter, pickAndConcatValues} from './array-[object-array]';

describe('Array -> (Object -> Array)', function () {
	describe('makeKeysGetter', function () {
		const getCoordinates = makeKeysGetter(['lng', 'lat']);

		it('should return a function expecting an object and returning an array of values corresponding to the provided keys', function () {
			assert.deepStrictEqual(
				getCoordinates({
					name: 'London',
					lat: 51.507222,
					lng: -0.1275,
					population: 8825000
				}),
				[-0.1275, 51.507222]
			);
		});
		it('the returned array should contain undefineds for keys not contained in the provided object', function () {
			assert.deepStrictEqual(
				getCoordinates({
					name: 'London',
					lng: -0.1275,
					population: 8825000
				}),
				[-0.1275, undefined]
			);
			assert.deepStrictEqual(
				getCoordinates({
					name: 'London',
					population: 8825000
				}),
				[undefined, undefined]
			);
		});
	});

	describe('pickAndConcatValues', function () {
		it('should return a function expecting an object and concatenating values in the provided list of keys', function () {
			const getProducts = pickAndConcatValues(['food', 'beverage']);
			const actual = getProducts({
				food: ['bread', 'cheese', 'ham'],
				beverage: ['wine', 'water'],
				id: 'area1',
				value: 32.1,
			});
			const expected = ['bread', 'cheese', 'ham', 'wine', 'water'];
			assert.deepStrictEqual(actual, expected);
		});
	});
});
