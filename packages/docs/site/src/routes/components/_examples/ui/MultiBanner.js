import {AlphabetPicker, CopyToClipboard, LoadingView} from '@svizzle/ui';

export const name = 'MultiBanner';
export const packageName = 'ui';
export const title = 'MultiBanner';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'Shows multiple banners one after the other as the user dismisses them one by one.'},
	{tag: 'p', content: 'Note that if `components` is `undefined` or an empty array the component won\'t render anything.'},
	{tag: 'p', content: 'You can theme it with the same `theme` object used in `Banner.svelte`.'},
	{tag: 'p', content: 'The `_screen` prop expects a store with the same name from `@svizzle/ui`\'s `ScreenSensor` and is used to style the component for `medium` screens.`'},
];
export const data = [
	{
		key: 'No props',
		props: {
		},
		usage: `
			<MultiBanner />
		`,
	},
	{
		key: 'Basic',
		props: {
			components: [
				AlphabetPicker,
				CopyToClipboard,
				LoadingView,
			]
		},
		usage: `
			<MultiBanner
				components={[
					AlphabetPicker,
					CopyToClipboard,
					LoadingView,
				]}
			/>
		`,
	},
	{
		key: 'Style',
		props: {
			components: [
				AlphabetPicker,
				CopyToClipboard,
				LoadingView,
			],
			footerText: 'My custom message',
			theme: {
				border: '4px dotted red',
				borderRadius: '3rem',
				colorBackdropSensor: 'rgba(255, 255, 0, 0.25)',
				colorBackground: 'orange',
				colorBoxShadow: 'magenta',
				colorText: 'blue',
				padding: '4rem',
				shadowGeometry: '12px 18px 19px -14px',
			}
		},
		usage: `
			<MultiBanner
				components={[
					AlphabetPicker,
					CopyToClipboard,
					LoadingView,
				]}
				footerText='My custom message'
				theme={{
					border: '4px dotted red',
					borderRadius: '3rem',
					colorBackdropSensor: 'rgba(255, 255, 0, 0.25)',
					colorBackground: 'orange',
					colorBoxShadow: 'magenta',
					colorText: 'blue',
					padding: '4rem',
					shadowGeometry: '12px 18px 19px -14px'
				}}
			/>
		`,
	},
];
