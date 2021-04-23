import {strict as assert} from 'assert';

import * as _ from 'lamb';

import {
	areValidBins,
	exactAmountBins,
	findFirstNonEmptyBinIndex,
	findLastNonEmptyBinIndex,
	getBinsExtent,
	getBinsItems,
	getBinsMax,
	getBinsMin,
	getBinsTicks,
	getBinsTicksExtent,
	getNonEmptyBinsTicks,
	getTrimmedBinsStats,
	isNonEmptyBin,
} from './utils';

describe('histogram/utils', function() {
	describe('areValidBins', function() {
		it('should returns false if bins is an empty array', function() {
			assert.deepStrictEqual(areValidBins([]), false);
		});
		it('should returns false if some bin don\'t have a `range` key', function() {
			assert.deepStrictEqual(
				areValidBins([
					{values: [{a: 2}, {a: 6}]},
					{range: [6, 10], values: [{a: 7}, {a: 8}]},
					{range: [10, 14], values: [{a: 12}, {a: 14}]}
				]),
				false
			);
		});
		it('should returns false if some bins have `range` equal to `null` or `undefined`', function() {
			assert.deepStrictEqual(
				areValidBins([
					{range: null, values: [{a: 2}, {a: 6}]},
					{range: [6, 10], values: [{a: 7}, {a: 8}]},
					{range: [10, 14], values: [{a: 12}, {a: 14}]}
				]),
				false
			);
			assert.deepStrictEqual(
				areValidBins([
					{range: undefined, values: [{a: 2}, {a: 6}]},
					{range: [6, 10], values: [{a: 7}, {a: 8}]},
					{range: [10, 14], values: [{a: 12}, {a: 14}]}
				]),
				false
			);
		});
		it('should returns true if bins are valid', function() {
			assert.deepStrictEqual(
				areValidBins([
					{range: [2, 6], values: [{a: 2}, {a: 6}]},
					{range: [6, 10], values: [{a: 7}, {a: 8}]},
					{range: [10, 14], values: [{a: 12}, {a: 14}]}
				]),
				true
			);
		});
	});
	describe('exactAmountBins', function() {
		it('should return an exact amount of bins – basic', function() {
			const array = [1, 2, 6, 7, 8, 14, 20];
			const actual = exactAmountBins({
				array,
				amount: 3,
			});
			const expected = [
				{range: [1, 8], values: [1, 2, 6, 7, 8]},
				{range: [8, 15], values: [14]},
				{range: [15, 22], values: [20]}
			];

			assert.deepStrictEqual(actual, expected);
		});
		it('should return an exact amount of bins accessor within the maxExtent', function() {
			const array = [1, 2, 6, 7, 8, 14, 20];
			const actual = exactAmountBins({
				array,
				amount: 3,
				maxExtent: [2, 15]
			});
			const expected = [
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]}
			];

			assert.deepStrictEqual(actual, expected);
		});
		it('should return an exact amount of bins within the maxExtent and with an accessor', function() {
			const array = [{a: 1}, {a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}, {a: 20}];
			const actual = exactAmountBins({
				array,
				amount: 3,
				accessor: _.getKey('a'),
				maxExtent: [2, 14]
			});
			const expected = [
				{range: [2, 6], values: [{a: 2}, {a: 6}]},
				{range: [6, 10], values: [{a: 7}, {a: 8}]},
				{range: [10, 14], values: [{a: 12}, {a: 14}]}
			];

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('findFirstNonEmptyBinIndex', function() {
		it('should return the index of the first bin with non-empty `values`', function() {
			const bins = [
				{range: [-8, -3], values: []},
				{range: [-3, 2], values: []},
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]},
				{range: [17, 22], values: []},
			];
			const actual = findFirstNonEmptyBinIndex(bins);
			const expected = 2;

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('findLastNonEmptyBinIndex', function() {
		it('should return the index of the last bin with non-empty `values`', function() {
			const bins = [
				{range: [-8, -3], values: []},
				{range: [-3, 2], values: []},
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]},
				{range: [17, 22], values: []},
			];
			const actual = findLastNonEmptyBinIndex(bins);
			const expected = 4;

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('getBinsExtent', function() {
		it('should return the extent of the provided bins', function() {
			const bins = [
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]}
			];
			const actual = getBinsExtent(bins);
			const expected = [1, 3];

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('getBinsItems', function() {
		it('should return all the values in the provided bins', function() {
			const bins = [
				{range: [2, 6], values: [{a: 2}, {a: 6}]},
				{range: [6, 10], values: [{a: 7}, {a: 8}]},
				{range: [10, 14], values: [{a: 12}, {a: 14}]}
			];
			const actual = getBinsItems(bins);
			const expected = [{a: 2}, {a: 6}, {a: 7}, {a: 8}, {a: 12}, {a: 14}];

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('getBinsMax', function() {
		it('should return the length of the longest bin', function() {
			const bins = [
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]}
			];
			assert.deepStrictEqual(getBinsMax(bins), 3);
		});
	});
	describe('getBinsMin', function() {
		it('should return the length of the shortest bin', function() {
			const bins = [
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]}
			];
			assert.deepStrictEqual(getBinsMin(bins), 1);
		});
	});
	describe('isNonEmptyBin', function() {
		it('should return `true` if the `values` property of the provided bin is not empty', function() {
			assert.deepStrictEqual(
				isNonEmptyBin({range: [-8, -3], values: []}),
				false
			);
			assert.deepStrictEqual(
				isNonEmptyBin({range: [2, 7], values: [2, 6, 7]}),
				true
			);
		});
	});
	describe('getBinsTicks', function() {
		it('should return the ticks for the provided bins', function() {
			const bins = [
				{range: [-8, -3], values: []},
				{range: [-3, 2], values: []},
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: []},
				{range: [12, 17], values: []},
				{range: [17, 22], values: [18, 19, 20]},
				{range: [22, 27], values: [24, 25]},
				{range: [27, 32], values: []},
			];
			const actual = getBinsTicks(bins);
			const expected = [-8, -3, 2, 7, 12, 17, 22, 27, 32];

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('getBinsTicksExtent', function() {
		it('should return the extent of all ticks for the provided bins', function() {
			const bins = [
				{range: [-8, -3], values: []},
				{range: [-3, 2], values: []},
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: []},
				{range: [12, 17], values: []},
				{range: [17, 22], values: [18, 19, 20]},
				{range: [22, 27], values: [24, 25]},
				{range: [27, 32], values: []},
			];
			const actual = getBinsTicksExtent(bins);
			const expected = [-8, 32];

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('getNonEmptyBinsTicks', function() {
		it('should return the ticks for the provided bins using the non-empty ones', function() {
			const bins = [
				{range: [-8, -3], values: []},
				{range: [-3, 2], values: []},
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: []},
				{range: [12, 17], values: []},
				{range: [17, 22], values: [18, 19, 20]},
				{range: [22, 27], values: [24, 25]},
				{range: [27, 32], values: []},
			];
			const actual = getNonEmptyBinsTicks(bins);
			const expected = [2, 7, 17, 22, 27];

			assert.deepStrictEqual(actual, expected);
		});
	});
	describe('getTrimmedBinsStats', function() {
		it('should return an object containing trimmed bins and `start` and `end` – with empties', function() {
			const bins = [
				{range: [-8, -3], values: []},
				{range: [-3, 2], values: []},
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]},
				{range: [17, 22], values: []},
			];
			const actual = getTrimmedBinsStats(bins);
			const expected = {
				bins: [
					{range: [2, 7], values: [2, 6, 7]},
					{range: [7, 12], values: [8]},
					{range: [12, 17], values: [14]},
				],
				end: 4,
				start: 2
			};

			assert.deepStrictEqual(actual, expected);
		});
		it('should return an object containing trimmed bins and `start` and `end` – without empties', function() {
			const bins = [
				{range: [2, 7], values: [2, 6, 7]},
				{range: [7, 12], values: [8]},
				{range: [12, 17], values: [14]},
			];
			const actual = getTrimmedBinsStats(bins);
			const expected = {
				bins: [
					{range: [2, 7], values: [2, 6, 7]},
					{range: [7, 12], values: [8]},
					{range: [12, 17], values: [14]},
				],
				end: 2,
				start: 0
			};

			assert.deepStrictEqual(actual, expected);
		});
	});
});
