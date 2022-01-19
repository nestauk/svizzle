// import {strict as assert} from 'assert';
import * as _ from 'lamb'
import {fetch} from 'undici';

import {makeFetchDriver} from './fetchDriver.js'

const sources = {
	'NUTS-2013-0-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_0.json'
	},
	'NUTS-2013-1-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_1.json'
	},
	'NUTS-2013-2-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_2.json'
	},
	'NUTS-2013-3-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2013_4326_LEVL_3.json'
	},
	'NUTS-2013-0-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2013_4326_LEVL_0.json'
	},
	'NUTS-2013-1-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2013_4326_LEVL_1.json'
	},
	'NUTS-2013-2-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2013_4326_LEVL_2.json'
	},
	'NUTS-2016-0-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_0.json'
	},
	'NUTS-2016-1-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_1.json'
	},
	'NUTS-2016-2-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_2.json'
	},
	'NUTS-2016-3-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2016_4326_LEVL_3.json'
	},
	'NUTS-2016-0-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_0.json'
	},
	'NUTS-2016-1-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_1.json'
	},
	'NUTS-2016-2-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_2.json'
	},
	'NUTS-2021-0-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2021_4326_LEVL_0.json'
	},
	'NUTS-2021-1-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2021_4326_LEVL_1.json'
	},
	'NUTS-2021-2-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_10M_2021_4326_LEVL_2.json'
	},
	'NUTS-2021-3-10':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_3.json'
	},
	'NUTS-2021-0-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_0.json'
	},
	'NUTS-2021-1-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_1.json'
	},
	'NUTS-2021-2-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_2.json'
	},
	'NUTS-2021-3-03':{
		url: 'https://unpkg.com/@svizzle/atlas@0.6.0/data/dist/NUTS/topojson/NUTS_RG_03M_2021_4326_LEVL_3.json'
	}
}

const priorities = {
	asap: [
		'NUTS-2016-1-03',
	],
	next: [
		'NUTS-2021-0-10',
		'NUTS-2013-0-10',
		'NUTS-2016-0-10',
		'NUTS-2016-2-03',
	]
}

const decoder = new TextDecoder()
const decode = bytes => decoder.decode(bytes)
const jsonParser = _.pipe([
	decode,
	JSON.parse
])


describe('fetchDriver', function () {
	describe('simple', function () {
		it('should load a few files',
			function (done) {
				this.timeout(20000)
				const sourcesCount = _.keys(sources).length
				console.log('sourcesCount', sourcesCount)
				const {
					_asapKeys,
					_defaultTransformer,
					_nextKeys,
					_outData,
					_outLoadingKeys,
					_shouldPrefetch,
					_uriMap
				} = makeFetchDriver(fetch)

				_shouldPrefetch.set(true)
				_defaultTransformer.set(jsonParser)
				_uriMap.set(sources)
				_asapKeys.set(priorities.asap)
				_nextKeys.set(priorities.next)

				_outData.subscribe(data => {
					const keys = _.keys(data)
					console.log('loaded', keys.length)
					if (keys.length === sourcesCount) {
						done()
					}
				})
			}
		)
	});
});
