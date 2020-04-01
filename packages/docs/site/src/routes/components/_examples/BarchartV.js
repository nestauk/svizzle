import {formatSvelteMarkup} from './utils';

import {
	countryKeyRawValue,
	countryKeyValue,
	countryKeyValueAlt,
	keyToColor,
	keyToColorShort,
	keyToLabel
} from './BarchartV_props';

const myTitle = 'My title';
const defaultColor = 'orange';
const focusedKey = 'BY';

const examples = [
	{
		content: [
			{tag: 'p', content: "In the most basic setup, you need to provide a `{items}` array of objects with the shape `{key: string, value: number}`."},
			{tag: 'p', content: "Note that not providing a `{title}` shows the barchart with no header."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				items: countryKeyValue,
			},
		}],
		slug: 'BarchartV-items_default_shape',
		title: 'Items (default shape)',
		usage: `
			<BarchartV {items} />
		`,
	},
	{
		content: [
			{tag: 'p', content: "Providing a `{title}` shows the barchart with an `h2` header."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				items: countryKeyValue,
				title: myTitle
			},
		}],
		slug: 'BarchartV-title',
		title: 'Title',
		usage: `
			<BarchartV {items} title="${myTitle}" />
		`,
	},
	{
		content: [
			{tag: 'p', content: "By providing `keyToColor`, an object mapping bar key -> bar color, you can control the bars color."},
			{tag: 'p', content: "Notice that the default color for keys not in `keyToColor` is black (see `AL` and `AD`)."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				items: countryKeyValue,
				keyToColor
			},
		}],
		slug: 'BarchartV-keyToColor',
		title: 'Bar colors',
		usage: `
			<BarchartV {items} {keyToColor} />
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can provide a `defaultColor` to be used for bars with no correspondent key in `keyToColor`."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				defaultColor,
				items: countryKeyValue,
				keyToColor: keyToColorShort,
			},
		}],
		slug: 'BarchartV-defaultColor',
		title: 'Default bars color',
		usage: `
			<BarchartV
				defaultColor="${defaultColor}"
				{items}
				{keyToColor}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can set the focused bar by providing its key."},
			{tag: 'p', content: "This is useful when we select the chosen key in another part of the application and we want to provide a way to see what bar correspond to the current selection."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				focusedKey,
				items: countryKeyValue,
			},
		}],
		slug: 'BarchartV-focusedKey',
		title: 'Focused key',
		usage: `
			<BarchartV
				focusedKey="${focusedKey}"
				{items}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can set the focused bar background color by providing its `focusedKeyColor`."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				focusedKey,
				focusedKeyColor: 'yellow',
				items: countryKeyValue,
			},
		}],
		slug: 'BarchartV-focusedKeyColor',
		title: 'Focused key color',
		usage: `
			<BarchartV
				{items}
				focusedKey="${focusedKey}"
				focusedKeyColor="yellow"
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can choose the hovered bar background color by providing `hoverColor`."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				hoverColor: 'palegreen',
				items: countryKeyValue,
				title: 'Hover me',
			},
		}],
		slug: 'BarchartV-hoverColor',
		title: 'Hovered bar color',
		usage: `
			<BarchartV
				{items}
				hoverColor="palegreen"
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "By providing a object mapping bar key -> bar label, you can control how the bar are labeled."},
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				keyToLabel,
				items: countryKeyValue,
			},
		}],
		slug: 'BarchartV-keyToLabel',
		title: 'Labels (via mapping)',
		usage: `
			<BarchartV
				{keyToLabel}
				{items}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "By providing a function mapping bar key -> bar label, you can control how the bar are labeled programmatically."},
		],
		name: 'BarchartV',
		props: [{
			fnProps: ['keyToLabelFn'],
			key: null,
			value: {
				items: countryKeyValue,
				keyToLabelFn: `x => '--' + x + '--'`,
			},
		}],
		slug: 'BarchartV-keyToLabelFn',
		title: 'Labels (via function)',
		usage: `
			<BarchartV
				keyToLabelFn={x => '--' + x + '--'}
				{items}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "If `true`, the component emits events when interacting with the bars."},
			{tag: 'p', content: "The payload is an object `{id: key}` (`key` being the key of the bar we interacted with)"},
			{tag: 'p', content: "• Clicking on a bar dispatches a `clicked` event: `dispatch('clicked', {id: key})`."},
			{tag: 'p', content: "• Mouse-entering a bar dispatches a `entered` event: `dispatch('entered', {id: key})`."},
			{tag: 'p', content: "• Mouse-exiting a bar dispatches a `exited` event: `dispatch('exited', {id: key})`."},
			{tag: 'p', content: "Please hover and click the bars of this barchart to read the correspondent event payload below."},
		],
		events: [
			'entered',
			'exited',
			'clicked',
		],
		name: 'BarchartV',
		props: [{
			key: null,
			value: {
				isInteractive: true,
				items: countryKeyValue,
				title: 'Hover and click me',
			},
		}],
		slug: 'BarchartV-isInteractive',
		title: 'Interactivity',
		usage: `
			<BarchartV
				{items}
				isInteractive={true}
				on:entered={onEntered}
				on:exited={onExited}
				on:clicked={onClicked}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "By default we assume that `items` has the shape `{key, value}`."},
			{tag: 'p', content: "By providing a `valueAccessor` function we can derive the bar value from `items` with different shapes."},
		],
		name: 'BarchartV',
		props: [{
			fnProps: ['valueAccessor'],
			key: null,
			value: {
				items: countryKeyRawValue,
				valueAccessor: 'item => Number(Math.sqrt(item.rawValue).toFixed(3))',
			},
		}],
		slug: 'BarchartV-valueAccessor',
		title: 'Values accessor',
		usage: `
			<BarchartV
				{items}
				valueAccessor={item => Number(Math.sqrt(item.rawValue).toFixed(3))}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "You can provide a `formatFn` function to turn the `value` in the desired string."},
			{tag: 'p', content: "A way to use this would be to pass a function derived from `d3-format`."},
		],
		name: 'BarchartV',
		props: [{
			fnProps: ['formatFn'],
			key: null,
			value: {
				items: countryKeyValue,
				formatFn: 'x => x + "%"',
			},
		}],
		slug: 'BarchartV-formatFn',
		title: 'Values format',
		usage: `
			<BarchartV
				{items}
				formatFn={x => x + '%'}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "If `shouldResetScroll` is not provided or set to `false`, updating the props will not reset the scroll."},
			{tag: 'p', content: "In this example, scrolling the barchart and then switching props using the buttons below should not reset the scroll."},
		],
		name: 'BarchartV',
		props: [{
			key: 'countryKeyValue',
			value: {
				shouldResetScroll: false,
				items: countryKeyValue,
				title: `When updated, scroll doesn't reset`,
			},
		}, {
			key: 'countryKeyValueAlt',
			value: {
				shouldResetScroll: false,
				items: countryKeyValueAlt,
				title: `When updated, scroll doesn't reset`,
			},
		}],
		slug: 'BarchartV-no-shouldResetScroll',
		title: 'Scroll reset (disabled)',
		usage: `
			<BarchartV
				{items}
				shouldResetScroll={false}
			/>
		`,
	},
	{
		content: [
			{tag: 'p', content: "If `shouldResetScroll` is set to `true`, updating the props will reset the scroll."},
			{tag: 'p', content: "In this example, scrolling the barchart and then switching props using the buttons below should reset the scroll."},
		],
		name: 'BarchartV',
		props: [{
			key: 'countryKeyValue',
			value: {
				shouldResetScroll: true,
				items: countryKeyValue,
				title: `When updated, scroll resets`,
			},
		}, {
			key: 'countryKeyValueAlt',
			value: {
				shouldResetScroll: true,
				items: countryKeyValueAlt,
				title: `When updated, scroll resets`,
			},
		}],
		slug: 'BarchartV-shouldResetScroll',
		title: 'Scroll reset (enabled)',
		usage: `
			<BarchartV
				{items}
				shouldResetScroll={true}
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
