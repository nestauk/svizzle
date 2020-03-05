import {formatSvelteMarkup} from './utils';
import {keyToColor} from './BarchartV_props';
import worldGeojson from '@svizzle/atlas/world_110m_iso_a2_geo.json';

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
		name: 'ChoroplethSVG',
		props: [{
			key: null,
			value: {
				geojson: worldGeojson,
				height: 600,
				key: 'iso_a2',
				keyToColor,
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG_basic_world',
		title: 'Basic props (world)',
		usage: `
			<ChoroplethSVG
				{geojson}
				{keyToColor}
				height=600
				key='iso_a2'
				width=600
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can customise the map colors and stroke size."},
		],
		name: 'ChoroplethSVG',
		props: [{
			key: null,
			value: {
				colorDefaultFill: 'palegreen',
				colorSea: 'aqua',
				colorStroke: 'tomato',
				geojson: worldGeojson,
				height: 600,
				key: 'iso_a2',
				keyToColor,
				sizeStroke: 1,
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG_colors',
		title: 'Styles (world)',
		usage: `
			<ChoroplethSVG
				{geojson}
				{keyToColor}
				colorDefaultFill='palegreen'
				colorSea='aqua'
				colorStroke='tomato'
				height=600
				key='iso_a2'
				sizeStroke=1
				width=600
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can highlight regions using `selectedKeys` and specify a style for selected regions."},
		],
		name: 'ChoroplethSVG',
		props: [{
			key: null,
			value: {
				colorStrokeSelected: 'red',
				geojson: worldGeojson,
				height: 600,
				key: 'iso_a2',
				keyToColor,
				selectedKeys: ['ES', 'BR', 'N. Cyprus', 'Kosovo'],
				sizeStrokeSelected: 1.5,
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG_selectedKeys',
		title: 'Highlighted regions (world)',
		usage: `
			<ChoroplethSVG
				{geojson}
				{keyToColor}
				colorStrokeSelected='red',
				height=600
				key='iso_a2'
				selectedKeys=['ES', 'BR', 'N. Cyprus', 'Kosovo']
				sizeStrokeSelected=1.5
				width=600
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
		name: 'ChoroplethSVG',
		props: [{
			key: null,
			value: {
				geojson: worldGeojson,
				height: 600,
				isInteractive: true,
				key: 'iso_a2',
				keyToColor,
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG_isInteractive',
		title: 'Interactivity',
		usage: `
			<ChoroplethSVG
				{geojson}
				{keyToColor}
				height=600
				isInteractive={true}
				key='iso_a2'
				on:clicked={onClicked}
				on:entered={onEntered}
				on:exited={onExited}
				width=600
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
		name: 'ChoroplethSVG',
		props: [{
			key: 'geoAzimuthalEqualArea',
			value: {
				geojson: worldGeojson,
				height: 600,
				key: 'iso_a2',
				keyToColor,
				projection: 'geoAzimuthalEqualArea',
				width: 600,
			}
		}, {
			key: 'geoOrthographic',
			value: {
				geojson: worldGeojson,
				height: 600,
				key: 'iso_a2',
				keyToColor,
				projection: 'geoOrthographic',
				width: 600,
			}
		}],
		slug: 'ChoroplethSVG_projection',
		title: 'Projection',
		usage: `
			<ChoroplethSVG
				{geojson}
				{keyToColor}
				height=600
				key='iso_a2'
				projection='a-projection-id'
				width=600
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
