import {strict as assert} from 'assert';

import {
	reduceFromEmptyArray,
	reduceFromEmptyObject
} from './reduceCb[any-any]-[array-any]';

describe('(Any -> Any):reduceCb -> (Array -> Any)', function () {
	describe('reduceFromEmptyArray', function () {
		it('should return a reduce function expecting an array to reduce with the passed reducer with an empty array as the initial value', function () {
			const reduce = reduceFromEmptyArray((acc, x) => {
				return acc.slice(-2).concat([x.value]);
			});
			assert.deepStrictEqual(
				reduce([
					{a: 1, value: 2},
					{a: 1, value: 3},
					{a: 1, value: 0},
					{a: 1, value: 4},
					{a: 1, value: 7}
				]),
				[0, 4, 7]
			);
		});
		it('should create a different initial array each time it gets called', function () {
			const reduce1 = reduceFromEmptyArray((acc, x) => {
				acc.push(x.value);
				return acc;
			});
			const reduce2 = reduceFromEmptyArray((acc, x) => {
				acc.push(x.value);
				return acc;
			});
			reduce1([{value: 1}, {value: 2}]);
			const b = reduce2([{value: 3}, {value: 4}]);

			assert.notStrictEqual(b, [1, 2, 3, 4]);
		});
	});
	describe('reduceFromEmptyObject', function () {
		it('should return a reduce function expecting an array to reduce with the passed reducer with an empty object as the initial value', function () {
			const reduce = reduceFromEmptyObject((acc, x) => {
				acc[x.id] = x.name;
				return acc;
			});
			assert.deepStrictEqual(
				reduce([
					{id: '00', name: 'a'},
					{id: '11', name: 'b'}
				]),
				{'11': 'b', '00': 'a'}
			);
		});
		it('should create a different initial object each time it gets called', function () {
			const reduce1 = reduceFromEmptyObject((acc, x) => {
				acc[x.id] = x.name;
				return acc;
			});
			const reduce2 = reduceFromEmptyObject((acc, x) => {
				acc[x.id] = x.name;
				return acc;
			});
			reduce1([
				{id: 'a', name: 'a'},
				{id: 'b', name: 'b'}
			]);
			const b = reduce2([
				{id: 'b', name: 'c'},
			]);
			assert.notStrictEqual(
				b,
				{'c': 'c', 'b': 'b', 'a': 'a'}
			);
		});
	});
});
