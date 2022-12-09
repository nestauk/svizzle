import {
	AlertTriangle,
	ArrowRightCircle,
	Download,
} from '@svizzle/ui';

export const name = 'LinkButton';
export const packageName = 'ui';
export const title = 'LinkButton';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A button that acts like a link.'},
	{tag: 'p', content: `See @svizzle/ui's README for the full list of props.`},
];
export const data = [
	{
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
	},
	{
		key: 'No `href`',
		props: {
			text: 'Click me',
		},
		usage: `
			<LinkButton text='Click me' />
		`,
	},
	{
		key: 'No `text`',
		props: {
			href: 'https://svelte.dev'
		},
		usage: `
			<LinkButton href='https://svelte.dev' />
		`,
	},
	{
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
	},
	{
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
	},
	{
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
	}
];
