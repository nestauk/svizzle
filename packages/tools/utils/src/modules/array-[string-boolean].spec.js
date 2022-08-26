import {strict as assert} from 'assert';

import {containsOneOf} from './array-[string-boolean]';

describe('Array -> (String -> Boolean)', function () {
	describe('containsOneOf', function () {
		it('should return a function that checks if a string contains one of the provided strings', function () {
			const isWeight = containsOneOf(['(g)', '(mg)', '(mcg)']);
			const weightLabels = [
				'id',
				'Energy (kcal)',
				'Protein (g)',
				'Cholesterol (mg)',
				'Selenium (mcg)'
			].filter(isWeight);
			const expected = ['Protein (g)', 'Cholesterol (mg)', 'Selenium (mcg)'];

			assert.deepStrictEqual(weightLabels, expected);
		});
	});
});
