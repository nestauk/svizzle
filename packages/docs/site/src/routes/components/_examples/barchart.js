import {
	countryKeyRawValue,
	countryKeyValuePositive,
	countryKeyValuePositiveWithZeroes,
	countryKeyValueNegatives,
	countryKeyValueMixed,
	countryKeyValueAlt,
	keyToColorWorld,
	keyToColorWorldFn,
	keyToColorWorldShort,
	keyToLabel,
} from './props';
import {formatExamples} from './utils';

const axisColor = 'red';
const backgroundColor = 'antiquewhite';
const barDefaultColor = 'orange';
const barHeight = 12;
const fontSize = 22;
const textColor = 'green';
const title = 'My title';

export default formatExamples([
	{
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
			key: 'Positive and zero values',
			props: {
				items: countryKeyValuePositiveWithZeroes,
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
		doc: [
			{tag: 'p', content: 'In the most basic setup, you need to provide a `{items}` array of objects with the shape `{key: string, props: number}`.'},
			{tag: 'p', content: 'Note that if there are both positive and negative values the chart will show a vertical axis, `grey` by default.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv',
		title: 'Basic props',
	},
	{
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
		doc: [
			{tag: 'p', content: 'Providing a `{title}` shows the barchart with an `h2` header.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-title',
		title: 'Title',
	},
	{
		data: [{
			key: 'All positive values',
			props: {
				barHeight,
				items: countryKeyValuePositive,
				theme: {
					axisColor,
					backgroundColor,
					fontSize,
					hoverColor: 'palegreen',
					textColor,
				},
				title: 'Hover me!',
			},
			usage: `
				<BarchartV
					{items}
					barHeight = ${barHeight}
					theme={{
						axisColor: '${axisColor}',
						backgroundColor: '${backgroundColor}',
						fontSize: ${fontSize},
						hoverColor: 'palegreen',
						textColor: '${textColor}',
					}}
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				barHeight,
				items: countryKeyValueNegatives,
				theme: {
					axisColor,
					backgroundColor,
					fontSize,
					textColor,
				},
			},
			usage: `
				<BarchartV
					{items}
					barHeight = ${barHeight}
					theme={{
						axisColor: '${axisColor}',
						backgroundColor: '${backgroundColor}',
						fontSize: ${fontSize},
						textColor: '${textColor}'
					}}
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				barHeight,
				items: countryKeyValueMixed,
				theme: {
					axisColor,
					backgroundColor,
					fontSize,
					textColor,
				},
			},
			usage: `
				<BarchartV
					{items}
					barHeight = ${barHeight}
					theme={{
						axisColor: '${axisColor}',
						backgroundColor: '${backgroundColor}',
						fontSize: ${fontSize},
						textColor: '${textColor}'
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can setup a `backgroundColor` and the `textColor`.'},
			{tag: 'p', content: '`barHeight` and `fontSize` contribute to determine the distance between bars.'},
			{tag: 'p', content: 'You can configure the axis color using the `axisColor` props (used in case there are values of both signs).'},
			{tag: 'p', content: 'You can choose the hovered bar background color by providing `hoverColor`.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-styles',
		title: 'Styles',
	},
	{
		data: [{
			key: 'All positive values',
			props: {
				items: countryKeyValuePositive,
				keyToColor: keyToColorWorldShort,
				theme: {barDefaultColor},
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					theme={{barDefaultColor:'${barDefaultColor}'}}
				/>
			`,
		}, {
			key: 'All negative values',
			props: {
				items: countryKeyValueNegatives,
				keyToColor: keyToColorWorldShort,
				theme: {barDefaultColor},
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					theme={{barDefaultColor:'${barDefaultColor}'}}
				/>
			`,
		}, {
			key: 'Mixed values',
			props: {
				items: countryKeyValueMixed,
				keyToColor: keyToColorWorldShort,
				theme: {barDefaultColor},
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					theme={{barDefaultColor:'${barDefaultColor}'}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can provide a `barDefaultColor` to be used for bars with no correspondent key in `keyToColor`.'},
			{tag: 'p', content: 'If not provided, `barDefaultColor` is `null`, which renders `black`.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-barDefaultColor',
		title: 'Default bars color',
	},
	{
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
		doc: [
			{tag: 'p', content: 'By providing `keyToColor`, an object mapping bar key -> bar color, you can assign bars color.'},
			{tag: 'p', content: 'Notice that the default color for keys not in `keyToColor` is set by `barDefaultColor` (black if not provided, see `AL` and `AD`).'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-keyToColor',
		title: 'Bars color (via mapping)',
	},
	{
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
		doc: [
			{tag: 'p', content: 'Instead of passing `keyToColor` you can pass a function `keyToColorFn`.'},
			{tag: 'p', content: 'Note that if you pass both `keyToColor` and `keyToColorFn`, `keyToColor` takes precedence.'},
			{tag: 'p', content: 'Also note that if the value returned by `keyToColorFn` is falsy the fallback is `barDefaultColor` (which falls back to `black` if `barDefaultColor` is not provided).'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-keyToColorFn',
		title: 'Bars color (via function)',
	},
	{
		data: [{
			key: 'A focused key (no scroll)',
			props: {
				focusedKey: 'CY',
				items: countryKeyValueMixed,
				theme: {focusedKeyColor: 'yellow'},
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='CY'
					theme={{focusedKeyColor: 'yellow'}}
				/>
			`,
		}, {
			key: 'Another focused key',
			props: {
				focusedKey: 'BG',
				items: countryKeyValueMixed,
				shouldScrollToFocusedKey: true,
				theme: {focusedKeyColor: 'yellow'},
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='CY'
					shouldScrollToFocusedKey={true}
					theme={{focusedKeyColor: 'yellow'}}
				/>
			`,
		}, {
			key: 'Another focused key',
			props: {
				focusedKey: 'PL',
				items: countryKeyValueMixed,
				shouldScrollToFocusedKey: true,
				theme: {focusedKeyColor: 'yellow'},
			},
			usage: `
				<BarchartV
					{items}
					focusedKey='PL'
					shouldScrollToFocusedKey={true}
					theme={{focusedKeyColor: 'yellow'}}
				/>
			`,
		}, {
			key: 'No focused key (should not scroll)',
			props: {
				items: countryKeyValueMixed,
				shouldScrollToFocusedKey: true,
				theme: {focusedKeyColor: 'yellow'},
			},
			usage: `
				<BarchartV
					{items}
					shouldScrollToFocusedKey={true}
					theme={{focusedKeyColor: 'yellow'}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can set the focused bar by providing its key.'},
			{tag: 'p', content: 'This is useful when we select the chosen key in another part of the application and we want to provide a way to see what bar correspond to the current selection.'},
			{tag: 'p', content: 'You can set the focused bar background color by providing its `focusedKeyColor`.'},
			{tag: 'p', content: 'By passing `shouldScrollToFocusedKey` to `true` you can set chart to always scroll to the focused key, if any.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-focusedKey',
		title: 'Focused key',
	},
	{
		data: [{
			key: 'Some selected keys',
			props: {
				selectedKeys: ['AD', 'AM', 'HR', 'CY', 'DE'],
				items: countryKeyValuePositive,
			},
			usage: `
				<BarchartV
					{items}
					selectedKeys={['HR', 'AM', 'HR', 'CY', 'DE']},
				/>
			`,
		}, {
			key: 'Some other selected keys (with colors, default opacity)',
			props: {
				items: countryKeyValuePositive,
				keyToColor: keyToColorWorld,
				selectedKeys: ['AL', 'AT', 'BY', 'CZ', 'FI'],
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					selectedKeys={['AL', 'AT', 'BY', 'CZ', 'FI']},
				/>
			`,
		}, {
			key: 'Some other selected keys (with colors and custom opacity)',
			props: {
				items: countryKeyValuePositive,
				keyToColor: keyToColorWorld,
				selectedKeys: ['AL', 'AT', 'BY', 'CZ', 'FI'],
				theme: {deselectedOpacity: 0.1}
			},
			usage: `
				<BarchartV
					{items}
					{keyToColor}
					selectedKeys={['AL', 'AT', 'BY', 'CZ', 'FI']},
					theme={{deselectedOpacity: 0.1}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can select a set of bars by passing `selectedKeys`, an array of keys. The correspondent bars will get a lower opacity.'},
			{tag: 'p', content: 'If needed you can setup a custom opacity for the deselected bars by passing `deselectedOpacity` in the `theme` object.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-selectedKeys',
		title: 'Selected keys',
	},
	{
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
		doc: [
			{tag: 'p', content: 'By providing a object mapping bar key -> bar label, you can control how the bar are labeled.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-keyToLabel',
		title: 'Labels (via mapping)',
	},
	{
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
		doc: [
			{tag: 'p', content: 'By providing a function mapping bar key -> bar label, you can control how the bar are labeled programmatically.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-keyToLabelFn',
		title: 'Labels (via function)',
	},
	{
		data: [{
			key: 'With no title',
			props: {
				items: countryKeyValuePositive,
				refs: [
					{key: 'National average', value: 200}
				],
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'National average', value: 200}
					]}
				/>
			`,
		}, {
			key: 'With a title',
			props: {
				items: countryKeyValuePositive,
				refs: [
					{key: 'National average', value: 200}
				],
				title: 'With a title'
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'National average', value: 200}
					]}
					title='Compare it with national average'
				/>
			`,
		}, {
			key: 'Multiple refs, with a title',
			props: {
				items: countryKeyValuePositive,
				refs: [
					{key: 'National average', value: 200},
					{key: 'Another value', value: 53},
					{key: 'Yet another value', value: 700},
				],
				title: 'Multiple refs'
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'National average', value: 200},
						{key: 'Another value', value: 53},
						{key: 'Yet another value', value: 400},
					]}
					title='Multiple refs'
				/>
			`,
		}, {
			key: 'Multiple refs, with axis',
			props: {
				items: countryKeyValueMixed,
				refs: [
					{key: 'Another value', value: -153},
					{key: 'National average', value: 200},
					{key: 'Yet another value', value: 700},
				],
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'Another value', value: -153},
						{key: 'National average', value: 200},
						{key: 'Yet another value', value: 400},
					]}
				/>
			`,
		}, {
			key: 'Common line style',
			props: {
				items: countryKeyValuePositive,
				refs: [
					{key: 'National average', value: 200},
					{key: 'Another value', value: 53}
				],
				theme: {
					refDasharray: '2 10',
					refWidth: 2,
					refColor: 'red',
				},
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'National average', value: 200},
						{key: 'Another value', value: 53}
					]}
					theme={{
						refDasharray: '2 10',
						refWidth: 2,
						refColor: 'red',
					}}
				/>
			`,
		}, {
			key: 'Specific line style',
			props: {
				items: countryKeyValuePositive,
				refs: [
					{key: 'National average', value: 200},
					{
						key: 'Another value',
						value: 53,
						dasharray: '4 10',
						linewidth: 2,
						color: 'blue',
					},
					{
						key: 'Yet another value',
						value: 400,
						dasharray: '2 2',
						color: 'orange',
					},
				],
				theme: {
					refDasharray: '2 10',
					refWidth: 2,
					refColor: 'red',
				},
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'National average', value: 200},
						{
							key: 'Another value',
							value: 53,
							dasharray: '4 10',
							linewidth: 2,
							color: 'blue',
						},
						{
							key: 'Yet another value',
							value: 400,
							dasharray: '2 2',
							color: 'orange',
						}
					]}
					theme={{
						refDasharray: '2 10',
						refWidth: 2,
						refColor: 'red',
					}}
				/>
			`,
		}, {
			key: 'Ref lines exceeding data extent',
			props: {
				items: countryKeyValuePositive,
				refs: [
					{key: 'National average', value: 1200}
				],
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'National average', value: 1200}
					]}
				/>
			`,
		}, {
			key: 'Multiple refs exceeding data extent (positive extent)',
			props: {
				items: countryKeyValuePositive,
				refs: [
					{key: 'Another value', value: -200},
					{key: 'National average', value: 500},
					{key: 'Yet another value', value: 1300},
				],
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'Another value', value: -200},
						{key: 'National average', value: 500},
						{key: 'Yet another value', value: 1300},
					]}
				/>
			`,
		}, {
			key: 'Multiple refs exceeding data extent (pos & neg extent)',
			props: {
				items: countryKeyValueMixed,
				refs: [
					{key: 'Another value', value: -200},
					{key: 'National average', value: 500},
					{key: 'Yet another value', value: 1300},
				],
			},
			usage: `
				<BarchartV
					{items}
					refs={[
						{key: 'Another value', value: -200},
						{key: 'National average', value: 500},
						{key: 'Yet another value', value: 1300},
					]}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'You can show reference lines by providing an array `refs` with shape `{key, value}[]`.'},
			{tag: 'p', content: 'You can style reference lines usind the `theme` props `refColor`, `refDasharray` and `refWidth`.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-refs',
		title: 'Reference lines',
	},
	{
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
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-interactivity',
		title: 'Interactivity',
	},
	{
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
		doc: [
			{tag: 'p', content: 'By default we assume that `items` has the shape `{key, value}`.'},
			{tag: 'p', content: 'By providing a `valueAccessor` function we can derive the bar value from `items` with different shapes.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-valueAccessor',
		title: 'Values accessor',
	},
	{
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
		doc: [
			{tag: 'p', content: 'You can provide a `formatFn` function to turn the `value` in the desired string.'},
			{tag: 'p', content: 'A way to use this would be to pass a function derived from `d3-format`.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-formatFn',
		title: 'Values format',
	},
	{
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
		doc: [
			{tag: 'p', content: 'If `shouldResetScroll` is not provided or set to `false`, updating the props will not reset the scroll.'},
			{tag: 'p', content: 'In this example, scrolling the barchart and then switching props using the buttons below should not reset the scroll.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-no-shouldResetScroll',
		title: 'Scroll reset (disabled)',
	},
	{
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
		doc: [
			{tag: 'p', content: 'If `shouldResetScroll` is set to `true`, updating the `items` prop will reset the scroll.'},
			{tag: 'p', content: 'In this example, scrolling the barchart and then updating props using the buttons below should reset the scroll.'},
		],
		name: 'BarchartVDiv',
		packageName: 'barchart',
		slug: 'BarchartVDiv-shouldResetScroll',
		title: 'Scroll reset (enabled)',
	},
]);
