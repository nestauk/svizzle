import { a as isClientSide } from './env.21c1c15f.js';

const makeURL = (base, id, year) => {
	let url = year
		? `${base}/${id}/${year}`
		: `${base}/${id}`;

	if (isClientSide) {
		const {protocol, host} = location;

		url = new URL(url, `${protocol}//${host}`).toString();
	}
	
	return url;
};

var regionSpecs = {
	world: {
		// epsgId: 4326, // TODO
		// levels: undefined, // TODO
		// years: undefined, // TODO
		objectIds: ['countries', 'land'],
		properties: ['iso_a2'],
		resolutions: ['110m'],
		type: 'world',
	},
	NUTS: {
		epsgId: 4326,
		levels: [0, 1, 2, 3],
		objectIds: ['NUTS'],
		properties: [
			'NUTS_ID',
			'LEVL_CODE',
			'CNTR_CODE',
			'NUTS_NAME',
			'FID',
		],
		resolutions: ['03M', '10M'],
		type: 'NUTS',
		years: [
			2003,
			2006,
			2010,
			2013,
			2016,
			2021,
		],
	},
};

/* navigation */

const hrefBase = '/svizzle/compounds/time_region_value';

/* flags */

const flags = {
	showPOIs: false
};

/* regional selection */

const regionType = 'NUTS';

const regionSettings = {
	canSelectLevels: true,
	filterableLevel: 0,
	ignoredRegions: [
		'ES7',
		'FR9',
		'FRY',
		'IS',
		'PT2',
		'PT3',
		'TR',
	],
	key: 'NUTS_ID',
	level: 2,
	level0: undefined,
	levels: regionSpecs[regionType].levels,
	objectId: 'NUTS',
	resolution: '03M',
	type: regionType,
};

export { flags as f, hrefBase as h, makeURL as m, regionSettings as r };
