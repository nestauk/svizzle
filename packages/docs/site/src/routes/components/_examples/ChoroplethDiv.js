import {formatSvelteMarkup} from './utils';
import {keyToColor, keyToColorFn} from './BarchartV_props';
import World_110m_iso_a2_topo from '@svizzle/atlas/distro/World_110m_iso_a2_topo.json';
import NUTS_RG_03M_2016_4326_LEVL_0_UK from '@svizzle/atlas/distro/NUTS_RG_03M_2016_4326_LEVL_0_UK.json';
import NUTS_RG_03M_2016_4326_LEVL_1_UK from '@svizzle/atlas/distro/NUTS_RG_03M_2016_4326_LEVL_1_UK.json';
import NUTS_RG_03M_2016_4326_LEVL_2_UK from '@svizzle/atlas/distro/NUTS_RG_03M_2016_4326_LEVL_2_UK.json';
import NUTS_RG_03M_2016_4326_LEVL_3_UK from '@svizzle/atlas/distro/NUTS_RG_03M_2016_4326_LEVL_3_UK.json';

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
		name: 'ChoroplethDiv',
		props: [{
			key: 'World_110m_iso_a2_topo',
			value: {
				key: 'iso_a2',
				keyToColor,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
			}
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_0_UK',
			value: {
				key: 'NUTS_ID',
				topojson: NUTS_RG_03M_2016_4326_LEVL_0_UK,
				topojsonId: 'NUTS',
			},
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_1_UK',
			value: {
				key: 'NUTS_ID',
				topojson: NUTS_RG_03M_2016_4326_LEVL_1_UK,
				topojsonId: 'NUTS',
			},
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_2_UK',
			value: {
				key: 'NUTS_ID',
				topojson: NUTS_RG_03M_2016_4326_LEVL_2_UK,
				topojsonId: 'NUTS',
			},
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_3_UK',
			value: {
				key: 'NUTS_ID',
				topojson: NUTS_RG_03M_2016_4326_LEVL_3_UK,
				topojsonId: 'NUTS',
			},
		}],
		slug: 'ChoroplethDiv-basic',
		title: 'Basic props',
		usage: `
			<ChoroplethDiv
				{key} <!-- World: 'iso_a2', NUTS: 'NUTS_ID' -->
				{keyToColor}
				{topojson}
				{topojsonId} <!-- World: 'countries', NUTS: 'NUTS' -->
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "Instead of passing `keyToColor` you can pass a function `keyToColorFn`."},
			{tag: 'p', content: "Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence."},
			{tag: 'p', content: "Also note that if the value returned by `keyToColorFn` is falsy the fallback is `colorDefaultFill` (which defaults to `white`)."},
		],
		name: 'ChoroplethDiv',
		props: [{
			key: null,
			value: {
				key: 'iso_a2',
				keyToColorFn,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
			},
		}],
		slug: 'ChoroplethDiv-keyToColorFn',
		title: 'Colors via function',
		usage: `
			<ChoroplethDiv
				{keyToColorFn}
				key='iso_a2'
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				key: 'iso_a2',
				keyToColor,
				sizeStroke: 1,
			},
		}],
		slug: 'ChoroplethDiv-colors',
		title: 'Styles (world)',
		usage: `
			<ChoroplethDiv
				{keyToColor}
				colorDefaultFill='palegreen'
				colorSea='aqua'
				colorStroke='tomato'
				key='iso_a2'
				sizeStroke=1
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				key: 'iso_a2',
				keyToColor,
				selectedKeys: ['ES', 'BR', 'N. Cyprus', 'Kosovo', 'RU'],
				sizeStrokeSelected: 1.5,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
			},
		}],
		slug: 'ChoroplethDiv-selectedKeys',
		title: 'Selected regions',
		usage: `
			<ChoroplethDiv
				{keyToColor}
				colorStrokeSelected='red',
				key='iso_a2'
				selectedKeys=['ES', 'BR', 'N. Cyprus', 'Kosovo', 'RU']
				sizeStrokeSelected=1.5
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				isInteractive: true,
				key: 'iso_a2',
				keyToColor,
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
			},
		}],
		slug: 'ChoroplethDiv-isInteractive',
		title: 'Interactivity',
		usage: `
			<ChoroplethDiv
				{keyToColor}
				isInteractive={true}
				key='iso_a2'
				on:clicked={onClicked}
				on:entered={onEntered}
				on:exited={onExited}
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
				key: 'iso_a2',
				keyToColor,
				projection: 'geoAzimuthalEqualArea',
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
			},
		}, {
			key: 'geoEqualEarth',
			value: {
				topojson: World_110m_iso_a2_topo,
				topojsonId: 'countries',
				key: 'iso_a2',
				keyToColor,
				projection: 'geoEqualEarth',
			},
		}],
		slug: 'ChoroplethDiv-projection',
		title: 'Projection',
		usage: `
			<ChoroplethDiv
				{keyToColor}
				key='iso_a2'
				projection='geoAzimuthalEqualArea'
				topojson={World_110m_iso_a2_topo}
				topojsonId='countries'
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
