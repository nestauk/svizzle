import {strict as assert} from 'node:assert';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {readFile} from '@svizzle/file';

import {alignTags} from './html.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEST_ASSETS_PATH = path.resolve(__dirname, '../test_assets/');

describe('@svizzle/dom/html', function () {
	describe('alignTags', function () {
		it('should add a newline between angle brackets', async () => {
			const filepathInput = path.join(TEST_ASSETS_PATH, '01_input.html');
			const filepathExpected = path.join(TEST_ASSETS_PATH, '01_expected.html');
			const input = await readFile(filepathInput, 'utf8');
			const expected = await readFile(filepathExpected, 'utf8');

			assert.deepStrictEqual(alignTags(input), expected);
		});
		it('should add a newline between angle brackets and square brackets', async () => {
			const filepathInput = path.join(TEST_ASSETS_PATH, '02_input.html');
			const filepathExpected = path.join(TEST_ASSETS_PATH, '02_expected.html');
			const input = await readFile(filepathInput, 'utf8');
			const expected = await readFile(filepathExpected, 'utf8');

			assert.deepStrictEqual(alignTags(input), expected);
		});
	});
});
