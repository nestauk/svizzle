import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {fetch} from 'undici'
import http from 'http'
import serveHandler from 'serve-handler'
import path from 'path'
import {createReadStream, readdirSync} from 'fs'
import Throttle from 'throttle'
import {readJson} from '@svizzle/file'

import {makeFetchDriver} from './fetchDriver.js'

// for debugging
const DEBUG = false
const debug = (...args) => DEBUG && console.log(...args)

// test environment
const baseServerPath = path.resolve('../atlas/distro')

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

const startServer = ({bps, port, basePath}) => {
	let middleware
	if (bps) {
		middleware = {
			createReadStream (filePath, config) {
				const throttledStream = new Throttle({bps: 1024 * 1024})
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
			// bps: 1024 * 512,
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
			} = makeFetchDriver(fetch)

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
			// bps: 1024 * 512,
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
			} = makeFetchDriver(fetch)

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
			// bps: 1024 * 512,
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
			} = makeFetchDriver(fetch)

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
});
