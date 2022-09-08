import {
	arrayMax,
	arrayMin,
	inclusiveRange,
	makeArrayTransformer,
} from '@svizzle/utils';
import * as _ from 'lamb';
import {derived, writable} from 'svelte/store';

/* groups */

export const _groups = writable([]);
export const setGroups = groups => _groups.set(groups);

/* lookup */

export const _lookup = writable({});

// resets the lookup when we pass new _groups
export const makeIndicatorsLookup = _.pipe([
	_.pluck('indicators'),
	_.flatten,
	_.indexBy(_.getPath('schema.value.id')),
]);
_groups.subscribe(groups => {
	_lookup.set(makeIndicatorsLookup(groups));
});

/* time */

// year extent

// IDEA just flatten and get the whole extent
export const getYearExtent = _.pipe([
	_.pluck('indicators'),
	_.flatten,
	_.pluck('year_extent'),
	_.transpose,
	makeArrayTransformer([arrayMin, arrayMax]),
]);
export const _yearExtent = derived(_groups, getYearExtent);

// year range

export const _yearRange = derived(_yearExtent, inclusiveRange);

/* cache indicators? or should it be app logic? */

// _reconciledIndicator.subscribe(({id, data}) => {
// 	if (id) {
// 		_lookup.update(_.setPath(`${id}.data`, data));
// 	}
// });
