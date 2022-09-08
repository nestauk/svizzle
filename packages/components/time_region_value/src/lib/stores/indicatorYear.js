import {getAtlasId} from '@svizzle/atlas';
import {default as hierarchy} from '@svizzle/atlas/data/dist/NUTS/hierarchy.js';
import {default as idToNutsIdByYear}
	from '@svizzle/atlas/data/dist/NUTS/idToNutsIdByYear.js';
import {
	applyFnMap,
	getValue,
	keyValueArrayAverage,
	keyValueArrayToObject,
} from '@svizzle/utils';
import * as _ from 'lamb';
import {derived} from 'svelte/store';

// lib/utils
import {getRegionAtlasId} from '../utils/domain.js';
import {makeGetRefFormatOf} from '../utils/format.js';

// lib/stores
import {_colorScale} from './colors.js';
import {_lookup} from './dataset.js';
import {
	_getIndicatorValue,
	_indicator,
	_regionsYearSpec,
	_yearSelectionData,
} from './indicator.js';
import {_regionSettings} from './regionSettings.js';


/* mappings */

export const _regionIdValuePairs = derived(
	[_getIndicatorValue, _yearSelectionData],
	([getIndicatorValue, yearSelectionData]) => {
		let items = [];

		if (yearSelectionData) {
			const makeItems = _.pipe([
				_.mapWith(applyFnMap({
					key: getRegionAtlasId,
					value: getIndicatorValue
				})),
				_.sortWith([_.sorterDesc(getValue)])
			]);

			items = makeItems(yearSelectionData);
		}

		return items;
	}
);

export const _regionIdToValue =
	derived(_regionIdValuePairs, keyValueArrayToObject);

export const _regionIdToColor = derived(
	[_colorScale, _regionIdToValue],
	([colorScale, regionIdToValue]) => _.mapValues(regionIdToValue, colorScale)
);

// FIXME this could be removed once we have `atlasId` in the topojson
// https://github.com/nestauk/svizzle/issues/394
export const _regionIdToColorFn = derived(
	[_regionIdToColor, _regionSettings, _regionsYearSpec],
	([regionIdToColor, regionSettings, specYear]) =>
		regionId => {
			const atlasId = getAtlasId({
				regionId,
				specYear,
				type: regionSettings.type
			});
			const color = regionIdToColor[atlasId];

			return color;
		}
);

export const _regionIdToBarchartLabel = derived(
	_regionsYearSpec,
	regionsYearSpec => _.mapValues(hierarchy, ({name, rootId}) => {
		const rootOriginalId = idToNutsIdByYear[rootId][regionsYearSpec];

		return `${name}, ${rootOriginalId}`
	})
);


/* barchart */

export const _barchartRefs = derived(
	[_indicator, _lookup, _regionIdValuePairs],
	([indicator, lookup, regionIdValuePairs]) => {
		const getRefFormatFn = makeGetRefFormatOf(indicator.id);
		const formatFn = getRefFormatFn(lookup);

		return [{
			key: 'Average',
			keyAbbr: 'Avg.',
			value: keyValueArrayAverage(regionIdValuePairs),
			formatFn
		}];
	}
);
