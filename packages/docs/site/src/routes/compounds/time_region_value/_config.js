import {regionSpecs} from '@svizzle/atlas';
import allBboxes from '@svizzle/atlas/data/dist/NUTS/allBboxes.js';
import overseaIdsGroups from '@svizzle/atlas/data/dist/NUTS/overseaIdsGroups.js';
import * as _ from 'lamb';

/* navigation */

export const hrefBase = '/svizzle/compounds/time_region_value';

/* flags */

export const flags = {
	showPOIs: false
}

/* regional selection */

const regionType = 'NUTS';

const {levels, years} = regionSpecs[regionType];
const [rootLevel] = levels;
const {unified: {mainland: maxBbox}} = allBboxes;

export const regionSettings = {
	atlasBase: '/svizzle/atlas',
	canSelectLevels: true,
	filterableLevel: 0,
	initialLevel: rootLevel,
	key: 'NUTS_ID',
	levels,
	maxBbox,
	objectId: 'NUTS',
	processing: {
		// clip at level 0 (e.g. France - French Guyane)
		clipIds: _.pluckFrom(overseaIdsGroups, 'rootId'), // or []

		// exclude at levels 1-3 (e.g. French Guyane)
		excludeIds: _.flatMap(overseaIdsGroups, _.getKey('descendantIds')), // or []
	},
	resolution: '10M',
	rootIds: undefined, // all roots
	type: regionType,
	years,
}
