import {isIterableEmpty} from '@svizzle/utils';
import {extent} from 'd3-array';
import {derived} from 'svelte/store';

// lib/utils
import {isValidExtent} from '../utils/d3.js';

// lib/stores
import {
	_getIndicatorValue,
	_selectionData,
	_yearSelectionData,
} from './indicator.js';
import {_selectedYear} from './selectedYear.js';

/* current data */

const _currentData = derived(
	[_selectedYear, _selectionData, _yearSelectionData],
	([selectedYear, selectionData, yearSelectionData]) =>
		selectedYear ? yearSelectionData : selectionData,
);

export const _isCurrentDataEmpty = derived(_currentData, isIterableEmpty);

/* extent */

export const _currentExtext = derived(
	[_getIndicatorValue, _currentData],
	([getIndicatorValue, currentData]) => extent(currentData, getIndicatorValue)
);

export const _isExtentValid = derived(_currentExtext, isValidExtent);
