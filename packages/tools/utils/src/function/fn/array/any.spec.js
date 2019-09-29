import {strict as assert} from 'assert';

import {reduceFromArr, reduceFromObj} from './any';

describe('Function -> (Array -> Any)', function() {
  describe('reduceFromArr', function() {
    it('should return a reduce function expecting an array to reduce with the passed reducer with an empty array as the initial value', function() {
      const reduce = reduceFromArr((acc, x) => {
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
  });
  describe('reduceFromObj', function() {
    it('should return a reduce function expecting an array to reduce with the passed reducer with an empty object as the initial value', function() {
      const reduce = reduceFromObj((acc, x) => {
        acc[x.id] = x.name;
        return acc;
      });
      assert.deepStrictEqual(
        reduce([
          {id: '00', name: 'a'},
          {id: '11', name: 'b'}
        ]),
        { '11': 'b', '00': 'a' }
      );
    });
  });
});