// import * as _ from 'lamb';
import {derived, get, readable} from 'svelte/store';
import {inclusiveRange} from '@svizzle/utils';
import {
	getYearExtent,
	makeIndicatorsLookup
} from '@svizzle/time_region_value/src/node_modules/utils/data';

// TODO automatically generate a random data file
import groups from './indicatorsGroups.json';

/* data */

export const _groups = readable(groups);
export const _lookup = derived(_groups, makeIndicatorsLookup);
export const lookup = get(_lookup);
export const _yearExtent = derived(_groups, getYearExtent);
export const _yearRange = derived(_yearExtent, inclusiveRange);
