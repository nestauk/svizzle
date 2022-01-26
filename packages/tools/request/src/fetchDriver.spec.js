import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {fetch} from 'undici'
import http from 'http'
import serveHandler from 'serve-handler'
import path from 'path'
import {createReadStream} from 'fs'
import Throttle from 'throttle'
import {readJson} from '@svizzle/file'

import {makeFetchDriver} from './fetchDriver.js'

const DEBUG = false
const debug = (...args) => DEBUG && console.log(...args)

const basePath = path.resolve('../atlas/distro')

/*
const sources = Object.fromEntries(
	fs.readdirSync(basePath)
	.filter(fn => fn.endsWith('.json'))
	.filter(fn => /.*\d\.json$/.test(fn))
	.map(fn => [
		`NUTS-${fn.substr(12,4)}-${fn.substr(27,1)}-${fn.substr(8,2)}`,
		{url:'http://localhost:4000/' + fn}
	]))
*/
const sources = {
	'NUTS-2003-0-03': { url: 'http://localhost:4000/NUTS_RG_03M_2003_4326_LEVL_0.json' },
	'NUTS-2003-1-03': { url: 'http://localhost:4000/NUTS_RG_03M_2003_4326_LEVL_1.json' },
	'NUTS-2003-2-03': { url: 'http://localhost:4000/NUTS_RG_03M_2003_4326_LEVL_2.json' },
	'NUTS-2003-3-03': { url: 'http://localhost:4000/NUTS_RG_03M_2003_4326_LEVL_3.json' },
	'NUTS-2006-0-03': { url: 'http://localhost:4000/NUTS_RG_03M_2006_4326_LEVL_0.json' },
	'NUTS-2006-1-03': { url: 'http://localhost:4000/NUTS_RG_03M_2006_4326_LEVL_1.json' },
	'NUTS-2006-2-03': { url: 'http://localhost:4000/NUTS_RG_03M_2006_4326_LEVL_2.json' },
	'NUTS-2006-3-03': { url: 'http://localhost:4000/NUTS_RG_03M_2006_4326_LEVL_3.json' },
	'NUTS-2010-0-03': { url: 'http://localhost:4000/NUTS_RG_03M_2010_4326_LEVL_0.json' },
	'NUTS-2010-1-03': { url: 'http://localhost:4000/NUTS_RG_03M_2010_4326_LEVL_1.json' },
	'NUTS-2010-2-03': { url: 'http://localhost:4000/NUTS_RG_03M_2010_4326_LEVL_2.json' },
	'NUTS-2010-3-03': { url: 'http://localhost:4000/NUTS_RG_03M_2010_4326_LEVL_3.json' },
	'NUTS-2013-0-03': { url: 'http://localhost:4000/NUTS_RG_03M_2013_4326_LEVL_0.json' },
	'NUTS-2013-1-03': { url: 'http://localhost:4000/NUTS_RG_03M_2013_4326_LEVL_1.json' },
	'NUTS-2013-2-03': { url: 'http://localhost:4000/NUTS_RG_03M_2013_4326_LEVL_2.json' },
	'NUTS-2013-3-03': { url: 'http://localhost:4000/NUTS_RG_03M_2013_4326_LEVL_3.json' },
	'NUTS-2016-0-03': { url: 'http://localhost:4000/NUTS_RG_03M_2016_4326_LEVL_0.json' },
	'NUTS-2016-1-03': { url: 'http://localhost:4000/NUTS_RG_03M_2016_4326_LEVL_1.json' },
	'NUTS-2016-2-03': { url: 'http://localhost:4000/NUTS_RG_03M_2016_4326_LEVL_2.json' },
	'NUTS-2016-3-03': { url: 'http://localhost:4000/NUTS_RG_03M_2016_4326_LEVL_3.json' },
	'NUTS-2003-0-10': { url: 'http://localhost:4000/NUTS_RG_10M_2003_4326_LEVL_0.json' },
	'NUTS-2003-1-10': { url: 'http://localhost:4000/NUTS_RG_10M_2003_4326_LEVL_1.json' },
	'NUTS-2003-2-10': { url: 'http://localhost:4000/NUTS_RG_10M_2003_4326_LEVL_2.json' },
	'NUTS-2003-3-10': { url: 'http://localhost:4000/NUTS_RG_10M_2003_4326_LEVL_3.json' },
	'NUTS-2006-0-10': { url: 'http://localhost:4000/NUTS_RG_10M_2006_4326_LEVL_0.json' },
	'NUTS-2006-1-10': { url: 'http://localhost:4000/NUTS_RG_10M_2006_4326_LEVL_1.json' },
	'NUTS-2006-2-10': { url: 'http://localhost:4000/NUTS_RG_10M_2006_4326_LEVL_2.json' },
	'NUTS-2006-3-10': { url: 'http://localhost:4000/NUTS_RG_10M_2006_4326_LEVL_3.json' },
	'NUTS-2010-0-10': { url: 'http://localhost:4000/NUTS_RG_10M_2010_4326_LEVL_0.json' },
	'NUTS-2010-1-10': { url: 'http://localhost:4000/NUTS_RG_10M_2010_4326_LEVL_1.json' },
	'NUTS-2010-2-10': { url: 'http://localhost:4000/NUTS_RG_10M_2010_4326_LEVL_2.json' },
	'NUTS-2010-3-10': { url: 'http://localhost:4000/NUTS_RG_10M_2010_4326_LEVL_3.json' },
	'NUTS-2013-0-10': { url: 'http://localhost:4000/NUTS_RG_10M_2013_4326_LEVL_0.json' },
	'NUTS-2013-1-10': { url: 'http://localhost:4000/NUTS_RG_10M_2013_4326_LEVL_1.json' },
	'NUTS-2013-2-10': { url: 'http://localhost:4000/NUTS_RG_10M_2013_4326_LEVL_2.json' },
	'NUTS-2013-3-10': { url: 'http://localhost:4000/NUTS_RG_10M_2013_4326_LEVL_3.json' },
	'NUTS-2016-0-10': { url: 'http://localhost:4000/NUTS_RG_10M_2016_4326_LEVL_0.json' },
	'NUTS-2016-1-10': { url: 'http://localhost:4000/NUTS_RG_10M_2016_4326_LEVL_1.json' },
	'NUTS-2016-2-10': { url: 'http://localhost:4000/NUTS_RG_10M_2016_4326_LEVL_2.json' },
	'NUTS-2016-3-10': { url: 'http://localhost:4000/NUTS_RG_10M_2016_4326_LEVL_3.json' }
}

const decoder = new TextDecoder()
const decode = bytes => decoder.decode(bytes)
const jsonParser = _.pipe([
	decode,
	JSON.parse
])

const TIMEOUT = 40000

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

const loadJsons = async keys => {
	const fileLoadingPromises = _.pipe([
		_.pairs,
		_.filterWith(([key]) => keys.includes(key)),
		_.mapWith(([key, spec]) =>
			[key, basePath + spec.url.replace('http://localhost:4000','')]
		),
		_.mapWith(async ([key, filePath]) =>
			[key, await readJson(filePath)])
	])(sources)

	const loadedFiles = await Promise.all(fileLoadingPromises)
	return _.fromPairs(loadedFiles)
}

describe('fetchDriver', function () {
	it('should only load files in asapKeys', function () {
		this.timeout(TIMEOUT)

		const server = startServer({
			bps: 1024 * 512,
			port: 4000,
			basePath
		})

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

		return new Promise(resolve => {
			DEBUG && _outLoadingKeys.subscribe(loadingKeys => {
				debug('loadingKeys', loadingKeys.length)
			})

			_outData.subscribe(async data => {
				const keys = _.keys(data)
				debug('loaded', keys.length)
				if (keys.length === sourcesCount) {
					server.close()
					try {
						const expectedJsons = await loadJsons(keys)
						assert.deepEqual(data, expectedJsons)
					} catch (e) {
						console.error(e)
					} finally {
						resolve()
					}
				}
			})
		})
	})

	it('should load all files in sources', function () {
		this.timeout(TIMEOUT)

		const server = startServer({
			// bps: 1024 * 512,
			port: 4000,
			basePath
		})

		const priorities = {
			asap: [],
			next: []
		}
		priorities.asap = _.keys(sources)

		const sourcesCount = priorities.asap.length

		debug('sourcesCount', sourcesCount)
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

		return new Promise(resolve => {
			DEBUG && _outLoadingKeys.subscribe(loadingKeys => {
				debug('loadingKeys', loadingKeys.length)
			})

			_outData.subscribe(async data => {
				const keys = _.keys(data)
				debug('loaded', keys.length)
				if (keys.length === sourcesCount) {
					server.close()
					try {
						const expectedJsons = await loadJsons(keys)
						assert.deepEqual(data, expectedJsons)
					} catch (e) {
						console.error(e)
					} finally {
						resolve()
					}
				}
			})
		})
	})

	it('should load all files in correct order', function () {
		this.timeout(TIMEOUT)

		const server = startServer({
			bps: 1024 * 512,
			port: 4000,
			basePath
		})

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
					server.close()
					console.log(orderedKeys)
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
					console.log(actualAsap)
					console.log(actualNext)
					console.log(actualRest)

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
});
