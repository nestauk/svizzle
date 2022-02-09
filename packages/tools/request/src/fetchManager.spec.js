import {tapValue} from '@svizzle/dev';
import {isKeyValue} from '@svizzle/utils';
import {strict as assert} from 'assert';
import {readdirSync} from 'fs';
import path from 'path';

import * as _ from 'lamb';
import {
	filter,
	skipWhile,
	tap,
} from 'rxjs/operators';
import {fetch} from 'undici';

import {makeFetchManager} from './fetchManager';
import {
	getFilteredFileNames,
	getKeysNamed,
	jsonParser,
	loadJsons,
	makeUris,
	startServer,
} from './fetchManager.utils';
import {makeWebStreamsFetcher} from './webstreams';

// TODO verify we catch all potential exceptions

// test environment
const TIMEOUT = 20000;
const PORT = 4000;
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson');
const baseUrl = `http://localhost:${PORT}/`;

const fileNames = getFilteredFileNames(readdirSync(baseServerPath));
const allUris = makeUris(baseUrl)(fileNames);
const urisFrom2021 = getKeysNamed('2021')(allUris);
const urisFrom2016 = getKeysNamed('2016')(allUris);
const urisFrom2013 = getKeysNamed('2013')(allUris);

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

	describe('`_allUris` property', function () {
		it('the content of the downloaded files should be the same as served resources', function () {
			const downloadFn = makeWebStreamsFetcher(fetch);
			const {
				_allUris,
				_asapUris,
				_nextUris,
				_outData,
				_outEvents,
				_shouldPrefetch,
				_transformer,
			} = makeFetchManager(downloadFn);

			_shouldPrefetch.next(true);
			_transformer.next(jsonParser);
			_allUris.next(allUris);
			_asapUris.next(urisFrom2021);
			_nextUris.next(urisFrom2013);

			return new Promise((resolve, reject) => {
				_outEvents.pipe(
					filter(event => event.type === 'cycle:done')
				).subscribe(async () => {
					const data = _outData.getValue()
					try {
						const expectedJsons = await loadJsons(baseServerPath, fileNames, baseUrl);
						assert.deepStrictEqual(data, expectedJsons);
					} catch (e) {
						reject(e);
					}
					resolve();
				});
			});
		});
		describe('change while in progress: should only keep new URIs in cache if previously downloaded', function () {
			it('old URIs !== new URIs', function () {
				const downloadFn = makeWebStreamsFetcher(fetch);
				const {
					_allUris,
					_asapUris,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_transformer,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true);
				_transformer.next(jsonParser);
				_allUris.next(urisFrom2021);
				_asapUris.next(urisFrom2021);

				return new Promise((resolve, reject) => {
					let switchedMap;
					let totalCompleted = 0;

					/*
					_outEvents.pipe(
						filter(_.not(isKeyValue(['type','file:completed'])))
					).subscribe(console.log);
					*/

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:completed']))
					).subscribe(() => {
						totalCompleted++;
						// switch after downloading more than half
						if (!switchedMap && totalCompleted > urisFrom2021.length / 2) {
							_allUris.next(urisFrom2016);
							_asapUris.next(urisFrom2016);
							switchedMap = true;
						}
					});
					_outEvents.pipe(
						filter(isKeyValue(['type','cycle:done'])),
					).subscribe(() => {
						const actualUris = _.keys(_outData.getValue());
						try {
							assert.deepStrictEqual(
								actualUris.sort(),
								urisFrom2016.sort()
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					});
				});
			});
			it('old URIs included in new URIs', function () {
				const downloadFn = makeWebStreamsFetcher(fetch);
				const {
					_allUris,
					_asapUris,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_transformer,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true);
				_transformer.next(jsonParser);
				_allUris.next(urisFrom2021);
				_asapUris.next(urisFrom2021);

				const combinedUris = _.union(
					urisFrom2021,
					urisFrom2016
				);

				return new Promise((resolve, reject) => {
					let switchedMap;
					let totalCompleted = 0;

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:completed']))
					).subscribe(() => {
						totalCompleted++;
						// switch after downloading more than half
						if (!switchedMap && totalCompleted > urisFrom2021.length / 2) {
							_allUris.next(combinedUris);
							_asapUris.next(combinedUris);
							switchedMap = true;
						}
					})
					_outEvents.pipe(
						filter(isKeyValue(['type','cycle:done'])),
					).subscribe(() => {
						const actualUris = _.keys(_outData.getValue());
						try {
							assert.deepStrictEqual(
								actualUris.sort(),
								combinedUris.sort()
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					});
				});
			});
		});
	});

	describe('`_shouldPrefecth` property', function () {
		it('false: it should only load files in `asapKeys`', function () {
			const downloadFn = makeWebStreamsFetcher(fetch);
			const {
				_allUris,
				_asapUris,
				_nextUris,
				_outData,
				_outEvents,
				_shouldPrefetch,
			} = makeFetchManager(downloadFn);

			_shouldPrefetch.next(false); // keep? it's the default value
			_allUris.next(allUris);
			_asapUris.next(urisFrom2021);
			_nextUris.next(urisFrom2016);

			return new Promise((resolve, reject) => {
				_outEvents.pipe(
					filter(event => event.type === 'cycle:done')
				).subscribe(() => {
					const data = _outData.getValue();
					const keys = _.keys(data);
					try {
						assert.deepStrictEqual(
							keys.sort(),
							urisFrom2021.sort()
						);
					} catch (e) {
						reject(e);
					}
					resolve();
				});
			});
		});
		it('true: it should load all files', function () {
			const downloadFn = makeWebStreamsFetcher(fetch);
			const {
				_allUris,
				_asapUris,
				_nextUris,
				_outData,
				_outEvents,
				_shouldPrefetch,
			} = makeFetchManager(downloadFn);

			_shouldPrefetch.next(true); // keep? it's the default value
			_allUris.next(allUris);
			_asapUris.next(urisFrom2021);
			_nextUris.next(urisFrom2016);

			return new Promise((resolve, reject) => {
				_outEvents.pipe(
					filter(event => event.type === 'cycle:done')
				).subscribe(() => {
					const data = _outData.getValue();
					const keys = _.keys(data);
					try {
						assert.deepStrictEqual(
							keys.sort(),
							allUris.sort()
						)
					} catch (e) {
						reject(e);
					}
					resolve();
				});
			});
		});
		describe('change while in progress', function () {
			it('true -> false while asap in progress: should complete and stop', function () {
				const downloadFn = makeWebStreamsFetcher(fetch)
				const {
					_allUris,
					_asapUris,
					_nextUris,
					_outData,
					_outEvents,
					_shouldPrefetch,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true); // keep? it's the default value
				_allUris.next(allUris);
				_asapUris.next(urisFrom2021);
				_nextUris.next(urisFrom2016);

				return new Promise((resolve, reject) => {
					let turnedItOff;

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:completed']))
					).subscribe(() => {
						if (!turnedItOff) {
							_shouldPrefetch.next(false)
							turnedItOff = true
						}
					})

					_outEvents.pipe(
						filter(isKeyValue(['type', 'cycle:done']))
					).subscribe(() => {
						const data = _outData.getValue()
						const keys = _.keys(data)
						try {
							assert.deepStrictEqual(
								keys.sort(),
								urisFrom2021.sort()
							)
						} catch (e) {
							reject(e)
						}
						resolve()
					})
				})
			})
			/*
			it('true -> false after asap: should stop', function () {
				const downloadFn = makeWebStreamsFetcher(fetch)
				const {
					_allUris,
					_asapUris,
					_nextUris,
					_outData,
					_outEvents,
					_shouldPrefetch,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true); // keep? it's the default value
				_allUris.next(allUris);
				_asapUris.next(urisFrom2021);
				_nextUris.next(urisFrom2016);

				return new Promise((resolve, reject) => {
					let hasNextStarted
					let turnedItOff

					_outEvents.pipe(
						filter(_.not(isKeyValue(['type','file:completed'])))
					).subscribe(console.log);

					_outEvents.pipe(
						filter(isKeyValue(['type', 'group:completed']))
					).subscribe(() => {
						if (!hasNextStarted) {
							hasNextStarted = true
						}
					})

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:completed']))
					).subscribe(() => {
						if (hasNextStarted && !turnedItOff) {
							_shouldPrefetch.next(false)
							turnedItOff = true
						}
					})

					_outEvents.pipe(
						filter(isKeyValue(['type', 'cycle:done']))
					).subscribe(() => {
						const data = _outData.getValue()
						const keys = _.keys(data)
						try {
							assert(
								_.is(
									_.intersection(keys, urisFrom2021).length,
									urisFrom2021.length
								)
							)
						} catch (e) {
							reject(e)
						}
						resolve()
					})
				})
			})
			it('false -> true while asap in progress: should continue', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
				const {
					_asapKeys,
					_nextKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = makeFetchManager(downloadFn)

				_shouldPrefetch.next(false)
				_uriMap.next(uriMap)
				_asapKeys.next(keysFrom2021)
				_nextKeys.next(keysFrom2016)

				return new Promise((resolve, reject) => {
					let turnedItOn
					_outEvents.pipe(
						// tap(console.log),
						filter(isKeyValue(['type', 'complete']))
					).subscribe(() => {
						if (!turnedItOn) {
							_shouldPrefetch.next(true)
							turnedItOn = true
						}
					})

					_outEvents.pipe(
						filter(isKeyValue(['type', 'done']))
					).subscribe(() => {
						const data = _outData.getValue()
						const keys = _.keys(data)
						try {
							assert.deepStrictEqual(
								keys.sort(),
								allKeys.sort()
							)
						} catch (e) {
							reject(e)
						}
						resolve()
					})
				})
			})
			it('false -> true after asap: should restart, skipping asap and download everything else', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
				const {
					_asapKeys,
					_nextKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = makeFetchManager(downloadFn)

				_shouldPrefetch.next(false)
				_uriMap.next(uriMap)
				_asapKeys.next(keysFrom2021)
				_nextKeys.next(keysFrom2016)

				return new Promise((resolve, reject) => {
					let turnedItOn

					_outEvents.pipe(
						// tap(console.log),
						filter(isKeyValue(['type', 'done']))
					).subscribe(() => {
						if (!turnedItOn) {
							turnedItOn = true
							_shouldPrefetch.next(true)
						} else {
							const data = _outData.getValue()
							const keys = _.keys(data)
							try {
								assert(
									_.is(
										_.intersection(keys, keysFrom2021).length,
										keysFrom2021.length
									)
								)
							} catch (e) {
								reject(e)
							}
							resolve()
						}
					})
				})
			})
			*/
		})
	})

	describe('priority properties (`_asapKeys` and `_nextKeys`)', function () {
		const asapUris = urisFrom2021
		const nextUris = urisFrom2016
		const restUris = _.difference(
			allUris,
			[...asapUris, ...nextUris]
		)
		describe('static', function () {
			it('should load all files in correct order (`_asapUris` then `_nextUris` then `_restKeys`)', function () {
				const downloadFn = makeWebStreamsFetcher(fetch);
				const {
					_allUris,
					_asapUris,
					_nextUris,
					_outEvents,
					_shouldPrefetch,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true);
				_allUris.next(allUris);
				_asapUris.next(asapUris);
				_nextUris.next(nextUris);

				return new Promise(resolve => {
					let groups = [];
					let activeGroup;
					let urisForGroup = {};

					_outEvents.pipe(
						// filter(event => event.type === 'groupStart'),
						filter(isKeyValue(['type','group:started']))
						// filter(_.hasKeyValue('type','groupStart')) // TODO TBD deprecation
					).subscribe(({groupId}) => {
						groups.push(groupId)
						activeGroup = groupId
						urisForGroup[activeGroup] = []
					});
					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:completed']))
					).subscribe(({uri}) => {
						urisForGroup[activeGroup].push(uri)
					});
					_outEvents.pipe(
						filter(isKeyValue(['type', 'cycle:done']))
					).subscribe(() => {
						assert.deepStrictEqual(
							groups,
							['asap', 'next', 'rest'],
							'Groups loaded out of order'
						);
						assert.deepStrictEqual(
							urisForGroup.asap.sort(),
							asapUris.sort(),
							'Asap not equal'
						);
						assert.deepStrictEqual(
							urisForGroup.next.sort(),
							nextUris.sort(),
							'Next not equal'
						);
						assert.deepStrictEqual(
							urisForGroup.rest.sort(),
							restUris.sort(),
							'Rest not equal'
						);
						resolve();
					});
				});
			});
		});
		/*
		describe('caching', function () {
			it(`should not redownload cached files`, function () {
				const downloadFn = makeWebStreamsFetcher(fetch);
				const {
					_allUris,
					_asapUris,
					_nextUris,
					_outEvents,
					_shouldPrefetch
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true);
				_allUris.next(allUris);
				_asapUris.next(asapUris);
				_nextUris.next(asapUris);

				return new Promise((resolve, reject) => {
					_outEvents.pipe(
						filter(isKeyValue(['type', 'group:completed'])),
						filter(isKeyValue(['groupId', 'next'])),
					).subscribe(({keys: uris}) => {
						try {
							assert(uris.length > 0, 'No uris should be requested on \'next\' group')
						} catch (e) {
							reject(e)
						}
					})

					_outEvents.pipe(
						filter(isKeyValue(['type', 'cycle:done'])),
					).subscribe(() => {
						resolve()
					})
				})
			})
		})
		*/
		describe('priority change', function () {
			it('while downloading `_asapUris` those remaining in `_asapUris` should continue downloading', function () {
				const downloadFn = makeWebStreamsFetcher(fetch);
				const {
					_allUris,
					_asapUris,
					_nextUris,
					_outEvents,
					_shouldPrefetch,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true);
				_allUris.next(allUris);
				_asapUris.next(asapUris);
				_nextUris.next(nextUris);

				return new Promise((resolve, reject) => {
					let newAsap;

					_outEvents.pipe(
						// tap(console.log),
						filter(event => event.type === 'file:completed')
					).subscribe(({uri}) => {
						if (!newAsap) {
							newAsap = _.difference(
								asapUris,
								[uri]
							);
							_asapUris.next(newAsap);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:aborted')
					).subscribe(({uri}) => {
						try {
							assert(!_.isIn(asapUris, uri));
						} catch (e) {
							reject(e);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'cycle:done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			/*
			it('while downloading `_asapKeys` those not remaining in `_asapKeys` should be aborted', function () {
				const downloadFn = makeWebStreamsFetcher(fetch);
				const {
					_allUris,
					_asapUris,
					_nextUris,
					_outEvents,
					_shouldPrefetch,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true);
				_allUris.next(allUris);
				_asapUris.next(asapUris);
				_nextUris.next(nextUris);

				return new Promise((resolve, reject) => {
					let newAsap;
					const filesCompleted = [];

					_outEvents.pipe(
						filter(event => event.type === 'file:completed')
					).subscribe(({uri}) => {
						filesCompleted.push(uri);
						if (!newAsap) {
							newAsap = nextUris
							// Swapping keys to trigger restart
							_asapUris.next(newAsap)
							_nextUris.next(asapUris)
						}
					})
					_outEvents.pipe(
						filter(({type}) => type === 'group:completed'),
						filter(({groupId}) => groupId === 'asap')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							asapUris,
							filesCompleted
						);
						try {
							assert.deepStrictEqual(
								expectedAbortedFiles.sort(),
								abortedKeys.sort()
							);
						} catch (e) {
							reject(e);
						}
					});

					_outEvents.pipe(
						filter(event => event.type === 'cycle:done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			*/
			it('while downloading `_nextUris` those moving to `_asapUris` should continue downloading', function () {
				const downloadFn = makeWebStreamsFetcher(fetch);
				const {
					_allUris,
					_asapUris,
					_nextUris,
					_outEvents,
					_shouldPrefetch,
				} = makeFetchManager(downloadFn);

				_shouldPrefetch.next(true);
				_allUris.next(allUris);
				_asapUris.next(asapUris);
				_nextUris.next(nextUris);

				return new Promise((resolve, reject) => {
					let nextStarted = false;
					let newAsap;

					_outEvents.pipe(
						filter(({type}) => type === 'group:started'),
						filter(({groupId}) => groupId === 'next')
					).subscribe(() => {
						nextStarted = true;
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:completed')
					).subscribe(({uri}) => {
						if (nextStarted && !newAsap) {
							newAsap = _.difference(
								nextUris,
								[uri]
							);
							_asapUris.next(newAsap);
							_nextUris.next(asapUris);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:aborted')
					).subscribe(({uri}) => {
						try {
							assert(!_.isIn(newAsap, uri));
						} catch (e) {
							reject(e);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'cycle:done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			/*
			it('while downloading `_nextKeys` those not moving to `_asapKeys` should be aborted', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = makeFetchManager(downloadFn)

				_shouldPrefetch.next(true)
				_uriMap.next(uriMap)
				_asapKeys.next(asapKeys)
				_nextKeys.next(nextKeys)

				return new Promise((resolve, reject) => {
					let nextStarted = false
					let newAsap
					const filesCompleted = []

					_outEvents.pipe(
//						tap(console.log),
						filter(({type}) => type === 'groupStart'),
						filter(({groupId}) => groupId === 'next')
					).subscribe(() => {
						nextStarted = true
					})
					_outEvents.pipe(
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						filesCompleted.push(key)
						if (nextStarted && !newAsap) {
							newAsap = keysFrom2013
							_asapKeys.next(newAsap)
						}
					})
					_outEvents.pipe(
						filter(({type}) => type === 'groupCompleted'),
						filter(({groupId}) => groupId === 'next')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							nextKeys,
							filesCompleted
						)
						try {
							assert.deepStrictEqual(
								expectedAbortedFiles.sort(),
								abortedKeys.sort()
							)
						} catch (e) {
							reject(e)
						}
					})
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve()
					})
				})
			})
			it('while downloading `_restKeys` those moving to `_asapKeys` should continue downloading', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = makeFetchManager(downloadFn)

				_shouldPrefetch.next(true)
				_uriMap.next(uriMap)
				_asapKeys.next(asapKeys)
				_nextKeys.next(nextKeys)

				return new Promise((resolve, reject) => {
					let nextStarted = false
					let newAsap

					_outEvents.pipe(
						// tap(console.log),
						filter(({type}) => type === 'groupStart'),
						filter(({groupId}) => groupId === 'rest')
					).subscribe(() => {
						nextStarted = true
					})
					_outEvents.pipe(
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						if (nextStarted && !newAsap) {
							newAsap = _.difference(
								restKeys,
								[key]
							)
							_asapKeys.next(newAsap)
						}
					})
					_outEvents.pipe(
						filter(event => event.type === 'abort')
					).subscribe(({key}) => {
						try {
							assert(!_.isIn(newAsap, key))
						} catch (e) {
							reject(e)
						}
					})
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve()
					})
				})
			})
			it('while downloading `_restKeys` those not moving to `_asapKeys` should be aborted', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = makeFetchManager(downloadFn)

				_shouldPrefetch.next(true)
				_uriMap.next(uriMap)
				_asapKeys.next(asapKeys)
				_nextKeys.next(nextKeys)

				return new Promise((resolve, reject) => {
					let restStarted = false
					let newAsap
					const filesCompleted = []

					_outEvents.pipe(
						// tap(console.log),
						filter(({type}) => type === 'groupStart'),
						filter(({groupId}) => groupId === 'rest')
					).subscribe(() => {
						restStarted = true
					})
					_outEvents.pipe(
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						filesCompleted.push(key)
						if (restStarted && !newAsap) {
							newAsap = keysFrom2016
							_asapKeys.next(newAsap)
							_nextKeys.next(keysFrom2013)
						}
					})
					_outEvents.pipe(
						filter(({type}) => type === 'groupCompleted'),
						filter(({groupId}) => groupId === 'rest')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							nextKeys,
							filesCompleted,
							newAsap
						)
						try {
							assert.deepStrictEqual(
								expectedAbortedFiles.sort(),
								abortedKeys.sort()
							)
						} catch (e) {
							reject(e)
						}
					})
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve()
					})
				})
			})
			*/
		});
	});
});
