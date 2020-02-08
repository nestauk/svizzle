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
		props: {
			items: countryKeyValue,
		},
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
		props: {
			items: countryKeyValue,
			title: myTitle
		},
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
		props: {
			items: countryKeyValue,
			keyToColor
		},
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
		props: {
			defaultColor,
			items: countryKeyValue,
			keyToColor: keyToColorShort,
		},
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
		props: {
			focusedKey,
			items: countryKeyValue,
		},
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
			{tag: 'p', content: "By providing a object mapping bar key -> bar label, you can control how the bar are labeled."},
		],
		name: 'BarchartV',
		props: {
			keyToLabel,
			items: countryKeyValue,
		},
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
		props: {
			keyToLabelFn: `x => '--' + x + '--'`,
			items: countryKeyValue,
		},
		fnProps: ['keyToLabelFn'],
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
			{tag: 'p', content: "• Mouse-exiting a bar dispatches a `entered` event: `dispatch('exited', {id: key})`."},
			{tag: 'p', content: "To try hover and click the bars of this barchart to read the correspondent event payload below."},
		],
		events: [
			'entered',
			'exited',
			'clicked',
		],
		name: 'BarchartV',
		props: {
			isInteractive: true,
			items: countryKeyValue,
		},
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
		fnProps: ['valueAccessor'],
		name: 'BarchartV',
		props: {
			items: countryKeyRawValue,
			valueAccessor: 'item => Number(Math.sqrt(item.rawValue).toFixed(3))',
		},
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
			{tag: 'p', content: "If `shouldResetScroll` is not provided or set to `false`, updating the props will not reset the scroll."},
			{tag: 'p', content: "In this example, scrolling the barchart and then switching props using the buttons below should not reset the scroll."},
		],
		name: 'BarchartV',
		props: {
			shouldResetScroll: false,
			items: countryKeyValue,
		},
		props_alt: {
			shouldResetScroll: false,
			items: countryKeyValueAlt,
		},
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
		props: {
			shouldResetScroll: true,
			items: countryKeyValue,
		},
		props_alt: {
			shouldResetScroll: true,
			items: countryKeyValueAlt,
		},
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
