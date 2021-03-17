import {strict as assert} from 'assert';

import {stringify} from './any-string';

describe('Any -> String', function() {
	describe('stringify', function() {
		it('should return a string representation of the input with indentation = 2', function() {
			assert.deepStrictEqual(stringify([]), '[]');
			assert.deepStrictEqual(stringify([1]), '[\n  1\n]');
			assert.deepStrictEqual(stringify({a: 1}), '{\n  "a": 1\n}');
		});
	});
	// TODO very minimal testing, improve
});
