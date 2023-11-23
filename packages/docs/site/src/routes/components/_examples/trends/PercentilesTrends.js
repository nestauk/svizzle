import {
	geometry,
	percentileAreas,
	percentilesTrendsItems
} from './_data';
import {
	makeColorScheme,
	makeAreaLowKeyToColor
} from './_utils';

const colorScheme = makeColorScheme(percentileAreas);
const areaLowKeyToColor = makeAreaLowKeyToColor(percentileAreas, colorScheme);

export const config = [
	{
		data: [{
			key: 'PercentilesTrends basic usage',
			props: {
				areaLowKeyToColor,
				config: {areas: percentileAreas, trends: ['avg']},
				geometry,
				items: percentilesTrendsItems,
			},
			usage: `
				<PercentilesTrends
					{areaLowKeyToColor}
					{geometry}
					config={{areas: percentileAreas, trends: ['avg']}}
					items={percentilesTrendsItems}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'PercentilesTrends visualizes data trends over time or categories, using areas and lines to represent percentile ranges and specific percentile trends.' },
			{ tag: 'p', content: 'It requires `items` data (an array of objects with keys and percentile values), a `config` object to define which percentile ranges (areas) and trends (lines) to display, and an `areaLowKeyToColor` function to assign colors to each area.' },
		],
		name: 'PercentilesTrends',
		packageName: 'trends',
		slug: 'PercentilesTrends-basic',
		title: 'PercentilesTrends: Basic Usage',
	},
	{
		data: [{
			key: 'Interactive PercentilesTrends',
			props: {
				areaLowKeyToColor,
				config: {areas: percentileAreas, trends: ['avg']},
				geometry,
				items: percentilesTrendsItems,
			},
			usage: `
				<PercentilesTrends
					{areaLowKeyToColor}
					{geometry}
					config={{areas: percentileAreas, trends: ['avg']}}
					items={percentilesTrendsItems}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'PercentilesTrends supports interactivity, emitting events such as `areaHovered`, `areaExited`, `areaTouchStarted`, and `areaTouchEnded` for enhanced user engagement and data exploration.' },
		],
		events: [
			'areaExited',
			'areaHovered',
			'areaTouchEnded',
			'areaTouchStarted',
		],
		name: 'PercentilesTrends',
		packageName: 'trends',
		slug: 'PercentilesTrends-interactive',
		title: 'PercentilesTrends: Interactivity',
	},
];
