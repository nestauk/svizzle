import {strict as assert} from 'assert';
import {readdirSync} from 'fs';
import path from 'path';
import * as _ from 'lamb';
import {debounceTime} from 'rxjs/operators';
import {fetch} from 'undici';

import {createFetchManager} from './fetchManager';

import {
	getFilteredFileNames,
	getKeysNamed,
	loadJsonsSync,
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

const URIsFrom2021 = getKeysNamed('2021')(URIs);
const URIsFrom2016 = getKeysNamed('2016')(URIs);
const URIsFrom2013 = getKeysNamed('2013')(URIs);

const allJsons = loadJsonsSync(
	baseServerPath,
	fileNames,
	baseUrl
);

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
							// console.log('done', cacheCount)
							const expectedJsons = allJsons;
							assert.deepStrictEqual(
								cache,
								expectedJsons,
								'File contents are not equal'
							);
							resolve();
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

		it('change while in progress: should clear the cache and restart downloading', function () {
			return new Promise(resolve => {
				const firstURIs = URIsFrom2021;
				const secondURIs = URIsFrom2016;

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

				let cache = {};
				let hasChangedURIs = false;
				_data.pipe(
					// debouncing so that `service.send` is
					// not executed inside action
					debounceTime(0)
				).subscribe(data => {
					cache = data;
					const cacheCount = _.keys(cache).length;
					if (cacheCount > firstURIs.length / 2 && !hasChangedURIs) {
						hasChangedURIs = true;
						// console.log('switching URIs')
						// from(service).subscribe(state => console.log(state));
						service.send({
							type: 'PRIORITY_CHANGED',
							URIs: secondURIs,
							priorities: {
								asapURIs: secondURIs,
								nextURIs: []
							}
						});
					}
				});
				_loadingURIs.pipe(
					debounceTime(0)
				).subscribe(
					loadingURIs => {
						const loadingCount = loadingURIs.length;
						const loadedURIs = _.keys(cache);

						if (_.difference(secondURIs, loadedURIs).length === 0 && loadingCount === 0) {
							// console.log('done', loadedURIs)
							const expectedJsons = _.pickIn(allJsons, secondURIs);
							// console.log('comparing', expectedJsons)
							// console.log('comparing', cache)
							assert.deepStrictEqual(
								cache,
								expectedJsons,
								'File contents are not equal'
							);
							resolve();
						}
					}
				);
				service.send({
					type: 'PRIORITY_CHANGED',
					URIs: firstURIs,
					priorities: {
						asapURIs: firstURIs,
						nextURIs: []
					}
				});
			});
		});
	});
});
