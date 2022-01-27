import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {fetch} from 'undici'
import http from 'http'
import serveHandler from 'serve-handler'
import path from 'path'
import {createReadStream, readdirSync} from 'fs'
import Throttle from 'throttle'
import {readJson} from '@svizzle/file'

import {makeFetchManager} from './fetchDriver.js'

// for debugging
const DEBUG = false
const debug = (...args) => DEBUG && console.log(...args)

// test environment
const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson')

const fileNamesMap = _.pipe([
	_.filterWith(fileName => fileName.endsWith('.json')),
	_.filterWith(fileName => /.*\d\.json$/.test(fileName)),
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
const makeSources = baseUri => _.pipe([
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

describe('fetchDriver', function () {
	describe('shouldPrefecth = false', function () {
		const sources = makeSources(`http://localhost:${serverPort}/`)(fileNamesMap)

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
		debug('sourcesCount', sourcesCount)

		const server = startServer({
			// bandwidth: 1024 * 512,
			port: serverPort++,
			basePath: baseServerPath
		})
		after(function () {
			server.close()
		})
		it('should only load files in asapKeys', function () {
			this.timeout(TIMEOUT)

			const {
				_asapKeys,
				_defaultTransformer,
				_nextKeys,
				_outData,
				_outLoadingKeys,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(fetch)

			_shouldPrefetch.next(false)
			_defaultTransformer.next(jsonParser)
			_uriMap.next(sources)
			_asapKeys.next(priorities.asap)
			_nextKeys.next(priorities.next)

			return new Promise((resolve, reject) => {
				DEBUG && _outLoadingKeys.subscribe(loadingKeys => {
					debug('loadingKeys', loadingKeys.length)
				})

				_outData.subscribe(async data => {
					const keys = _.keys(data)
					debug('loaded', keys.length)
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
	})

	describe('asapKeys = keys(sources)', function () {
		const sources = makeSources(`http://localhost:${serverPort}/`)(fileNamesMap)

		const priorities = {
			asap: [],
			next: []
		}
		priorities.asap = _.keys(sources)
		const sourcesCount = priorities.asap.length
		debug('sourcesCount', sourcesCount)

		const server = startServer({
			// bandwidth: 1024 * 512,
			port: serverPort++,
			basePath: baseServerPath
		})
		after(function () {
			server.close()
		})
		it('should load all files in sources', function () {
			this.timeout(TIMEOUT)

			const {
				_asapKeys,
				_defaultTransformer,
				_nextKeys,
				_outData,
				_outLoadingKeys,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(fetch)

			_shouldPrefetch.next(false)
			_defaultTransformer.next(jsonParser)
			_uriMap.next(sources)
			_asapKeys.next(priorities.asap)
			_nextKeys.next(priorities.next)

			return new Promise((resolve, reject) => {
				DEBUG && _outLoadingKeys.subscribe(loadingKeys => {
					debug('loadingKeys', loadingKeys.length)
				})

				_outData.subscribe(async data => {
					const keys = _.keys(data)
					debug('loaded', keys.length)
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
	})

	describe('load order', function () {
		const sources = makeSources(`http://localhost:${serverPort}/`)(fileNamesMap)

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
		debug('sourcesCount', sourcesCount)

		const server = startServer({
			// bandwidth: 1024 * 512,
			port: serverPort++,
			basePath: baseServerPath
		})
		after(function () {
			server.close()
		})
		it('should load all files in correct order', function () {
			this.timeout(TIMEOUT)
			const {
				_asapKeys,
				_defaultTransformer,
				_nextKeys,
				_outData,
				_outLoadingKeys,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(fetch)

			_shouldPrefetch.next(true)
			_defaultTransformer.next(jsonParser)
			_uriMap.next(sources)
			_asapKeys.next(priorities.asap)
			_nextKeys.next(priorities.next)

			return new Promise(resolve => {
				DEBUG && _outLoadingKeys.subscribe(loadingKeys => {
					debug('loadingKeys', loadingKeys.length)
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
						debug('actualAsap', actualAsap)
						debug('actualNext', actualNext)
						debug('actualRest', actualRest)

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
	})

	describe('priority change', function () {
		const sources = makeSources(`http://localhost:${serverPort}/`)(fileNamesMap)

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
		debug('sourcesCount', sourcesCount)

		const server = startServer({
			// bandwidth: 1024 * 512,
			port: serverPort++,
			basePath: baseServerPath
		})
		after(function () {
			server.close()
		})
		it('should download files correctly after changing priority', function () {
			this.timeout(TIMEOUT)
			const {
				_asapKeys,
				_defaultTransformer,
				_nextKeys,
				_outData,
				_outLoadingKeys,
				_shouldPrefetch,
				_uriMap
			} = makeFetchManager(fetch)

			_shouldPrefetch.next(true)
			_defaultTransformer.next(jsonParser)
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
					newKeys.length > 0 && console.log('loadingKeys +', newKeys)
					oldKeys.length > 0 && console.log('loadingKeys -', oldKeys)
					if (!isFirstNextKeyLoaded && nextKeysLoaded.length > 0) {
						isFirstNextKeyLoaded = true
						console.log('First key in nextKeys loaded', nextKeysLoaded)
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
						console.log('Selected for asapKeys', newAsap)
						// should continue remainingNextKeys[0] (now in asap)
						// should abort remainingNextKeys[1] (not in asap)
						// should start 'NUTS-2003-0-03' (was in restKeys)
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

						const hasStarted2003010 = _.intersection(
							['NUTS-2003-0-10'],
							newKeys
						).length > 0

						const hasStarted2003003 = _.intersection(
							['NUTS-2003-0-03'],
							newKeys
						).length > 0

						isReloadingRnk0 && console.log('Is reloading rnk0, shouldn\'t happen!', remainingNextKeys[0])
						isRnk1Stopped && console.log('Stopped rnk1, should happen very soon after selecting newAsap', remainingNextKeys[1])
						hasStarted2003010 && console.log('Is restarting \'NUTS-2003-0-10\', shouldn\'t happen!')
						hasStarted2003003 && console.log('Is starting \'NUTS-2003-0-10\', should happen very soon after selecting newAsap')
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
			})
		})
	})

});
