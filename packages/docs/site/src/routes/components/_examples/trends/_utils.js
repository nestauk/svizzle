import {scaleOrdinal} from 'd3-scale';
import {interpolateHclLong} from 'd3-interpolate';
import * as _ from 'lamb';

const interpolateColor = interpolateHclLong(
	'rgb(189,113,189)', // brighter purple
	'rgb(255,209,124)' // brighter orange
);

export const makeColorScheme = items => _.map(
	items,
	(v, index) => interpolateColor(index / (items.length - 1))
);

export const makeAreaLowKeyToColor = (percentileAreas, colorScheme) =>
	scaleOrdinal()
	.domain(_.map(percentileAreas, _.head))
	.range(colorScheme);

export const makeKeyToColorFn = keyToColorMap => key => keyToColorMap[key];

export const keyFormatFn = key => key.slice(-5);
export const valueFormatFn = value => Math.round(value);
