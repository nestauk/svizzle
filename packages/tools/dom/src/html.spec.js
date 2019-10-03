import {resolve, join} from "path";
import {strict as assert} from "assert";

import {readFile} from '@svizzle/file';

import {alignTags} from "./html";

const TEST_ASSETS_PATH = resolve(__dirname, '../test_assets/');

describe("@svizzle/dom/html", function() {
  describe("alignTags", function() {
    it("should add a newline between angle brackets", async () => {
      const filepathInput = join(TEST_ASSETS_PATH, '01_input.html');
      const filepathExpected = join(TEST_ASSETS_PATH, '01_expected.html');
      const input = await readFile(filepathInput, 'utf8');
      const expected = await readFile(filepathExpected, 'utf8');

      assert.deepStrictEqual(alignTags(input), expected);
    });
    it("should add a newline between angle brackets and square brackets", async () => {
      const filepathInput = join(TEST_ASSETS_PATH, '02_input.html');
      const filepathExpected = join(TEST_ASSETS_PATH, '02_expected.html');
      const input = await readFile(filepathInput, 'utf8');
      const expected = await readFile(filepathExpected, 'utf8');

      assert.deepStrictEqual(alignTags(input), expected);
    });
  });
});
