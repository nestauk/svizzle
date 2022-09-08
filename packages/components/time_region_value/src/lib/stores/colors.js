import {scaleQuantize} from 'd3-scale';
import * as _ from 'lamb';
import {derived, writable} from 'svelte/store';

// lib/utils
import {isValidExtent} from '../utils/d3.js';

// lib/stores
import {_currentExtext} from './indicatorCurrent.js';
import {_theme} from './theme.js';

/* current color scheme */

const _colorSchemeIndex = writable(0);

export const toggleColorScheme = () => {
	_colorSchemeIndex.update(index => index === 0 ? 1 : 0);
}

export const _colorScheme = derived(
	[_theme, _colorSchemeIndex],
	([theme, index]) => theme.colorSchemes[index]
);

/* current color scheme label */

export const _colorSchemeLabel = derived(_colorScheme, s => s.label);

const getLabels = _.pluck('label');
export const _colorSchemeLabels = derived(
	_theme,
	theme => getLabels(theme.colorSchemes)
);

/* color scale */

export const _baseColorScale = derived(
	_colorScheme,
	({colors}) => scaleQuantize().range(colors)
);

const _makeColorScale = derived(
	[_baseColorScale, _colorScheme],
	([baseColorScale, {colors}]) =>
		extent => isValidExtent(extent)
			? baseColorScale.domain(extent)
			: _.always(_.last(colors))
);

export const _colorScale = derived(
	[_currentExtext, _makeColorScale],
	([currentExtext, makeColorScale]) => makeColorScale(currentExtext)
);
