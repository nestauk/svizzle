import {strict as assert} from 'assert';

import {makeArrayToObjectWith} from './[any-array]-[array-object]';

describe('(Any -> Boolean) -> (Array -> Object)', function() {
	describe('makeArrayToObjectWith', function() {
		it('should work with a valueToPair function', function() {
			const valueToPair = x => [`${x}${x}`, `${x}${x}${x}`];
			const arrayToObject = makeArrayToObjectWith(valueToPair)
			const actual = arrayToObject(['a', 'b', 1]);
			const expected = {aa: 'aaa', bb: 'bbb', 11: '111'};
			assert.deepStrictEqual(actual, expected);
		});
		it('should work with a value valueIndexToPair function', function() {
			const valueIndexToPair = (x, i) => [`${i}${i}`, `${x}${x}${x}`];
			const arrayToObject = makeArrayToObjectWith(valueIndexToPair);
			const actual = arrayToObject(['a', 'b', 1]);
			const expected = {'00': 'aaa', '11': 'bbb', '22': '111'};
			assert.deepStrictEqual(actual, expected);
		});
	});
});
