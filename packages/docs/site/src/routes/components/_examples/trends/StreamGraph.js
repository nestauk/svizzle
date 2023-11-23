import {
	colorByStreamGraphGroup,
	geometry,
	streamGraphGroups,
	streamGraphPoints,
} from './_data';
import {
	makeKeyToColorFn,
	valueFormatFn,
} from './_utils';

const groupToColorFn = makeKeyToColorFn(colorByStreamGraphGroup);

export const config = [
	{
		data: [{
			key: 'Basic StreamGraph usage',
			props: {
				geometry,
				groups: streamGraphGroups,
				groupToColorFn,
				points: streamGraphPoints,
				valueFormatFn,
			},
			usage: `
				<StreamGraph
					{groupToColorFn}
					{valueFormatFn}
					geometry
					groups={streamGraphGroups}
					points={streamGraphPoints}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'StreamGraph displays data as flowing, organic shapes, representing the changes in data over time.' },
			{ tag: 'p', content: 'The component requires `points` (an array of data points), `groups` (categories in the data), and a `groupToColorFn` to assign colors to each group.' },
			{ tag: 'p', content: 'Custom themes can be applied by providing a `theme` object, allowing you to control the aesthetics of the grid, frame, and text.' },
		],
		name: 'StreamGraph',
		packageName: 'trends',
		slug: 'StreamGraph-basic',
		title: 'StreamGraph: Basic Usage',
	},
	{
		data: [{
			key: 'Key and value formatting',
			props: {
				geometry: {
					...geometry,
					safetyLeft: 80,
					safetyRight: 80,
				},
				groups: streamGraphGroups,
				groupToColorFn,
				keyFormatFn: key => key.slice(-5),
				points: streamGraphPoints,
				valueFormatFn: value => `${Math.round(value)} units`,
			},
			usage: `
				<StreamGraph
					{groupToColorFn}
					geometry={{
						...geometry,
						safetyLeft: 80,
						safetyRight: 80,
					}}
					groups={streamGraphGroups}
					keyFormatFn={key => key.splice(-5)}
					points={streamGraphPoints}
					valueFormatFn={value => \`\${Math.round(value)} units\`}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'The StreamGraph component allows custom formatting of keys and values through `keyFormatFn` and `valueFormatFn` props.' },
			{ tag: 'p', content: 'These functions provide flexibility in how the data labels and values are displayed, enhancing readability and context.' },
		],
		name: 'StreamGraph',
		packageName: 'trends',
		slug: 'StreamGraph-formatting',
		title: 'StreamGraph: Formatting',
	},
	{
		data: [{
			key: 'Sorting off',
			props: {
				geometry,
				groups: streamGraphGroups,
				groupToColorFn,
				points: streamGraphPoints,
				sorting: 'off',
				valueFormatFn,
			},
			usage: `
				<StreamGraph
					{groupToColorFn}
					{valueFormatFn}
					geometry
					groups={streamGraphGroups}
					points={streamGraphPoints}
					sorting='off'
				/>
			`,
		},
		{
			key: 'Sorting asc',
			props: {
				geometry,
				groups: streamGraphGroups,
				groupToColorFn,
				points: streamGraphPoints,
				sorting: 'asc',
				valueFormatFn,
			},
			usage: `
				<StreamGraph
					{groupToColorFn}
					{valueFormatFn}
					geometry
					groups={streamGraphGroups}
					points={streamGraphPoints}
					sorting='asc'
				/>
			`,
		},
		{
			key: 'Sorting desc',
			props: {
				geometry,
				groups: streamGraphGroups,
				groupToColorFn,
				points: streamGraphPoints,
				sorting: 'desc',
				valueFormatFn,
			},
			usage: `
				<StreamGraph
					{groupToColorFn}
					{valueFormatFn}
					geometry
					groups={streamGraphGroups}
					points={streamGraphPoints}
					sorting='desc'
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'StreamGraph allows customization of its layout through the `geometry` prop, which adjusts the padding around the graph.' },
			{ tag: 'p', content: 'Data sorting can be controlled via the `sorting` prop, supporting ascending, descending, or no sorting of data groups.' },
		],
		name: 'StreamGraph',
		packageName: 'trends',
		slug: 'StreamGraph-geometry-sorting',
		title: 'StreamGraph: Sorting',
	},
	{
		data: [{
			key: 'Interactive StreamGraph',
			props: {
				geometry,
				groups: streamGraphGroups,
				groupToColorFn,
				points: streamGraphPoints,
				valueFormatFn,
			},
			usage: `
				<StreamGraph
					{groupToColorFn}
					{valueFormatFn}
					geometry
					groups={streamGraphGroups}
					points={streamGraphPoints}
				/>
			`,
		}],
		doc: [
			{ tag: 'p', content: 'StreamGraph supports interactivity, emitting events like `areaHovered`, `areaExited`, `areaTouchEnded`, and `areaTouchStarted`.' },
			{ tag: 'p', content: 'These events can be used to create dynamic, responsive visualizations, enhancing user engagement and data exploration.' },
		],
		events: [
			'areaHovered',
			'areaExited',
			'areaTouchStarted',
			'areaTouchEnded'
		],
		name: 'StreamGraph',
		packageName: 'trends',
		slug: 'StreamGraph-interactive',
		title: 'StreamGraph: Interactivity',
	},
];
