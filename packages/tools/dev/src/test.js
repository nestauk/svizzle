/**
* @module @svizzle/dev/test
*/

/**
 * Return a console.log interceptor
 *
 * @function
 * @return {object}
 * @example
describe('tapAppendTo', function() {
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

	it('should print the provided array and element and return the result of appending the element to the array', function() {
		const actual1 = tapAppendTo([1, 2, 3], 4);
		const expected1 = [1, 2, 3, 4];
		const actual2 = tapAppendTo([1, 2], 'a');
		const expected2 = [1, 2, 'a'];

		// 2 taps -> invoked console.logs 2 times
		const expectedLog = [
			[[1, 2, 3], 4],
			[[1, 2], 'a']
		];

		assert.deepStrictEqual(actual1, expected1);
		assert.deepStrictEqual(actual2, expected2);
		assert.deepStrictEqual(printer.getLog(), expectedLog);

		printer.print('I can still log stuff') // console.log is preserved
	});
});
describe('console.log still works in other tests', function() {
	it('console.logs', function() {
		assert.deepStrictEqual(true, true);
		console.log('foo') // 'foo'
	});
});
 * @since 0.1.0
 */
export const makePrinter = () => {
	let log;
	let print = console.log;

	const reset = () => {
		log = [];
	}

	const init = () => {
		reset();
		console.log = function () {
			log.push([].slice.call(arguments));
		}
	}

	const getLog = () => log;

	const restore = () => {
		console.log = print;
	}

	return {getLog, init, print, reset, restore}
};
