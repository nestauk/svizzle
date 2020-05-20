import {strict as assert} from "assert";

import * as _ from "lamb";

import {joinWith} from "./string-[array-string]";
import {
	applyFnMap,
	makeMergeKeyValue,
	mergeObj,
	transformPaths,
	transformValues,
} from "./object-[object-object]";

describe("Object -> (Object -> Object)", function() {
	describe("applyFnMap", function() {
		it("should return a function expecting an object to be used as the argument of the provided functions", function() {
			const format = applyFnMap({
				fullname: _.pipe([
					_.collect([_.getKey("fname"), _.getKey("lname")]),
					joinWith(" ")
				]),
				coords: _.collect([_.getKey("lng"), _.getKey("lat")])
			});

			assert.deepStrictEqual(
				format({fname: "John", lname: "Woo", lng: 1, lat: 2}),
				{fullname: "John Woo", coords: [1, 2]}
			);
		});
	});

	describe('transformPaths', function() {
		it('should return a function that expects an object and applies the functions in the values of the input object to the values of the provided object found in the paths in the correspondent keys – orthogonal transforms', function() {
			const transform = transformPaths({
				'a.a2.a22': _.pipe([Number, Math.sqrt]),
				'a.a3': parseInt,
				'b.b2.b24': parseInt,
				'b.b4': parseInt,
			});
			const obj = {
				a: {
					a1: 'a1',
					a2: {
						a21: 'a21',
						a22: '9',
					},
					a3: '3px',
					a4: '2',
				},
				b: {
					b1: 'b1',
					b2: {
						b21: 'foo',
						b22: '9',
						b23: '2',
						b24: '24px'
					},
					b3: '2',
					b4: '4px'
				},
			};
			const expected = {
				a: {
					a1: 'a1',
					a2: {
						a21: 'a21',
						a22: 3,
					},
					a3: 3,
					a4: '2'
				},
				b: {
					b1: 'b1',
					b2: {
						b21: 'foo',
						b22: '9',
						b23: '2',
						b24: 24
					},
					b3: '2',
					b4: 4
				},
			};

			assert.deepStrictEqual(transform(obj), expected);
		});
	});
	describe("transformValues", function() {
		const obj = {
			name: "foo",
			a: "9",
			b: "2",
			width: "10px"
		};
		it("should return a function expecting an object and applying the functions in the provided object to the correspondent object values", function() {
			const conversionFn = transformValues({
				name: _.identity,
				a: _.pipe([Number, Math.sqrt]),
				b: Number,
				width: parseFloat
			});

			assert.deepStrictEqual(conversionFn(obj), {
				name: "foo",
				a: 3,
				b: 2,
				width: 10
			});
		});
		it("should assume identity for not provided keys", function() {
			const conversionFn = transformValues({
				a: _.pipe([Number, Math.sqrt]),
			});

			assert.deepStrictEqual(conversionFn(obj), {
				name: "foo",
				a: 3,
				b: "2",
				width: "10px"
			});
		});
	});

	describe("mergeObj", function() {
		it("should return a function expecting an object to merge with the input object", function() {
			const mergeB = mergeObj({b: 2});

			assert.deepStrictEqual(mergeB({a: 1}), {a: 1, b: 2});
			assert.deepStrictEqual(mergeB({a: 1, b: 1}), {a: 1, b: 2});
		});
	});

	describe("makeMergeKeyValue", function() {
		const mergeFooValue = makeMergeKeyValue("foo", {b: -2, c: -3});

		it("should merge the value to an existing object at the provided key", function() {
			const merged = mergeFooValue({
				foo: {a: 1, b: 2},
				bar: {k: 1}
			});
			const expected = {
				foo: {a: 1, b: -2, c: -3},
				bar: {k: 1}
			};

			assert.deepStrictEqual(merged, expected);
		});
		it("should merge the value to a non-existing object at the provided key", function() {
			const merged = mergeFooValue({
				bar: {k: 1}
			});
			const expected = {
				foo: {b: -2, c: -3},
				bar: {k: 1}
			};

			assert.deepStrictEqual(merged, expected);
		});
	});
});
