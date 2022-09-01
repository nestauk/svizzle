import {strict as assert} from 'node:assert';

import {roundTo} from './number-[number-number].js';

describe('Number -> (Number -> Number)', function () {
	describe('roundTo', function () {
		it('should return a function that rounds the input number to the provided number of digits', function () {
			const roundTo2 = roundTo(2)
			assert.deepStrictEqual(roundTo2(2.41285), 2.41);
			assert.deepStrictEqual(roundTo2(2.41785), 2.42);
		});
	});
});
