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
// import { from } from 'rxjs';

const TIMEOUT = 30000;
const PORT = 4001;
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson');
const baseUrl = `http://localhost:${PORT}/`;

const fileNames = getFilteredFileNames(readdirSync(baseServerPath));
const allUris = makeUris(baseUrl)(fileNames);

describe('fetchManager', function () {
	// eslint-disable-next-line no-invalid-this
	this.timeout(TIMEOUT);

	const server = startServer({
		port: PORT,
		basePath: baseServerPath
	});
	after(function () {
		server.close()
	});

	it('must download all files correctly', function () {
		return new Promise(resolve => {
			const {
				contextStreams:{
					outputs: {
						_data,
						_loadingURIs
					}
				},
				service
			} = createFetchManager();
			let cache = {};
			_data.subscribe(data => {
				cache = data;
			});
			_loadingURIs.subscribe(
				loadingURIs => {
					const loadingCount = loadingURIs.length
					const cacheCount = _.keys(cache).length

					if (cacheCount > 1 && loadingCount === 0) {
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
						})
					}
				}
			);
			service.send({
				type: 'FETCH_CHANGED',
				fetchFunction: fetch,
			});
			service.send({
				type: 'TRANSFORMER_CHANGED',
				transformer: jsonParser
			});
			service.send({
				type: 'PRIORITY_CHANGED',
				URIs: allUris,
				priorities: {
					asapURIs: allUris,
					nextURIs: []
				}
			});
		});
	});
});
