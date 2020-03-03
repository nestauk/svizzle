import {formatSvelteMarkup} from './utils';
import {keyToColor} from './BarchartV_props';
import {worldGeojson} from './Choropleth_props';

const examples = [
	{
		content: [
			{tag: 'p', content: "In the most basic setup, you need to provide:"},
			{tag: 'p', content: "• `key`, the key to be used in the features `properties` field as the region identifier;"},
			{tag: 'p', content: "  Note that you might provide a geojson where not all the features have the provided `key`."},
			{tag: 'p', content: "  For example if you provide `key: 'iso_a2'` (ISO Alpha 2 codes), disputed or partially recognised countries might not have that code (e.g. `Kosovo`)."},
			{tag: 'p', content: "  For these cases you can provide a `key_alt`, equal to `name` by default."},
			{tag: 'p', content: "• `geojson`, the Geojson FeatureCollection of regions to be represented, with features' `properties` having the a field corresponding to the prop `key`."},
			{tag: 'p', content: "• `keyToColor`, an object mapping region key -> region color."},
			{tag: 'p', content: "The default projection (`geoEquirectangular`) will be applied."},
		],
		name: 'ChoroplethDiv',
		props: [{
			key: null,
			value: {
				geojson: worldGeojson,
				key: 'iso_a2',
				keyToColor,
			},
		}],
		slug: 'ChoroplethDiv_basic_world',
		title: 'Basic props (world)',
		usage: `
			<ChoroplethDiv
				{geojson}
				{keyToColor}
				key='iso_a2'
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can customise the map colors and stroke size."},
		],
		name: 'ChoroplethDiv',
		props: [{
			key: null,
			value: {
				colorDefaultFill: 'palegreen',
				colorSea: 'aqua',
				colorStroke: 'tomato',
				geojson: worldGeojson,
				key: 'iso_a2',
				keyToColor,
				sizeStroke: 1,
			},
		}],
		slug: 'ChoroplethDiv_colors',
		title: 'Styles (world)',
		usage: `
			<ChoroplethDiv
				{geojson}
				{keyToColor}
				colorDefaultFill='palegreen'
				colorSea='aqua'
				colorStroke='tomato'
				key='iso_a2'
				sizeStroke=1
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can highlight regions using `selectedKeys` and specify a style for selected regions."},
		],
		name: 'ChoroplethDiv',
		props: [{
			key: null,
			value: {
				colorStrokeSelected: 'red',
				geojson: worldGeojson,
				key: 'iso_a2',
				keyToColor,
				selectedKeys: ['ES', 'BR', 'N. Cyprus', 'Kosovo'],
				sizeStrokeSelected: 1.5,
			},
		}],
		slug: 'ChoroplethDiv_selectedKeys',
		title: 'Highlighted regions (world)',
		usage: `
			<ChoroplethDiv
				{geojson}
				{keyToColor}
				colorStrokeSelected='red',
				key='iso_a2'
				selectedKeys=['ES', 'BR', 'N. Cyprus', 'Kosovo']
				sizeStrokeSelected=1.5
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "If `true`, the component emits events when interacting with the regions."},
			{tag: 'p', content: "The payload is the `key` or `key_alt` of the region being interacted with:"},
			{tag: 'p', content: "• Clicking a region dispatches a `clicked` event;"},
			{tag: 'p', content: "• Mouse-entering a region dispatches a `entered` event;"},
			{tag: 'p', content: "• Mouse-exiting a region dispatches a `exited` event."},
			{tag: 'p', content: "Please hover and click regions of this chart to read the correspondent event payload below."},
		],
		events: [
			'clicked',
			'entered',
			'exited',
		],
		name: 'ChoroplethDiv',
		props: [{
			key: null,
			value: {
				geojson: worldGeojson,
				isInteractive: true,
				key: 'iso_a2',
				keyToColor,
			},
		}],
		slug: 'ChoroplethDiv_isInteractive',
		title: 'Interactivity',
		usage: `
			<ChoroplethDiv
				{geojson}
				{keyToColor}
				isInteractive={true}
				key='iso_a2'
				on:clicked={onClicked}
				on:entered={onEntered}
				on:exited={onExited}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "The default projection is `geoEquirectangular`."},
			{tag: 'p', content: "You can use most of the projections provided by `d3-geo`:"},
			{tag: 'p', content: "Azimuthal Projections:"},
			{tag: 'p', content: "• `geoAzimuthalEqualArea`"},
			{tag: 'p', content: "• `geoAzimuthalEquidistant`"},
			{tag: 'p', content: "`• geoGnomonic`"},
			{tag: 'p', content: "• `geoOrthographic`"},
			{tag: 'p', content: "• `geoStereographic`"},
			{tag: 'p', content: "Equal-Earth Projections: `geoEqualEarth`"},
			{tag: 'p', content: "Conic Projections:"},
			{tag: 'p', content: "• `geoConicConformal`"},
			{tag: 'p', content: "• `geoConicEqualArea`"},
			{tag: 'p', content: "• `geoConicEquidistant`"},
			{tag: 'p', content: "Cylindrical Projections"},
			{tag: 'p', content: "• `geoEquirectangular`"},
			{tag: 'p', content: "• `geoMercator`"},
			{tag: 'p', content: "• `geoTransverseMercator`"},
			{tag: 'p', content: "• `geoNaturalEarth1`"},
		],
		name: 'ChoroplethDiv',
		props: [{
			key: 'geoAzimuthalEqualArea',
			value: {
				geojson: worldGeojson,
				key: 'iso_a2',
				keyToColor,
				projection: 'geoAzimuthalEqualArea',
			},
		}, {
			key: 'geoEqualEarth',
			value: {
				geojson: worldGeojson,
				key: 'iso_a2',
				keyToColor,
				projection: 'geoEqualEarth',
			},
		}],
		slug: 'ChoroplethDiv_projection',
		title: 'Projection',
		usage: `
			<ChoroplethDiv
				{geojson}
				{keyToColor}
				key='iso_a2'
				projection='geoAzimuthalEqualArea'
			/>
		`,
	},
].map(obj => ({
	...obj,
	content: obj.content.map(element => ({
		...element,
		content: element.content.trim(),
	})),
	usage: formatSvelteMarkup(obj.usage)
}))

export default examples;
