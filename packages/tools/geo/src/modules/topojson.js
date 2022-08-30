/**
* @module @svizzle/geo/src/modules/topojson
*/

import * as _ from 'lamb';
import {feature} from 'topojson-client';
import prune from 'topojson-simplify/src/prune';

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

/**
 * Return a function expecting a value for the provided property in the object
 * corresponding to the provided object id and that returns a function expecting
 * the topojson to be filtered.
 *
 * @function - Object -> Any -> (Object -> Object)
 * @arg {object} options
 * @arg {string} options.objId - a key of `topojson.objects`
 * @arg {string} options.propKey - a key of `topojson.objects[objId].geometries[i].properties`
 * @return {function} - Any -> (Object -> Object)
 *
 * @example
 *
 *
> filterGeometriesBy = makeFilterTopoBy({objId: 'NUTS', propKey: 'NUTS_ID'})
> topoRO = filterGeometriesBy('RO')
>
> topoRO(NUTS_RG_03M_2003_4326_LEVL_0)
// see `svizzle/atlas/data/dist/topojson/NUTS_RG_03M_2003_4326_LEVL_0_RO.json`
>
> topoRO(NUTS_RG_03M_2006_4326_LEVL_0)
// see `svizzle/atlas/data/dist/topojson/NUTS_RG_03M_2006_4326_LEVL_0_RO.json`
 *
 * @since 0.8.0
 */
export const makeFilterTopoBy = ({objKey, propKey}) =>
	value => _.pipe([
		_.updatePath(
			`objects.${objKey}.geometries`,
			_.filterWith(_.pipe([
				_.getPath(`properties.${propKey}`),
				_.is(value),
			]))
		),
		prune
	]);
