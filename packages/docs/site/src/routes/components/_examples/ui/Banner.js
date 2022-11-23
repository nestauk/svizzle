export const name = 'Banner';
export const packageName = 'ui';
export const title = 'Banner';
export const slug = `${packageName}-${name}`;
export const events = ['close'];
export const doc = [
	{tag: 'p', content: 'A component to show other components at the center of view within a customizable panel.'},
	{tag: 'p', content: 'Clicking on the semi-opaque background emits the `close` event, which you can use to dismiss the banner itself.'},
	{tag: 'p', content: 'You can also trigger the `close` event by pressing the ESC key.'},
	{tag: 'p', content: 'You can control the `z-index` via `theme.zIndex` (which defaults to 2000).'},
];
export const data = [
	{
		key: 'No props',
		props: {
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						content: 'Welcome!',
						elementName: 'h1',
					},
					{
						content: 'This site uses cookies!',
						elementName: 'p',
					},
					{
						componentName: 'Link',
						content: 'Here you can find more about it',
						props: {
							href: 'https://en.wikipedia.org/wiki/HTTP_cookie',
							type: 'external',
						},
					}
				],
			},
		],
		usage: `
			<script>
				import {Banner} from '@svizzle/ui';
			</script>

			<Banner>
				<h1>Welcome!</h1>
				<p>This site uses cookies!</p>
				<p>Below you got a link.</p>
				<Link
					href='https://en.wikipedia.org/wiki/HTTP_cookie'
					type='external'
				>
					Here you can find more about it
				</Link>
			</Banner>
		`,
	},
	{
		key: 'Style',
		props: {
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
		slots: [
			{
				slotName: 'default',
				items: [
					{
						content: 'Welcome!',
						elementName: 'h1',
					},
					{
						content: 'This site uses cookies!',
						elementName: 'p',
					},
					{
						componentName: 'Link',
						content: 'Here you can find more about it',
						props: {
							href: 'https://en.wikipedia.org/wiki/HTTP_cookie',
							type: 'external',
						},
					}
				],
			},
		],
		usage: `
			<script>
				import {Banner} from '@svizzle/ui';
			</script>

			<Banner
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
			>
				<h1>Welcome!</h1>
				<p>This site uses cookies!</p>
				<p>Below you got a link.</p>
				<Link
					href='https://en.wikipedia.org/wiki/HTTP_cookie'
					type='external'
				>
					Here you can find more about it
				</Link>
			</Banner>
		`,
	},
];
