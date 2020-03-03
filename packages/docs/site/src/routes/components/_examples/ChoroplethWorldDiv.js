import {formatSvelteMarkup} from './utils';
import {keyToColor} from './BarchartV_props';

const examples = [
	{
		content: [
			{tag: 'p', content: "In the most basic setup, you need to provide:"},
			{tag: 'p', content: "• `keyToColor`, an object mapping region key -> region color."},
			{tag: 'p', content: "In this basic setup the default projection (`geoEquirectangular`) will be applied."},
			{tag: 'p', content: "Note that the `key` for this component is `iso_a2`"},
			{tag: 'p', content: "The default projection is `geoEquirectangular`."},
		],
		name: 'ChoroplethWorldDiv',
		props: [{
			key: null,
			value: {
				keyToColor
			},
		}],
		slug: 'ChoroplethWorldDiv_basic',
		title: 'Basic props',
		usage: `
			<ChoroplethWorldDiv
				{keyToColor}
				key='iso_a2'
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can customise the map colors and stroke size."},
		],
		name: 'ChoroplethWorldDiv',
		props: [{
			key: null,
			value: {
				colorDefaultFill: 'palegreen',
				colorSea: 'aqua',
				colorStroke: 'tomato',
				keyToColor,
				sizeStroke: 1,
			},
		}],
		slug: 'ChoroplethWorldDiv_colors',
		title: 'Styles (world)',
		usage: `
			<ChoroplethWorldDiv
				{keyToColor}
				colorDefaultFill='palegreen'
				colorSea='aqua'
				colorStroke='tomato'
				sizeStroke=1
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can highlight regions using `selectedKeys` and specify a style for selected regions."},
		],
		name: 'ChoroplethWorldDiv',
		props: [{
			key: null,
			value: {
				colorStrokeSelected: 'red',
				keyToColor,
				selectedKeys: ['ES', 'BR', 'N. Cyprus', 'Kosovo'],
				sizeStrokeSelected: 1.5,
			},
		}],
		slug: 'ChoroplethWorldDiv_selectedKeys',
		title: 'Highlighted regions (world)',
		usage: `
			<ChoroplethWorldDiv
				{keyToColor}
				colorStrokeSelected='red',
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
		name: 'ChoroplethWorldDiv',
		props: [{
			key: null,
			value: {
				isInteractive: true,
				keyToColor,
			},
		}],
		slug: 'ChoroplethWorldDiv_isInteractive',
		title: 'Interactivity',
		usage: `
			<ChoroplethWorldDiv
				{keyToColor}
				isInteractive={true}
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
		name: 'ChoroplethWorldDiv',
		props: [{
			key: 'geoAzimuthalEqualArea',
			value: {
				keyToColor,
				projection: 'geoAzimuthalEqualArea',
			},
		}, {
			key: 'geoEqualEarth',
			value: {
				keyToColor,
				projection: 'geoEqualEarth',
			},
		}],
		slug: 'ChoroplethWorldDiv_projection',
		title: 'Projection',
		usage: `
			<ChoroplethWorldDiv
				{keyToColor}
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
