import {filter, tap} from 'rxjs/operators';
import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {fetch} from 'undici'
import http from 'http'
import serveHandler from 'serve-handler'
import path from 'path'
import {createReadStream, readdirSync} from 'fs'
import Throttle from 'throttle'
import {readJson} from '@svizzle/file'
import {isKeyValue} from '@svizzle/utils'

import {makeFetchManager} from './fetchManager.js'
import { makeWebStreamsFetcher } from './webstreams.js';

// TODO verify we catch all potential exceptions

// test environment
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson')

const fileNamesMap = _.pipe([
	_.filterWith(fileName => fileName.endsWith('.json')),
	_.filterWith(fileName => (/.*\d\.json$/u).test(fileName)),
	_.mapWith(fileName => [
		`NUTS-${fileName.substr(12,4)}-${fileName.substr(27,1)}-${fileName.substr(8,2)}`,
		fileName
	]),
	_.fromPairs
// eslint-disable-next-line no-sync
])(readdirSync(baseServerPath))


const decoder = new TextDecoder()
const decode = bytes => decoder.decode(bytes)
const jsonParser = _.pipe([
	decode,
	JSON.parse
])

// FIXME Check if we can set default at script level
const TIMEOUT = 20000

let serverPort = 4000

// utils
const makeUriMap = baseUri => _.pipe([
	_.pairs,
	_.mapWith(([key, fileName]) => [
		key,
		{url: baseUri + fileName}
	]),
	_.fromPairs
])

const startServer = ({bandwidth, port, basePath}) => {
	let middleware
	if (bandwidth) {
		middleware = {
			createReadStream (filePath, config) {
				const throttledStream = new Throttle({bps: bandwidth})
				createReadStream(filePath, config).pipe(throttledStream)
				return throttledStream
			}
		}
	}
	const server = http.createServer(async (req, res) => {
		await serveHandler(
			req,
			res,
			{public: basePath},
			middleware
		)
	})
	server.listen(port)
	return server
}

const loadJsons = async (keys, filesMap) => {
	const fileLoadingPromises = _.pipe([
		_.pairs,
		_.filterWith(([key]) => keys.includes(key)),
		_.mapWith(([key, fileName]) =>
			[key, `${baseServerPath}/${fileName}`]
		),
		_.mapWith(async ([key, filePath]) =>
			[key, await readJson(filePath)])
	])(filesMap)

	const loadedFiles = await Promise.all(fileLoadingPromises)
	return _.fromPairs(loadedFiles)
}

describe('fetchManager', function () {
	const server = startServer({
		port: serverPort,
		basePath: baseServerPath
	})
	after(function () {
		server.close()
	})
	describe('`_uriMap` property', function () {
		it('the content of the downloaded files should be the same as served resources', function () {
			// eslint-disable-next-line no-invalid-this
			this.timeout(TIMEOUT)

			const uriMap = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)
			const priorities = {
				asap: _.keys(uriMap),
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
						const expectedJsons = await loadJsons(keys, fileNamesMap)
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
		const uriMap = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)

		const priorities = {
			asap: [
				'NUTS-2016-1-03',
				'NUTS-2003-0-10',
			],
			next: [
				'NUTS-2013-0-10',
				'NUTS-2016-0-10',
				'NUTS-2016-2-03',
			]
		}
		it('false: it should only load files in `asapKeys`', function () {
			// eslint-disable-next-line no-invalid-this
			this.timeout(TIMEOUT)

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
			// eslint-disable-next-line no-invalid-this
			this.timeout(TIMEOUT)

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
		const uriMap = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)

		const priorities = {
			asap: [
				'NUTS-2016-1-03',
				'NUTS-2003-0-10',
			],
			next: [
				'NUTS-2013-0-10',
				'NUTS-2016-0-10',
				'NUTS-2016-2-03',
			]
		}

		const restKeys = _.difference(
			_.keys(uriMap),
			_.union(priorities.asap, priorities.next)
		)

		// TODO wrap in describe
		it('should load all files in correct order (`_asapKeys` then `_nextKeys` then `_restKeys`)', function () {
			// eslint-disable-next-line no-invalid-this
			this.timeout(TIMEOUT)

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
		describe('priority change', function () {
			const sources = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)

			const priorities2 = {
				asap: _.pipe([
					_.keys,
					_.filterWith(key => key.includes('2021'))
				])(sources),
				next: _.pipe([
					_.keys,
					_.filterWith(key => key.includes('2016'))
				])(sources)
			}
			it('while downloading `_asapKeys` those remaining in `_asapKeys` should continue downloading', function () {
				// eslint-disable-next-line no-invalid-this
				this.timeout(TIMEOUT)

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
				_asapKeys.next(priorities2.asap)
				_nextKeys.next(priorities2.next)

				return new Promise((resolve, reject) => {
					let newAsap

					_outEvents.pipe(
						// tap(console.log),
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						if (!newAsap) {
							newAsap = _.difference(
								priorities2.asap,
								[key]
							)
							_asapKeys.next(newAsap)
						}
					})
					_outEvents.pipe(
						filter(event => event.type === 'abort')
					).subscribe(({key}) => {
						try {
							assert(!_.isIn(priorities2.asap, key))
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
				// eslint-disable-next-line no-invalid-this
				this.timeout(TIMEOUT)

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
				_asapKeys.next(priorities2.asap)
				_nextKeys.next(priorities2.next)

				return new Promise((resolve, reject) => {
					let newAsap
					const filesCompleted = []

					_outEvents.pipe(
						filter(event => event.type === 'complete')
					).subscribe(({key}) => {
						filesCompleted.push(key)
						if (!newAsap) {
							newAsap = priorities2.next
							// Swapping keys to trigger restart
							_asapKeys.next(newAsap)
							_nextKeys.next(priorities2.asap)
						}
					})
					_outEvents.pipe(
						filter(({type}) => type === 'groupCompleted'),
						filter(({groupId}) => groupId === 'asap')
					).subscribe(({abortedKeys}) => {
						const expectedAbortedFiles = _.difference(
							priorities2.asap,
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
				// eslint-disable-next-line no-invalid-this
				this.timeout(TIMEOUT)

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
				_asapKeys.next(priorities2.asap)
				_nextKeys.next(priorities2.next)

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
								priorities2.next,
								[key]
							)
							_asapKeys.next(newAsap)
							_nextKeys.next(priorities2.asap)
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
			it('while downloading `_nextKeys` those not moving to `_asapKeys` should be aborted', function () {})
			it('while downloading `_restKeys` those moving to `_asapKeys` should continue downloading', function () {})
			it('while downloading `_restKeys` those not moving to `_asapKeys` should be aborted', function () {})
			it(`should not redownload cached files`, function () {})

			/*
			it('should download files after changing priority', function () {
				// eslint-disable-next-line no-invalid-this
				this.timeout(TIMEOUT)

				const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)

				const {
					_asapKeys,
					_nextKeys,
					_outData,
					_outLoadingKeys,
					_outEvents,
					_shouldPrefetch,
					_uriMap
				} = makeFetchManager(downloadFn)

				_shouldPrefetch.next(true)
				_uriMap.next(sources)
				_asapKeys.next(priorities.asap)
				_nextKeys.next(priorities.next)

				let lastLoadingKeys = []
				let isFirstNextKeyLoaded = false
				let remainingNextKeys
				return new Promise(resolve => {
					_outLoadingKeys.subscribe(loadingKeys => {
						const newKeys = _.difference(
							loadingKeys,
							lastLoadingKeys
						)
						const oldKeys = _.difference(
							lastLoadingKeys,
							loadingKeys
						)
						const nextKeysLoaded = _.intersection(
							priorities.next,
							oldKeys
						)
						newKeys.length > 0 && debug('loadingKeys +', newKeys)
						oldKeys.length > 0 && debug('loadingKeys -', oldKeys)
						if (!isFirstNextKeyLoaded && nextKeysLoaded.length > 0) {
							isFirstNextKeyLoaded = true
							debug('First key in nextKeys loaded', nextKeysLoaded)
							remainingNextKeys = _.difference(
								priorities.next,
								nextKeysLoaded
							)
							const newAsap = [
								remainingNextKeys[0],
								'NUTS-2010-3-03',
								'NUTS-2021-0-03'
							]
							const newNext = [
								'NUTS-2003-3-03',
								'NUTS-2003-1-03',
								'NUTS-2003-2-03'
							]
							debug('Selected for asapKeys', newAsap)

							// should continue remainingNextKeys[0] (now in asap)
							// should abort remainingNextKeys[1] (not in asap)
							// should start 'NUTS-2010-3-03' (was in restKeys)
							// should not start 'NUTS-2021-0-03' (was in asapKeys, already loaded)
							_asapKeys.next(newAsap)
							_nextKeys.next(newNext)
						} else if (isFirstNextKeyLoaded) {
							const isReloadingRnk0 = _.intersection(
								[remainingNextKeys[0]],
								newKeys
							).length > 0

							const isRnk1Stopped = _.intersection(
								[remainingNextKeys[1]],
								oldKeys
							).length > 0

							const hasStarted2021003 = _.intersection(
								['NUTS-2021-0-03'],
								newKeys
							).length > 0

							const hasStarted2010303 = _.intersection(
								['NUTS-2010-3-03'],
								newKeys
							).length > 0

							assert(!isReloadingRnk0, `Is reloading '${remainingNextKeys[0]}', shouldn't happen!`)
							assert(!hasStarted2021003, `Is restarting 'NUTS-2021-0-03', shouldn't happen!`)
							isRnk1Stopped && debug(`Stopped '${remainingNextKeys[1]}', should happen very soon after selecting newAsap`)
							hasStarted2010303 && debug('Is starting \'NUTS-2010-3-03\', should happen very soon after selecting newAsap')
						}
						const loadedKeys = _.keys(_outData.getValue())
						if (_.intersection(loadedKeys, newKeys).length > 0) {
							debug('started loading but it\'s already loaded', newKeys)
						}
						if (_.intersection(loadedKeys, oldKeys).length > 0) {
							debug('finished loading but it\'s already loaded', oldKeys)
						}
						lastLoadingKeys = loadingKeys
					})

					let orderedKeys = []

					_outData.subscribe(data => {
						const keys = _.keys(data)
						orderedKeys = [
							...orderedKeys,
							..._.difference(keys, orderedKeys)
						]
						debug('loaded', keys.length)
						if (keys.length === sourcesCount) {
							resolve()
						}
					})

					// _outEvents.subscribe(message => console.log(message))
				})
			})
			*/
		})
	})
});
