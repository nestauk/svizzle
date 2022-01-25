// import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {fetch} from 'undici'
import http from 'http'
import serveHandler from 'serve-handler'
import path from 'path'
import {createReadStream} from 'fs'
import Throttle from 'throttle'

import {makeFetchDriver} from './fetchDriver.js'

const DEBUG = false
const debug = (...args) => DEBUG && console.log(...args)

const sources = {
	'NUTS-2013-0-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2013_4326_LEVL_0.json'
	},
	'NUTS-2013-1-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2013_4326_LEVL_1.json'
	},
	'NUTS-2013-2-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2013_4326_LEVL_2.json'
	},
	'NUTS-2013-3-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2013_4326_LEVL_3.json'
	},
	'NUTS-2013-0-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2013_4326_LEVL_0.json'
	},
	'NUTS-2013-1-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2013_4326_LEVL_1.json'
	},
	'NUTS-2013-2-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2013_4326_LEVL_2.json'
	},
	'NUTS-2016-0-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2016_4326_LEVL_0.json'
	},
	'NUTS-2016-1-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2016_4326_LEVL_1.json'
	},
	'NUTS-2016-2-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2016_4326_LEVL_2.json'
	},
	'NUTS-2016-3-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2016_4326_LEVL_3.json'
	},
	'NUTS-2016-0-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2016_4326_LEVL_0.json'
	},
	'NUTS-2016-1-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2016_4326_LEVL_1.json'
	},
	'NUTS-2016-2-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2016_4326_LEVL_2.json'
	},
	'NUTS-2021-0-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2021_4326_LEVL_0.json'
	},
	'NUTS-2021-1-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2021_4326_LEVL_1.json'
	},
	'NUTS-2021-2-10':{
		url: 'http://localhost:3000/NUTS_RG_10M_2021_4326_LEVL_2.json'
	},
	'NUTS-2021-3-10':{
		url: 'http://localhost:3000/NUTS_RG_03M_2021_4326_LEVL_3.json'
	},
	'NUTS-2021-0-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2021_4326_LEVL_0.json'
	},
	'NUTS-2021-1-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2021_4326_LEVL_1.json'
	},
	'NUTS-2021-2-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2021_4326_LEVL_2.json'
	},
	'NUTS-2021-3-03':{
		url: 'http://localhost:3000/NUTS_RG_03M_2021_4326_LEVL_3.json'
	}
}

const decoder = new TextDecoder()
const decode = bytes => decoder.decode(bytes)
const jsonParser = _.pipe([
	decode,
	JSON.parse
])

const TIMEOUT = 40000

describe('fetchDriver', function () {
	const basePath = path.resolve('../atlas/distro')
	console.log(basePath)
	const server = http.createServer(async (req, res) => {
		await serveHandler(
			req,
			res,
			{
				public: basePath
			},
			{
				createReadStream (filePath, config) {
					console.log('creating read stream for', filePath, config)
					const throttledStream = new Throttle({bps: 1024*100})
					createReadStream(filePath, config).pipe(throttledStream)
					return throttledStream
				}
			}
		)
	})
	server.listen(3000)

	it('should load all files in sources', function (done) {
		this.timeout(TIMEOUT)

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

		_shouldPrefetch.next(true)
		_defaultTransformer.next(jsonParser)
		_uriMap.next(sources)
		_asapKeys.next(priorities.asap)
		_nextKeys.next(priorities.next)

		_outLoadingKeys.subscribe(loadingKeys => {
			debug('loadingKeys', loadingKeys.length)
		})

		_outData.subscribe(data => {
			const keys = _.keys(data)
			debug('loaded', keys.length)
			if (keys.length === sourcesCount) {
				done()
			}
		})
	})

	it('should only load files in asapKeys', function (done) {
		this.timeout(TIMEOUT)

		const priorities = {
			asap: [
				'NUTS-2016-1-03',
				'NUTS-2021-0-10',
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

		_outLoadingKeys.subscribe(loadingKeys => {
			debug('loadingKeys', loadingKeys.length)
		})

		_outData.subscribe(data => {
			const keys = _.keys(data)
			debug('loaded', keys.length)
			if (keys.length === sourcesCount) {
				done()
			}
		})
	})

	it('should load all files in correct order', function (done) {
		this.timeout(TIMEOUT)

		const priorities = {
			asap: [
				'NUTS-2016-1-03',
				'NUTS-2021-0-10',
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

		_outLoadingKeys.subscribe(loadingKeys => {
			debug('loadingKeys', loadingKeys.length)
		})

		_outData.subscribe(data => {
			const keys = _.keys(data)
			debug('loaded', keys.length)
			if (keys.length === sourcesCount) {
				done()
				server.close()
			}
		})
	})

});
