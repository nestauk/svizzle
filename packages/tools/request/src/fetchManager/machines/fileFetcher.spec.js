import {strict as assert} from 'assert';
import {readdirSync} from 'fs';
import path from 'path';
import {fetch} from 'undici';
import {createMachine, interpret, spawn, assign} from 'xstate';

import {fileFetcherConfig} from './fileFetcher.config';
import {fileFetcherOptions} from './fileFetcher.options';

import {
	getFilteredFileNames,
	// getKeysNamed,
	loadJsons,
	makeUris,
	startServer,
	jsonParser
} from '../specUtils';

const TIMEOUT = 20000;
const PORT = 4000;
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson');
const baseUrl = `http://localhost:${PORT}/`;

const fileNames = getFilteredFileNames(readdirSync(baseServerPath));
const allUris = makeUris(baseUrl)(fileNames);

const fileFetcher = createMachine(
	fileFetcherConfig,
	fileFetcherOptions
);

const testMachineConfig = {
	initial: 'Pending',
	context: {},
	states: {
		Pending: {
			entry: 'spawnFetcher',
			on: {
				FILE_CANCELLED: {
					target: 'Done'
				},
				FILE_COMPLETED: {
					target: 'Done'
				},
				FILE_ERRORED: {
					target: 'Done'
				}
			}
		},
		Done: {
			entry: 'verifyResult'
		}
	}
}

describe('fileFetcher', function () {
	// eslint-disable-next-line no-invalid-this
	this.timeout(TIMEOUT);

	const server = startServer({
		port: PORT,
		basePath: baseServerPath
	});
	after(function () {
		server.close()
	});

	it('must download a file correctly', function () {
		return new Promise(resolve => {
			const testMachine = createMachine(testMachineConfig,
				{
					actions: {
						spawnFetcher: assign({
							fetcher: () => spawn(
								fileFetcher.withContext({
									chunks: [],
									done: false,
									myFetch: fetch,
									URI: allUris[0]
								}),
								allUris[0]
							)
						}),
						verifyResult: async (ctx, {type, bytes, URI}) => {
							assert.equal(type, 'FILE_COMPLETED', 'Event type is not `FILE_COMPLETED`.');
							const json = jsonParser(bytes);
							const expectedJsons = await loadJsons(baseServerPath, fileNames, baseUrl);
							assert.deepStrictEqual(
								json,
								expectedJsons[URI],
								'File content is not the same.'
							);
							resolve();
						}
					}
				}
			);
			interpret(testMachine).start();
		});
	});
	it('must error if not found', function () {
		return new Promise(resolve => {
			const testMachine = createMachine(testMachineConfig,
				{
					actions: {
						spawnFetcher: assign({
							fetcher: () => spawn(
								fileFetcher.withContext({
									chunks: [],
									done: false,
									myFetch: fetch,
									URI: `${baseServerPath}doesnt-exist.json`
								}),
								'id'
							)
						}),
						verifyResult: (ctx, {type}) => {
							assert(type === 'FILE_ERRORED', 'To pass the test the fetch must fail.');
							resolve();
						}
					}
				}
			);
			interpret(testMachine).start();
		});
	});
});
