import {default as AlertTriangle} from '@svizzle/ui/src/icons/feather/AlertTriangle.svelte';
import {default as ArrowRightCircle} from '@svizzle/ui/src/icons/feather/ArrowRightCircle.svelte';
import {default as Download} from '@svizzle/ui/src/icons/feather/Download.svelte';
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
					import Icon
						from '@svizzle/ui/src/icons/Icon.svelte';
					import Settings
						from '@svizzle/ui/src/icons/feather/Settings.svelte';
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
					import Icon
						from '@svizzle/ui/src/icons/Icon.svelte';
					import AlertTriangle
						from '@svizzle/ui/src/icons/feather/AlertTriangle.svelte';
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
					import Icon
						from '@svizzle/ui/src/icons/Icon.svelte';
					import Sun
						from '@svizzle/ui/src/icons/feather/Sun.svelte';
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
					import Icon
						from '@svizzle/ui/src/icons/Icon.svelte';
					import ArrowRightCircle
						from '@svizzle/ui/src/icons/feather/ArrowRightCircle.svelte';
				</script>

				<Icon
					fill='palegreen'
					glyph={ArrowRightCircle}
					size=100
					strokeWidth=1
				/>
			`,
		}, {
			key: 'No props',
			props: {},
			usage: `
				<script>
					import Icon
						from '@svizzle/ui/src/icons/Icon.svelte';
				</script>

				<Icon />
			`,
		}],
		doc: [
			{tag: 'p', content: 'We need to pass the `glyph` prop (a Svelte component that renders SVG tags) to `Icon`.'},
			{tag: 'p', content: 'We provide Feather icons glyphs (https://feathericons.com/) in `@svizzle/ui/src/icons/feather/`, where component names are camel cased Feather ids: e.g. `alert-triangle` => `AlertTriangle`.'},
			{tag: 'p', content: 'Later on we might provide more icon collections. Or of course you can use your own glyphs!'},
			{tag: 'p', content: 'To style an icon, use `fill`, `stroke` (strings) and `strokeWidth` (a number).'},
			{tag: 'p', content: 'To size the icon, use `size` (a number).'},
			{tag: 'p', content: '`Icon` exports there readonly props: `defaultFill = "none"`, `defaultSize = 24`, `defaultStroke = "currentColor"`, `defaultStrokeWidth = 2`.'},
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
	{
		data: [{
			content: 'Svelte website',
			key: 'href + text',
			props: {
				href: 'https://svelte.dev',
			},
			usage: `
				<Link href='https://svelte.dev'>
					Svelte website
				</Link>
			`,
		}, {
			key: 'href + no text',
			props: {
				href: 'https://svelte.dev',
			},
			usage: `
				<Link href='https://svelte.dev'/>
			`,
		}, {
			content: 'Svelte website',
			key: 'no href + text',
			props: {},
			usage: `
				<Link>
					Svelte website
				</Link>
			`,
		}, {
			content: 'Svelte website',
			key: 'External link',
			props: {
				href: 'https://svelte.dev',
				type: 'external',
			},
			usage: `
				<Link
					href='https://svelte.dev'
					type='external'
				>
					Svelte website
				</Link>
			`,
		}, {
			content: 'Svelte website',
			key: 'External link + icon size',
			props: {
				href: 'https://svelte.dev',
				iconSize: 30,
				type: 'external',
			},
			usage: `
				<Link
					href='https://svelte.dev'
					iconSize=30
					type='external'
				>
					Svelte website
				</Link>
			`,
		}, {
			content: 'Svelte website',
			key: 'External link, no icon',
			props: {
				href: 'https://svelte.dev',
				showIcon: false,
				type: 'external',
			},
			usage: `
				<Link
					href='https://svelte.dev'
					showIcon={false}
					type='external'
				>
					Svelte website
				</Link>
			`,
		}, {
			content: 'Svelte website',
			key: 'Style',
			props: {
				href: 'https://svelte.dev',
				theme: {
					color: 'orange',
					iconStroke: 'red',
					iconStrokeWidth: 4,
				},
				type: 'external'
			},
			usage: `
				<Link
					href='https://svelte.dev'
					theme={{
						color: 'orange',
						iconStroke: 'red',
						iconStrokeWidth: 4,
					}}
					type='external'
				>
					Svelte website
				</Link>
			`,
		}, {
			content: 'Svelte website',
			key: 'External link + style',
			props: {
				href: 'https://svelte.dev',
				theme: {
					color: 'magenta',
					iconStroke: 'green',
					iconStrokeWidth: 3,
				},
				type: 'external',
			},
			usage: `
				<Link
					href='https://svelte.dev'
					theme={{
						color: 'magenta',
						iconStroke: 'green',
						iconStrokeWidth: 3,
					}}
					type='external'
				>
					Svelte website
				</Link>
			`,
		}],
		doc: [
			{tag: 'p', content: 'An HTML link.'},
			{tag: 'p', content: `See @svizzle/ui's README for the full list of props.`},
		],
		name: 'Link',
		packageName: 'ui',
		slug: 'ui-Link',
		title: 'Link',
	},
	{
		data: [{
			key: 'href + text',
			props: {
				href: 'https://svelte.dev',
				text: 'Navigate',
			},
			usage: `
				<LinkButton
					href='https://svelte.dev'
					text='Navigate'
				/>
			`,
		}, {
			key: 'No `href`',
			props: {
				text: 'Click me',
			},
			usage: `
				<LinkButton text='Click me'/>
			`,
		}, {
			key: 'No `text`',
			props: {
				href: 'https://svelte.dev'
			},
			usage: `
				<LinkButton href='https://svelte.dev'/>
			`,
		}, {
			key: 'href + text + glyph (Download icon)',
			props: {
				href: 'https://svelte.dev',
				text: 'Navigate',
				glyph: Download,
			},
			usage: `
				<LinkButton
					href='https://svelte.dev'
					text='Navigate'
					glyph={Download}
				/>
			`,
		}, {
			key: 'href + text + glyph (AlertTriangle icon) + theme',
			props: {
				href: 'https://svelte.dev',
				text: 'Proceed with caution!',
				glyph: AlertTriangle,
				theme: {
					backgroundColor: 'red',
					boxShadowColor: 'blue',
					boxShadowVec: '4px 8px 8px -4px',
					textColor: 'yellow',
				}
			},
			usage: `
				<LinkButton
					href='https://svelte.dev'
					glyph={AlertTriangle}
					theme={{
						backgroundColor: 'red',
						boxShadowColor: 'blue',
						boxShadowVec: '4px 8px 8px -4px',
						textColor: 'yellow',
					}}
					text='Proceed with caution!'
				/>
			`,
		}, {
			key: 'Styled/Sized icon (ArrowRightCircle icon)',
			props: {
				href: 'https://svelte.dev',
				text: 'Styled/Sized icon',
				glyph: ArrowRightCircle,
				theme: {
					iconFill: 'magenta',
					iconStroke: 'palegreen',
					iconStrokeWidth: 3,
				},
				iconSize: 35
			},
			usage: `
				<LinkButton
					href='https://svelte.dev'
					glyph={ArrowRightCircle}
					theme={{
						iconFill: 'magenta',
						iconStroke: 'palegreen',
						iconStrokeWidth: 3,
					}}
					text='Styled/Sized icon'
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'A button that acts like a link.'},
			{tag: 'p', content: `See @svizzle/ui's README for the full list of props.`},
		],
		name: 'LinkButton',
		packageName: 'ui',
		slug: 'ui-LinkButton',
		title: 'LinkButton',
	},
	{
		data: [{
			key: 'no props',
			props: {
			},
			usage: `
				<LoadingView />
			`,
		}, {
			key: 'message',
			props: {
				message: 'Loading...'
			},
			usage: `
				<LoadingView
					message='Loading...'
				/>
			`,
		}, {
			key: 'glyph',
			props: {
				glyph: ArrowRightCircle,
				size: 100
			},
			usage: `
				<script>
					import ArrowRightCircle
						from '@svizzle/ui/src/icons/feather/ArrowRightCircle.svelte';
				</script>

				<LoadingView
					size=100
					glyph={ArrowRightCircle}
				/>
			`,
		}, {
			key: 'icon style',
			props: {
				fill: 'palegreen',
				glyph: ArrowRightCircle,
				stroke: 'blue',
				strokeWidth: 3
			},
			usage: `
				<script>
					import ArrowRightCircle
						from '@svizzle/ui/src/icons/feather/ArrowRightCircle.svelte';
				</script>

				<LoadingView
					fill='palegreen'
					glyph={ArrowRightCircle}
					stroke='blue'
					strokeWidth=3
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'A simple loading view with a spinning icon.'},
			{tag: 'p', content: `See @svizzle/ui's README for the full list of props.`},
		],
		name: 'LoadingView',
		packageName: 'ui',
		slug: 'ui-LoadingView',
		title: 'LoadingView',
	}
]);
