/*
run with `-r jsdom-global/register`:
injects `document`, `window` and other DOM API in the Node environment
*/

import {resolve} from 'path';
import {strict as assert} from 'assert';

import { alignTags } from '@svizzle/dom';
import { readFile } from '@svizzle/file';
import { trimLastNewline } from '@svizzle/utils';

import BarchartV from '../dist/BarchartV.js';

const createDiv = module => () => {
  module.div = document.createElement('div');
};

describe('BarchartV', function() {
  beforeEach(createDiv(this));

  it('should render BarchartV', async () => {
    const filepath = resolve(__dirname, '../test_assets/snapshot_01.html');
    const expected = await readFile(filepath, 'utf8').then(trimLastNewline);

    new BarchartV({
      target: this.div,
      props: {
        items: [
          {key: 'foo', value: 2},
          {key: 'bar', value: 34}
        ]
      }
    });
    const actual = alignTags(this.div.innerHTML);

    assert.deepStrictEqual(actual, expected);
  });
});
