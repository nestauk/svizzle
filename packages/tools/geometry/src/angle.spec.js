import {strict as assert} from 'node:assert';

import {degToRad, radToDeg} from './angle.js';

describe('angle', function () {
	describe('degToRad', function () {
		it('should convert degrees to radians', function () {
			assert.deepStrictEqual(degToRad(0), 0);
			assert.deepStrictEqual(degToRad(45), Math.PI / 4);
			assert.deepStrictEqual(degToRad(90), Math.PI / 2);
			assert.deepStrictEqual(degToRad(180), Math.PI);
			assert.deepStrictEqual(degToRad(270), Math.PI * 3 / 2);
			assert.deepStrictEqual(degToRad(-90), -Math.PI / 2);
			assert.deepStrictEqual(degToRad(-45), -Math.PI / 4);
		});
	});
	describe('radToDeg', function () {
		it('should convert radians to degrees', function () {
			assert.deepStrictEqual(radToDeg(0), 0);
			assert.deepStrictEqual(radToDeg(Math.PI / 4), 45);
			assert.deepStrictEqual(radToDeg(Math.PI / 2), 90);
			assert.deepStrictEqual(radToDeg(Math.PI), 180);
			assert.deepStrictEqual(radToDeg(Math.PI * 3 / 2), 270);
			assert.deepStrictEqual(radToDeg(-Math.PI / 2), -90);
			assert.deepStrictEqual(radToDeg(-Math.PI / 4), -45);
		});
	});
});
