export const name = 'ScrollbarStyler';
export const packageName = 'ui';
export const title = 'ScrollbarStyler (Blink and WebKit)';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'On Blink and WebKit based browsers, you can style scrollbars adding this component to your app.'},
	{tag: 'p', content: 'When disabled, the system scrollbars style applies.'},
	{tag: 'p', content: 'Try shortening the screen and for example look at the scrollbar in the sidebar on the left.'},
	{tag: 'p', content: 'Note that the track bar fades off when not hovered: to check the theme works as intended, please hover the scrollbar.'},
];
export const data = [
	{
		key: `Enabled - default theme`,
		props: {
		},
		usage: `
			<script>
				import {ScrollbarStyler} from '@svizzle/ui';
			</script>

			<ScrollbarStyler />
		`,
	},
	{
		key: `Enabled - custom theme`,
		props: {
			theme: {
				thumbColor: 'palegreen',
				thumbRadius: 0,
				trackBorderColor: 'blue',
				trackColor: 'pink',
				trackWidth: '14px',
			}
		},
		usage: `
			<script>
				import {ScrollbarStyler} from '@svizzle/ui';
			</script>

			<ScrollbarStyler
				theme={{
					thumbColor: 'palegreen',
					thumbRadius: 0,
					trackBorderColor: 'blue',
					trackColor: 'pink',
					trackWidth: '14px'
				}}
			/>
		`,
	},
	{
		key: `Disabled (system style)`,
		props: {
			isEnabled: false,
		},
		usage: `
			<script>
				import {ScrollbarStyler} from '@svizzle/ui';
			</script>

			<ScrollbarStyler isEnabled={false} />
		`,
	}
];
