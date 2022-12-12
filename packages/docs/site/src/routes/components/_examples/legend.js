import {examplesFormatter4} from './utils.js';

const bins = [
	{range: [0, 5], color: 'red'},
	{range: [5, 10], color: 'yellow'},
	{range: [10, 15], color: 'palegreen'},
	{range: [15, 20], color: 'cyan'},
	{range: [20, 25], color: 'khaki'},
	{range: [25, 30], color: 'lightskyblue'},
	{range: [30, 35], color: 'blue'},
	{range: [35, 40], color: 'magenta'},
	{range: [40, 45], color: 'orange'},
	{range: [45, 50], color: 'violet'},
	{range: [50, 55], color: 'brown'},
];
const bins_nonUniform = [
	{range: [0.1, 0.3], color: 'lightskyblue'},
	{range: [0.3, 0.5], color: 'khaki'},
	{range: [0.5, 0.7], color: 'yellow'},
	{range: [0.7, 1], color: 'brown'},
	{range: [1, 2], color: 'blue'},
	{range: [2, 2.2], color: 'palegreen'},
	{range: [2.2, 2.5], color: 'orange'},
	{range: [2.5, 2.7], color: 'magenta'},
	{range: [2.7, 3], color: 'red'},
	{range: [3, 4], color: 'violet'},
	{range: [4, 5], color: 'cyan'},
];
const backgroundColor = '#feffd4';

export default examplesFormatter4([
	{
		data: [{
			key: 'Uniform bins',
			props: {bins},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Non-uniform bins',
			props: {bins: bins_nonUniform},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'No bins',
			props: {},
			usage: `
				<ColorBinsG
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Empty bins',
			props: {bins: []},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Empty bins with custom message',
			props: {
				bins: [],
				message: 'Please provide data!',
				theme: {
					messageColor: 'red',
					messageFontSize: '2rem',
				}
			},
			usage: `
				<ColorBinsG
					{bins}
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
			{tag: 'p', content: 'In the most basic setup, you need to provide `bins`, `height` and `width`.'},
		],
		name: 'ColorBinsG',
		namespace: 'svg',
		packageName: 'legend',
		slug: 'ColorBinsG',
		title: 'ColorBinsG: Basic props',
	}, {
		data: [{
			key: 'default',
			props: {
				bins,
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Larger safety area',
			props: {
				bins,
				geometry: {
					left: 50,
					top: 150,
				}
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
					geometry: {{
						left: 50,
						top: 150,
					}}
				/>
			`,
		}, {
			key: 'gap, barThickness, textPadding',
			props: {
				bins,
				geometry: {
					gap: 8,
					barThickness: 50,
					textPadding: 15,
				}
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
					geometry: {{
						gap: 8,
						barThickness: 50,
						textPadding: 15,
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'Use the `geometry` prop to control safety areas (default: 10 px), bar thickness (default: 25 px), text padding (default: 5 px), gap (default: 2 px).'},
		],
		name: 'ColorBinsG',
		namespace: 'svg',
		packageName: 'legend',
		slug: 'ColorBinsG-geometry',
		title: 'ColorBinsG: geometry',
	}, {
		data: [{
			key: 'horizontal',
			props: {
				bins,
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'vertical',
			props: {
				bins,
				flags: {
					isVertical: true
				}
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
					flags={{
						isVertical: true
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'The legend can be horizontal (default) or vertical.'},
		],
		name: 'ColorBinsG',
		namespace: 'svg',
		packageName: 'legend',
		slug: 'ColorBinsG-orientation',
		title: 'ColorBinsG: orientation',
	}, {
		data: [{
			key: 'Show all ticks',
			props: {
				bins,
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Show ticks extent only',
			props: {
				bins,
				flags: {
					showTicksExtentOnly: true
				}
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
					flags={{
						showTicksExtentOnly: true
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'To show just the ticks extent you can use the flag `showTicksExtentOnly`'},
		],
		name: 'ColorBinsG',
		namespace: 'svg',
		packageName: 'legend',
		slug: 'ColorBinsG-ticks',
		title: 'ColorBinsG: ticks',
	}, {
		data: [{
			key: null,
			props: {
				bins,
				flags: {
					withBackground: true,
				},
				geometry: {
					left: 40,
					right: 40,
				},
				selectedBins: [2, 4, 5, 6],
				theme: {
					backgroundColor: 'palegreen',
					backgroundOpacity: 0.1,
					binStroke: 'black',
					binStrokeWidth: 0.5,
					fontSize: 30,
					selectedBinStroke: 'red',
					selectedBinStrokeWidth: 3,
					textColor: 'blue',
				},
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
					flags={{
						withBackground: true
					}}
					geometry={{
						left: 40,
						right: 40,
					}}
					selectedBins={[2, 4, 5, 6]}
					theme={{
						backgroundColor: 'palegreen',
						backgroundOpacity: 0.1,
						binStroke: 'black',
						binStrokeWidth: 0.5,
						fontSize: 30,
						selectedBinStroke: 'red',
						selectedBinStrokeWidth: 3,
						textColor: 'blue',
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "You can customise colors and strokes."},
		],
		name: 'ColorBinsG',
		namespace: 'svg',
		packageName: 'legend',
		slug: 'ColorBinsG-styles',
		title: 'ColorBinsG: styles',
	}, {
		data: [{
			key: 'horizontal',
			props: {
				bins,
				flags: {isInteractive: true}
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
					flags={{isInteractive: true}}
				/>
			`,
		}, {
			key: 'vertical',
			props: {
				bins,
				flags: {
					isInteractive: true,
					isVertical: true
				}
			},
			usage: `
				<ColorBinsG
					{bins}
					{height}
					{width}
					flags={{
						isInteractive: true,
						isVertical: true
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "If `isInteractive` is `true`, the component emits events when interacting with the bins."},
			{tag: 'p', content: "Events:"},
			{tag: 'p', content: "• Clicking a bin selects or deselects it depending on if it was already selected and depending on the pressed modifier key (see below) and dispatches a `clicked` event with payload `{index, selectedBins}`"},
			{tag: 'p', content: "• Clicking the background resets the selection and dispatches a `clicked` event, with payload `{selectedBins: []}`"},
			{tag: 'p', content: "• Mouse-entering a bin dispatches a `entered` event, with the payload being the entered bin index"},
			{tag: 'p', content: "• Mouse-exiting a bin dispatches a `exited` event, with the payload being the exited bin index"},
			{tag: 'p', content: "• Brushing – clicking a bin and dragging the pointer over other bins selects them and dispatches brush events:"},
			{tag: 'p', content: "•• as soon as we start brushing, a `brushstart` event gets dispatched, the payload being the index of the bin where we started brushing;"},
			{tag: 'p', content: "•• continuing dragging, when the pointer crosses bins a `brushed` event gets dispatched with the payload being `{selectedBins, end, start}`, the currently selected bins and the brushing start and end indices;"},
			{tag: 'p', content: "•• when we stop dragging by releasing the pointer, a `brushend` event gets dispatched, the payload being the index of the bin where we stopped brushing."},
			{tag: 'p', content: "You can use modifiers to add or remove to the selection:"},
			{tag: 'p', content: "• Holding the `shift` key when brushing or clicking adds the brushed bins to the selection, the payload being the start bin index;"},
			{tag: 'p', content: "• Holding the `alt` key when brushing or clicking removes the brushed bins to the selection."},
			{tag: 'p', content: "A green/red line is displayed to help you understand what's going on (respectively). You can customise these with props `brushAddStroke`, `brushRemoveStroke`, `brushStrokeOpacity`, `brushStrokeWidth`"},
			{tag: 'p', content: "You can customize the style of selected bins using: `selectedBinStroke`, `selectedBinStrokeWidth`."},
			{tag: 'p', content: "Please interact with the chart to read the correspondent event payload below."},
		],
		events: [
			'brushed',
			'brushend',
			'brushstart',
			'clicked',
			'entered',
			'exited',
		],
		name: 'ColorBinsG',
		namespace: 'svg',
		packageName: 'legend',
		slug: 'ColorBinsG-interactivity',
		title: 'ColorBinsG: interactivity',
	}, {
		data: [{
			key: 'A legend',
			props: {
				bins,
				flags: {withBackground: true},
				padding: '3em',
				theme: {
					backgroundColor,
				},
				title: 'A legend',
			},
			usage: `
				<ColorBinsDiv
					{bins}
					flags={{withBackground: true}}
					padding='3em'
					theme={{
						backgroundColor: '${backgroundColor}',
					}}
					title='A legend'
				/>
			`,
		},
		{
			key: 'Another legend',
			props: {
				bins: bins_nonUniform,
				title: 'Another legend',
				flags: {isVertical: true}
			},
			usage: `
				<ColorBinsDiv
					{bins}
					title='Another legend'
					flags={{isVertical: true}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "If you need to render the colorbins legend as an html element, you can use `ColorBinsDiv` providing the same props but `width` and `height`."},
			{tag: 'p', content: "This will render the legend in a `div`."},
			{tag: 'p', content: "You can add `title` (rendered as a `h2`), `padding` (default: '10px') and `headerHeight` (default: '2rem')"},
		],
		name: 'ColorBinsDiv',
		packageName: 'legend',
		slug: 'ColorBinsDiv',
		title: 'ColorBinsDiv',
	},
]);
