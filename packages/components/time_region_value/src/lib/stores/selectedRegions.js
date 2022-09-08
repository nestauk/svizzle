import {default as hierarchy} from '@svizzle/atlas/data/dist/NUTS/hierarchy.js';
import {
	getId,
	isNotNil,
	updateKeys,
} from '@svizzle/utils';
import * as _ from 'lamb';
import {derived, get, writable} from 'svelte/store';

// lib/utils
import {getLevel, getName, getRootId} from '../utils/domain.js';

// lib/stores
import {
	_availableLevels,
	_firstAvailableLevel,
	_regionSettings,
} from './regionSettings.js';

/* filtering */

// selection mode

export const _doFilterRegions = writable(false);

// level

/* TBD
we need `_currentLevel` not to be a `derived` but to depend on the settings
so that if we pass new settings we reset to the the new initialLevel
*/

let initialLevel = get(_regionSettings)?.initialLevel || 0;
export const _currentLevel = writable(initialLevel);

_regionSettings.subscribe(({initialLevel: initLevel}) => {
	initLevel && _currentLevel.set(initLevel);
});

/* selected regions */

const makeInitialSelection = _.pipe([
	_.values,
	_.groupBy(getLevel),
	_.mapValuesWith(_.pipe([
		_.groupBy(getRootId),
		_.mapValuesWith(_.pipe([
			_.indexBy(getId),
			_.mapValuesWith(_.setKey('status', 1))
		]))
	]))
]);
const initialSelection = makeInitialSelection(hierarchy);

export const _regionsSelection = writable(initialSelection);

/* utils */

const sortByName = _.sortWith([getName]);
const getValuesSortedByName = _.pipe([
	_.values,
	sortByName
]);

// updaters

const makeSetStatusTo = value => _.setKey('status', value);
const setStatusTo0 = makeSetStatusTo(0);
const setStatusTo1 = makeSetStatusTo(1);

// levels

const getLevelRegions = _.pipe([
	_.values,
	_.flatMapWith(_.values),
]);

/* menu */

// focused root id

const getRootsSortedByName = _.pipe([
	_.getKey(0),
	getLevelRegions,
	sortByName
]);
const makeFirstRootId = _.pipe([getRootsSortedByName, _.getPath('0.id')]);
const firstFocusedRootId = makeFirstRootId(initialSelection);
export const _focusedRootId = writable(firstFocusedRootId);

export const focusRoot = rootId => _focusedRootId.set(rootId);

// focused root

export const _focusedRoot = derived(
	[_focusedRootId, _regionsSelection],
	([focusedRootId, regionsSelection]) =>
		regionsSelection[0][focusedRootId][focusedRootId]
);

// layout

export const _isMenuExpanded = derived(_currentLevel, _.isGT(0));

/* menu: roots */

// roots

export const _roots = derived(_regionsSelection, getRootsSortedByName);

// update all roots

export const updateAllRootsWith = updater => () => _regionsSelection.update(
	_.mapValuesWith(
		_.mapValuesWith(
			_.mapValuesWith(updater)
		)
	)
);
export const selectAllRoots = updateAllRootsWith(setStatusTo1);
export const deselectAllRoots = updateAllRootsWith(setStatusTo0);

// update a root and all its descendents

export const toggleRoot = rootId => _regionsSelection.update(
	selection => {
		const rootStatus = selection[0][rootId][rootId].status;
		const newStatus = rootStatus !== 1 ? 1 : 0;
		const newSelection = _.mapValues(
			selection,
			_.updateKey(rootId, _.mapValuesWith(makeSetStatusTo(newStatus)))
		);

		return newSelection;
	}
);

/* menu: descendants */

// focused root descendants

export const _focusedRootDescendants = derived(
	[_currentLevel, _focusedRootId, _regionsSelection],
	([currentLevel, focusedRootId, regionsSelection]) =>
		getValuesSortedByName(regionsSelection[currentLevel][focusedRootId])
);

// update all descendants of the focused root at the current level

export const updateAllFocusedRootChildrenWith = statusUpdater => () => {
	const availableLevels = get(_availableLevels);
	const focusedRootId = get(_focusedRootId);

	// e.g. selecting all descendants of FR at level 2
	// should select FR and all of the regions in that branch
	const updateFn = updateKeys({
		keys: availableLevels,
		updater: _.updateKey(
			focusedRootId,
			_.mapValuesWith(statusUpdater)
		),
	});

	_regionsSelection.update(updateFn);
};

export const selectAllFocusedRootChildren =
	updateAllFocusedRootChildrenWith(setStatusTo1);

export const deselectAllFocusedRootChildren =
	updateAllFocusedRootChildrenWith(setStatusTo0);

// update a specific child of the focused root at the current level

export const toggleFocusedRootDescendant = regionId => {
	const currentLevel = get(_currentLevel);
	const firstAvailableLevel = get(_firstAvailableLevel);
	const focusedRootId = get(_focusedRootId);
	const selection = get(_regionsSelection);

	const region = selection[currentLevel][focusedRootId][regionId];
	const newStatus = region.status !== 1 ? 1 : 0;

	// region & descendants:
	// descendants take same status as toggled region

	let regions = [region];
	while (regions.length > 0) {
		const {children, id, level} = regions.shift();

		selection[level][focusedRootId][id].status = newStatus;

		if (children) {
			regions = regions.concat(_.map(children, cid => hierarchy[cid]));
		}
	}

	// region & ancestors:
	// - if all its children have same status, give that status to their parent
	// - else set the parent to partially selected (-1)

	regions = [region];
	while (regions.length > 0) {
		const {pid, level} = regions.shift();

		if (isNotNil(pid)) {
			const siblingsStatuses = _.uniques(_.map(
				hierarchy[pid].children,
				id => selection[level][focusedRootId][id].status
			));

			const parentLevel = level - 1;

			if (parentLevel >= firstAvailableLevel) {
				selection[parentLevel][focusedRootId][pid].status =
				siblingsStatuses.length === 1
					?	siblingsStatuses[0]
					: -1;
			}

			regions.push(hierarchy[pid])
		}
	}

	// update
	_regionsSelection.set(selection);
}

// dirty selection? (= not all regions are selected)

export const _isRegionsSelectionDirty = derived(
	_regionsSelection,
	regionsSelection => {
		const currentLevel = get(_currentLevel);
		const currentLevelSelection = regionsSelection[currentLevel];

		let isDirty = false;
		let rootIds = _.keys(currentLevelSelection);
		while (rootIds.length > 0) {
			const rootId = rootIds.shift();

			let ids = _.keys(currentLevelSelection[rootId]);
			while (ids.length > 0) {
				const id = ids.shift();

				if (currentLevelSelection[rootId][id].status !== 1) {
					isDirty = true;
					break
				}
			}

			if (isDirty === true) {
				break
			}
		}

		return isDirty;
	}
);

// level updates

export const setCurrentLevel = newLevel => {
	const previousLevel = get(_currentLevel);
	const didSelectLowerLevel = newLevel < previousLevel;

	if (didSelectLowerLevel) {
		const selection = get(_regionsSelection);

		// region & descendants:
		// for all regions at new level:
		// 	if region is partial:
		// 		- set status to 1
		// 		- set all descendants to 1

		let regions = _.map(
			getLevelRegions(selection[newLevel]),
			item => ({item}) // newLevel regions, don't pass a `status`
		);

		while (regions.length > 0) {
			const {item, status} = regions.shift();
			const {children, id, level, rootId} = item;

			const region = selection[level][rootId][id];

			// get the new status

			let newStatus;
			if (level === newLevel) {
				if (region.status === -1) {
					newStatus = 1;
				}
			} else if (status) {
				newStatus = status;
			}

			// if the status has changed (`newStatus` is defined):
			// - assign new status
			// - collect descendants to assign them the their parent status

			if (newStatus) {
				region.status = newStatus;

				if (children) {
					regions = regions.concat(_.map(children, cid => {
						const {id: id_, level: level_, rootId: rootId_} = hierarchy[cid];

						return {
							item: selection[level_][rootId_][id_],
							status: newStatus
						}
					}))
				}
			}
		}

		// for all ancestors:
		// in reverse order, set parents status based on childrens'

		const firstAvailableLevel = get(_firstAvailableLevel);

		let parentLevel = newLevel - 1;
		while (parentLevel >= firstAvailableLevel) {
			let regions_ = getLevelRegions(selection[parentLevel]);
			while (regions_.length > 0) {
				const {children, level, rootId, id} = regions_.shift();

				if (isNotNil(children)) {
					const childrenStatuses = _.uniques(
						_.map(children, cid => selection[level + 1][rootId][cid].status)
					);

					selection[level][rootId][id].status =
						childrenStatuses.length === 1
							?	childrenStatuses[0]
							: -1;
				}
			}

			parentLevel--;
		}

		// update
		_regionsSelection.set(selection);
	}

	// update
	_currentLevel.set(newLevel);
}
