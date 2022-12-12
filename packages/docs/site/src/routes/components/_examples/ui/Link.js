export const name = 'Link';
export const packageName = 'ui';
export const title = 'Link';
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
			<Link href='https://svelte.dev'>
				Svelte website
			</Link>
		`,
	},
	{
		key: 'href + no text',
		props: {
			href: 'https://svelte.dev',
		},
		usage: `
			<Link href='https://svelte.dev' />
		`,
	},
	{
		content: 'Svelte website',
		key: 'no href + text',
		props: {},
		usage: `
			<Link>
				Svelte website
			</Link>
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
			<Link
				href='https://svelte.dev'
				type='external'
			>
				Svelte website
			</Link>
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
			<Link
				href='https://svelte.dev'
				iconSize=30
				type='external'
			>
				Svelte website
			</Link>
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
			<Link
				href='https://svelte.dev'
				showIcon={false}
				type='external'
			>
				Svelte website
			</Link>
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
			<Link
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
			</Link>
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
	}
];
