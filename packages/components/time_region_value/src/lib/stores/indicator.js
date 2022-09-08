import {default as hierarchy} from '@svizzle/atlas/data/dist/NUTS/hierarchy.js';
import {default as yearlyNutsIdToId}
	from '@svizzle/atlas/data/dist/NUTS/yearlyNutsIdToId.js';
import {setIndexAsKey} from '@svizzle/utils';
import * as _ from 'lamb';
import {writable, derived} from 'svelte/store';

// lib/utils
import {getYear} from '../utils/domain.js';
import {makeGetIndicatorFormatOf} from '../utils/format.js';

// lib/stores
import {_lookup} from './dataset.js';
import {
	_currentLevel,
	_doFilterRegions,
	_regionsSelection,
} from './selectedRegions.js';
import {_selectedYear} from './selectedYear.js';

/* current indicator data */

export const _indicator = writable({
	data: [],
	id: undefined,
});

export const _reconciledIndicator = derived(_indicator, ({data, id}) => {
	const reconciledData = _.map(data, datapoint => {
		const {region_id, region_year_spec} = datapoint;
		const yearlyNutsId = `${region_year_spec}/${region_id}`;
		const atlasId = yearlyNutsIdToId[yearlyNutsId];
		const region = hierarchy[atlasId];

		if (!region) {
			console.log('no region for: ', atlasId); // FIXME, log in production?
		}

		return {...datapoint, region};
	});

	return {data: reconciledData, id};
});

export const _availableYears = derived(
	[_indicator, _lookup],
	([{id}, lookup]) => id ? lookup[id].availableYears : []
);

/* current indicator utils */

export const _formatFn = derived(
	[_indicator, _lookup],
	([{id}, lookup]) => {
		const getIndicatorFormat = makeGetIndicatorFormatOf(id);
		const formatFn = getIndicatorFormat(lookup);

		return formatFn
	}
);

export const _getIndicatorValue = derived(_indicator, ({id}) => _.getKey(id));

const makeSetOrderWith = accessor => _.pipe([
	_.groupBy(getYear),
	_.mapValuesWith(_.pipe([
		_.sortWith([_.sorterDesc(accessor)]),
		setIndexAsKey('order'),
	])),
	_.values,
	_.flatten,
]);
const _setOrder = derived(_getIndicatorValue, makeSetOrderWith);

/* data */

// all years

export const _levelData = derived(
	[_currentLevel, _reconciledIndicator],
	([currentLevel, {id, data}]) =>
		id && _.filter(data, ({region_level}) => region_level === currentLevel)
		|| []
);

export const _rankedData = derived(
	[_levelData, _setOrder],
	([levelData, setOrder]) => setOrder(levelData)
);

export const _selectionData = derived(
	[_doFilterRegions, _rankedData, _regionsSelection],
	([doFilterRegions, rankedData, selection]) => _.reduce(
		rankedData,
		(acc, datapoint) => {
			const {region: {id, level, rootId}} = datapoint;
			const isSelected = selection[level][rootId][id].status === 1;

			if (!doFilterRegions || isSelected) {
				acc.push({...datapoint, isSelected});
			}

			return acc;
		},
		[]
	)
);

// selected year

export const _yearSelectionData = derived(
	[_selectedYear, _selectionData],
	([selectedYear, selectionData]) =>
		selectedYear &&
		_.filter(selectionData, ({year}) => year === selectedYear)
		|| []
);

/* regions */

// assuming all datapoints in a year have same `region_year_spec`
export const _regionsYearSpec = derived(
	_yearSelectionData,
	yearSelectionData => yearSelectionData[0]?.region_year_spec
);

export const _selectedRegionAtlasIds = derived(
	_yearSelectionData,
	yearSelectionData => _.reduce(
		yearSelectionData,
		(acc, datapoint) => {
			if (datapoint.isSelected) {
				acc.push(datapoint.region.id);
			}

			return acc;
		},
		[]
	)
);

/*
FIXME hopefully we won't need this after we'll have added `atlasId` to topojsons
<ChoroplethG> internally looks for key & key_alt
$: getPayload =
		feature => feature.properties[key] || feature.properties[key_alt];
*/
export const _selectedRegionIds = derived(
	_yearSelectionData,
	yearSelectionData => _.reduce(
		yearSelectionData,
		(acc, datapoint) => {
			if (datapoint.isSelected) {
				acc.push(datapoint.region_id);
			}

			return acc;
		},
		[]
	)
);
