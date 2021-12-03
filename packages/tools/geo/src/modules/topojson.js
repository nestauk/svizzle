/**
* @module @svizzle/geo/src/modules/topojson
*/

import {feature} from 'topojson-client';

/**
 * Convert a topojson to a geojson.
 * Ported from /choropleth v0.4.0 to /geo v0.7.0, but without truncating digits.
 *
 * @function
 * @arg {object} topojson - the topojson to be converted to geojson
 * @arg {id} string - the id of the object to convert
 * @return {object} geojson
 *
 * @example
> const topojson = {
	'type': 'Topology',
	'transform': {
		'scale': [0.00001,0.00001],
		'translate': [-63.15364,-21.38731]
	},
	'objects': {
		'NUTS': {
			'type': 'GeometryCollection',
			'geometries': [
				{
					'type': 'Polygon',
					'arcs': [...],
					'id': 'BE',
					'properties': {...}
				}
			]
		}
	},
	'arcs': [[[6569909,7247636], [1369,-1901], ...]
}
> topoToGeo(topojson, 'NUTS')
{
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'id': 'BE',
			'properties': {...},
			'geometry': {
				'type': 'Polygon',
				'coordinates': [
					[[6.3163...,50.4967...],
					...
				]
			}
		}
	]
}
 *
 * @since 0.7.0
 */
export const topoToGeo = (topojson, id) =>
	feature(topojson, topojson.objects[id]);
