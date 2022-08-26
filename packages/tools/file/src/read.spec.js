import {strict as assert} from 'assert';
import path from 'path';
import {csvParseRows} from 'd3-dsv';

import {
	readCsv,
	readDir,
	readDirFiles,
	readDirFilesIndexed,
	readDsv,
	readFile,
	readJson,
	readJsonDir,
	readTsv,
	readYaml,
} from './read';
import {hasAnyExtensionOf} from './path';

describe('read', function () {
	describe('readFile', function () {
		const aTxt = 'I\'m a text file\nfor you to read\n';
		it('should return a promise that reads the file at the provided path – no encoding',
			async function () {
				const txtPath = path.resolve(__dirname, '../test_assets', 'a.txt');
				const buffer = await readFile(txtPath);
				const expected = Buffer.from(aTxt);
				assert.deepStrictEqual(buffer, expected);
			}
		);
		it('should return a promise that reads the file at the provided path – with encoding',
			async function () {
				const txtPath = path.resolve(__dirname, '../test_assets', 'a.txt');
				const txt = await readFile(txtPath, 'utf-8');
				assert.deepStrictEqual(txt, aTxt);
			}
		);
	});
	describe('readDir', function () {
		it('should return a promise that reads the directory at the provided path',
			async function () {
				const dirPath = path.resolve(__dirname, '../test_assets');
				const expected = [
					'a.txt',
					'a.yaml',
					'a1.json',
					'aDir',
					'ab.csv',
					'ab.tsv',
					'ab.txt',
					'b2.json',
					'multi.json',
					'rows.csv',
					'rows.tsv',
					'rows.txt',
				];
				const actual = await readDir(dirPath, 'utf-8');
				assert.deepStrictEqual(actual, expected);
			}
		);
	});
	describe('readDirFiles', function () {
		const isCSV = hasAnyExtensionOf(['.csv']);

		it('should read all the files in `dirPath`',
			async function () {
				const dirPath = path.resolve(__dirname, '../test_assets/aDir');
				const actual = await readDirFiles(dirPath);
				const expected = [
					'hidden foo\n',
					'I\'m a text file\nfor you to read\n'
				];
				assert.deepStrictEqual(actual, expected);
			}
		);
		it('should filter the files and return their content as is if we don\'t provide a parser',
			async function () {
				const dirPath = path.resolve(__dirname, '../test_assets'); // ab.csv, rows.csv
				const actual = await readDirFiles(dirPath, isCSV);
				const expected = ['a,b\nfoo,1\nbar,2\n', 'foo,1\nbar,2\n'];
				assert.deepStrictEqual(actual, expected);
			}
		);
		it('should filter the files and return no content if no file name passes the predicate',
			async function () {
				const dirPath = path.resolve(__dirname, '../test_assets/aDir');
				const actual = await readDirFiles(dirPath, isCSV);
				const expected = [];
				assert.deepStrictEqual(actual, expected);
			}
		);
		it('should parse the files contents',
			async function () {
				const dirPath = path.resolve(__dirname, '../test_assets'); // ab.csv, rows.csv
				const actual = await readDirFiles(dirPath, isCSV, csvParseRows);
				const expected = [
					[['a', 'b'], ['foo', '1'], ['bar', '2']],
					[['foo', '1'], ['bar', '2']]
				];
				assert.deepStrictEqual(actual, expected);
			}
		);
	});
	describe('readDirFilesIndexed', function () {
		const isCSV = hasAnyExtensionOf(['.csv']);

		describe('file name as key', function () {
			it('should read all the files in `dirPath`',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets/aDir');
					const actual = await readDirFilesIndexed(dirPath);
					const expected = {
						'.foo': 'hidden foo\n',
						'a.txt': 'I\'m a text file\nfor you to read\n'
					};
					assert.deepStrictEqual(actual, expected);
				}
			);
			it('should filter the files and return their content as is if we don\'t provide a parser',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets'); // ab.csv, rows.csv
					const actual = await readDirFilesIndexed(dirPath, isCSV);
					const expected = {
						'ab.csv': 'a,b\nfoo,1\nbar,2\n',
						'rows.csv': 'foo,1\nbar,2\n'
					};
					assert.deepStrictEqual(actual, expected);
				}
			);
			it('should filter the files and return no content if no file name passes the predicate',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets/aDir');
					const actual = await readDirFilesIndexed(dirPath, isCSV, csvParseRows);
					const expected = {};
					assert.deepStrictEqual(actual, expected);
				}
			);

			it('should parse the files contents',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets'); // ab.csv, rows.csv
					const actual = await readDirFilesIndexed(dirPath, isCSV, csvParseRows);
					const expected = {
						'ab.csv': [['a', 'b'], ['foo', '1'], ['bar', '2']],
						'rows.csv': [['foo', '1'], ['bar', '2']]
					};
					assert.deepStrictEqual(actual, expected);
				}
			);
		});

		describe('file path as key', function () {
			it('should read all the files in `dirPath`',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets/aDir');
					const actual = await readDirFilesIndexed(dirPath, null, null, true);
					const expected = {
						[path.join(dirPath, '.foo')]: 'hidden foo\n',
						[path.join(dirPath, 'a.txt')]: 'I\'m a text file\nfor you to read\n'
					};
					assert.deepStrictEqual(actual, expected);
				}
			);
			it('should filter the files and return their content as is if we don\'t provide a parser',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets'); // ab.csv, rows.csv
					const actual = await readDirFilesIndexed(dirPath, isCSV, null, true);
					const expected = {
						[path.join(dirPath, 'ab.csv')]: 'a,b\nfoo,1\nbar,2\n',
						[path.join(dirPath, 'rows.csv')]: 'foo,1\nbar,2\n'
					};
					assert.deepStrictEqual(actual, expected);
				}
			);
			it('should filter the files and return no content if no file name passes the predicate',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets/aDir');
					const actual = await readDirFilesIndexed(
						dirPath,
						isCSV,
						csvParseRows,
						true
					);
					const expected = {};
					assert.deepStrictEqual(actual, expected);
				}
			);

			it('should parse the files contents',
				async function () {
					const dirPath = path.resolve(__dirname, '../test_assets'); // ab.csv, rows.csv
					const actual = await readDirFilesIndexed(
						dirPath,
						isCSV,
						csvParseRows,
						true
					);
					const expected = {
						[path.join(dirPath, 'ab.csv')]: [['a', 'b'], ['foo', '1'], ['bar', '2']],
						[path.join(dirPath, 'rows.csv')]: [['foo', '1'], ['bar', '2']]
					};
					assert.deepStrictEqual(actual, expected);
				}
			);
		});
	});
	describe('readCsv', function () {
		it('should return a promise that reads and then parses a csv file - with header',
			async function () {
				const csvPath = path.resolve(__dirname, '../test_assets', 'ab.csv');
				const conversionFn = ({a, b}) => ({
					a,
					b: Number(b)
				});
				const csv = await readCsv(csvPath, conversionFn);

				const csvParsed = [{a: 'foo', b: 1}, {a: 'bar', b: 2}];
				csvParsed.columns = ['a', 'b'];

				assert.deepStrictEqual(csv, csvParsed);
			}
		);
		it('should return a promise that reads and then parses a csv file - no header',
			async function () {
				const csvPath = path.resolve(__dirname, '../test_assets', 'rows.csv');
				const conversionFn = ([a, b]) => ({
					a,
					b: Number(b)
				});
				const csv = await readCsv(csvPath, conversionFn, false);

				const csvParsed = [{a: 'foo', b: 1}, {a: 'bar', b: 2}];

				assert.deepStrictEqual(csv, csvParsed);
			}
		);
	});
	describe('readDsv', function () {
		it('should return a promise that reads and then parses a csv file - with header',
			async function () {
				const txtPath = path.resolve(__dirname, '../test_assets', 'ab.txt');
				const conversionFn = ({a, b}) => ({
					a,
					b: Number(b)
				});
				const rows = await readDsv(txtPath, ';', conversionFn);

				const rowsParsed = [{a: 'foo', b: 1}, {a: 'bar', b: 2}];
				rowsParsed.columns = ['a', 'b'];

				assert.deepStrictEqual(rows, rowsParsed);
			}
		);
		it('should return a promise that reads and then parses a csv file - no header',
			async function () {
				const txtPath = path.resolve(__dirname, '../test_assets', 'rows.txt');
				const conversionFn = ([a, b]) => ({
					a,
					b: Number(b)
				});
				const rows = await readDsv(txtPath, ';', conversionFn, false);

				const rowsParsed = [{a: 'foo', b: 1}, {a: 'bar', b: 2}];

				assert.deepStrictEqual(rows, rowsParsed);
			}
		);
	});
	describe('readTsv', function () {
		it('should return a promise that reads and then parses a tsv file - with header',
			async function () {
				const tsvPath = path.resolve(__dirname, '../test_assets', 'ab.tsv');
				const conversionFn = ({a, b}) => ({
					a,
					b: Number(b)
				});
				const tsv = await readTsv(tsvPath, conversionFn);

				const tsvParsed = [{a: 'foo', b: 1}, {a: 'bar', b: 2}];
				tsvParsed.columns = ['a', 'b'];

				assert.deepStrictEqual(tsv, tsvParsed);
			}
		);
		it('should return a promise that reads and then parses a csv file - no header',
			async function () {
				const tsvPath = path.resolve(__dirname, '../test_assets', 'rows.tsv');
				const conversionFn = ([a, b]) => ({
					a,
					b: Number(b)
				});
				const tsv = await readTsv(tsvPath, conversionFn, false);

				const tsvParsed = [{a: 'foo', b: 1}, {a: 'bar', b: 2}];

				assert.deepStrictEqual(tsv, tsvParsed);
			}
		);
	});
	describe('readJson', function () {
		it('should return a promise that reads and then parses a JSON file',
			async function () {
				const aPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const a = await readJson(aPath);
				assert.deepStrictEqual(a, {a: 1});

				const bPath = path.resolve(__dirname, '../test_assets', 'b2.json');
				const b = await readJson(bPath);
				assert.deepStrictEqual(b, {b: 2});
			}
		);
	});
	describe('readJsonDir', function () {
		it('should return a promise returning an array of objects of the json files of a directory',
			async function () {
				const dirPath = path.resolve(__dirname, '../test_assets');
				const jsons = await readJsonDir(dirPath);
				assert.deepStrictEqual(jsons, [{a: 1}, {b: 2}, {a: 1, b: 2}]);
			}
		);
	});
	describe('readYaml', function () {
		it('should return a promise that reads and then parses a YAML file',
			async function () {
				const aPath = path.resolve(__dirname, '../test_assets', 'a.yaml');
				const actual = await readYaml(aPath);
				const expected = {
					foo: [{a: 1}, {b: 2}],
					bar: [1, 2, 3],
				}
				assert.deepStrictEqual(actual, expected);
			}
		);
	});
});
