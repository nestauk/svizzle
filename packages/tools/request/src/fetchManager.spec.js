import {readdirSync} from 'fs'
import path from 'path'
import {fetch} from 'undici'

import {isKeyValue} from '@svizzle/utils'
import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {filter, tap} from 'rxjs/operators';

import {makeFetchManager} from './fetchManager.js'
import {
	getFileNamesMap,
	getKeysNamed,
	jsonParser,
	loadJsons,
	makeUriMap,
	startServer,
} from './fetchManager.utils';
import {makeWebStreamsFetcher} from './webstreams.js';

// TODO verify we catch all potential exceptions

// test environment
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson')
const TIMEOUT = 20000
const PORT = 4000

const fileNamesMap = getFileNamesMap(readdirSync(baseServerPath))
const uriMap = makeUriMap(`http://localhost:${PORT}/`)(fileNamesMap)
const allKeys = _.keys(uriMap)
const keysFrom2021 = getKeysNamed('2021')(allKeys)
const keysFrom2016 = getKeysNamed('2016')(allKeys)
const keysFrom2013 = getKeysNamed('2013')(allKeys)

describe('fetchManager', function () {
	// eslint-disable-next-line no-invalid-this
	this.timeout(TIMEOUT)

	const server = startServer({
		port: PORT,
		basePath: baseServerPath
	})
	after(function () {
		server.close()
	})

	describe('`_uriMap` property', function () {
		it('the content of the downloaded files should be the same as served resources', function () {
			const priorities = {
				asap: allKeys,
				next: []
			}

			const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
			const {
				_asapKeys,
				_outData,
				_outEvents,
				_uriMap
			} = makeFetchManager(downloadFn)

			_uriMap.next(uriMap)
			_asapKeys.next(priorities.asap)

			return new Promise((resolve, reject) => {
				_outEvents.pipe(
					filter(event => event.type === 'done')
				).subscribe(async () => {
					const data = _outData.getValue()
					const keys = _.keys(data)
					try {
						const expectedJsons = await loadJsons(baseServerPath, keys, fileNamesMap)
						assert.deepStrictEqual(data, expectedJsons)
					} catch (e) {
						reject(e)
					}
					resolve()
				})
			})
		})
	})

	describe('`_shouldPrefecth` property', function () {
		const priorities = {
			asap: keysFrom2021,
			next: keysFrom2016
		}
		it('false: it should only load files in `asapKeys`', function () {
			const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
			const {
				_asapKeys,
				_nextKeys,
				_outData,
				_outEvents,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(downloadFn)

			_shouldPrefetch.next(false) // keep? it's the default value
			_uriMap.next(uriMap)
			_asapKeys.next(priorities.asap)
			_nextKeys.next(priorities.next)

			return new Promise(resolve => {
				_outEvents.pipe(
					filter(event => event.type === 'done')
				).subscribe(() => {
					const data = _outData.getValue()
					const keys = _.keys(data)
					assert.deepStrictEqual(
						keys.sort(),
						priorities.asap.sort()
					)
					resolve()
				})
			})
		})
		it('true: it should load all files', function () {
			const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
			const {
				_asapKeys,
				_nextKeys,
				_outData,
				_outEvents,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(downloadFn)

			_shouldPrefetch.next(true)
			_uriMap.next(uriMap)
			_asapKeys.next(priorities.asap)
			_nextKeys.next(priorities.next)

			return new Promise(resolve => {
				_outEvents.pipe(
					filter(event => event.type === 'done')
				).subscribe(() => {
					const data = _outData.getValue()
					const keys = _.keys(data)
					assert.deepStrictEqual(
						keys.sort(),
						_.keys(uriMap).sort()
					)
					resolve()
				})
			})

		})
	})

	describe('priority properties (`_asapKeys` and `_nextKeys`)', function () {
		const priorities = {
			asap: keysFrom2021,
			next: keysFrom2016
		}
		const restKeys = _.difference(
			allKeys,
			[...priorities.asap, ...priorities.next]
		)
		describe('static', function () {
			it('should load all files in correct order (`_asapKeys` then `_nextKeys` then `_restKeys`)', function () {
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
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

				return new Promise(resolve => {
					let groups = []
					let activeGroup
					let keysForGroup = {}

					_outEvents.pipe(
						// filter(event => event.type === 'groupStart'),
						filter(isKeyValue(['type','groupStart']))
						// filter(_.hasKeyValue('type','groupStart')) // TODO TBD deprecation
					).subscribe(({groupId}) => {
						groups.push(groupId)
						activeGroup = groupId
						keysForGroup[activeGroup] = []
					})
					_outEvents.pipe(
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						keysForGroup[activeGroup].push(key)
					})
					_outEvents.pipe(
						filter(event => event.type === 'done')
					).subscribe(() => {
						assert.deepStrictEqual(
							groups,
							['asap', 'next', 'rest'],
							'Groups loaded out of order'
						)
						assert.deepStrictEqual(
							keysForGroup.asap.sort(),
							priorities.asap.sort(),
							'Asap not equal'
						)
						assert.deepStrictEqual(
							keysForGroup.next.sort(),
							priorities.next.sort(),
							'Next not equal'
						)
						assert.deepStrictEqual(
							keysForGroup.rest.sort(),
							restKeys.sort(),
							'Rest not equal'
						)
						resolve()
					})
				})
			})
		})
		describe('caching', function () {
			it(`should not redownload cached files`, function () {
				const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
				const {
					_asapKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = makeFetchManager(downloadFn)

				_shouldPrefetch.next(true)
				_uriMap.next(uriMap)
				_asapKeys.next(priorities.asap)

				return new Promise((resolve, reject) => {
					_outEvents.pipe(
						filter(event => event.type === 'groupCompleted'),
						filter(event => event.groupId === 'next')
					).subscribe(({keys}) => {
						try {
							assert(keys.length > 0, 'No keys should be requested on \'next\' group')
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
		})
		describe('priority change', function () {
			it('while downloading `_asapKeys` those remaining in `_asapKeys` should continue downloading', function () {
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
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

				return new Promise((resolve, reject) => {
					let newAsap

					_outEvents.pipe(
						// tap(console.log),
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						if (!newAsap) {
							newAsap = _.difference(
								priorities.asap,
								[key]
							)
							_asapKeys.next(newAsap)
						}
					})
					_outEvents.pipe(
						filter(event => event.type === 'abort')
					).subscribe(({key}) => {
						try {
							assert(!_.isIn(priorities.asap, key))
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
			it('while downloading `_asapKeys` those not remaining in `_asapKeys` should be aborted', function () {
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
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

				return new Promise((resolve, reject) => {
					let newAsap
					const filesCompleted = []

					_outEvents.pipe(
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						filesCompleted.push(key)
						if (!newAsap) {
							newAsap = priorities.next
							// Swapping keys to trigger restart
							_asapKeys.next(newAsap)
							_nextKeys.next(priorities.asap)
						}
					})
					_outEvents.pipe(
						filter(({type}) => type === 'groupCompleted'),
						filter(({groupId}) => groupId === 'asap')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							priorities.asap,
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
			it('while downloading `_nextKeys` those moving to `_asapKeys` should continue downloading', function () {
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
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

				return new Promise((resolve, reject) => {
					let nextStarted = false
					let newAsap

					_outEvents.pipe(
						filter(({type}) => type === 'groupStart'),
						filter(({groupId}) => groupId === 'next')
					).subscribe(() => {
						nextStarted = true
					})
					_outEvents.pipe(
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						if (nextStarted && !newAsap) {
							newAsap = _.difference(
								priorities.next,
								[key]
							)
							_asapKeys.next(newAsap)
							_nextKeys.next(priorities.asap)
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
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

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
							priorities.next,
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
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

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
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

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
							priorities.next,
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
		})
	})
});
