// import * as _ from 'lamb';
import {derived, get, readable, writable} from 'svelte/store';
import {inclusiveRange} from '@svizzle/utils';
import {
	getYearExtent,
	makeIndicatorsLookup
} from '@svizzle/time_region_value/src/node_modules/utils/data';

// TODO automatically generate a random data file
import groups from './indicatorsGroups.json';

/* data */

export const groupsStore = readable(groups);
export const lookupStore = derived(groupsStore, makeIndicatorsLookup);
export const lookup = get(lookupStore);
export const yearExtentStore = derived(groupsStore, getYearExtent);
export const yearRangeStore = derived(yearExtentStore, inclusiveRange);

/* selection */

export const selectedYearStore = writable();
export const resetSelectedYear = () => {
	selectedYearStore.set();
}

export const availableYearsStore = writable([]);

export const resetSelection = () => {
	availableYearsStore.set([]);
	resetSelectedYear();
};
