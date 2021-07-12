import regionSpecs from '@svizzle/atlas/src/specs';

/* navigation */

export const hrefBase = '/svizzle/compounds/time_region_value';

/* flags */

export const flags = {
	showPOIs: false
}

/* regional selection */

const regionType = 'NUTS';

export const regionSettings = {
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
}
