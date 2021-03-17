import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {makeAverageWith} from './[any-number]-[array-number]';

describe('(Any -> Number) -> (Array -> Number)', function() {
	describe('makeAverageWith', function() {
		it('should return a function expecting an array of objects and returning the max of results of applying the provided fuction on all of the array items', function() {
			const makeAverageOfA = makeAverageWith(_.getKey('a'));

			assert.deepStrictEqual(makeAverageOfA([
				{a: 1, b: 2},
				{a: 10, b: 7},
				{a: 7, b: 9},
			]), 6);
			assert.deepStrictEqual(makeAverageOfA([
				{a: 11, b: 4},
				{a: 7, b: 9},
				{a: 9, b: 0},
			]), 9);
		})
	})
})
