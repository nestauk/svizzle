import {strict as assert} from 'assert';

import {
	isArguments,
	isArray,
	isFunction,
	isNotNaN,
	isNotNil,
	isNotNull,
	isNumber,
	isObject,
	isPromise,
	isString,
	isValidNumber,
	negate,
	toFloatIsValidNumber,
	toNumberisValidNumber,
} from './any-boolean';

function returnArgs () {
	return arguments;
}

describe('Any -> Boolean', function () {
	describe('isArguments', function () {
		// 👍
		it('should return `true` if the input is an arguments list', function () {
			assert.deepStrictEqual(isArguments(returnArgs()), true);
		});

		// 👎
		it('should return `false` if the input is not an array', function () {
			assert.deepStrictEqual(isArguments([]), false);
			assert.deepStrictEqual(isArguments([1, 2]), false);
			assert.deepStrictEqual(isArguments(true), false);
			assert.deepStrictEqual(isArguments(1), false);
			assert.deepStrictEqual(isArguments(null), false);
			assert.deepStrictEqual(isArguments(undefined), false);
			assert.deepStrictEqual(isArguments(NaN), false);
			assert.deepStrictEqual(isArguments(Infinity), false);
			assert.deepStrictEqual(isArguments({a: 1}), false);
			assert.deepStrictEqual(isArguments('foo'), false);
		});
	});
	describe('isArray', function () {
		// 👍
		it('should return `true` if the input is an array', function () {
			assert.deepStrictEqual(isArray([]), true);
			assert.deepStrictEqual(isArray([1, 2]), true);
		});

		// 👎
		it('should return `false` if the input is not an array', function () {
			assert.deepStrictEqual(isArray(true), false);
			assert.deepStrictEqual(isArray(1), false);
			assert.deepStrictEqual(isArray(NaN), false);
			assert.deepStrictEqual(isArray(null), false);
			assert.deepStrictEqual(isArray(undefined), false);
			assert.deepStrictEqual(isArray(Infinity), false);
			assert.deepStrictEqual(isArray({a: 1}), false);
			assert.deepStrictEqual(isArray('foo'), false);
			assert.deepStrictEqual(isArray(returnArgs()), false);
		});
	});
	describe('isNotNaN', function () {
		// 👍
		it('should return `true` is the input is not a NaN', function () {
			assert.deepStrictEqual(isNotNaN(1), true);
			assert.deepStrictEqual(isNotNaN(Infinity), true);
			assert.deepStrictEqual(isNotNaN([123]), true);
			assert.deepStrictEqual(isNotNaN('123'), true);
			assert.deepStrictEqual(isNotNaN(true), true);
			assert.deepStrictEqual(isNotNaN(false), true);
			assert.deepStrictEqual(isNotNaN(null), true);
		});

		// 👎
		it('should return `false` if the input is a NaN', function () {
			assert.deepStrictEqual(isNotNaN(NaN), false);
		});
	});
	describe('isNotNil', function () {
		// 👍
		it('should return `true` is the input is not undefined or null', function () {
			assert.deepStrictEqual(isNotNil(1), true);
			assert.deepStrictEqual(isNotNil(Infinity), true);
			assert.deepStrictEqual(isNotNil('123'), true);
			assert.deepStrictEqual(isNotNil('123px'), true);
			assert.deepStrictEqual(isNotNil([1, 2]), true);
			assert.deepStrictEqual(isNotNil({a: 1}), true);
			assert.deepStrictEqual(isNotNil(true), true);
			assert.deepStrictEqual(isNotNil(false), true);
			assert.deepStrictEqual(isNotNil(returnArgs()), true);
			assert.deepStrictEqual(isNotNil(NaN), true);
		});

		// 👎
		it('should return `false` if the input is undefined or null', function () {
			assert.deepStrictEqual(isNotNil(undefined), false);
			assert.deepStrictEqual(isNotNil(null), false);
		});
	});
	describe('isNotNull', function () {
		// 👍
		it('should return `true` is the input is not null', function () {
			assert.deepStrictEqual(isNotNull(1), true);
			assert.deepStrictEqual(isNotNull(Infinity), true);
			assert.deepStrictEqual(isNotNull('123'), true);
			assert.deepStrictEqual(isNotNull('123px'), true);
			assert.deepStrictEqual(isNotNull([1, 2]), true);
			assert.deepStrictEqual(isNotNull({a: 1}), true);
			assert.deepStrictEqual(isNotNull(true), true);
			assert.deepStrictEqual(isNotNull(false), true);
			assert.deepStrictEqual(isNotNull(returnArgs()), true);
			assert.deepStrictEqual(isNotNull(NaN), true);
			assert.deepStrictEqual(isNotNull(undefined), true);
		});

		// 👎
		it('should return `false` if the input is null', function () {
			assert.deepStrictEqual(isNotNull(null), false);
		});
	});
	describe('isFunction', function () {
		// 👍
		it('should return `true` if the input is a function', function () {
			const makeFunc = n => x => x + n;
			assert.deepStrictEqual(isFunction(() => 2), true);
			assert.deepStrictEqual(isFunction(makeFunc(3)), true);
		});

		// 👎
		it('should return `false` if the input is not a function', function () {
			assert.deepStrictEqual(isFunction(1), false);
			assert.deepStrictEqual(isFunction(NaN), false);
			assert.deepStrictEqual(isFunction(Infinity), false);
			assert.deepStrictEqual(isFunction([1, 2]), false);
			assert.deepStrictEqual(isFunction({a: 1}), false);
			assert.deepStrictEqual(isFunction('foo'), false);
			assert.deepStrictEqual(isFunction(returnArgs()), false);
		});
	});
	describe('isNumber', function () {
		// 👍
		it('should return `true` if the input is a number', function () {
			assert.deepStrictEqual(isNumber(1), true);
			assert.deepStrictEqual(isNumber(NaN), true);
			assert.deepStrictEqual(isNumber(Infinity), true);
		});

		// 👎
		it('should return `false` if the input is not a number', function () {
			assert.deepStrictEqual(isNumber(true), false);
			assert.deepStrictEqual(isNumber([1, 2]), false);
			assert.deepStrictEqual(isNumber({a: 1}), false);
			assert.deepStrictEqual(isNumber('foo'), false);
			assert.deepStrictEqual(isNumber(returnArgs()), false);
		});
	});
	describe('isObject', function () {
		// 👍
		it('should return `true` if the input is an object', function () {
			assert.deepStrictEqual(isObject({}), true);
			assert.deepStrictEqual(isObject({a: 1}), true);
		});

		// 👎
		it('should return `false` if the input is not an object', function () {
			assert.deepStrictEqual(isObject(true), false);
			assert.deepStrictEqual(isObject(1), false);
			assert.deepStrictEqual(isObject(null), false);
			assert.deepStrictEqual(isObject(undefined), false);
			assert.deepStrictEqual(isObject(NaN), false);
			assert.deepStrictEqual(isObject(Infinity), false);
			assert.deepStrictEqual(isObject([1, 2]), false);
			assert.deepStrictEqual(isObject('foo'), false);
			assert.deepStrictEqual(isObject(returnArgs()), false);
		});
	});
	describe('isPromise', function () {
		// 👍
		it('should return `true` if the input is a promise', function () {
			const promise = new Promise(resolve => {
				setTimeout(() => {
					resolve('foo');
				}, 300);
			});
			assert.deepStrictEqual(isPromise(promise), true);
		});

		// 👎
		it('should return `false` if the input is not a promise', function () {
			assert.deepStrictEqual(isPromise(true), false);
			assert.deepStrictEqual(isPromise(1), false);
			assert.deepStrictEqual(isPromise(NaN), false);
			assert.deepStrictEqual(isPromise(null), false);
			assert.deepStrictEqual(isPromise(undefined), false);
			assert.deepStrictEqual(isPromise(Infinity), false);
			assert.deepStrictEqual(isPromise({a: 1}), false);
			assert.deepStrictEqual(isPromise([1, 2]), false);
			assert.deepStrictEqual(isPromise('foo'), false);
			assert.deepStrictEqual(isPromise(returnArgs()), false);
		});
	});
	describe('isString', function () {
		// 👍
		it('should return `true` if the input is an object', function () {
			assert.deepStrictEqual(isString(''), true);
			assert.deepStrictEqual(isString('foo'), true);
		});

		// 👎
		it('should return `false` if the input is not an object', function () {
			assert.deepStrictEqual(isString(true), false);
			assert.deepStrictEqual(isString(1), false);
			assert.deepStrictEqual(isString(NaN), false);
			assert.deepStrictEqual(isString(Infinity), false);
			assert.deepStrictEqual(isString([1, 2]), false);
			assert.deepStrictEqual(isString({a: 1}), false);
			assert.deepStrictEqual(isString(returnArgs()), false);
		});
	});

	describe('isValidNumber', function () {
		// 👍
		it('should return `true` is the input is a valid number (including not being NaN)', function () {
			[
				1,
				1.2,
				Infinity,
			].forEach(x => {
				assert.deepStrictEqual(isValidNumber(x), true);
			});
		});

		// 👎
		it('should return `false` is the input is a not valid number (including being NaN)', function () {
			[
				[],
				[123],
				[1, 2],
				{a: 1},
				'',
				'123',
				'123abc',
				'foo',
				true,
				null,
				undefined,
				NaN,
				returnArgs(),
				returnArgs(1),
				returnArgs(1, 2),
				returnArgs(1, 2, 3)
			].forEach(x => {
				assert.deepStrictEqual(isValidNumber(x), false);
			});
		});
	});
	describe('negate', function () {
		it('should return `false` if the input is truthy', function () {
			[
				true,
				1,
				'a',
				[],
				{},
			].forEach(x => {
				assert.deepStrictEqual(negate(x), false);
			});
		});
		it('should return `true` if the input is falsy', function () {
			[
				false,
				0,
				'',
				null,
				NaN,
				undefined,
			].forEach(x => {
				assert.deepStrictEqual(negate(x), true);
			});
		});

	});
	describe('toFloatIsValidNumber', function () {
		// 👍
		it('should return `true` if the input, parsed to float, is a valid number', function () {
			[
				[1],
				[1, 2],
				[1, 2, 3],
				'123',
				'123abc',
			].forEach(x => {
				assert.deepStrictEqual(toFloatIsValidNumber(x), true);
			});
		});

		// 👎
		it('should return `false` if the input, parsed to float, is not a valid number', function () {
			[
				[],
				'',
				'foo',
				{a: 1},
				true,
				null,
				undefined,
				returnArgs(),
				returnArgs(1),
				returnArgs(1, 2),
				returnArgs(1, 2, 3)
			].forEach(x => {
				assert.deepStrictEqual(toFloatIsValidNumber(x), false);
			});
		});
	});
	describe('toNumberisValidNumber', function () {
		// 👍
		it('should return `true` if the input, converted to Number, is indeed a number', function () {
			[
				[],
				[2],
				'',
				'123',
				null,
				true,
			].forEach(x => {
				assert.deepStrictEqual(toNumberisValidNumber(x), true);
			});
		});

		// 👎
		it('should return `false` if the input, converted to Number, is not a number', function () {
			[
				{a: 1},
				[1, 2],
				'123abc',
				'foo',
				undefined,
				returnArgs(),
				returnArgs(1),
				returnArgs(1, 2),
				returnArgs(1, 2, 3)
			].forEach(x => {
				assert.deepStrictEqual(toNumberisValidNumber(x), false);
			});
		});
	});
});
