import {strict as assert} from "assert";

import {reduceWith, sum} from "lamb";

import {makePrinter} from "../test";
import {tapWith} from "./array-[any-any]";

const arraySum = reduceWith(sum, 0);

describe("log: Array -> (Any -> Any)", function() {
  describe("taps", function() {
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

      describe("tapWith", function() {
          const expected = [1, 2, 3];
          const sum = arraySum([1, 2, 3]);
          it("should print and return the input - no label", function() {
              const tap = tapWith([arraySum]);
              const actual = tap(expected);
              const expectedLog = [[sum]];
              assert.deepStrictEqual(actual, expected);
              assert.deepStrictEqual(printer.getLog(), expectedLog);
          });
          it("should print and return the input - with label", function() {
              const tap = tapWith([arraySum, 'label']);
              const actual = tap(expected);
              const expectedLog = [['label:', sum]];
              assert.deepStrictEqual(actual, expected);
              assert.deepStrictEqual(printer.getLog(), expectedLog);
          });
      });
  });
});
