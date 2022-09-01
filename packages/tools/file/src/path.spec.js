import {strict as assert} from 'node:assert';

import {
	filterJsonExtensions,
	getPathExt,
	hasAnyExtensionOf,
	isFileWithExt,
	renameToExtension,
	resolveToDir,
} from './path.js';

describe('path', function () {
	describe('getPathExt', function () {
		it('should return the extension of the provided file path', function () {
			assert.deepStrictEqual(
				getPathExt('foo/bar.txt'),
				'txt'
			);
			assert.deepStrictEqual(
				getPathExt('foo/bar.todo.md'),
				'md'
			);
		});
	});
	describe('hasAnyExtensionOf', function () {
		it('should detect if a file name has one of the provided extensions', function () {
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
	describe('filterJsonExtensions', function () {
		it('should filter an array of file names to contain only those with extension .json or .geojson.', function () {
			assert.deepStrictEqual(
				filterJsonExtensions(['file.json', 'file.geojson', 'file.csv']),
				['file.json', 'file.geojson']
			);
		});
	});
	describe('isFileWithExt', function () {
		it('should return a function that returns true if the input file name has the provided extension', function () {
			const isJson = isFileWithExt('json');

			assert.deepStrictEqual(isJson('file.json'), true);
			assert.deepStrictEqual(isJson('file.txt'), false);
		});
	});
	describe('renameToExtension', function () {
		it('should return a function that renames a file to the provided extension', function () {
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
		it('should return a function that renames a file to the provided extension (multiples)', function () {
			const renameToMinJs = renameToExtension('.min.js');

			assert.deepStrictEqual(
				renameToMinJs('file.txt'),
				'file.min.js'
			);
		});
	});
	describe('resolveToDir', function () {
		it('should return a function expecting a filename and returning it resolved to the provided directory path', function () {
			const resolve = resolveToDir('/output/dir/');

			assert.deepStrictEqual(
				resolve('file1.txt'),
				'/output/dir/file1.txt'
			);
			assert.deepStrictEqual(
				resolve('file2.txt'),
				'/output/dir/file2.txt'
			);
		});
	});
});
