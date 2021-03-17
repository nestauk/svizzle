import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {makeAllOccurrencesWith} from './[any-object]-[array-object]';

describe('(Any -> Object) -> (Array -> Object)', function() {
	describe('makeAllOccurrencesWith', function() {
		it('should return a function expecting an array and returning an object of occurrences of all the keys contained in the property reachable with the provided accessor in the items of the provided array', function() {
			const items = [
				{foo: 1, bar: {a: 1}},
				{foo: 1, bar: {a: 6, b: -1}},
				{foo: 1, bar: {a: 2, b: 0, c: 1}},
				{foo: 1, bar: {c: 4, e: 2}},
			];

			const makeAllOccurrences = makeAllOccurrencesWith(_.getKey('bar'));

			assert.deepStrictEqual(
				makeAllOccurrences(items),
				{a: 3, b: 2, c: 2, e: 1}
			);
		});
	});
});
