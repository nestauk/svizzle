import {
	isIterableNotEmpty,
	mergeObj,
	negate,
	startsWith
} from '@svizzle/utils';
import * as _ from 'lamb';
import {derived, writable} from 'svelte/store';

import UK_NUTS_1_2 from '../data/UK_NUTS_1_2.json';

export const _regionSettings = writable();
export const setRegionSettings = obj => _regionSettings.set(obj);

export const _getFeatureKey = derived(
	_regionSettings,
	regionSettings => _.getPath(`properties.${regionSettings.key}`)
);

export const _hasValidKey = derived(
	[_regionSettings, _getFeatureKey],
	([regionSettings, getFeatureKey]) => _.pipe([
		getFeatureKey,
		key => _.find(
			regionSettings.ignoredRegions,
			ignoredRegion => startsWith(key, ignoredRegion)
		),
		_.isUndefined
	])
);

// selected regions

const noNutsSelected = _.mapValues(UK_NUTS_1_2, mergeObj({selected: false}));
const allNutsSelected = _.mapValues(UK_NUTS_1_2, mergeObj({selected: true}));
export const _nutsSelection = writable(allNutsSelected);
export const _nutsRegions = derived(_nutsSelection, _.values);

export const selectAllRegions = () => _nutsSelection.set(allNutsSelected);
export const deselectAllRegions = () => _nutsSelection.set(noNutsSelected);

export const toggleRegionNUTS1 =
	id => _nutsSelection.update(_.updatePath(`${id}.selected`, negate));

export const selectRegionNUTS1 =
	id => _nutsSelection.update(_.setPath(`${id}.selected`, true));

export const _someUnselectedRegions = derived(
	_nutsSelection,
	_.pipe([
		_.values,
		_.filterWith(_.pipe([_.getKey('selected'), _.is(false)])),
		isIterableNotEmpty
	])
);

const getSelectedChildren = _.pipe([
	_.values,
	_.filterWith(_.getKey('selected')),
	_.flatMapWith(_.getKey('children'))
]);
export const _selectedNUT2Ids = derived(
	_nutsSelection,
	nutsSelection => getSelectedChildren(nutsSelection)
);

// pre-selected regions

const getNUTS1Children = id => UK_NUTS_1_2[id].children;
export const _preselectedNUTS1Id = writable(null);
export const _preselectedNUTS2Ids = derived(
	_preselectedNUTS1Id,
	id => id && getNUTS1Children(id) || []
);
