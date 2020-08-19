import {feature} from 'topojson-client';
import {setGeometryPrecision} from '@svizzle/geo';

export const truncateGeojson = setGeometryPrecision(4);
export const topoToGeo = (topojson, id) =>
	truncateGeojson(feature(topojson, topojson.objects[id]));
