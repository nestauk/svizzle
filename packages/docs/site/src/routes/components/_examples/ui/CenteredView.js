export const name = 'CenteredView';
export const packageName = 'ui';
export const title = 'CenteredView';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A component to show other components at the center of view.'},
];
export const data = [
	{
		key: 'One component',
		props: {
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						componentName: 'HyperLink',
						content: 'Svelte website',
						props: {
							href: 'https://svelte.dev',
							theme: {
								color: 'magenta',
								iconStroke: 'green',
								iconStrokeWidth: 3,
							},
							type: 'external',
						},
					}
				],
			},
		],
		usage: `
			<script>
				import {CenteredView, HyperLink} from '@svizzle/ui';
			</script>

			<CenteredView>
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
			</CenteredView>
		`,
	},
	{
		key: 'Two components',
		props: {
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						componentName: 'HyperLink',
						content: 'Svelte website',
						props: {
							href: 'https://svelte.dev',
							theme: {
								color: 'magenta',
								iconStroke: 'green',
								iconStrokeWidth: 3,
							},
							type: 'external',
						},
					},
					{
						componentName: 'Switch',
						props: {
							values: ['Off', 'On'],
							theme: {
								height: '60px',
								color: 'orange',
								backgroundColor: 'darkviolet',
								knobColor: 'orange'
							}
						},
					},
				],
			}
		],
		usage: `
			<script>
				import {CenteredView, HyperLink, Switch} from '@svizzle/ui';
			</script>

			<CenteredView>
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
				<Switch
					values={['Off', 'On']}
					theme={{
						height: '60px',
						color: 'orange',
						backgroundColor: 'darkviolet',
						knobColor: 'orange'
					}}
				/>
			</CenteredView>
		`,
	},
	{
		key: 'Two components - horizontal layout',
		props: {
			alignHorizontally: true
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						componentName: 'HyperLink',
						content: 'Svelte website',
						props: {
							href: 'https://svelte.dev',
							type: 'external',
						},
					},
					{
						componentName: 'Switch',
						props: {
							values: ['Off', 'On'],
						},
					},
				],
			},
		],
		usage: `
			<script>
				import {CenteredView, HyperLink, Switch} from '@svizzle/ui';
			</script>

			<CenteredView alignHorizontally={true}>
				<HyperLink
					href='https://svelte.dev'
					type='external'
				>
					Svelte website
				</HyperLink>
				<Switch
					values={['Off', 'On']}
				/>
			</CenteredView>
		`,
	},
	{
		key: 'Style',
		props: {
			backgroundColor: 'palegreen',
			color: 'blue',
			fontSize: '24px',
			padding: '3rem',
			textAlign: 'end',
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						componentName: 'Switch',
						props: {
							values: ['Off', 'On'],
						},
					},
				],
			}
		],
		usage: `
			<script>
				import {CenteredView, Switch} from '@svizzle/ui';
			</script>

			<CenteredView
				backgroundColor='palegreen'
				color='blue'
				fontSize='24px'
				padding='3rem'
				textAlign='end'
			>
				<Switch values={['Off', 'On']} />
			</CenteredView>
		`,
	},
];
