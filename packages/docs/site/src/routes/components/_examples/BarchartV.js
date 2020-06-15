import * as _ from 'lamb';
import {transformValues} from '@svizzle/utils';

import {formatSvelteMarkup} from './utils';

import {
	countryKeyRawValue,
	countryKeyValuePositive,
	countryKeyValueNegatives,
	countryKeyValueMixed,
	countryKeyValueAlt,
	keyToColorWorld,
	keyToColorWorldFn,
	keyToColorWorldShort,
	keyToLabel,
} from './props';

const axisColor = 'red';
const backgroundColor = 'antiquewhite';
const barDefaultColor = 'orange';
const barHeight = 12;
const focusedKey = 'BG';
const fontSize = 22;
const textColor = 'green';
const title = 'My title';

const examples = [
	{
		doc: [
			{tag: 'p', content: 'In the most basic setup, you need to provide a `{items}` array of objects with the shape `{key: string, props: number}`.'},
			{tag: 'p', content: 'Note that if there are both positive and negative values the chart will show a vertical axis, `grey` by default.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				items: countryKeyValuePositive,
			},
			usage: `
				<BarchartV {items} />
			`,
		}, {
			key: 'All negative values',
			props: {
				items: countryKeyValueNegatives,
			},
			usage: `
				<BarchartV {items} />
			`,
		}, {
			key: 'Mixed values',
			props: {
				items: countryKeyValueMixed,
			},
			usage: `
				<BarchartV {items} />
			`,
		}],
		slug: 'BarchartV',
		title: 'Basic props',
	},
	{
		doc: [
			{tag: 'p', content: 'Providing a `{title}` shows the barchart with an `h2` header.'},
		],
		name: 'BarchartV',
		data: [{
			key: null,
			props: {
				items: countryKeyValuePositive,
				title
			},
			usage: `
				<BarchartV
					{items}
					title='${title}'
				/>
			`,
		}],
		slug: 'BarchartV-title',
		title: 'Title',
	},
	{
		doc: [
			{tag: 'p', content: 'You can setup a `backgroundColor` and the `textColor`.'},
			{tag: 'p', content: '`barHeight` and `fontSize` contribute to determine the distance between bars.'},
			{tag: 'p', content: 'You can configure the axis color using the `axisColor` props (used in case there are values of both signs).'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				axisColor,
				backgroundColor,
				barHeight,
				fontSize,
				items: countryKeyValuePositive,
				textColor,
			},
			usage: `
				<BarchartV
					{items}
					axisColor = '${axisColor}'
					backgroundColor = '${backgroundColor}'
					barHeight = ${barHeight}
					fontSize = ${fontSize}
					textColor = '${textColor}'
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				axisColor,
				backgroundColor,
				barHeight,
				fontSize,
				items: countryKeyValueNegatives,
				textColor,
			},
			usage: `
				<BarchartV
					{items}
					axisColor = '${axisColor}'
					backgroundColor = '${backgroundColor}'
					barHeight = ${barHeight}
					fontSize = ${fontSize}
					textColor = '${textColor}'
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				axisColor,
				backgroundColor,
				barHeight,
				fontSize,
				items: countryKeyValueMixed,
				textColor,
			},
			usage: `
				<BarchartV
					{items}
					axisColor = '${axisColor}'
					backgroundColor = '${backgroundColor}'
					barHeight = ${barHeight}
					fontSize = ${fontSize}
					textColor = '${textColor}'
				/>
			`,
		}],
		slug: 'BarchartV-styles',
		title: 'Styles',
	},
	{
		doc: [
			{tag: 'p', content: 'You can provide a `barDefaultColor` to be used for bars with no correspondent key in `keyToColor`.'},
			{tag: 'p', content: 'If not provided, `barDefaultColor` is `null`, which renders `black`.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				barDefaultColor,
				items: countryKeyValuePositive,
				keyToColor: keyToColorWorldShort,
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					barDefaultColor='${barDefaultColor}'
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				barDefaultColor,
				items: countryKeyValueNegatives,
				keyToColor: keyToColorWorldShort,
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					barDefaultColor='${barDefaultColor}'
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				barDefaultColor,
				items: countryKeyValueMixed,
				keyToColor: keyToColorWorldShort,
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					barDefaultColor='${barDefaultColor}'
				/>
			`,
		}],
		slug: 'BarchartV-barDefaultColor',
		title: 'Default bars color',
	},
	{
		doc: [
			{tag: 'p', content: 'By providing `keyToColor`, an object mapping bar key -> bar color, you can assign bars color.'},
			{tag: 'p', content: 'Notice that the default color for keys not in `keyToColor` is set by `barDefaultColor` (black if not provided, see `AL` and `AD`).'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				items: countryKeyValuePositive,
				keyToColor: keyToColorWorld
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				items: countryKeyValueNegatives,
				keyToColor: keyToColorWorld
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				items: countryKeyValueMixed,
				keyToColor: keyToColorWorld
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
				/>
			`,
		}],
		slug: 'BarchartV-keyToColor',
		title: 'Bar colors (via mapping)',
	},
	{
		doc: [
			{tag: 'p', content: 'Instead of passing `keyToColor` you can pass a function `keyToColorFn`.'},
			{tag: 'p', content: 'Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence.'},
			{tag: 'p', content: 'Also note that if the value returned by `keyToColorFn` is falsy the fallback is `barDefaultColor` (which falls back to `black` if `barDefaultColor` is not provided).'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				items: countryKeyValuePositive,
				keyToColorFn: keyToColorWorldFn
			},
			usage: `
				<BarchartV
					{keyToColorFn}
					{items}
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				items: countryKeyValueNegatives,
				keyToColorFn: keyToColorWorldFn
			},
			usage: `
				<BarchartV
					{keyToColorFn}
					{items}
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				items: countryKeyValueMixed,
				keyToColorFn: keyToColorWorldFn
			},
			usage: `
				<BarchartV
					{keyToColorFn}
					{items}
				/>
			`,
		}],
		slug: 'BarchartV-keyToColorFn',
		title: 'Bar colors (via function)',
	},
	{
		doc: [
			{tag: 'p', content: 'You can set the focused bar by providing its key.'},
			{tag: 'p', content: 'This is useful when we select the chosen key in another part of the application and we want to provide a way to see what bar correspond to the current selection.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				focusedKey,
				items: countryKeyValuePositive,
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='${focusedKey}'
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				focusedKey,
				items: countryKeyValueNegatives,
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='${focusedKey}'
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				focusedKey,
				items: countryKeyValueMixed,
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='${focusedKey}'
				/>
			`,
		}],
		slug: 'BarchartV-focusedKey',
		title: 'Focused key',
	},
	{
		doc: [
			{tag: 'p', content: 'You can set the focused bar background color by providing its `focusedKeyColor`.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				focusedKey,
				focusedKeyColor: 'yellow',
				items: countryKeyValuePositive,
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='${focusedKey}'
					focusedKeyColor='yellow'
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				focusedKey,
				focusedKeyColor: 'yellow',
				items: countryKeyValueNegatives,
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='${focusedKey}'
					focusedKeyColor='yellow'
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				focusedKey,
				focusedKeyColor: 'yellow',
				items: countryKeyValueMixed,
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='${focusedKey}'
					focusedKeyColor='yellow'
				/>
			`,
		}],
		slug: 'BarchartV-focusedKeyColor',
		title: 'Focused key color',
	},
	{
		doc: [
			{tag: 'p', content: 'You can choose the hovered bar background color by providing `hoverColor`.'},
		],
		name: 'BarchartV',
		data: [{
			key: null,
			props: {
				hoverColor: 'palegreen',
				items: countryKeyValuePositive,
				title: 'Hover me',
			},
			usage: `
				<BarchartV
					{items}
					hoverColor='palegreen'
				/>
			`,
		}],
		slug: 'BarchartV-hoverColor',
		title: 'Hovered bar color',
	},
	{
		doc: [
			{tag: 'p', content: 'By providing a object mapping bar key -> bar label, you can control how the bar are labeled.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				keyToLabel,
				items: countryKeyValuePositive,
			},
			usage: `
				<BarchartV
					{items}
					{keyToLabel}
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				keyToLabel,
				items: countryKeyValueNegatives,
			},
			usage: `
				<BarchartV
					{items}
					{keyToLabel}
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				keyToLabel,
				items: countryKeyValueMixed,
			},
			usage: `
				<BarchartV
					{items}
					{keyToLabel}
				/>
			`,
		}],
		slug: 'BarchartV-keyToLabel',
		title: 'Labels (via mapping)',
	},
	{
		doc: [
			{tag: 'p', content: 'By providing a function mapping bar key -> bar label, you can control how the bar are labeled programmatically.'},
		],
		name: 'BarchartV',
		data: [{
			key: null,
			props: {
				items: countryKeyValuePositive,
				keyToLabelFn: x => `--${x}--`,
			},
			usage: `
				<BarchartV
					{items}
					keyToLabelFn={x => '--' + x + '--'}
				/>
			`,
		}],
		slug: 'BarchartV-keyToLabelFn',
		title: 'Labels (via function)',
	},
	{
		doc: [
			{tag: 'p', content: 'If `true`, the component emits events when interacting with the bars.'},
			{tag: 'p', content: 'The payload is an object `{id: key}` (`key` being the key of the bar we interacted with)'},
			{tag: 'p', content: "• Clicking on a bar dispatches a `clicked` event: `dispatch('clicked', {id: key})`."},
			{tag: 'p', content: "• Mouse-entering a bar dispatches a `entered` event: `dispatch('entered', {id: key})`."},
			{tag: 'p', content: "• Mouse-exiting a bar dispatches a `exited` event: `dispatch('exited', {id: key})`."},
			{tag: 'p', content: 'Please hover and click the bars of this barchart to read the correspondent event payload below.'},
		],
		events: [
			'entered',
			'exited',
			'clicked',
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				isInteractive: true,
				items: countryKeyValuePositive,
				title: 'Hover and click me',
			},
			usage: `
				<BarchartV
					{items}
					isInteractive={true}
					on:clicked={onClicked}
					on:entered={onEntered}
					on:exited={onExited}
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				isInteractive: true,
				items: countryKeyValueNegatives,
				title: 'Hover and click me',
			},
			usage: `
				<BarchartV
					{items}
					isInteractive={true}
					on:clicked={onClicked}
					on:entered={onEntered}
					on:exited={onExited}
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				isInteractive: true,
				items: countryKeyValueMixed,
				title: 'Hover and click me',
			},
			usage: `
				<BarchartV
					{items}
					isInteractive={true}
					on:clicked={onClicked}
					on:entered={onEntered}
					on:exited={onExited}
				/>
			`,
		}],
		slug: 'BarchartV-isInteractive',
		title: 'Interactivity',
	},
	{
		doc: [
			{tag: 'p', content: 'By default we assume that `items` has the shape `{key, value}`.'},
			{tag: 'p', content: 'By providing a `valueAccessor` function we can derive the bar value from `items` with different shapes.'},
		],
		name: 'BarchartV',
		data: [{
			key: null,
			props: {
				items: countryKeyRawValue,
				valueAccessor: item => Number(Math.sqrt(item.rawValue).toFixed(3)),
			},
			usage: `
				<BarchartV
					{items}
					valueAccessor={item => Number((item.rawValue / 25.3).toFixed(3))}
				/>
			`,
		}],
		slug: 'BarchartV-valueAccessor',
		title: 'Values accessor',
	},
	{
		doc: [
			{tag: 'p', content: 'You can provide a `formatFn` function to turn the `value` in the desired string.'},
			{tag: 'p', content: 'A way to use this would be to pass a function derived from `d3-format`.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'All positive values',
			props: {
				items: countryKeyValuePositive,
				formatFn: x => `${x}%`,
			},
			usage: `
				<BarchartV
					{items}
					formatFn={x => x + '%'}
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				items: countryKeyValueNegatives,
				formatFn: x => `${x}%`,
			},
			usage: `
				<BarchartV
					{items}
					formatFn={x => x + '%'}
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				items: countryKeyValueMixed,
				formatFn: x => `${x}%`,
			},
			usage: `
				<BarchartV
					{items}
					formatFn={x => x + '%'}
				/>
			`,
		}],
		slug: 'BarchartV-formatFn',
		title: 'Values format',
	},
	{
		doc: [
			{tag: 'p', content: 'If `shouldResetScroll` is not provided or set to `false`, updating the props will not reset the scroll.'},
			{tag: 'p', content: 'In this example, scrolling the barchart and then switching props using the buttons below should not reset the scroll.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'countryKeyValuePositive',
			props: {
				shouldResetScroll: false,
				items: countryKeyValuePositive,
				title: `When updated, scroll doesn't reset`,
			},
			usage: `
				<BarchartV
					{items}
					shouldResetScroll={false}
				/>
			`,
		}, {
			key: 'countryKeyValueAlt',
			props: {
				shouldResetScroll: false,
				items: countryKeyValueAlt,
				title: `When updated, scroll doesn't reset`,
			},
			usage: `
				<BarchartV
					{items}
					shouldResetScroll={false}
				/>
			`,
		}],
		slug: 'BarchartV-no-shouldResetScroll',
		title: 'Scroll reset (disabled)',
	},
	{
		doc: [
			{tag: 'p', content: 'If `shouldResetScroll` is set to `true`, updating the props will reset the scroll.'},
			{tag: 'p', content: 'In this example, scrolling the barchart and then switching props using the buttons below should reset the scroll.'},
		],
		name: 'BarchartV',
		data: [{
			key: 'countryKeyValuePositive',
			props: {
				shouldResetScroll: true,
				items: countryKeyValuePositive,
				title: `When updated, scroll resets`,
			},
			usage: `
				<BarchartV
					{items}
					shouldResetScroll={true}
				/>
			`,
		}, {
			key: 'countryKeyValueAlt',
			props: {
				shouldResetScroll: true,
				items: countryKeyValueAlt,
				title: `When updated, scroll resets`,
			},
			usage: `
				<BarchartV
					{items}
					shouldResetScroll={true}
				/>
			`,
		}],
		slug: 'BarchartV-shouldResetScroll',
		title: 'Scroll reset (enabled)',
	},
].map(transformValues({
	doc: _.mapWith(transformValues({
		content: s => s.trim(),
	})),
	data: _.mapWith(transformValues({
		usage: formatSvelteMarkup
	}))
}));

export default examples;
