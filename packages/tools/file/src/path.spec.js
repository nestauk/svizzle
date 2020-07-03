import {strict as assert} from 'assert';

import {
	filterJsonExtensions,
	hasAnyExtensionOf,
	renameToExtension
} from './path';

describe('path', function() {
	describe('hasAnyExtensionOf', function() {
		it('should detect if a file name has one of the provided extensions', function() {
			const isJsonOrGeojson = hasAnyExtensionOf(['.json', '.geojson']);

			assert.deepStrictEqual(
				isJsonOrGeojson('foo.json'),
				true
			);
			assert.deepStrictEqual(
				isJsonOrGeojson('foo.csv'),
				false
			);
		});
	});
	describe('filterJsonExtensions', function() {
		it('should filter an array of file names to contain only those with extension .json or .geojson.', function() {
			assert.deepStrictEqual(
				filterJsonExtensions(['file.json', 'file.geojson', 'file.csv']),
				['file.json', 'file.geojson']
			);
		});
	});
	describe('renameToExtension', function() {
		it('should return a function that renames a file to the provided extension', function() {
			const renameToJson = renameToExtension('.json');

			assert.deepStrictEqual(
				renameToJson('file.txt'),
				'file.json'
			);
			assert.deepStrictEqual(
				renameToJson('file.min.js'),
				'file.min.json'
			);
		});
		it('should return a function that renames a file to the provided extension (multiples)', function() {
			const renameToMinJs = renameToExtension('.min.js');

			assert.deepStrictEqual(
				renameToMinJs('file.txt'),
				'file.min.js'
			);
		});
	});
});
