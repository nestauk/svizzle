import {ArrowRightCircle} from '@svizzle/ui';

export const name = 'LoadingView';
export const packageName = 'ui';
export const title = 'LoadingView';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'We need to pass the `glyph` prop (a Svelte component that renders SVG tags) to `Icon`.'},
	{tag: 'p', content: 'We provide Feather icons glyphs (https://feathericons.com/) in `@svizzle/ui`, where component names are camel cased Feather ids: e.g. `alert-triangle` => `AlertTriangle`.'},
	{tag: 'p', content: 'Later on we might provide more icon collections. Or of course you can use your own glyphs!'},
	{tag: 'p', content: 'To style an icon, use `fill`, `stroke` (strings) and `strokeWidth` (a number).'},
	{tag: 'p', content: 'To size the icon, use `size` (a number).'},
	{tag: 'p', content: '`Icon` exports there readonly props: `defaultFill = "none"`, `defaultSize = 24`, `defaultStroke = "currentColor"`, `defaultStrokeWidth = 2`.'},
];
export const data = [
	{
		key: 'no props',
		props: {
		},
		usage: `
			<LoadingView />
		`,
	},
	{
		key: 'message',
		props: {
			message: 'Loading...'
		},
		usage: `
			<LoadingView
				message='Loading...'
			/>
		`,
	},
	{
		key: 'glyph',
		props: {
			glyph: ArrowRightCircle,
			size: 100
		},
		usage: `
			<script>
				import {ArrowRightCircle} from '@svizzle/ui';
			</script>

			<LoadingView
				size=100
				glyph={ArrowRightCircle}
			/>
		`,
	},
	{
		key: 'icon style',
		props: {
			fill: 'palegreen',
			glyph: ArrowRightCircle,
			stroke: 'blue',
			strokeWidth: 3
		},
		usage: `
			<script>
				import {ArrowRightCircle, Icon} from '@svizzle/ui';
			</script>

			<LoadingView
				fill='palegreen'
				glyph={ArrowRightCircle}
				stroke='blue'
				strokeWidth=3
			/>
		`,
	}
];
