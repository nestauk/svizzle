import {strict as assert} from 'node:assert';

import * as _ from 'lamb';

import {joinWithBlank} from './array-string.js';
import {applyFnMap} from './object-[any-object].js';

describe('Object -> (Any -> Object)', function () {
	describe('applyFnMap', function () {
		it('should return a function expecting an object to be used as the argument of the provided functions', function () {
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
		it('should work with any type of input - Number', function () {
			const checkNumber = applyFnMap({
				range: _.collect([_.add(1), _.deduct(1)]),
				sign: Math.sign,
			});

			assert.deepStrictEqual(
				checkNumber(1),
				{range: [2, 0], sign: 1}
			);
			assert.deepStrictEqual(
				checkNumber(-10),
				{range: [-9, -11], sign: -1}
			);
		});
		it('should work with any type of input - String', function () {
			const checkString = applyFnMap({
				parts: _.splitBy('/'),
				hasNumbersOnly: _.testWith(/^\d+$/gu),
			});

			assert.deepStrictEqual(
				checkString('aa/bb'),
				{parts: ['aa', 'bb'], hasNumbersOnly: false}
			);
			assert.deepStrictEqual(
				checkString('123'),
				{parts: ['123'], hasNumbersOnly: true}
			);
			assert.deepStrictEqual(
				checkString('123/g'),
				{parts: ['123', 'g'], hasNumbersOnly: false}
			);
		});
	});
});
