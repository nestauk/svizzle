import {getYearExtent, makeIndicatorsLookup} from '@svizzle/time_region_value';
import {inclusiveRange} from '@svizzle/utils';
import {derived, readable} from 'svelte/store';

import {default as groups} from './indicatorsGroups.js';

export const lookup = makeIndicatorsLookup(groups);

/* data */

export const _groups = readable(groups);
export const _yearExtent = derived(_groups, getYearExtent);
export const _yearRange = derived(_yearExtent, inclusiveRange);
