import {strict as assert} from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import nock from 'nock';
import fetch from 'node-fetch';
import {temporaryFile} from 'tempy';

global.fetch = fetch;

import {readFile, readJson, readYaml} from './read.js';
import {
	saveExportedObj,
	saveExportedObjects,
	saveExportedObjPassthrough,
	saveObj,
	saveObjects,
	saveObjPassthrough,
	saveResponse,
	saveYaml,
	saveYamlPassthrough,
} from './write.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// assets/multi.json, indent = 4
const multiIndented4 = `{
    "a": 1,
    "b": 2
}`;
// assets/multi.json, indent = tab
const multiIndentedTab = `{
	"a": 1,
	"b": 2
}`;

describe('write', function () {
	describe('saveObj', function () {
		it('should return a function that expects an object and returns a promise that writes to the provided filepath',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				await readJson(jsonPath).then(saveObj(tmpFilepath));
				const writtenJson = await readJson(tmpFilepath);

				assert.deepStrictEqual(writtenJson, {a: 1});
			}
		);
		it('should return a function that expects an object and returns a promise that writes to the provided filepath with indentation = 4',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'multi.json');
				const tmpFilepath = temporaryFile();

				await readJson(jsonPath).then(saveObj(tmpFilepath, 4));
				const writtenJsonString = fs.readFileSync(tmpFilepath, 'utf8');

				assert.deepStrictEqual(writtenJsonString, multiIndented4);
			}
		);
		it('should return a function that expects an object and returns a promise that writes to the provided filepath with indentation = tab',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'multi.json');
				const tmpFilepath = temporaryFile();

				await readJson(jsonPath).then(saveObj(tmpFilepath, '\t'));
				const writtenJsonString = fs.readFileSync(tmpFilepath, 'utf8');

				assert.deepStrictEqual(writtenJsonString, multiIndentedTab);
			}
		);
	});
	describe('saveObjPassthrough', function () {
		it('should return a function that expects an object and returns a promise that writes to the provided filepath and then returns the object',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				const returnedJson =
					await readJson(jsonPath)
					.then(saveObjPassthrough(tmpFilepath));

				const writtenJson = await readJson(tmpFilepath);

				assert.deepStrictEqual(returnedJson, {a: 1});
				assert.deepStrictEqual(writtenJson, {a: 1});
			}
		);
		it('should return a function that expects an object and returns a promise that writes to the provided filepath with indentation = 4 and then returns the object',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'multi.json');
				const tmpFilepath = temporaryFile();

				const returnedJson =
					await readJson(jsonPath)
					.then(saveObjPassthrough(tmpFilepath, 4));

				const writtenJsonString = fs.readFileSync(tmpFilepath, 'utf8');

				assert.deepStrictEqual(returnedJson, {a: 1, b: 2});
				assert.deepStrictEqual(writtenJsonString, multiIndented4);
			}
		);
		it('should return a function that expects an object and returns a promise that writes to the provided filepath with indentation = tab and then returns the object',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'multi.json');
				const tmpFilepath = temporaryFile();

				const returnedJson =
					await readJson(jsonPath)
					.then(saveObjPassthrough(tmpFilepath, '\t'));

				const writtenJsonString = fs.readFileSync(tmpFilepath, 'utf8');

				assert.deepStrictEqual(returnedJson, {a: 1, b: 2});
				assert.deepStrictEqual(writtenJsonString, multiIndentedTab);
			}
		);
	});
	describe('saveObjects', function () {
		it('should return a promise that resolves when all the provided objects have been written in the correspondent file paths, each with the provided indentation',
			async function () {
				const object1 = {a: 1};
				const object2 = {b: 2};
				const tmpFilepath1 = temporaryFile({name: 'string1.js'});
				const tmpFilepath2 = temporaryFile({name: 'string2.js'});

				await saveObjects([
					{
						object: object1,
						filepath: tmpFilepath1
					},
					{
						object: object2,
						filepath: tmpFilepath2,
						indentation: '\t'
					},
				]);
				const string1 = await readFile(tmpFilepath1, 'utf-8');
				const string2 = await readFile(tmpFilepath2, 'utf-8');

				assert.deepStrictEqual(string1, '{"a":1}');
				assert.deepStrictEqual(string2, '{\n\t"b": 2\n}');
			}
		);
	});
	describe('saveResponse', function () {
		it('should return a function that expects a response and returns a promise that saves the response body to the provided filepath',
			async function () {
				const tmpFilepath = temporaryFile();
				const obj = {a: 1, b: 2};

				nock('http://this.test')
				.get('/json')
				.reply(200, obj);

				await fetch('http://this.test/json').then(saveResponse(tmpFilepath));

				const writtenJson = await readJson(tmpFilepath);

				assert.deepStrictEqual(writtenJson, obj);
			}
		);
	});
	describe('saveYaml', function () {
		it('should return a function that expects an object and returns a promise that writes to the provided YAML filepath',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				await readJson(jsonPath).then(saveYaml(tmpFilepath));
				const writtenYaml = await readYaml(tmpFilepath);

				assert.deepStrictEqual(writtenYaml, {a: 1});
			}
		);
	});
	describe('saveYamlPassthrough', function () {
		it('should return a function that expects an object and returns a promise that writes to the provided YAML filepath and returns the object',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				const returnedYamlAsJson =
					await readJson(jsonPath)
					.then(saveYamlPassthrough(tmpFilepath));

				const writtenYamlObject = await readYaml(tmpFilepath);

				assert.deepStrictEqual(returnedYamlAsJson, {a: 1});
				assert.deepStrictEqual(writtenYamlObject, {a: 1});
			}
		);
	});
	describe('saveExportedObj', function () {
		it('should return a function that expects an object and returns a promise that writes the input object as an exported object in a javascript file to the provided filepath',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				await readJson(jsonPath).then(saveExportedObj(tmpFilepath));
				const jsFile = await readFile(tmpFilepath, 'utf-8');

				assert.deepStrictEqual(jsFile, 'export default {"a":1}\n');
			}
		);
		it('should return a function that expects an object and returns a promise that writes the input object as an exported object in a javascript file to the provided filepath with indentation = 4',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				await readJson(jsonPath).then(saveExportedObj(tmpFilepath, 4));
				const jsFile = await readFile(tmpFilepath, 'utf8');

				assert.deepStrictEqual(jsFile, 'export default {\n    "a": 1\n}\n');
			}
		);
		it('should return a function that expects an object and returns a promise that writes the input object as an exported object in a javascript file to the provided filepath with indentation = tab',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				await readJson(jsonPath).then(saveExportedObj(tmpFilepath, '\t'));
				const jsFile = await readFile(tmpFilepath, 'utf8');

				assert.deepStrictEqual(jsFile, 'export default {\n\t"a": 1\n}\n');
			}
		);
	});
	describe('saveExportedObjPassthrough', function () {
		it('should return a function that expects an object and returns a promise that writes the input object as an exported object in a javascript file to the provided filepath and returns the object',
			async function () {
				const jsonPath = path.resolve(__dirname, '../test_assets', 'a1.json');
				const tmpFilepath = temporaryFile();

				const returnedObject =
					await readJson(jsonPath)
					.then(saveExportedObjPassthrough(tmpFilepath));

				const jsFile = await readFile(tmpFilepath, 'utf8');

				assert.deepStrictEqual(returnedObject, {a: 1});
				assert.deepStrictEqual(jsFile, 'export default {"a":1}\n');
			}
		);
	});
	describe('saveExportedObjects', function () {
		it('should return a promise that resolves when all the provided objects have been written as javascript files in the correspondent file paths, each with the provided indentation',
			async function () {
				const object1 = {a: 1};
				const object2 = {b: 2};
				const tmpFilepath1 = temporaryFile({name: 'string1.js'});
				const tmpFilepath2 = temporaryFile({name: 'string2.js'});

				await saveExportedObjects([
					{
						object: object1,
						filepath: tmpFilepath1
					},
					{
						object: object2,
						filepath: tmpFilepath2,
						indentation: '\t'
					},
				]);
				const string1 = await readFile(tmpFilepath1, 'utf-8');
				const string2 = await readFile(tmpFilepath2, 'utf-8');

				assert.deepStrictEqual(string1, 'export default {"a":1}\n');
				assert.deepStrictEqual(string2, 'export default {\n\t"b": 2\n}\n');
			}
		);
	});
});
