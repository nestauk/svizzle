import {strict as assert} from 'assert';

import {sanitize} from '@svizzle/utils';

import NUTS_RG_03M_2003_4326_LEVL_0
	from '../../../atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2003_4326_LEVL_0.json';
import NUTS_RG_03M_2006_4326_LEVL_0
	from '../../../atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2006_4326_LEVL_0.json';
import NUTS_RG_03M_2003_4326_LEVL_0_BE
	from '../../../atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2003_4326_LEVL_0_BE.json';
import NUTS_RG_03M_2006_4326_LEVL_0_BE
	from '../../../atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2006_4326_LEVL_0_BE.json';
import {geojson} from '../../testdata/topojson/topoToGeo';
import {makeFilterTopoBy, topoToGeo} from './topojson';

describe('geo/topojson', function() {
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
	});

	describe('makeFilterTopoBy', function() {
		it('should provide a function to filter a topojson by `objects` id and `properties` key', function() {
			const filterGeometriesBy = makeFilterTopoBy({
				objKey: 'NUTS',
				propKey: 'NUTS_ID'
			});
			const filterBE = filterGeometriesBy('BE');

			// BE 2003
			const actualBE2003 = filterBE(NUTS_RG_03M_2003_4326_LEVL_0);
			assert.deepStrictEqual(
				sanitize(actualBE2003),
				NUTS_RG_03M_2003_4326_LEVL_0_BE
			);

			// BE 2006
			const actualBE2006 = filterBE(NUTS_RG_03M_2006_4326_LEVL_0);
			assert.deepStrictEqual(
				sanitize(actualBE2006),
				NUTS_RG_03M_2006_4326_LEVL_0_BE
			);
		});
	});
});
