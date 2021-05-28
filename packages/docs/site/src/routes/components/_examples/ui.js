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
			key: 'href + text',
			props: {
				href: 'https://svelte.dev',
				text: 'Svelte website',
			},
			usage: `
				<Link
					href='https://svelte.dev'
					text='Svelte website'
				/>
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
			key: 'no href + text',
			props: {
				text: 'Svelte website',
			},
			usage: `
				<Link
					text='Svelte website'
				/>
			`,
		}, {
			key: 'External link',
			props: {
				href: 'https://svelte.dev',
				isExternal: true,
				text: 'Svelte website',
			},
			usage: `
				<Link
					href='https://svelte.dev'
					isExternal={true}
					text='Svelte website'
				/>
			`,
		}, {
			key: 'External link + icon size',
			props: {
				href: 'https://svelte.dev',
				iconSize: 30,
				isExternal: true,
				text: 'Svelte website',
			},
			usage: `
				<Link
					href='https://svelte.dev'
					iconSize=30
					isExternal={true}
					text='Svelte website'
				/>
			`,
		}, {
			key: 'Style',
			props: {
				href: 'https://svelte.dev',
				text: 'Svelte website',
				theme: {
					iconStroke: 'red',
					iconStrokeWidth: 4,
					textColor: 'orange',
				}
			},
			usage: `
				<Link
					href='https://svelte.dev'
					text='Svelte website'
					theme={{
						textColor: 'orange',
					}}
				/>
			`,
		}, {
			key: 'External link + style',
			props: {
				href: 'https://svelte.dev',
				isExternal: true,
				text: 'Svelte website',
				theme: {
					iconStroke: 'green',
					iconStrokeWidth: 3,
					textColor: 'magenta',
				}
			},
			usage: `
				<Link
					href='https://svelte.dev'
					isExternal={true}
					text='Svelte website'
					theme={{
						iconStroke: 'green',
						iconStrokeWidth: 3,
						textColor: 'magenta',
					}}
				/>
			`,
		}],
		doc: [
			{tag: 'p', content: 'An HTML link.'},
			{tag: 'p', content: 'You can pass `href` and an `text`.'},
			{tag: 'p', content: 'The `size` prop (a number in pixels) controls the icon size.'},
			{tag: 'p', content: `Note that the link text isn't styled but it is clickable.`},
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
			{tag: 'p', content: 'A simple link with an "external link" icon.'},
			{tag: 'p', content: 'You can pass `href` and an `text`.'},
			{tag: 'p', content: 'The `size` prop (a number in pixels) controls the icon size.'},
			{tag: 'p', content: `Note that the link text isn't styled but it is clickable.`},
		],
		name: 'LinkButton',
		packageName: 'ui',
		slug: 'ui-LinkButton',
		title: 'LinkButton',
	}
]);
