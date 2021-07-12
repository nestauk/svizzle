import {version} from '../package.json';

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

export const atlasBase = `https://unpkg.com/@svizzle/atlas@${version}/data/dist`;
export const makeTopoURL = (id, type, base = atlasBase) => ({
	NUTS: `${base}/NUTS/topojson/${id}.json`,
	world: `${base}/world/${id}.json`,
})[type]
