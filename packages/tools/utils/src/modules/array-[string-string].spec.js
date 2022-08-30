import {strict as assert} from 'assert';

import {sliceStringAt} from './array-[string-string]';

describe('Array -> (String -> String)', function () {
	describe('sliceStringAt', function () {
		it('should return a function extracting the portion of a string between the provided indices (first included, second excluded)', function () {
			const slicer = sliceStringAt([3, 5]);
			assert.deepStrictEqual(slicer('0123456789'), '34');
		});
		it('should return a function extracting the portion of a string from the provided index (first included, second excluded & implicit)', function () {
			const slicer = sliceStringAt([3]);
			assert.deepStrictEqual(slicer('0123456789'), '3456789');
		});
		it('should return a function extracting the portion of a string from the provided index (first negative, second positive)', function () {
			const slicer = sliceStringAt([-6, 6]);
			assert.deepStrictEqual(slicer('0123456789'), '45');
		});
		it('should return a function extracting the portion of a string from the provided index (first positive, second negative)', function () {
			const slicer = sliceStringAt([1, -3]);
			assert.deepStrictEqual(slicer('0123456789'), '123456');
		});
	});
});
