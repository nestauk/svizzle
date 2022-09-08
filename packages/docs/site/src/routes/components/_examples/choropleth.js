import {default as world_110m_iso_a2}
	from '@svizzle/atlas/data/dist/world/topojson/world_110m_iso_a2.js';
import {default as NUTS_RG_03M_2016_4326_LEVL_0_UK}
	from '@svizzle/atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_0_UK.js';
import {default as NUTS_RG_03M_2016_4326_LEVL_1_UK}
	from '@svizzle/atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_1_UK.js';
import {default as NUTS_RG_03M_2016_4326_LEVL_2_UK}
	from '@svizzle/atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_2_UK.js';
import {default as NUTS_RG_03M_2016_4326_LEVL_3_UK}
	from '@svizzle/atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_3_UK.js';
import {default as NUTS_RG_03M_2016_4326_LEVL_3_DE}
	from '@svizzle/atlas/data/dist/NUTS/topojson/NUTS_RG_03M_2016_4326_LEVL_3_DE.js';
import {topoToGeo} from '@svizzle/geo';
import {
	geoConicEqualArea,
	geoEqualEarth as projectionFn,
	geoTransverseMercator,
} from 'd3-geo';

import {
	keyToColorUK2016,
	keyToColorWorld,
	keyToColorWorldFn,
} from './props.js';
import {formatExamples} from './utils.js';

const geojson_UK3 = topoToGeo(NUTS_RG_03M_2016_4326_LEVL_3_UK, 'NUTS');
const projection_UK3_reflected_300x300 =
	projectionFn()
	.reflectX(true)
	.fitSize([300, 300], geojson_UK3);

export default formatExamples([
	{
		data: [{
			key: 'world_110m_iso_a2',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_0_UK',
			props: {
				key: 'NUTS_ID',
				topojson: NUTS_RG_03M_2016_4326_LEVL_0_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					topojson={NUTS_RG_03M_2016_4326_LEVL_0_UK}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_1_UK',
			props: {
				topojson: NUTS_RG_03M_2016_4326_LEVL_1_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					topojson={NUTS_RG_03M_2016_4326_LEVL_1_UK}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_2_UK',
			props: {
				topojson: NUTS_RG_03M_2016_4326_LEVL_2_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					topojson={NUTS_RG_03M_2016_4326_LEVL_2_UK}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_3_UK',
			props: {
				topojson: NUTS_RG_03M_2016_4326_LEVL_3_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					topojson={NUTS_RG_03M_2016_4326_LEVL_3_UK}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_3_DE',
			props: {
				topojson: NUTS_RG_03M_2016_4326_LEVL_3_DE,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					topojson={NUTS_RG_03M_2016_4326_LEVL_3_DE}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'No topojson',
			props: {},
			usage: `
				<ChoroplethG
					{height}
					{width}
				/>
			`,
		}, {
			key: 'No topojson with custom message',
			props: {
				message: 'Please provide data!',
				theme: {
					messageColor: 'red',
					messageFontSize: '2rem',
				}
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					message='Please provide data!',
					theme={{
						messageColor: 'red',
						messageFontSize: '2rem',
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "In the most basic setup, you need to provide:"},
			{tag: 'p', content: "• `height`, `width`;"},
			{tag: 'p', content: "• `topojson`, the Topojson of regions to be represented, with `properties` having the a field corresponding to the prop `key`."},
			{tag: 'p', content: "• `topojsonId`, the key to us to select items in the `objects` field inthe topojson; e.g. `NUTS` or `countries`."},
			{tag: 'p', content: "The default projection (`geoEquirectangular`) will be applied."},
			{tag: 'p', content: 'Under certain conditions the chart shows a message that you can customize using the props `message`, `theme.messageColor` (default: black) and `theme.messageFontSize` (default: 1rem):'},
			{tag: 'p', content: '• if `topojson` is undefined or it has no objects;'},
			{tag: 'p', content: '• if you pass `projection` and it is `undefined`: this is an useful way to control the message if you know that the projection has been generated with a geojson with an empty `features` property.'},
		],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG',
		title: 'Basic props',
	},
	{
		data: [{
			key: null,
			props: {
				theme: {
					backgroundColor: '#f1feff',
					defaultFill: 'black',
					defaultStroke: 'magenta',
					defaultStrokeWidth: 1,
				},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					theme={{
						backgroundColor: '#f1feff',
						defaultFill: 'black',
						defaultStroke: 'magenta',
						defaultStrokeWidth: 1,
					}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "You can customise the map colors and stroke size."},
		],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-styles',
		title: 'Styles',
	},
	{
		data: [{
			key: 'world_110m_iso_a2',
			props: {
				key: 'iso_a2',
				keyToColor: keyToColorWorld,
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					keyToColor={keyToColorWorld}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_0_UK',
			props: {
				key: 'NUTS_ID',
				keyToColor: keyToColorUK2016,
				topojson: NUTS_RG_03M_2016_4326_LEVL_0_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='NUTS_ID'
					keyToColor={keyToColorUK2016}
					topojson={NUTS_RG_03M_2016_4326_LEVL_0_UK}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_1_UK',
			props: {
				key: 'NUTS_ID',
				keyToColor: keyToColorUK2016,
				topojson: NUTS_RG_03M_2016_4326_LEVL_1_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='NUTS_ID'
					keyToColor={keyToColorUK2016}
					topojson={NUTS_RG_03M_2016_4326_LEVL_1_UK}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_2_UK',
			props: {
				key: 'NUTS_ID',
				keyToColor: keyToColorUK2016,
				topojson: NUTS_RG_03M_2016_4326_LEVL_2_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='NUTS_ID'
					keyToColor={keyToColorUK2016}
					topojson={NUTS_RG_03M_2016_4326_LEVL_2_UK}
					topojsonId='NUTS'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_3_UK',
			props: {
				key: 'NUTS_ID',
				keyToColor: keyToColorUK2016,
				topojson: NUTS_RG_03M_2016_4326_LEVL_3_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='NUTS_ID'
					keyToColor={keyToColorUK2016}
					topojson={NUTS_RG_03M_2016_4326_LEVL_3_UK}
					topojsonId='NUTS'
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "You can color features by passing:"},
			{tag: 'p', content: "• `keyToColor`, a object mapping region `key|key_alt` to color (see below);"},
			{tag: 'p', content: "• `key`, the key to be used in the features `properties` field as the region identifier, e.g. `iso_a2`;"},
			{tag: 'p', content: "• Note that you might provide a topojson where not all the objects have the provided `key`."},
			{tag: 'p', content: "  For example if you provide `key: 'iso_a2'` (ISO Alpha 2 codes), disputed or partially recognised countries might not have that code (e.g. `Kosovo`)."},
			{tag: 'p', content: "  For these cases you can provide a `key_alt`, equal to `name` by default."},
			{tag: 'p', content: "Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence."},
			{tag: 'p', content: "Also note that if the value returned by `keyToColor` is falsy the fallback is `defaultFill` (which defaults to `white`)."},
		],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-keyToColor',
		title: 'Colors via map',
	},
	{
		doc: [
			{tag: 'p', content: "Instead of passing `keyToColor` you can pass a function `keyToColorFn`."},
			{tag: 'p', content: "You also have to pass `key` or `key_alt` (see basic props for an examplation of these)"},
			{tag: 'p', content: "Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence."},
			{tag: 'p', content: "Also note that if the value returned by `keyToColorFn` is falsy the fallback is `defaultFill` (which defaults to `white`)."},
		],
		data: [{
			key: null,
			props: {
				key: 'iso_a2',
				keyToColorFn: keyToColorWorldFn,
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{keyToColorFn}
					{width}
					key='iso_a2'
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-keyToColorFn',
		title: 'Colors via function',
	},
	{
		doc: [
			{tag: 'p', content: "You can highlight regions using `selectedKeys` and specify a style for selected regions."},
			{tag: 'p', content: "You also have to pass `key` or `key_alt` (see basic props for an examplation of these)"},
		],
		data: [{
			key: 'none selected',
			props: {
				key: 'iso_a2',
				theme: {
					defaultFill: 'palegreen',
					defaultStroke: 'red',
					deselectedOpacity: 0.5,
					selectedStroke: 'palegoldenrod',
					selectedStrokeWidth: 4,
				},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					theme={{
						defaultFill: 'palegreen',
						defaultStroke: 'red',
						deselectedOpacity: 0.5,
						selectedStroke: 'palegoldenrod',
						selectedStrokeWidth: 4
					}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'some countries selected',
			props: {
				key: 'iso_a2',
				selectedKeys: ['TD', 'US', 'AU', 'CN'],
				theme: {
					defaultFill: 'palegreen',
					defaultStroke: 'red',
					deselectedOpacity: 0.25,
					selectedStroke: '#00c5fa',
					selectedStrokeWidth: 4,
				},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					selectedKeys=['TD', 'US', 'AU', 'CN']
					theme={{
						defaultFill: 'palegreen',
						defaultStroke: 'red',
						deselectedOpacity: 0.25,
						selectedStroke: '#00c5fa',
						selectedStrokeWidth: 4,
					}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-selectedKeys',
		title: 'Selected regions',
	},
	{
		doc: [
			{tag: 'p', content: "You can highlight one specific region using `focusedKey` and specify a style for it."},
			{tag: 'p', content: "If the focused region is also one of the selected regions, the focused style takes precedence."},
			{tag: 'p', content: "You also have to pass `key` or `key_alt` (see basic props for an examplation of these)"},
		],
		data: [{
			key: 'some countries selected, default style',
			props: {
				focusedKey: 'BR',
				key: 'iso_a2',
				keyToColorFn: keyToColorWorldFn,
				selectedKeys: ['TD', 'US', 'RU', 'CN', 'BR'],
				theme: {
					selectedStrokeWidth: 2,
				},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{keyToColorFn},
					{width}
					focusedKey='BR',
					key='iso_a2'
					selectedKeys=['TD', 'US', 'RU', 'CN', 'BR']
					theme={{
						selectedStrokeWidth: 2
					}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'some countries selected, custom style',
			props: {
				focusedKey: 'BR',
				key: 'iso_a2',
				keyToColorFn: keyToColorWorldFn,
				selectedKeys: ['TD', 'US', 'RU', 'CN', 'BR'],
				theme: {
					focusedDasharray: '4 4',
					focusedStroke: 'magenta',
					focusedStrokeWidth: 4,
					selectedStrokeWidth: 2,
				},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{keyToColorFn}
					{width}
					focusedKey='BR',
					key='iso_a2'
					selectedKeys=['TD', 'US', 'RU', 'CN', 'BR']
					theme={{
						focusedDasharray: '4 4',
						focusedStroke: 'magenta',
						focusedStrokeWidth: 4,
						selectedStrokeWidth: 2,
					}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-focusedKey',
		title: 'Focused region',
	},
	{
		data: [{
			key: 'default hover style',
			props: {
				isInteractive: true,
				key: 'iso_a2',
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					isInteractive={true}
					key='iso_a2'
					on:clicked={onClicked}
					on:entered={onEntered}
					on:exited={onExited}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'custom hover style',
			props: {
				isInteractive: true,
				key: 'iso_a2',
				theme: {
					hoverFill: 'yellow',
					hoverStroke: 'orange',
					hoverStrokeWidth: 2,
					hoverStrokedasharray: '2 2',
				},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					isInteractive={true}
					key='iso_a2'
					on:clicked={onClicked}
					on:entered={onEntered}
					on:exited={onExited}
					theme={{
						hoverFill: 'yellow',
						hoverStroke: 'orange',
						hoverStrokeWidth: 3,
						hoverStrokedasharray: '4 4',
					}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "To use interactivity, you need to provide:"},
			{tag: 'p', content: "• `isInteractive` set to true;"},
			{tag: 'p', content: "• `key` or `key_alt` (see basic props for an examplation of these)"},
			{tag: 'p', content: "The component then emits events when interacting with the regions."},
			{tag: 'p', content: "The payload is the `key` or `key_alt` of the region being interacted with:"},
			{tag: 'p', content: "• Clicking a region dispatches a `clicked` event;"},
			{tag: 'p', content: "• Mouse-entering a region dispatches a `entered` event;"},
			{tag: 'p', content: "• Mouse-exiting a region dispatches a `exited` event."},
			{tag: 'p', content: "You can style the hovered region by passing:"},
			{tag: 'p', content: "• `hoverFill` (default: `#f6f6f6`),"},
			{tag: 'p', content: "• `hoverStroke` (default: `black`),"},
			{tag: 'p', content: "• `hoverStrokeWidth` (default: 1.5),"},
			{tag: 'p', content: "• `hoverStrokedasharray` (default: '')."},
			{tag: 'p', content: "Please hover and click regions of this chart to read the correspondent event payload below."},
		],
		events: [
			'clicked',
			'entered',
			'exited',
		],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-interactivity',
		title: 'Interactivity',
	},
	{
		doc: [
			{tag: 'p', content: "You can provide a projection function either by passing `projectionFn` or by choosing among some of the projections provided by `d3-geo` by passing a `projectionId` choosing among the ids below."},
			{tag: 'p', content: "Azimuthal projections:"},
			{tag: 'p', content: "• `geoAzimuthalEqualArea`"},
			{tag: 'p', content: "• `geoAzimuthalEquidistant`"},
			{tag: 'p', content: "Equal-Earth projections: `geoEqualEarth`"},
			{tag: 'p', content: "Cylindrical projections"},
			{tag: 'p', content: "• `geoEquirectangular`"},
			{tag: 'p', content: "• `geoMercator`"},
			{tag: 'p', content: "• `geoNaturalEarth1`"},
			{tag: 'p', content: "You can also pass a precomputed `projection`, useful when you need to share a projection with other components: this won't be affected internally and will be used as given."},
			{tag: 'p', content: "If you don't pass `projection`, `projectionFn` or `projectionId`, the default projection is `geoEquirectangular`."},
			{tag: 'p', content: "In other words, the order of precedence here is: `projection`, `projectionFn`, `projectionId`, default."},
		],
		data: [{
			key: 'projectionId: geoAzimuthalEqualArea',
			props: {
				key: 'iso_a2',
				projectionId: 'geoAzimuthalEqualArea',
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionId='geoAzimuthalEqualArea'
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'projectionId: geoAzimuthalEquidistant',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
				key: 'iso_a2',
				projectionId: 'geoAzimuthalEquidistant',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionId='geoAzimuthalEquidistant'
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'projectionId: geoEqualEarth',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
				key: 'iso_a2',
				projectionId: 'geoEqualEarth',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionId='geoEqualEarth'
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'projectionId: geoEquirectangular',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
				key: 'iso_a2',
				projectionId: 'geoEquirectangular',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionId='geoEquirectangular'
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'projectionId: geoMercator',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
				key: 'iso_a2',
				projectionId: 'geoMercator',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionId='geoMercator'
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'projectionId: geoNaturalEarth1',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
				key: 'iso_a2',
				projectionId: 'geoNaturalEarth1',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionId='geoNaturalEarth1'
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'projectionFn: geoConicEqualArea',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
				key: 'iso_a2',
				projectionFn: geoConicEqualArea,
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionFn=d3.geoConicEqualArea
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'projectionFn: geoTransverseMercator',
			props: {
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
				key: 'iso_a2',
				projectionFn: geoTransverseMercator,
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					projectionFn=d3.geoTransverseMercator
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'custom projection (UK NUTS3 ReflectX 300x300)',
			props: {
				topojson: NUTS_RG_03M_2016_4326_LEVL_3_UK,
				topojsonId: 'NUTS',
				key: 'NUTS_ID',
				projection: projection_UK3_reflected_300x300,
			},
			usage: `
				<ChoroplethG
					{height}
					{projection}
					{width}
					key='NUTS_ID'
					topojson={NUTS_RG_03M_2016_4326_LEVL_3_UK}
					topojsonId='NUTS'
				/>
			`,
		}],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-projection',
		title: 'Projection',
	},

	{
		data: [{
			key: 'default geometry',
			props: {
				key: 'iso_a2',
				theme: {backgroundColor: '#eee'},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					key='iso_a2'
					theme={{backgroundColor: '#eee'}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'no safety',
			props: {
				geometry: {
					bottom: 0,
					left: 0,
					right: 0,
					top: 0,
				},
				key: 'iso_a2',
				theme: {backgroundColor: '#eee'},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					geometry={{
						bottom: 0,
						left: 0,
						right: 0,
						top: 0,
					}}
					key='iso_a2'
					theme={{backgroundColor: '#eee'}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'custom geometry',
			props: {
				geometry: {
					bottom: 10,
					left: 90,
					right: 30,
					top: 20,
				},
				key: 'iso_a2',
				theme: {backgroundColor: '#eee'},
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethG
					{height}
					{width}
					geometry={{
						bottom: 10,
						left: 90,
						right: 30,
						top: 20,
					}}
					key='iso_a2'
					theme={{backgroundColor: '#eee'}}
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can adjust the safety area using `geometry`.'},
		],
		name: 'ChoroplethG',
		namespace: 'svg',
		packageName: 'choropleth',
		slug: 'ChoroplethG-geometry',
		title: 'Geometry',
	},

	{
		doc: [
			{tag: 'p', content: "If you need to render the choropleth as an html element, you can use `ChoroplethDiv` providing the same props but `width` and `height`."},
			{tag: 'p', content: "This will render the choropleth in a `div`."},
			{tag: 'p', content: "You can add `title` (rendered as a `h2`), `padding` (a string defaulting to '10px') and `headerHeight` (a string defaulting to '2rem')"},
		],
		data: [{
			key: 'world_110m_iso_a2',
			props: {
				key: 'iso_a2',
				keyToColor: keyToColorWorld,
				padding: '3em',
				theme: {backgroundColor: '#eee'},
				title: 'Some world countries',
				topojson: world_110m_iso_a2,
				topojsonId: 'countries',
			},
			usage: `
				<ChoroplethDiv
					key='iso_a2'
					keyToColor={keyToColorWorld}
					padding='3em'
					theme={{backgroundColor: '#eee'}}
					title='Some world countries
					topojson={world_110m_iso_a2}
					topojsonId='countries'
				/>
			`,
		}, {
			key: 'NUTS_RG_03M_2016_4326_LEVL_3_UK',
			props: {
				backgroundColor: '#eee',
				key: 'NUTS_ID',
				keyToColor: keyToColorUK2016,
				padding: '0.5em',
				theme: {backgroundColor: '#f1feff'},
				title: 'UK NUTS3 (2016)',
				topojson: NUTS_RG_03M_2016_4326_LEVL_3_UK,
				topojsonId: 'NUTS',
			},
			usage: `
				<ChoroplethDiv
					backgroundColor='#eee'
					key='NUTS_ID'
					keyToColor={keyToColorUK2016}
					padding='0.5em'
					theme={{backgroundColor: '#f1feff'}}
					title='UK NUTS3 (2016)'
					topojson={NUTS_RG_03M_2016_4326_LEVL_3_UK}
					topojsonId='NUTS'
				/>
			`,
		}],
		name: 'ChoroplethDiv',
		packageName: 'choropleth',
		slug: 'ChoroplethDiv',
		title: 'ChoroplethDiv',
	}
]);
