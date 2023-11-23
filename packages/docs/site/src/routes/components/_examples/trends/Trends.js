import {
	exampleTrends,
	colorByTrend,
	geometry,
} from "./_data";
import {
	keyFormatFn,
	makeKeyToColorFn,
	valueFormatFn
} from "./_utils";

const keyToColorFn = makeKeyToColorFn(colorByTrend);

export const config = [
	{
		data: [{
			key: 'Basic Trends usage',
			props: {
				geometry,
				trends: exampleTrends,
				keyToColorFn,
				valueFormatFn,
			},
			usage: `
				<Trends
					{geometry}
					{keyToColorFn}
					{valueFormatFn}
					trends={exampleTrends}
				/>
			`,
		}, {
			key: 'Trends with custom theme',
			props: {
				geometry,
				theme: {
					curveStroke: 'black',
					curveStrokeWidth: 2,
					frameFill: 'lightgrey',
					frameStroke: 'darkgrey',
					gridStroke: 'grey',
					gridStrokeDasharray: '2 4',
					heroStrokeWidth: 3,
					textColor: 'black',
				},
				trends: exampleTrends,
				valueFormatFn,
			},
			usage: `
				<Trends
					{geometry}
					{valueFormatFn}
					trends={exampleTrends}
					theme={{
						curveStroke: 'black',
						curveStrokeWidth: 2,
						frameFill: 'lightgrey',
						frameStroke: 'darkgrey',
						gridStroke: 'grey',
						gridStrokeDasharray: '2 4',
						textColor: 'black',
						heroStrokeWidth: 3,
					}}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'Trends visualizes data trends over time or categories, using lines and dots.' },
			{ tag: 'p', content: 'It requires `trends` data, which are arrays of objects with keys and values, and a `keyToColorFn` to assign colors to each trend.' },
			{ tag: 'p', content: 'Custom themes can be applied by providing a `theme` object to control the aesthetics of curves, frames, grids, and text.' },
		],
		name: 'Trends',
		packageName: 'trends',
		slug: 'Trends-basic',
		title: 'Trends: Basic Usage',
	},
	{
		data: [{
			key: 'Key formatting, value formatting, and hero trend highlighting',
			props: {
				geometry: {
					...geometry,
					safetyLeft: 80,
					safetyRight: 80,
				},
				hero: {trendKey: 'Good'},
				keyFormatFn,
				keyToColorFn,
				trends: exampleTrends,
				valueFormatFn: value => `${Math.round(value)} units`,
			},
			usage: `
				<Trends
					{keyFormatFn}
					{keyToColorFn}
					geometry={{
						...geometry,
						safetyLeft: 80,
						safetyRight: 80,
					}}
					hero={{trendKey: 'Good'}}
					trends={exampleTrends}
					valueFormatFn={value => \`\${Math.round(value)} units\`}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'Trends allows custom formatting of keys and values through `keyFormatFn` and `valueFormatFn` props.' },
			{ tag: 'p', content: 'It also supports highlighting a specific trend as a hero, making it stand out among other trends.' },
		],
		name: 'Trends',
		packageName: 'trends',
		slug: 'Trends-formatting-hero',
		title: 'Trends: Formatting, Highlighting',
	},
	{
		data: [{
			key: 'Interactive Trends with event handling',
			props: {
				geometry,
				keyToColorFn,
				theme: {
					curveStroke: 'black',
					curveStrokeWidth: 1,
					frameFill: 'none',
					frameStroke: 'black',
					gridStroke: 'lightgrey',
					gridStrokeDasharray: '4 8',
					heroStrokeWidth: 2,
					textColor: 'black',
				},
				trends: exampleTrends,
				valueFormatFn,
			},
			usage: `
				<Trends
					{geometry}
					{keyToColorFn}
					{valueFormatFn}
					theme={{
						curveStroke: 'black',
						curveStrokeWidth: 1,
						frameFill: 'none',
						frameStroke: 'black',
						gridStroke: 'lightgrey',
						gridStrokeDasharray: '4 8',
						heroStrokeWidth: 2,
						textColor: 'black',
					}}
					trends={exampleTrends}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'Trends supports interactivity, emitting events like `dotHovered`, `dotExited`, `dotTouchStarted`, and `dotTouchEnded`.' },
			{ tag: 'p', content: 'These events can be used to create dynamic, responsive visualizations, enhancing user engagement and data exploration.' },
		],
		events: [
			'dotHovered',
			'dotExited',
			'dotTouchStarted',
			'dotTouchEnded'
		],
		name: 'Trends',
		packageName: 'trends',
		slug: 'Trends-interactive',
		title: 'Trends: Interactivity',
	},
];
