import {strict as assert} from 'assert';

import {makePrinter} from '../test';
import {
	tapMessage,
	tapValue,
	tapType,
	tapTypeAndValue
} from './string-[any-any]';

describe('log: String -> (Any -> Any)', function() {
	describe('taps', function() {
		let printer;
		before(function () {
			printer = makePrinter();
			printer.init();
		});
		beforeEach(function () {
			printer.reset();
		});
		after(function () {
			printer.restore();
		});

		describe('tapMessage', function() {
			it('should print and return the input - no label', function() {
				const tap = tapMessage();
				const expected = [1, 2, 3];
				const actual = tap(expected);
				const expectedLog = [];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
			it('should print and return the input - with label', function() {
				const expected = [1, 2, 3];
				const actual = tapMessage('message')(expected);
				const expectedLog = [['message']];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
		});
		describe('tapValue', function() {
			it('should print and return the input - no label', function() {
				const tap = tapValue();
				const expected = [1, 2, 3];
				const actual = tap(expected);
				const expectedLog = [[expected]];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
			it('should print and return the input - with label', function() {
				const expected = [1, 2, 3];
				const actual = tapValue('label')(expected);
				const expectedLog = [['label:', expected]];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
		});
		describe('tapType', function() {
			it('should print the input type and return the input – Object, no label', function() {
				const expected = {a: 1};
				const actual = tapType()(expected);
				const expectedLog = [['Object']];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
			it('should print the input type and return the input – Object, with label', function() {
				const expected = {a: 1};
				const actual = tapType('label')(expected);
				const expectedLog = [['label:', 'Object']];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
		});
		describe('tapTypeAndValue', function() {
			it('should print the input type and the input and return the input – Array, no label', function() {
				const expected = [1, 2, 3];
				const actual = tapTypeAndValue()(expected);
				const expectedLog = [['Array', expected]];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
			it('should print the input type and the input and return the input – Array, with label', function() {
				const expected = [1, 2, 3];
				const actual = tapTypeAndValue('label')(expected);
				const expectedLog = [['label:', 'Array', expected]];

				assert.deepStrictEqual(actual, expected);
				assert.deepStrictEqual(printer.getLog(), expectedLog);
			});
		});
	});
});
