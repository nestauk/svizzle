import {strict as assert} from 'assert';

import {prepend} from './string-[string-string]';

describe('String -> (String -> String)', function() {
	describe('prepend', function() {
		it('should return a function that prepends the provided string to the input string', function() {
			const prependFoo = prepend('foo');
			assert.deepStrictEqual(prependFoo('A'), 'fooA');
			assert.deepStrictEqual(prependFoo('B'), 'fooB');
		});
	});
});
