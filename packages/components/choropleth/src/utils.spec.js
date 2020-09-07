import {strict as assert} from 'assert';

import NUTS_RG_03M_2003_4326_LEVL_0_BE from '@svizzle/atlas/distro/NUTS_RG_03M_2003_4326_LEVL_0_BE.json';

import {topoToGeo} from './utils';
import {geojson} from './utils.specdata';

describe('choropleth/utils', function() {
	describe('topoToGeo', function() {
		/*
		// NUTS_RG_03M_2003_4326_LEVL_0_BE.json
		{
			"type":"Topology",
			"transform":{
				"scale":[0.00001,0.00001],
				"translate":[-63.15364,-21.38731]
			},
			"objects":{
				"NUTS":{
					"type":"GeometryCollection",
					"geometries":[
						{
							"type":"Polygon",
							"arcs":[...],
							"id":"BE",
							"properties":{"NUTS_ID":"BE","LEVL_CODE":0,"CNTR_CODE":"BE","NUTS_NAME":"Belgique-België","FID":"BE"}
						}
					]
				}
			},
			"arcs":[...]
		}
		*/
		it('should convert a topojson to a geojson', function() {
			const actual = topoToGeo(NUTS_RG_03M_2003_4326_LEVL_0_BE, 'NUTS');

			assert.deepStrictEqual(actual, geojson);
		});

		// TODO check it's a geojson
		// TODO check the precision is 4
	});
});
