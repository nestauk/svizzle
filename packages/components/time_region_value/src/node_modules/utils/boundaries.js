import {makeTopoURL} from '@svizzle/atlas/src/utils';
import {topoToGeo} from '@svizzle/choropleth/src/utils';
import {requestJson} from '@svizzle/request';

export const topoCache = {};
export const getTopojson = async regionId => {
	let topo = topoCache[regionId];

	if (!topo) {
		const topoURL = makeTopoURL(regionId, 'NUTS');
		topo = await requestJson(topoURL);
		topoCache[regionId] = topo;
	}

	return topo;
}

const geoCache = {};
export const makeGeojson = ({objectId, regionId, topojson}) => {
	let geojson = geoCache[regionId];

	if (!geojson) {
		geojson = topoToGeo(topojson, objectId);
		geoCache[regionId] = geojson;
	}

	return geojson;
}
