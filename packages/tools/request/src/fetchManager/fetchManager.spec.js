import {strict as assert} from 'assert';
import {readdirSync} from 'fs';
import path from 'path';

import {isKeyValue, jsonBufferToAny} from '@svizzle/utils';
import * as _ from 'lamb';
import {filter,tap} from 'rxjs/operators';
import {fetch} from 'undici';

import {makeWebStreamsFetcher} from '../webstreams';
import {createFetchManagerStreams} from './fetchManager';
import {
	getFileNamesMap,
	getKeysNamed,
	loadJsons,
	makeUriMap,
	startServer,
} from './specUtils';

// TODO verify we catch all potential exceptions

// test environment
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson');
const TIMEOUT = 20000;
const PORT = 4000;

const fileNamesMap = getFileNamesMap(readdirSync(baseServerPath));
const uriMap = makeUriMap(`http://localhost:${PORT}/`)(fileNamesMap);
const allKeys = _.keys(uriMap);
const keysFrom2021 = getKeysNamed('2021')(allKeys);
const keysFrom2016 = getKeysNamed('2016')(allKeys);
const keysFrom2013 = getKeysNamed('2013')(allKeys);

/*
TODO

- {fetchUpTo: undefined, ...} -> idle
- {fetchUpTo: 'end'} -> all
- {asapKeys: ['a'], nextKeys: [..], fetchUpTo: 'asapKeys'}
- {asapKeys: ['a'], nextKeys: [..], fetchUpTo: 'nextKeys'}
- {asapKeys: ['a'], nextKeys: [..], fetchUpTo: 'end'}
- {asapKeys: ['a'], fetchUpTo: 'end'}

*/

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

	describe('`_uriMap` property', function () {
		it('the content of the downloaded files should be the same as served resources', function () {
			const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
			const {
				_asapKeys,
				_outData,
				_outEvents,
				_uriMap
			} = createFetchManagerStreams(downloadFn);

			_uriMap.next(uriMap);
			_asapKeys.next(allKeys);

			return new Promise((resolve, reject) => {
				_outEvents.pipe(
					filter(event => event.type === 'done')
				).subscribe(async () => {
					const data = _outData.getValue();
					try {
						const expectedJsons = await loadJsons(baseServerPath, allKeys, fileNamesMap);
						assert.deepStrictEqual(data, expectedJsons);
					} catch (e) {
						reject(e);
					}
					resolve();
				})
			})
		});
		describe('change while in progress: should clear the cache and restart downloading', function () {
			it('!= keys, != URIs', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(_.pickIn(uriMap, keysFrom2021));
				_asapKeys.next(keysFrom2021);

				return new Promise((resolve, reject) => {
					let switchedMap;
					let totalCompleted = 0;

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:complete']))
					).subscribe(() => {
						totalCompleted++
						// switch after downloading more than half
						if (!switchedMap && totalCompleted > keysFrom2021.length / 2) {
							_uriMap.next(_.pickIn(uriMap, keysFrom2016));
							_asapKeys.next(keysFrom2016);
							switchedMap = true;
						}
					});
					_outEvents.pipe(
						filter(isKeyValue(['type','done']))
					).subscribe(() => {
						const actualKeys = _.keys(_outData.getValue());
						try {
							assert.deepStrictEqual(
								actualKeys.sort(),
								keysFrom2016.sort()
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					})
				})
			})
			it('= keys, != URIs', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(_.pickIn(uriMap, keysFrom2021));
				_asapKeys.next(keysFrom2021);

				return new Promise((resolve, reject) => {
					let switchedMap;
					let totalCompleted = 0;

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:complete']))
					).subscribe(() => {
						totalCompleted++;
						// switch after downloading more than half
						if (!switchedMap && totalCompleted > keysFrom2021.length / 2) {
							const newMap = _.pipe([
								_.pick(keysFrom2016),
								_.pairs,
								_.mapWith(([key, uri]) => [
									key.replace('2016', '2021'),
									uri
								]),
								_.fromPairs
							])(uriMap);
							_uriMap.next(newMap);
							switchedMap = true;
						}
					});
					_outEvents.pipe(
						filter(isKeyValue(['type','done']))
					).subscribe(() => {
						const actualKeys = _.keys(_outData.getValue())
						try {
							assert.deepStrictEqual(
								actualKeys.sort(),
								keysFrom2021.sort()
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					});
				});
			});
			it('!= keys, = URIs', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(_.pickIn(uriMap, keysFrom2021));
				_asapKeys.next(keysFrom2021);

				return new Promise((resolve, reject) => {
					let switchedMap;
					let totalCompleted = 0;

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:complete']))
					).subscribe(() => {
						totalCompleted++
						// switch after downloading more than half
						if (!switchedMap && totalCompleted > keysFrom2021.length / 2) {
							const newMap = _.pipe([
								_.pick(keysFrom2021),
								_.pairs,
								_.mapWith(([key, uri]) => [
									key.replace('2021', '2016'),
									uri
								]),
								_.fromPairs
							])(uriMap);
							_uriMap.next(newMap);
							_asapKeys.next(keysFrom2016);
							switchedMap = true;
						}
					});
					_outEvents.pipe(
						filter(isKeyValue(['type','done']))
					).subscribe(() => {
						const actualKeys = _.keys(_outData.getValue());
						try {
							assert.deepStrictEqual(
								actualKeys.sort(),
								keysFrom2016.sort()
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					})
				});
			});
		});
	});

	describe('`_shouldPrefetch` property', function () {
		it('false: it should only load files in `asapKeys`', function () {
			const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
			const {
				_asapKeys,
				_nextKeys,
				_outData,
				_outEvents,
				_shouldPrefetch,
				_uriMap
			} = createFetchManagerStreams(downloadFn);

			_shouldPrefetch.next(false); // keep? it's the default value
			_uriMap.next(uriMap);
			_asapKeys.next(keysFrom2021);
			_nextKeys.next(keysFrom2016);

			return new Promise((resolve, reject) => {
				_outEvents.pipe(
					filter(event => event.type === 'done')
				).subscribe(() => {
					const data = _outData.getValue();
					const keys = _.keys(data);
					try {
						assert.deepStrictEqual(
							keys.sort(),
							keysFrom2021.sort()
						);
					} catch (e) {
						reject(e);
					}
					resolve();
				});
			});
		});
		it('true: it should load all files', function () {
			const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
			const {
				_asapKeys,
				_nextKeys,
				_outData,
				_outEvents,
				_shouldPrefetch,
				_uriMap
			} = createFetchManagerStreams(downloadFn);

			_shouldPrefetch.next(true);
			_uriMap.next(uriMap);
			_asapKeys.next(keysFrom2021);
			_nextKeys.next(keysFrom2016);

			return new Promise((resolve, reject) => {
				_outEvents.pipe(
					filter(event => event.type === 'done')
				).subscribe(() => {
					const data = _outData.getValue();
					const keys = _.keys(data);
					try {
						assert.deepStrictEqual(
							keys.sort(),
							_.keys(uriMap).sort()
						);
					} catch (e) {
						reject(e);
					}
					resolve();
				});
			});
		});
		describe('change while in progress', function () {
			it('true -> false while asap in progress: should complete and stop', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(keysFrom2021);
				_nextKeys.next(keysFrom2016);

				return new Promise((resolve, reject) => {
					let turnedItOff
					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:complete']))
					).subscribe(() => {
						if (!turnedItOff) {
							_shouldPrefetch.next(false);
							turnedItOff = true;
						}
					});

					_outEvents.pipe(
						filter(isKeyValue(['type', 'done']))
					).subscribe(() => {
						const data = _outData.getValue();
						const keys = _.keys(data);
						try {
							assert.deepStrictEqual(
								keys.sort(),
								keysFrom2021.sort()
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					});
				});
			});
			it('true -> false after asap: should stop', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny)
				const {
					_asapKeys,
					_nextKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(keysFrom2021);
				_nextKeys.next(keysFrom2016);

				return new Promise((resolve, reject) => {
					let hasNextStarted;
					let turnedItOff;

					_outEvents.pipe(
						filter(isKeyValue(['type', 'group:complete']))
					).subscribe(() => {
						if (!hasNextStarted) {
							hasNextStarted = true;
						}
					});

					_outEvents.pipe(
						filter(isKeyValue(['type', 'file:complete']))
					).subscribe(() => {
						if (hasNextStarted && !turnedItOff) {
							_shouldPrefetch.next(false);
							turnedItOff = true;
						}
					});

					_outEvents.pipe(
						filter(isKeyValue(['type', 'done']))
					).subscribe(() => {
						const data = _outData.getValue();
						const keys = _.keys(data);
						try {
							assert(
								_.is(
									_.intersection(keys, keysFrom2021).length,
									keysFrom2021.length
								)
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					});
				});
			});
			it('false -> true while asap in progress: should continue', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(false);
				_uriMap.next(uriMap);
				_asapKeys.next(keysFrom2021);
				_nextKeys.next(keysFrom2016);

				return new Promise((resolve, reject) => {
					let turnedItOn;
					_outEvents.pipe(
						// tap(console.log),
						filter(isKeyValue(['type', 'file:complete']))
					).subscribe(() => {
						if (!turnedItOn) {
							_shouldPrefetch.next(true);
							turnedItOn = true;
						}
					});

					_outEvents.pipe(
						filter(isKeyValue(['type', 'done']))
					).subscribe(() => {
						const data = _outData.getValue();
						const keys = _.keys(data);
						try {
							assert.deepStrictEqual(
								keys.sort(),
								allKeys.sort()
							);
						} catch (e) {
							reject(e);
						}
						resolve();
					});
				});
			});
			it('false -> true after asap: should restart, skipping asap and download everything else', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outData,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(false);
				_uriMap.next(uriMap);
				_asapKeys.next(keysFrom2021);
				_nextKeys.next(keysFrom2016);

				return new Promise((resolve, reject) => {
					let turnedItOn;

					_outEvents.pipe(
						// tap(console.log),
						filter(isKeyValue(['type', 'done']))
					).subscribe(() => {
						if (!turnedItOn) {
							turnedItOn = true;
							_shouldPrefetch.next(true);
						} else {
							const data = _outData.getValue();
							const keys = _.keys(data);
							try {
								assert(
									_.is(
										_.intersection(keys, keysFrom2021).length,
										keysFrom2021.length
									)
								);
							} catch (e) {
								reject(e);
							}
							resolve();
						}
					});
				});
			});
		});
	});

	describe('priority properties (`_asapKeys` and `_nextKeys`)', function () {
		const asapKeys = keysFrom2021;
		const nextKeys = keysFrom2016;
		const restKeys = _.difference(
			allKeys,
			[...asapKeys, ...nextKeys]
		);
		describe('static', function () {
			it('should load all files in correct order (`_asapKeys` then `_nextKeys` then `_restKeys`)', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);
				_nextKeys.next(nextKeys);

				return new Promise(resolve => {
					let groups = [];
					let activeGroup;
					let keysForGroup = {}

					_outEvents.pipe(
						// filter(event => event.type === 'groupStart'),
						filter(isKeyValue(['type','group:start']))
						// filter(_.hasKeyValue('type','groupStart')) // TODO TBD deprecation
					).subscribe(({groupId}) => {
						groups.push(groupId);
						activeGroup = groupId;
						keysForGroup[activeGroup] = [];
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:complete')
					).subscribe(({key}) => {
						keysForGroup[activeGroup].push(key);
					});
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						assert.deepStrictEqual(
							groups,
							['asap', 'next', 'rest'],
							'Groups loaded out of order'
						);
						assert.deepStrictEqual(
							keysForGroup.asap.sort(),
							asapKeys.sort(),
							'Asap not equal'
						);
						assert.deepStrictEqual(
							keysForGroup.next.sort(),
							nextKeys.sort(),
							'Next not equal'
						);
						assert.deepStrictEqual(
							keysForGroup.rest.sort(),
							restKeys.sort(),
							'Rest not equal'
						);
						resolve();
					});
				});
			});
		});
		describe('caching', function () {
			it(`should not redownload cached files`, function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);

				return new Promise((resolve, reject) => {
					_outEvents.pipe(
						filter(event => event.type === 'group:complete'),
						filter(event => event.groupId === 'next')
					).subscribe(({keys}) => {
						try {
							assert(keys.length === 0, 'No keys should be requested on \'next\' group');
						} catch (e) {
							reject(e);
						}
					});

					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve();
					});
				});
			});
		});
		describe('priority change', function () {
			it('while downloading `_asapKeys` those remaining in `_asapKeys` should continue downloading', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);
				_nextKeys.next(nextKeys);

				return new Promise((resolve, reject) => {
					let newAsap;

					_outEvents.pipe(
						// tap(console.log),
						filter(event => event.type === 'file:complete')
					).subscribe(({key}) => {
						if (!newAsap) {
							newAsap = _.difference(
								asapKeys,
								[key]
							);
							_asapKeys.next(newAsap);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:abort')
					).subscribe(({key}) => {
						try {
							assert(!_.isIn(asapKeys, key));
						} catch (e) {
							reject(e);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			it('while downloading `_asapKeys` those not remaining in `_asapKeys` should be aborted', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);
				_nextKeys.next(nextKeys);

				return new Promise((resolve, reject) => {
					let newAsap;
					const filesCompleted = [];

					_outEvents.pipe(
						filter(event => event.type === 'file:complete')
					).subscribe(({key}) => {
						filesCompleted.push(key);
						if (!newAsap) {
							newAsap = nextKeys;
							// Swapping keys to trigger restart
							_asapKeys.next(newAsap);
							_nextKeys.next(asapKeys);
						}
					});
					_outEvents.pipe(
						filter(({type}) => type === 'group:complete'),
						filter(({groupId}) => groupId === 'asap')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							asapKeys,
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
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			it('while downloading `_nextKeys` those moving to `_asapKeys` should continue downloading', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);
				_nextKeys.next(nextKeys);

				return new Promise((resolve, reject) => {
					let nextStarted = false;
					let newAsap;

					_outEvents.pipe(
						filter(({type}) => type === 'group:start'),
						filter(({groupId}) => groupId === 'next')
					).subscribe(() => {
						nextStarted = true;
					})
					_outEvents.pipe(
						filter(event => event.type === 'file:complete')
					).subscribe(({key}) => {
						if (nextStarted && !newAsap) {
							newAsap = _.difference(
								nextKeys,
								[key]
							);
							_asapKeys.next(newAsap);
							_nextKeys.next(asapKeys);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:abort')
					).subscribe(({key}) => {
						try {
							assert(!_.isIn(newAsap, key));
						} catch (e) {
							reject(e);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			it('while downloading `_nextKeys` those not moving to `_asapKeys` should be aborted', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);
				_nextKeys.next(nextKeys);

				return new Promise((resolve, reject) => {
					let nextStarted = false;
					let newAsap;
					const filesCompleted = [];

					_outEvents.pipe(
						filter(({type}) => type === 'group:start'),
						filter(({groupId}) => groupId === 'next')
					).subscribe(() => {
						nextStarted = true;
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:complete')
					).subscribe(({key}) => {
						filesCompleted.push(key);
						if (nextStarted && !newAsap) {
							newAsap = keysFrom2013;
							_asapKeys.next(newAsap);
						}
					});
					_outEvents.pipe(
						filter(({type}) => type === 'group:complete'),
						filter(({groupId}) => groupId === 'next')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							nextKeys,
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
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			it('while downloading `_restKeys` those moving to `_asapKeys` should continue downloading', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny)
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);
				_nextKeys.next(nextKeys);

				return new Promise((resolve, reject) => {
					let nextStarted = false;
					let newAsap;

					_outEvents.pipe(
						// tap(console.log),
						filter(({type}) => type === 'group:start'),
						filter(({groupId}) => groupId === 'rest')
					).subscribe(() => {
						nextStarted = true;
					})
					_outEvents.pipe(
						filter(event => event.type === 'file:complete')
					).subscribe(({key}) => {
						if (nextStarted && !newAsap) {
							newAsap = _.difference(
								restKeys,
								[key]
							);
							_asapKeys.next(newAsap);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'file:abort')
					).subscribe(({key}) => {
						try {
							assert(!_.isIn(newAsap, key));
						} catch (e) {
							reject(e);
						}
					})
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve();
					});
				});
			});
			it('while downloading `_restKeys` those not moving to `_asapKeys` should be aborted', function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonBufferToAny);
				const {
					_asapKeys,
					_nextKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = createFetchManagerStreams(downloadFn);

				_shouldPrefetch.next(true);
				_uriMap.next(uriMap);
				_asapKeys.next(asapKeys);
				_nextKeys.next(nextKeys);

				return new Promise((resolve, reject) => {
					let restStarted = false;
					let newAsap;
					const filesCompleted = [];

					_outEvents.pipe(
						filter(({type}) => type === 'group:start'),
						filter(({groupId}) => groupId === 'rest')
					).subscribe(() => {
						restStarted = true;
					})
					_outEvents.pipe(
						filter(event => event.type === 'file:complete')
					).subscribe(({key}) => {
						filesCompleted.push(key);
						if (restStarted && !newAsap) {
							newAsap = keysFrom2016;
							_asapKeys.next(newAsap);
							_nextKeys.next(keysFrom2013);
						}
					});
					_outEvents.pipe(
						filter(({type}) => type === 'group:complete'),
						filter(({groupId}) => groupId === 'rest')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							restKeys,
							filesCompleted
						);
						try {
							assert.deepStrictEqual(
								abortedKeys.sort(),
								expectedAbortedFiles.sort()
							);
						} catch (e) {
							reject(e);
						}
					});
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						resolve();
					});
				});
			});
		});
	});
});
