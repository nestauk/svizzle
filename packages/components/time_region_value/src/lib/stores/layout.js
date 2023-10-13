import {_screen} from '@svizzle/ui';
import {derived, writable} from 'svelte/store';
import {linearScale} from 'yootils';

// lib/stores
import {_yearExtent} from './dataset.js';

/* responsive */

export const _isSmallScreen = derived(
	_screen,
	s => s && (s.sizes.small && !s.sizes.medium)
);
export const _screenClasses = derived(_screen, s => s?.classes);
export const _glyph = derived(_screen, s => s?.glyph);

/* safety */

const smallSafety = {left: 40, right: 40};
const largeSafety = {left: 120, right: 80};
export const _safety = derived(
	_isSmallScreen,
	isSmall => isSmall ? smallSafety : largeSafety
);

/* timeline */

export const _timelineHeight = writable(0);
export const _timelineWidth = writable(0);

export const _timelineLayout = derived([
	_safety,
	_timelineHeight,
	_timelineWidth,
	_yearExtent,
], ([safety, height, width, yearExtent]) => {
	const padding = 10;
	const fontSize = Math.min(height / 4, 14);
	const radius = Math.min(height / 8, 7);
	const fullExtent = [
		padding + radius,
		width - padding - radius
	];
	const fullScaleX = linearScale(yearExtent, fullExtent);
	const start = fullExtent[0] + safety.left;
	const end = fullExtent[1] - safety.right;
	const scaleX = linearScale(yearExtent, [start, end]);
	const step = scaleX(start + 1) - scaleX(start);
	const doShortenYears = step < 3 * fontSize;
	const y1 = height / 3;
	const y2 = (height + y1 + radius) / 2;
	const ym = height / 2;

	return {
		doShortenYears,
		end,
		fontSize,
		fullScaleX,
		height,
		radius,
		scaleX,
		start,
		width,
		y1,
		y2,
		ym,
	}
});
