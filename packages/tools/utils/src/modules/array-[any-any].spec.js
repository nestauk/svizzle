import {strict as assert} from 'assert';

import {truthynessTo} from './array-[any-any]';

describe('Array -> (Any -> Any)', function () {
	describe('truthynessTo', function () {
		const toNum = truthynessTo([0, 1]);
		const toString = truthynessTo(['OK!', 'Sorry!']);
		const toObject = truthynessTo([{value: 1}, {value: -1}]);

		it('return a function that maps the input to the first or the second element of the provided pair: the first if its truthy, the second otherwise - bool', function () {
			assert.deepStrictEqual(toNum(true), 0);
			assert.deepStrictEqual(toNum(false), 1);
			assert.deepStrictEqual(toString(true), 'OK!');
			assert.deepStrictEqual(toString(false), 'Sorry!');
			assert.deepStrictEqual(toObject(true), {value: 1});
			assert.deepStrictEqual(toObject(false), {value: -1});
		});
		it('return a function that maps the input to the first or the second element of the provided pair: the first if its truthy, the second otherwise - number', function () {
			assert.deepStrictEqual(toNum(3), 0);
			assert.deepStrictEqual(toNum(0), 1);
			assert.deepStrictEqual(toString(3), 'OK!');
			assert.deepStrictEqual(toString(0), 'Sorry!');
			assert.deepStrictEqual(toObject(3), {value: 1});
			assert.deepStrictEqual(toObject(0), {value: -1});
		});
		it('return a function that maps the input to the first or the second element of the provided pair: the first if its truthy, the second otherwise - string', function () {
			assert.deepStrictEqual(toNum('hey'), 0);
			assert.deepStrictEqual(toNum(''), 1);
			assert.deepStrictEqual(toString('hey'), 'OK!');
			assert.deepStrictEqual(toString(''), 'Sorry!');
			assert.deepStrictEqual(toObject('hey'), {value: 1});
			assert.deepStrictEqual(toObject(''), {value: -1});
		});
	});
});
