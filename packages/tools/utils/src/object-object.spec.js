import {strict as assert} from "assert";

import * as _ from "lamb";

import {
    mapValuesToNumber,
    mapValuesToFloat,
    mapValuesToFloatPossibly,
    mergeWithAppendTo,
    mergeWithConcat,
    mergeWithMerge,
    mergeWithSum,
    pickIfTruthy
} from "./object-object";

describe("Object -> Object", function() {
    describe("mapValuesToFloat", function() {
        it("should return a copy of the object with values converted to numbers", function() {
            const obj1 = {a: "1.2", b: "2px", c: "h2o"};
            const obj2 = {a: 1.2, b: 2, c: NaN};
            assert.deepStrictEqual(mapValuesToFloat(obj1), obj2);
        });
    });
    describe("mapValuesToFloatPossibly", function() {
        it("should return a copy of the object with values converted to numbers everywhere if possible", function() {
            const obj1 = {a: "1.2", b: "2px"};
            const obj2 = {a: 1.2, b: 2};
            assert.deepStrictEqual(mapValuesToFloatPossibly(obj1), obj2);
        });
        it("should return a copy of the object with values converted to numbers only where possible", function() {
            const obj1 = {a: "1.2", b: "2px", c: "h2o"};
            const obj2 = {a: 1.2, b: 2, c: "h2o"};
            assert.deepStrictEqual(mapValuesToFloatPossibly(obj1), obj2);

            const obj3 = {a: "a",  b: "b"};
            assert.deepStrictEqual(mapValuesToFloatPossibly(obj3), obj3);
        });
    });
    describe("mapValuesToNumber", function() {
        it("should return a copy of the object with values converted to numbers", function() {
            const obj1 = {a: "1.2",  b: "2"};
            const obj2 = {a: 1.2,  b: 2};
            assert.deepStrictEqual(mapValuesToNumber(obj1), obj2);
        });
    });
    describe("mergeWith", function() {
        describe("mergeWithSum", function() {
            it("sum: should merge 2 objects by summing correspondent values", function() {
                const obj1 = {a: 1,  b: 2};
                const obj2 = {a: 10,       c: 1};
                const obj3 = {a: 11, b: 2, c: 1};
                assert.deepStrictEqual(mergeWithSum(obj1, obj2), obj3);
            });
        });
        describe("mergeWithMerge", function() {
            it("full: should merge 2 objects with same keys by merging correspondent values", function() {
                const obj1 = {A: {a: 1       }, B: {       b: 1}};
                const obj2 = {A: {      b: 10}, B: {a: 10      }};
                const obj3 = {A: {a: 1, b: 10}, B: {a: 10, b: 1}};

                assert.deepStrictEqual(mergeWithMerge(obj1, obj2), obj3);
            });
            it("sparse: should merge 2 objects with different keys by merging correspondent values", function() {
                const obj1 = {A: {a: 1}           };
                const obj2 = {           B: {b: 1}};
                const obj3 = {A: {a: 1}, B: {b: 1}};

                assert.deepStrictEqual(mergeWithMerge(obj1, obj2), obj3);
            });
        });
        describe("mergeWithConcat", function() {
            it("full: should merge 2 objects with same keys by concatenating correspondent array values", function() {
                const obj1 = {a: [1, 2, 3         ], b: [4, 5, 6         ]};
                const obj2 = {a: [         1, 2, 3], b: [         4, 5, 6]};
                const obj3 = {a: [1, 2, 3, 1, 2, 3], b: [4, 5, 6, 4, 5, 6]};

                assert.deepStrictEqual(mergeWithConcat(obj1, obj2), obj3);
            });
            it("sparse: should merge 2 objects with different keys by concatenating correspondent array values", function() {
                const obj1 = {a: [1, 2, 3]};
                const obj2 = {              b: [4, 5, 6]};
                const obj3 = {a: [1, 2, 3], b: [4, 5, 6]};

                assert.deepStrictEqual(mergeWithConcat(obj1, obj2), obj3);
            });
            it("from empty: should merge 1 empty object with another by concatenating array values", function() {
                const obj1 = {};
                const obj2 = {b: [4, 5, 6]};
                const obj3 = {b: [4, 5, 6]};

                assert.deepStrictEqual(mergeWithConcat(obj1, obj2), obj3);
            });
        });
        describe("mergeWithAppendTo", function() {
            it("should merge 2 objects with same keys by appending values", function() {
                const obj1 = {a: [1, 2, 3],    b: [4, 5, 6]     };
                const obj2 = {a:           4,  b:           [7] };
                const obj3 = {a: [1, 2, 3, 4], b: [4, 5, 6, [7]]};

                assert.deepStrictEqual(mergeWithAppendTo(obj1, obj2), obj3);
            });
        });
    });
    describe("pick", function() {
      describe("pickIfTruthy", function() {
          it("should return a copy of the object without falsy values", function() {
              const obj1 = {a: true, b: true, c: false};
              const exp1 = {a: true, b: true};
              const obj2 = {a: 1, b: 0, c: false};
              const exp2 = {a: 1};
              const obj3 = {a: [1, 2], b: {a: 1}, c: false};
              const exp3 = {a: [1, 2], b: {a: 1}};

              assert.deepStrictEqual(pickIfTruthy(obj1), exp1);
              assert.deepStrictEqual(pickIfTruthy(obj2), exp2);
              assert.deepStrictEqual(pickIfTruthy(obj3), exp3);
          });
      });
    })
});
