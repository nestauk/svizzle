import regionSpecs from '@svizzle/atlas/src/specs';

/* navigation */

export const hrefBase = 'compounds/time_region_value';

/* flags */

export const flags = {
	showPOIs: true
}

/* regional selection */

const regionType = 'nuts';

export const regionSettings = {
	canFilterByLevel0: false,
	canSelectLevel: false,
	key: 'NUTS_ID',
	level: 2,
	level0: 'UK',
	levels: regionSpecs[regionType].levels,
	objectId: regionSpecs[regionType].objectId,
	resolution: '03M',
	type: regionType,
}
