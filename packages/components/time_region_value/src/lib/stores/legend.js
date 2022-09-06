import {makeWithKeys} from '@svizzle/utils';
import {pairs} from 'd3-array';
import * as _ from 'lamb';
import {derived} from 'svelte/store';

// lib/stores
import {_baseColorScale, _colorScale, _colorScheme} from './colors.js';
import {_isExtentValid} from './indicatorCurrent.js';

const _makeColorBins = derived(
	[_baseColorScale, _colorScheme],
	([baseColorScale, {colors}]) =>
		colScale => {
			const domain = colScale.domain();
			const ranges = pairs([
				domain[0],
				...baseColorScale.thresholds(),
				domain[1]
			]);

			return _.map(
				_.zip(ranges, colors),
				makeWithKeys(['range', 'color'])
			);
		}
);

export const _colorBins = derived(
	[_colorScale, _isExtentValid, _makeColorBins],
	([colorScale, isExtentValid, makeColorBins]) =>
		isExtentValid && colorScale && makeColorBins(colorScale)
);
