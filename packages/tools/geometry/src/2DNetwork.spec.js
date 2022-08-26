import {strict as assert} from 'assert';

import {
	linkVector,
	makeLinkVector
} from './2DNetwork';

describe('2DNetwork', function () {
	describe('linkVector', function () {
		it('should calculate the vector of a link', function () {
			assert.deepStrictEqual(
				linkVector({
					source: {x: 1, y: 1},
					target: {x: 2, y: 2}
				}),
				{
					x: 1,
					y: 1,
					length: 1.4142135623730951,
					versor: {x: 0.7071067811865475, y: 0.7071067811865475}
				}
			);
		});
		it('should calculate the vector of a link when source/target are equal', function () {
			assert.deepStrictEqual(
				linkVector({
					source: {x: 1, y: 1},
					target: {x: 1, y: 1}
				}),
				{x: 0, y: 0, length: 0, versor: {x: 0, y: 0}}
			);
		});
	});
	describe('makeLinkVector', function () {
		it('should calculate the vector of the inner link', function () {
			assert.deepStrictEqual(
				makeLinkVector({
					source: {x: 1, y: 1, radius: 0.1},
					target: {x: 2, y: 2, radius: 0.1}
				}),
				{
					x1: 1.07071067811865475, // 1 + 0.1 * 0.707
					y1: 1.07071067811865475,
					x2: 1.9292893218813452,  // 2 - 0.1 * 0.707
					y2: 1.9292893218813452
				}
			);
		});
		it('should calculate the vector of the inner link when source/target are equal', function () {
			assert.deepStrictEqual(
				makeLinkVector({
					source: {x: 1, y: 1, radius: 0.1},
					target: {x: 1, y: 1, radius: 0.1}
				}),
				{x1: 1, y1: 1, x2: 1, y2: 1}
			);
		});
	});
});
