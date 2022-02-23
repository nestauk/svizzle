import {strict as assert} from 'assert';
import {readdirSync} from 'fs';
import path from 'path';
import * as _ from 'lamb';

import {fetch} from 'undici';

import {createFetchManager} from './fetchManager';

import {
	getFilteredFileNames,
	// getKeysNamed,
	loadJsons,
	makeUris,
	startServer,
	jsonParser
} from '../specUtils';
// import {from} from 'rxjs';

const TIMEOUT = 20000;
const PORT = 4001;
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson');
const baseUrl = `http://localhost:${PORT}/`;

const fileNames = getFilteredFileNames(readdirSync(baseServerPath));
const URIs = makeUris(baseUrl)(fileNames);

describe('Fetch Manager Machine', function () {
	// eslint-disable-next-line no-invalid-this
	this.timeout(TIMEOUT);

	const server = startServer({
		port: PORT,
		basePath: baseServerPath
	});
	after(function () {
		server.close()
	});

	describe('URIs property', function () {
		it('the content of the downloaded files should be the same as served resources', function () {
			return new Promise(resolve => {
				const {
					contextStreams:{
						outputs: {
							_data,
							_loadingURIs
						}
					},
					service
				} = createFetchManager({
					fetchFunction: fetch,
					transformer: jsonParser
				});

				/*
				// Not replacing the working code for this as it still needs to
				// count keys in the cache to know if it has finished downloading.
				// It would be useful to have a definite signal that the entire
				// process is completed so that results validation can begin.
				const _eventStream = from(service);
				_eventStream.subscribe(ctx => console.log(ctx.event));
				*/
				let cache = {};
				_data.subscribe(data => {
					cache = data;
				});
				_loadingURIs.subscribe(
					loadingURIs => {
						const loadingCount = loadingURIs.length;
						const cacheCount = _.keys(cache).length;

						if (cacheCount > 0 && loadingCount === 0) {
							loadJsons(
								baseServerPath,
								fileNames,
								baseUrl
							).then(expectedJsons => {
								assert.deepStrictEqual(
									cache,
									expectedJsons,
									'File contents are not equal'
								);
								resolve();
							});
						}
					}
				);
				service.send({
					type: 'PRIORITY_CHANGED',
					URIs,
					priorities: {
						asapURIs: URIs,
						nextURIs: []
					}
				});
			});
		});
	});
});
