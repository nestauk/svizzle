import {derived, writable} from 'svelte/store';
import {inclusiveRange} from '@svizzle/utils';

import {getYearExtent, makeIndicatorsLookup} from '../utils/data';

/* groups */

export const _groups = writable([]);
export const setGroups = groups => _groups.set(groups);

/* lookup */

export const _lookup = derived(_groups, makeIndicatorsLookup);

/* POIs */

export const _POIs = writable();
export const setPOIs = POIs => _POIs.set(POIs);

/* year extent */

export const _yearExtent = derived(_groups, getYearExtent);

/* year range */

export const _yearRange = derived(_yearExtent, inclusiveRange);
