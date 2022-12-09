import {
	AlertTriangle,
	ArrowRightCircle,
	Settings,
	Sun,
} from '@svizzle/ui';

export const name = 'Icon';
export const packageName = 'ui';
export const title = 'Icons';
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
		key: '`glyph`: Settings',
		props: {
			glyph: Settings
		},
		usage: `
			<script>
				import {Icon, Settings} from '@svizzle/ui';
			</script>

			<Icon glyph={Settings} />
		`,
	},
	{
		key: '`glyph`: AlertTriangle, `size`, `strokeWidth`, `stroke`',
		props: {
			glyph: AlertTriangle,
			size: 300,
			strokeWidth: 3,
			stroke: 'orangered',
		},
		usage: `
			<script>
				import {AlertTriangle, Icon} from '@svizzle/ui';
			</script>

			<Icon
				glyph={AlertTriangle}
				size=300
				strokeWidth=3
				stroke='orangered'
			/>
		`,
	},
	{
		key: '`glyph`: Sun, `stroke`',
		props: {
			glyph: Sun,
			stroke: 'gold',
		},
		usage: `
			<script>
				import {Icon, Sun} from '@svizzle/ui';
			</script>
			<Icon
				glyph={Sun}
				stroke='gold'
			/>
		`,
	},
	{
		key: '`glyph`: ArrowRightCircle, `fill`, `size`',
		props: {
			fill: 'palegreen',
			glyph: ArrowRightCircle,
			size: 100,
			strokeWidth: 1,
		},
		usage: `
			<script>
				import {ArrowRightCircle, Icon} from '@svizzle/ui';
			</script>

			<Icon
				fill='palegreen'
				glyph={ArrowRightCircle}
				size=100
				strokeWidth=1
			/>
		`,
	},
	{
		key: 'No props',
		props: {},
		usage: `
			<script>
				import {Icon} from '@svizzle/ui';
			</script>

			<Icon />
		`,
	}
];
