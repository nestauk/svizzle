import {default as AlertTriangle} from '@svizzle/ui/src/icons/feather/AlertTriangle.svelte';
import {default as ArrowRightCircle} from '@svizzle/ui/src/icons/feather/ArrowRightCircle.svelte';
import {default as Sun} from '@svizzle/ui/src/icons/feather/Sun.svelte';
import {default as Settings} from '@svizzle/ui/src/icons/feather/Settings.svelte';

import {formatExamples} from './utils';

export default formatExamples([
	{
		data: [{
			key: '`glyph`: Settings',
			props: {
				glyph: Settings
			},
			usage: `
				<script>
					import {default as Icon} from '@svizzle/ui/src/icons/Icon.svelte';
					import {default as Settings} from '@svizzle/ui/src/icons/feather/Settings.svelte';
				</script>
				<Icon glyph={Settings} />
			`,
		}, {
			key: '`glyph`: AlertTriangle, `size`, `strokeWidth`, `stroke`',
			props: {
				glyph: AlertTriangle,
				size: 300,
				strokeWidth: 3,
				stroke: 'orangered',
			},
			usage: `
				<script>
					import {default as Icon} from '@svizzle/ui/src/icons/Icon.svelte';
					import {default as AlertTriangle} from '@svizzle/ui/src/icons/feather/AlertTriangle.svelte';
				</script>
				<Icon
					glyph={AlertTriangle}
					size=300
					strokeWidth=3
					stroke='orangered'
				/>
			`,
		}, {
			key: '`glyph`: Sun, `stroke`',
			props: {
				glyph: Sun,
				stroke: 'gold',
			},
			usage: `
				<script>
					import {default as Icon} from '@svizzle/ui/src/icons/Icon.svelte';
					import {default as Sun} from '@svizzle/ui/src/icons/feather/Sun.svelte';
				</script>
				<Icon
					glyph={Sun}
					stroke='gold'
				/>
			`,
		}, {
			key: '`glyph`: ArrowRightCircle, `fill`, `size`',
			props: {
				fill: 'palegreen',
				glyph: ArrowRightCircle,
				size: 100,
				strokeWidth: 1,
			},
			usage: `
				<script>
					import {default as Icon} from '@svizzle/ui/src/icons/Icon.svelte';
					import {default as ArrowRightCircle} from '@svizzle/ui/src/icons/feather/ArrowRightCircle.svelte';
				</script>
				<Icon
					fill='palegreen'
					glyph={Sun}
					size=100
					strokeWidth=1
				/>
			`,
		}, {
			key: 'No props',
			props: {},
			usage: `
				<script>
					import {default as Icon} from '@svizzle/ui/src/icons/Icon.svelte';
				</script>
				<Icon />
			`,
		}],
		doc: [
			{tag: 'p', content: 'We need to pass the `glyph` prop (a Svelte component that renders SVG tags) to `Icon`.'},
			{tag: 'p', content: 'We provide Feather icons glyphs (https://feathericons.com/) in `@svizzle/ui/src/icons/feather/`, where component names are Feather ids, camel cased: e.g. `alert-triangle` => `AlertTriangle`.'},
			{tag: 'p', content: 'Later on we might provide more icon collections. Or of course you can use your own glyphs!'},
			{tag: 'p', content: 'To style an icon, use `fill`, `stroke` (strings) and `strokeWidth` (a number).'},
			{tag: 'p', content: 'To size the icon, use `size` (a number).'},
		],
		name: 'Icon',
		packageName: 'ui',
		slug: 'ui-Icon',
		title: 'Icons',
	},
	{
		data: [{
			key: 'A switch',
			props: {
				value: 'Off',
				values: ['Off', 'On']
			},
			usage: `
				<Switch
					value='Off'
					values={['Off', 'On']}
				/>
			`,
		}, {
			key: 'A switch set to the second value',
			props: {
				value: 'On',
				values: ['Off', 'On']
			},
			usage: `
				<Switch
					value='On'
					values={['Off', 'On']}
				/>
			`,
		}, {
			key: 'A switch with no value',
			props: {
				values: ['Off', 'On']
			},
			usage: `
				<Switch values={['Off', 'On']} />
			`,
		}, {
			key: 'A switch with a theme',
			props: {
				values: ['Off', 'On'],
				theme: {
					height: '60px',
					color: 'orange',
					backgroundColor: 'darkviolet',
					knobColor: 'orange'
				}
			},
			usage: `
				<Switch
					values={['Off', 'On']}
					theme={{
						height: '60px',
						color: 'orange',
						backgroundColor: 'darkviolet',
						knobColor: 'orange'
					}}
				/>
			`,
		}, {
			key: 'A switch without labels',
			props: {
				values: ['Off', 'On'],
				hideLabels: true
			},
			usage: `
				<Switch
					values={['Off', 'On']}
					hideLabels={true}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'A simple toggle to select one of two values.'},
			{tag: 'p', content: 'By default it will be created with the first value of `values`, or you can pass the `value` prop to control it.'},
			{tag: 'p', content: 'Passing a `theme` it is possible to style it.'},
		],
		events: [
			'toggled',
		],
		name: 'Switch',
		packageName: 'ui',
		slug: 'ui-Switch',
		title: 'Switch',
	},
]);
