export const name = 'HyperLink';
export const packageName = 'ui';
export const title = 'HyperLink';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'An accessible HTML anchor.'},
	{tag: 'p', content: `See @svizzle/ui's README for the full list of props.`},
];
export const data = [
	{
		content: 'Svelte website',
		key: 'href + text',
		props: {
			href: 'https://svelte.dev',
		},
		usage: `
			<HyperLink href='https://svelte.dev'>
				Svelte website
			</HyperLink>
		`,
	},
	{
		key: 'href + no text',
		props: {
			href: 'https://svelte.dev',
		},
		usage: `
			<HyperLink href='https://svelte.dev' />
		`,
	},
	{
		content: 'Svelte website',
		key: 'no href + text',
		props: {},
		usage: `
			<HyperLink>
				Svelte website
			</HyperLink>
		`,
	},
	{
		content: 'Svelte website',
		key: 'External link',
		props: {
			href: 'https://svelte.dev',
			type: 'external',
		},
		usage: `
			<HyperLink
				href='https://svelte.dev'
				type='external'
			>
				Svelte website
			</HyperLink>
		`,
	},
	{
		content: 'Svelte website',
		key: 'External link + icon size',
		props: {
			href: 'https://svelte.dev',
			iconSize: 30,
			type: 'external',
		},
		usage: `
			<HyperLink
				href='https://svelte.dev'
				iconSize=30
				type='external'
			>
				Svelte website
			</HyperLink>
		`,
	},
	{
		content: 'Svelte website',
		key: 'External link, no icon',
		props: {
			href: 'https://svelte.dev',
			showIcon: false,
			type: 'external',
		},
		usage: `
			<HyperLink
				href='https://svelte.dev'
				showIcon={false}
				type='external'
			>
				Svelte website
			</HyperLink>
		`,
	},
	{
		content: 'Focus me to see the outline style',
		key: 'Style',
		props: {
			href: 'https://svelte.dev',
			theme: {
				color: 'orange',
				iconStroke: 'red',
				iconStrokeWidth: 4,
				outlineColor: 'blue',
				outlineStyle: 'dotted',
				outlineWidth: '2px',
			},
			type: 'external'
		},
		usage: `
			<HyperLink
				href='https://svelte.dev'
				theme={{
					color: 'orange',
					iconStroke: 'red',
					iconStrokeWidth: 4,
					outlineColor: 'blue',
					outlineStyle: 'dotted',
					outlineWidth: '2px',
				}}
				type='external'
			>
				Focus me to see the outline style
			</HyperLink>
		`,
	},
	{
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
			<HyperLink
				href='https://svelte.dev'
				theme={{
					color: 'magenta',
					iconStroke: 'green',
					iconStrokeWidth: 3,
				}}
				type='external'
			>
				Svelte website
			</HyperLink>
		`,
	}
];
