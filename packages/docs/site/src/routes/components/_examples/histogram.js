import {roundTo} from '@svizzle/utils';

import bins from './bins.json';
import bins_2 from './bins_2.json';
import bins_3 from './bins_3.json';
import binsFill from './binsFill.json';
import binsFill_2 from './binsFill_2.json';
import bins_value_non_uniform from './bins_value_non_uniform.json';
import {formatExamples} from './utils';

const bins_2_value = bins_2.map(
	({range, values}) => ({range, value: values ? values.length : 0})
);
const bins_value_non_uniform_non_contiguous =
	bins_value_non_uniform.filter((v, i) => i % 2 === 0);

const backgroundColor = '#feffd4';
const binFill = 'orange';
const selectedBins = [1, 5, 6];

export default formatExamples([
	{
		data: [{
			key: 'some bins {range, values}',
			props: {bins},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'some other bins {range, values}',
			props: {bins: bins_2},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'some bins {range, value}',
			props: {bins: bins_2_value},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'non uniform bins',
			props: {bins: bins_value_non_uniform},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'non-uniform non-contiguous bins',
			props: {bins: bins_value_non_uniform_non_contiguous},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'No bins',
			props: {},
			usage: `
				<HistogramG
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Empty bins',
			props: {bins: []},
			usage: `
				<HistogramG
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
				<HistogramG
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
			{tag: 'p', content: 'In the most basic setup, you need to provide:'},
			{tag: 'p', content: '• `width` and `height` (numbers).'},
			{tag: 'p', content: '• `bins`, an array of objects of two possible shapes:'},
			{tag: 'p', content: '•• `{range: [number, number], value: number}`: this will use `value` as the length of the bin'},
			{tag: 'p', content: '•• `{range: [number, number], values: any[]}`: this will use the length of `values` as the length of the bin'},
			{tag: 'p', content: 'Ranges are assumed to be sorted and bins are assumed to be sorted by `range`, that is the first value of a bin `range` is greater than the second value of the previos bin `range`.'},
			{tag: 'p', content: 'You can draw non-uniform non-contiguous bins, that is ranges don\'t have be to contiguous or be all of the same size.'},
			{tag: 'p', content: 'If `bins` is undefined or empty the chart shows a message that you can customize using the props `message`, `theme.messageColor` (default: black) and `theme.messageFontSize` (default: 1rem).'},
		],
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG',
		title: 'Basic props',
	},
	{
		data: [{
			key: 'extent across various order of magnitude – no log scale',
			props: {bins: bins_3},
			usage: `<HistogramG {bins} />`,
		}, {
			key: 'extent across various order of magnitude – log scale',
			props: {
				bins: bins_3,
				flags: {useLogScale: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{useLogScale: true}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'If the bins length varies across various order of magnitude, you can set `useLogScale` to `true`.'},
		],
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG-logScale',
		title: 'Log scale',
	},
	{
		data: [{
			key: 'some bins',
			props: {
				bins,
				binsFill,
				theme: {
					binStroke: 'red',
					binStrokeWidth: 3,
				}
			},
			usage: `
				<HistogramG
					{bins}
					{binsFill}
					{height}
					{width}
					theme={{
						binStroke: 'red',
						binStrokeWidth: 3,
					}}
				/>
			`,
		}, {
			key: 'some other bins',
			props: {
				bins: bins_2,
				binsFill: binsFill_2,
				theme: {
					binStroke: 'palegreen',
					binStrokeWidth: 5,
					textColor: 'red',
				}
			},
			usage: `
				<HistogramG
					{bins}
					{binsFill}
					{height}
					{width}
					theme={{
						binStroke: 'palegreen',
						binStrokeWidth: 5,
						textColor: 'red',
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can customise colors by providing a `binsFill` array'},
			{tag: 'p', content: 'You can customise the bins border color and width by providing `binStroke` (a color) and `binStrokeWidth` (a number) and `textColor`.'},
			{tag: 'p', content: 'Also see the interactivity section for selected bins style props.'},
		],
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG-style',
		title: 'Bins style',
	},
	{
		data: [{
			key: null,
			props: {
				theme: {
					backgroundColor,
				},
				bins,
				flags: {withBackground: true},
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{withBackground: true}}
					theme={{backgroundColor: '${backgroundColor}'}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can add a background prividing `withBackground` with a custom color using `backgroundColor`, which defaults to `white`.'},
		],
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG-background',
		title: 'Background',
	},
	{
		data: [{
			key: 'bins with integer ranges',
			props: {bins},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'bins with decimal ranges (no ticksFormatFn)',
			props: {bins: bins_2},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'bins with decimal ranges (w/ ticksFormatFn)',
			props: {
				bins: bins_2,
				ticksFormatFn: roundTo(2)
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					ticksFormatFn={roundTo(2)}
				/>
			`,
		}, {
			key: 'no ticks',
			props: {
				bins: bins_2,
				flags: {hideTicks: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					hideTicks={{hideTicks: true}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can customize the ticks format by providing a `ticksFormatFn`.'},
			{tag: 'p', content: 'You can hide the ticks by setting `hideTicks` to true.'},
		],
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG-ticks',
		title: 'Ticks',
	},
	{
		data: [{
			key: 'no safety',
			props: {bins: bins_2},
			usage: `<HistogramG {bins} />`,
		}, {
			key: 'safety',
			props: {
				bins: bins_2,
				geometry: {
					safetyXTicks: 160,
				}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					geometry={{
						safetyXTicks: 160,
					}}
				/>
			`,
		}, {
			key: 'no ticks, safety',
			props: {
				bins: bins_2,
				flags: {hideTicks: true},
				geometry: {
					safetyXNoTicks: 50,
					safetyXValues: 50
				}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{hideTicks: true}}
					geometry={{
						safetyXNoTicks: 50,
						safetyXValues: 50
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can adjust the safety distances to control overflow using:'},
			{tag: 'p', content: '- `safetyXNoTicks`: the amount of pixels from the axis to the border when you use `hideTicks`.'},
			{tag: 'p', content: '- `safetyXTicks`: the amount of pixels from the axis to the border when you show ticks.'},
			{tag: 'p', content: '- `safetyXValues`: the amounf of pixels from top of the taller bin to the opposite border.'},
			{tag: 'p', content: '- `safetyY`: the number of pixels on top and bottom limits.'},
		],
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG-safety',
		title: 'Safety',
	},
	{
		data: [{
			key: 'some bins',
			props: {
				bins,
				flags: {isInteractive: true},
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{isInteractive: true}}
				/>
			`,
		}, {
			key: 'some other bins, pre-selected',
			props: {
				bins: bins_2,
				flags: {isInteractive: true},
				selectedBins
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{isInteractive: true}}
					selectedBins=${JSON.stringify(selectedBins)}
				/>
			`,
		}, {
			key: 'non uniform bins',
			props: {
				bins: bins_value_non_uniform,
				flags: {isInteractive: true},
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{isInteractive: true}}
				/>
			`,
		}, {
			key: 'non-uniform non-contiguous bins',
			props: {
				bins: bins_value_non_uniform_non_contiguous,
				flags: {isInteractive: true},
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{isInteractive: true}}
				/>
			`,
		}, {
			key: 'non-uniform styled bins',
			props: {
				bins: bins_value_non_uniform,
				binsFill: binsFill_2,
				flags: {isInteractive: true},
				theme: {
					binStroke: 'green',
					binStrokeWidth: 2,
				}
			},
			usage: `
				<HistogramG
					{bins}
					{binsFill}
					{height}
					{width}
					flags={{isInteractive: true}}
					theme={{
						binStroke: 'green',
						binStrokeWidth: 2,
					}}
				/>
			`,
		}, {
			key: 'custom selected bin style',
			props: {
				bins: bins_value_non_uniform,
				binsFill: binsFill_2,
				flags: {isInteractive: true},
				theme: {
					binStroke: 'green',
					binStrokeWidth: 2,
					selectedBinFill: 'yellow',
					selectedBinStroke: 'red',
					selectedBinStrokeWidth: '5',
				}
			},
			usage: `
				<HistogramG
					{bins}
					{binsFill}
					{height}
					{width}
					flags={{isInteractive: true}}
					theme={{
						binStroke: 'green',
						binStrokeWidth: 2,
						selectedBinFill: 'yellow',
						selectedBinStroke: 'red',
						selectedBinStrokeWidth: '5',
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "If `isInteractive` is `true`, the component emits events when interacting with the bins."},
			{tag: 'p', content: "Events:"},
			{tag: 'p', content: "• Clicking a bin selects or deselects it depending on if it was already selected and depending on the pressed modifier key (see below) and dispatches a `clicked` event with payload `{index, selectedBins}`"},
			{tag: 'p', content: "• Clicking the background resets the selection and dispatches a `clicked` event, with payload `{selectedBins: []}`"},
			{tag: 'p', content: "• Mouse-exiting a bin dispatches a `exited` event, with the payload being the exited bin index"},
			{tag: 'p', content: "• Brushing – clicking a bin and dragging the pointer over other bins selects them and dispatches brush events:"},
			{tag: 'p', content: "•• as soon as we start brushing, a `brushstart` event gets dispatched, the payload being the index of the bin where we started brushing;"},
			{tag: 'p', content: "•• continuing dragging, when the pointer crosses bins a `brushed` event gets dispatched with the payload being `{selectedBins, end, start}`, the currently selected bins and the brushing start and end indices;"},
			{tag: 'p', content: "•• when we stop dragging by releasing the pointer, a `brushend` event gets dispatched, the payload being the index of the bin where we stopped brushing."},
			{tag: 'p', content: "You can use modifiers to add or remove to the selection:"},
			{tag: 'p', content: "• Holding the `shift` key when brushing or clicking adds the brushed bins to the selection, the payload being the start bin index;"},
			{tag: 'p', content: "• Holding the `alt` key when brushing or clicking removes the brushed bins to the selection."},
			{tag: 'p', content: "A green/red (respectively) line is displayed to help you understand what's going on. You can customise these with props `brushAddStroke`, `brushRemoveStroke`, `brushStrokeOpacity`, `brushStrokeWidth`"},
			{tag: 'p', content: "You can customize the style of selected bins using: `selectedBinFill`, `selectedBinStroke`, `selectedBinStrokeWidth`."},
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
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG-interactivity',
		title: 'Interactivity',
	},
	{
		data: [{
			key: 'Left-right, bottom-up (default)',
			props: {
				bins
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Right-left, bottom-up',
			props: {
				bins,
				flags: {isRightToLeft: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{isRightToLeft: true}}
				/>
			`,
		}, {
			key: 'Left-right, top-down',
			props: {
				bins,
				flags: {isTopDown: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					isTopDown={true}
				/>
			`,
		}, {
			key: 'Right-left, top-down',
			props: {
				bins,
				flags: {
					isRightToLeft: true,
					isTopDown: true
				},
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{
						isRightToLeft: true,
						isTopDown: true
					}}
				/>
			`,
		}, {
			key: 'No origin dot',
			props: {
				bins,
				flags: {hideOrigin: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{hideOrigin: true}}
				/>
			`,
		}, {
			key: 'Custom origin dot',
			props: {
				bins,
				geometry: {originRadius: 5},
				theme: {originColor: 'red'}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					geometry={{originRadius: 5}}
					theme={{originColor: 'red'}}
				/>
			`,
		},

		// non-uniform
		{
			key: 'Left-right, bottom-up (default) – non uniform bins',
			props: {
				bins: bins_value_non_uniform
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
				/>
			`,
		}, {
			key: 'Right-left, bottom-up – non uniform bins',
			props: {
				bins: bins_value_non_uniform,
				flags: {isRightToLeft: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{isRightToLeft: true}}
				/>
			`,
		}, {
			key: 'Left-right, top-down – non uniform bins',
			props: {
				bins: bins_value_non_uniform,
				flags: {isTopDown: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{isTopDown: true}}
				/>
			`,
		}, {
			key: 'Right-left, top-down – non uniform bins',
			props: {
				bins: bins_value_non_uniform,
				flags: {
					isRightToLeft: true,
					isTopDown: true
				},
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags={{
						isRightToLeft: true,
						isTopDown: true
					}}
				/>
			`,
		}, {
			key: 'No origin dot – non uniform bins',
			props: {
				bins: bins_value_non_uniform,
				flags: {hideOrigin: true}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					flags: {hideOrigin: true}
				/>
			`,
		}, {
			key: 'Custom origin dot – on-uniform non-contiguous bins',
			props: {
				bins: bins_value_non_uniform_non_contiguous,
				geometry: {originRadius: 5},
				theme: {originColor: 'red'}
			},
			usage: `
				<HistogramG
					{bins}
					{height}
					{width}
					geometry={{originRadius: 5}}
					theme={{originColor: 'red'}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can customise the chart horizontal and vertical direction by providing the two booleans `isRightToLeft` and `isTopDown`'},
			{tag: 'p', content: 'By default it shows a dot to quickly identify the origin, but you can hide it by setting `hideOrigin` to `true`.'},
			{tag: 'p', content: 'The dot color can be chosen using `originColor`.'},
		],
		name: 'HistogramG',
		namespace: 'svg',
		packageName: 'histogram',
		slug: 'HistogramG-orientation',
		title: 'Orientation',
	},
	{
		data: [{
			key: 'some bins',
			props: {
				bins,
				flags: {withBackground: true},
				padding: '3em',
				theme: {
					backgroundColor,
					binFill,
				},
				title: 'Some bins',
			},
			usage: `
				<HistogramDiv
					{bins}
					flags={{withBackground: true}}
					padding='3em'
					theme={{
						backgroundColor: '${backgroundColor}',
						binFill: '${binFill}',
					}}
					title='Some bins'
				/>
			`,
		},
		{
			key: 'some other bins',
			props: {
				bins: bins_2,
				ticksFormatFn: roundTo(2),
				title: 'Some other bins',
			},
			usage: `
				<HistogramDiv
					{bins}
					ticksFormatFn={roundTo(2)}
					title='Some other bins'
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: "If you need to render the histogram as an html element, you can use `HistogramDiv` providing the same props but `width` and `height`."},
			{tag: 'p', content: "This will render the histogram in a `div`."},
			{tag: 'p', content: "You can add `title` (rendered as a `h2`), `padding` (a string defaulting to '10px') and `headerHeight` (a string defaulting to '2rem')"},
		],
		name: 'HistogramDiv',
		packageName: 'histogram',
		slug: 'HistogramDiv',
		title: 'HistogramDiv',
	},
]);
