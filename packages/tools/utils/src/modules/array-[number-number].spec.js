import {strict as assert} from 'assert';

import {makePolynomial} from './array-[number-number]';

describe('Array -> (Number -> Number)', function () {
	describe('makePolynomial', function () {
		it('should return a function that computes the polynomial of the input number using the provided cofficients', function () {
			const poly = makePolynomial([0,2,0,4]);

			assert.deepStrictEqual(poly(2), 36);
			assert.deepStrictEqual(poly(5), 510);
		});
	});
});
