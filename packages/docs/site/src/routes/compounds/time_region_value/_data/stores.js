import {inclusiveRange} from '@svizzle/utils';
import {
	getYearExtent,
	makeIndicatorsLookup
} from '@svizzle/time_region_value/src/node_modules/stores/dataset';
import {derived, readable} from 'svelte/store';

import groups from './indicatorsGroups.json';

export const lookup = makeIndicatorsLookup(groups);

/* data */

export const _groups = readable(groups);
export const _yearExtent = derived(_groups, getYearExtent);
export const _yearRange = derived(_yearExtent, inclusiveRange);
