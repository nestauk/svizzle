import {default as yearlyNutsIdToId} from '../data/dist/NUTS/yearlyNutsIdToId.js';

export const makeTopoId = ({
	level = undefined,
	level0 = undefined,
	resolution = undefined,
	type,
	year,
}) => {
	let id;

	if (type === 'NUTS') {
		id = `NUTS_RG_${resolution}_${year}_4326_LEVL_${level}`;

		if (level0) {
			id = `${id}_${level0}`;
		}
	} else if (type === 'world') {
		id = `World_${resolution}_iso_a2_topo`;
	}

	return id;
}

// needed to avoid importing `package.json` with `createRequire`
// so to make this file usable in the client
export const version = '0.9.2';

export const atlasBase = `https://unpkg.com/@svizzle/atlas@${version}/data/dist`;

export const makeTopoURL =
	(id, type, base = atlasBase) => `${base}/${type}/topojson/${id}.js`;

export const getAtlasId =
	({regionId, specYear, type}) =>
		type === 'NUTS'
			? yearlyNutsIdToId[`${specYear}/${regionId}`]
			: undefined;
