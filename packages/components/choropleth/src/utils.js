/**
* @module @svizzle/choropleth/utils
*/

import {feature} from 'topojson-client';
import {setGeometryPrecision} from '@svizzle/geo';

export const defaultGeometry = {
	bottom: 10,
	left: 10,
	right: 10,
	top: 10,
};

export const truncateGeojson = setGeometryPrecision(4);

/**
 * Convert a topojson to a geojson truncating coordinates to precision 4.
 * This is quite specific to `@svizzle/choropleth` to limit the geojson weight down for performance reasons.
 * For a full conversion use:
 * ```
 * import {feature} from 'topojson-client';
 * feature(topojson, topojson.objects[id])
 * ```
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
					[[6.3163,50.4967], ...
				]
			}
		}
	]
}
 *
 * @since 0.4.0
 */
export const topoToGeo = (topojson, id) =>
	truncateGeojson(feature(topojson, topojson.objects[id]));
