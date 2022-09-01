import {strict as assert} from 'node:assert';

import {noop} from './any-undefined.js';

describe('Any -> Undefined', function () {
	describe('noop', function () {
		it('should do nothing and return `undefined`', function () {
			assert.deepStrictEqual(noop(), undefined);
			assert.deepStrictEqual(noop(1), undefined);
			assert.deepStrictEqual(noop('d'), undefined);
			assert.deepStrictEqual(noop([1, 2]), undefined);
			assert.deepStrictEqual(noop({a: 1}), undefined);
		});
	});
});
