import {formatSvelteMarkup} from './utils';
import {keyToColor, keyToColorFn} from './BarchartV_props';
import World_110m_iso_a2_topo from '@svizzle/atlas/gist/World_110m_iso_a2_topo.json';
import NUTS_RG_10M_2016_4326_LEVL_2_UK from '@svizzle/atlas/gist/NUTS_RG_10M_2016_4326_LEVL_2_UK.json';

const examples = [
	{
		content: [
			{tag: 'p', content: "In the most basic setup, you need to provide:"},
			{tag: 'p', content: "• `key`, the key to be used in the features `properties` field as the region identifier;"},
			{tag: 'p', content: "• Note that you might provide a topojson where not all the objects have the provided `key`."},
			{tag: 'p', content: "  For example if you provide `key: 'iso_a2'` (ISO Alpha 2 codes), disputed or partially recognised countries might not have that code (e.g. `Kosovo`)."},
			{tag: 'p', content: "  For these cases you can provide a `key_alt`, equal to `name` by default."},
			{tag: 'p', content: "• `topojson`, the Topojson of regions to be represented, with `properties` having the a field corresponding to the prop `key`."},
			{tag: 'p', content: "• `keyToColor`, an object mapping region key -> region color."},
			{tag: 'p', content: "If you don't provide `keyToColor` no `key` is needed."},
			{tag: 'p', content: "The default projection (`geoEquirectangular`) will be applied."},
		],
		name: 'ChoroplethSVG',
		props: [{
			key: 'World_110m_iso_a2_topo',
			value: {
				height: 600,
				key: 'iso_a2',
				keyToColor,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				width: 600,
			},
		}, {
			key: 'NUTS_RG_10M_2016_4326_LEVL_2_UK',
			value: {
				height: 600,
				topojson: NUTS_RG_10M_2016_4326_LEVL_2_UK,
				topojsonId: 'NUTS',
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG-basic_world',
		title: 'Basic props (world)',
		usage: `
			<ChoroplethSVG
				{keyToColor}
				height=600
				key='iso_a2'
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
				width=600
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "Instead of passing `keyToColor` you can pass a function `keyToColorFn`."},
			{tag: 'p', content: "Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence."},
			{tag: 'p', content: "Also note that if the value returned by `keyToColorFn` is falsy the fallback is `colorDefaultFill` (which defaults to `white`)."},
		],
		name: 'ChoroplethSVG',
		props: [{
			key: null,
			value: {
				height: 600,
				key: 'iso_a2',
				keyToColorFn,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG-keyToColorFn',
		title: 'Colors via function',
		usage: `
			<ChoroplethSVG
				{keyToColor}
				height=600
				key='iso_a2'
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				height: 600,
				key: 'iso_a2',
				keyToColor,
				sizeStroke: 1,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG-colors',
		title: 'Styles (world)',
		usage: `
			<ChoroplethSVG
				{keyToColor}
				colorDefaultFill='palegreen'
				colorSea='aqua'
				colorStroke='tomato'
				height=600
				key='iso_a2'
				sizeStroke=1
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				height: 600,
				key: 'iso_a2',
				keyToColor,
				selectedKeys: ['ES', 'BR', 'N. Cyprus', 'Kosovo'],
				sizeStrokeSelected: 1.5,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG-selectedKeys',
		title: 'Highlighted regions (world)',
		usage: `
			<ChoroplethSVG
				{keyToColor}
				colorStrokeSelected='red',
				height=600
				key='iso_a2'
				selectedKeys=['ES', 'BR', 'N. Cyprus', 'Kosovo']
				sizeStrokeSelected=1.5
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				height: 600,
				isInteractive: true,
				key: 'iso_a2',
				keyToColor,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				width: 600,
			},
		}],
		slug: 'ChoroplethSVG-isInteractive',
		title: 'Interactivity',
		usage: `
			<ChoroplethSVG
				{keyToColor}
				height=600
				isInteractive={true}
				key='iso_a2'
				on:clicked={onClicked}
				on:entered={onEntered}
				on:exited={onExited}
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				height: 600,
				key: 'iso_a2',
				keyToColor,
				projection: 'geoAzimuthalEqualArea',
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				width: 600,
			}
		}, {
			key: 'geoOrthographic',
			value: {
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				height: 600,
				key: 'iso_a2',
				keyToColor,
				projection: 'geoOrthographic',
				width: 600,
			}
		}],
		slug: 'ChoroplethSVG-projection',
		title: 'Projection',
		usage: `
			<ChoroplethSVG
				{keyToColor}
				height=600
				key='iso_a2'
				projection='a-projection-id'
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
