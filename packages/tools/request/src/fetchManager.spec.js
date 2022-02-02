import {filter} from 'rxjs/operators';
import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {fetch} from 'undici'
import http from 'http'
import serveHandler from 'serve-handler'
import path from 'path'
import {createReadStream, readdirSync} from 'fs'
import Throttle from 'throttle'
import {readJson} from '@svizzle/file'

import {makeFetchManager} from './fetchManager.js'
import { makeWebStreamsFetcher } from './webstreams.js';

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
	describe('`_uriMap` property', function () {
		const uriMap = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)

		const priorities = {
			asap: _.keys(uriMap),
			next: []
		}

		const server = startServer({
			port: serverPort++,
			basePath: baseServerPath
		})
		after(function () {
			server.close()
		})
		it('the content of the downloaded files should be the same as served resources', function () {
			// eslint-disable-next-line no-invalid-this
			this.timeout(TIMEOUT)

			const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)
			const {
				_asapKeys,
				_outData,
				_outLog,
				_uriMap
			} = makeFetchManager(downloadFn)

			_uriMap.next(uriMap)
			_asapKeys.next(priorities.asap)


			return new Promise((resolve, reject) => {
				_outLog.pipe(
					filter(event => event.type === 'groupComplete')
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
		const sources = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)

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
		const sourcesCount = priorities.asap.length

		const server = startServer({
			// bandwidth: 1024 * 512,
			port: serverPort++,
			basePath: baseServerPath
		})
		after(function () {
			server.close()
		})
		it('false: it should only load files in `asapKeys`', function () {
			// eslint-disable-next-line no-invalid-this
			this.timeout(TIMEOUT)

			const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)

			const {
				_asapKeys,
				_nextKeys,
				_outData,
				_outLoadingKeys,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(downloadFn)

			_shouldPrefetch.next(false)
			_uriMap.next(sources)
			_asapKeys.next(priorities.asap)
			_nextKeys.next(priorities.next)

			return new Promise((resolve, reject) => {
				_outData.subscribe(async data => {
					const keys = _.keys(data)
					if (keys.length === sourcesCount) {
						try {
							const expectedJsons = await loadJsons(keys, fileNamesMap)
							assert.deepStrictEqual(data, expectedJsons)
						} catch (e) {
							reject(e)
						}
						resolve()
					}
				})
			})
		})
		it('true: it should load all files', function () {})
	})

	describe('priority properties (`_asapKeys` and `_nextKeys`)', function () {
		const sources = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)

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
		const sourcesCount = _.keys(sources).length

		const server = startServer({
			// bandwidth: 1024 * 512,
			port: serverPort++,
			basePath: baseServerPath
		})
		after(function () {
			server.close()
		})
		it('should load all files in correct order', function () {
			// eslint-disable-next-line no-invalid-this
			this.timeout(TIMEOUT)

			const downloadFn = makeWebStreamsFetcher(fetch, jsonParser)

			const {
				_asapKeys,
				_nextKeys,
				_outData,
				_outLoadingKeys,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(downloadFn)

			_shouldPrefetch.next(true)
			_uriMap.next(sources)
			_asapKeys.next(priorities.asap)
			_nextKeys.next(priorities.next)

			return new Promise(resolve => {
				let orderedKeys = []

				_outData.subscribe(data => {
					const keys = _.keys(data)
					orderedKeys = [
						...orderedKeys,
						..._.difference(keys, orderedKeys)
					]
					if (keys.length === sourcesCount) {
						const actualAsap = orderedKeys.slice(
							0,
							priorities.asap.length
						)
						const actualNext = orderedKeys.slice(
							priorities.asap.length,
							priorities.asap.length + priorities.next.length
						)
						const actualRest = orderedKeys.slice(
							priorities.asap.length + priorities.next.length
						)
						assert.deepStrictEqual(
							actualAsap.sort(),
							priorities.asap.sort(),
							'Asap not equal'
						)
						assert.deepStrictEqual(
							actualNext.sort(),
							priorities.next.sort(),
							'Next not equal'
						)
						assert.deepStrictEqual(
							actualRest.sort(),
							_.difference(
								keys,
								_.union(priorities.asap, priorities.next)
							).sort(),
							'Rest not equal'
						)
						resolve()
					}
				})
			})
		})
		describe('priority change', function () {
			const sources = makeUriMap(`http://localhost:${serverPort}/`)(fileNamesMap)

			const priorities = {
				asap: _.pipe([
					_.keys,
					_.filterWith(key => key.includes('2021'))
				])(sources),
				next: _.pipe([
					_.keys,
					_.filterWith(key => key.includes('2016'))
				])(sources)
			}
			const sourcesCount = _.keys(sources).length
			it('while downloading `_asapKeys` those remaining in `_asapKeys` should continue downloading', function () {})
			it('while downloading `_asapKeys` those not remaining in `_asapKeys` should be aborted', function () {})
			it('while downloading `_nextKeys` those moving to `_asapKeys` should continue downloading', function () {})
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
					_outLog,
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

					// _outLog.subscribe(message => console.log(message))
				})
			})
			*/
		})
	})
});
