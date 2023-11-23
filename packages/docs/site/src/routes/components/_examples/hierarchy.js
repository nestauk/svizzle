import {pluckKey} from '@svizzle/utils';
import {hsl} from 'd3-color';
import {interpolateHclLong} from 'd3-interpolate';
import {scaleOrdinal} from 'd3-scale';
import * as _ from 'lamb';

import {examplesFormatter4} from './utils.js';

const exampleTreemapData = [
	{
		"key": "2007 onwards",
		"doc_count": 21230
	},
	{
		"key": "1950-1966",
		"doc_count": 15088
	},
	{
		"key": "England and Wales: before 1900",
		"doc_count": 12206
	},
	{
		"key": "1965-1975",
		"doc_count": 10334
	},
	{
		"key": "1930-1949",
		"doc_count": 7671
	},
	{
		"key": "1983-1991",
		"doc_count": 5652
	},
	{
		"key": "1900-1929",
		"doc_count": 5572
	},
	{
		"key": "1976-1983",
		"doc_count": 4656
	},
	{
		"key": "1996-2002",
		"doc_count": 3708
	},
	{
		"key": "1991-1998",
		"doc_count": 3464
	},
	{
		"key": "2003-2007",
		"doc_count": 2769
	},
	{
		"key": "Scotland: before 1919",
		"doc_count": 1836
	}
];

const interpolateColor = interpolateHclLong(
	'rgb(189,113,189)', // brighter purple
	'rgb(255,209,124)' // brighter orange
);
const getItemsColorScheme = items => {
	const range = items.length === 1
		? [0]
		: _.range(0, 1, 1 / (items.length - 1)).concat(1);
	const colorScheme = _.map(range, interpolateColor);

	return colorScheme;
}
const pluckKeySorted = _.pipe([pluckKey, _.sortWith([])]);
const domain = pluckKeySorted(exampleTreemapData);

const colorScheme = getItemsColorScheme(domain);
const keyToColorFn = scaleOrdinal().domain(domain).range(colorScheme);

const colorSchemeLabel = _.map(
	colorScheme,
	color => hsl(color).l > 0.5 ? 'black' : 'white'
);
const keyToColorLabelFn = scaleOrdinal().domain(domain).range(colorSchemeLabel);
const getDocCount = _.getKey('doc_count');

export default examplesFormatter4([
	{
		data: [{
			key: 'Basic Treemap Example',
			props: {
				items: exampleTreemapData,
				keyToColorFn,
				keyToColorLabelFn,
				valueAccessor: getDocCount,
			},
			usage: `
				<Treemap
					{items}
					{keyToColorFn}
					{keyToColorLabelFn}
					valueAccessor={getDocCount}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'The basic Treemap requires `items`, a key accessor function, a value accessor function, and a color mapping function.'},
			{tag: 'p', content: 'It renders a hierarchical data structure as a set of nested rectangles.'},
		],
		name: 'Treemap',
		packageName: 'hierarchy',
		slug: 'Treemap-basic',
		title: 'Basic Treemap',
	},
	{
		data: [{
			key: 'Treemap with Custom Geometry',
			props: {
				geometry: {
					lineHeight: 25,
					paddingInner: 10,
					paddingOuter: 5,
					textPadding: 15,
				},
				items: exampleTreemapData,
				keyToColorFn,
				keyToColorLabelFn,
				valueAccessor: getDocCount,
			},
			usage: `
				<Treemap
					geometry={{
						lineHeight: 25,
						paddingInner: 10,
						paddingOuter: 5,
						textPadding: 15,
					}}
					{items}
					{keyToColorFn}
					{keyToColorLabelFn}
					valueAccessor={getDocCount}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'Customizing the geometry allows for adjusting the padding, text padding, and line height of the Treemap.'},
			{tag: 'p', content: 'This provides control over the visual spacing and layout of the Treemap elements.'},
		],
		name: 'Treemap',
		packageName: 'hierarchy',
		slug: 'Treemap-geometry',
		title: 'Custom Geometry',
	},
]);
