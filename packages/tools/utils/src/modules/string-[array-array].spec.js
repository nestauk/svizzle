import {strict as assert} from 'assert';

import {pluckPath} from './string-[array-array]';

describe('String -> (Array -> Array)', function () {
	describe('pluckPath', function () {
		const getABs = pluckPath('a.b');

		it('should return a function expecting an array of objects and plucking the provided array with the input path', function () {
			assert.deepStrictEqual(
				getABs([{a: {b: -1, label: 'foo'}}, {a: {b: 4, label: 'bar'}}]),
				[-1, 4]
			);
		});
		it('should return `undefined` for objects where the path is not defined', function () {
			assert.deepStrictEqual(
				getABs([{a: {label: 'foo'}}, {a: {b: 2}}]),
				[undefined, 2]
			);
		});
		it('should work with empty arrays', function () {
			assert.deepStrictEqual(getABs([]), []);
		});
	});
});
