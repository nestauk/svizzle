export const name = 'CopyToClipboard';
export const packageName = 'ui';
export const title = 'CopyToClipboard';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A button to put in the clipboard whatever returns from the provided to the `getText` function.'},
];
export const data = [
	{
		key: `getText: () => 'Hello world!'`,
		props: {
			getText: () => 'Hello world!'
		},
		usage: `
			<script>
				import {CopyToClipboard} from '@svizzle/ui';
			</script>

			<CopyToClipboard getText={() => 'Hello world!'} />
		`,
	},
	{
		key: 'No `getText`',
		props: {},
		usage: `
			<script>
				import {CopyToClipboard} from '@svizzle/ui';
			</script>

			<CopyToClipboard />
		`,
	},
	{
		key: 'Theming (success)',
		props: {
			getText: () => 'Hello world!',
			theme: {
				background: 'antiquewhite',
				color: 'brown',
				failureColor: 'magenta',
				outlineColor: 'blue',
				outlineStyle: 'dotted',
				outlineWidth: '2px',
				successColor: 'palegreen',
			}
		},
		usage: `
			<script>
				import {CopyToClipboard} from '@svizzle/ui';
			</script>

			<CopyToClipboard
				getText={() => 'Hello world!'}
				theme={{
					background: 'antiquewhite',
					color: 'brown',
					failureColor: 'magenta',
					outlineColor: 'blue',
					outlineStyle: 'dotted',
					outlineWidth: '2px',
					successColor: 'palegreen',
				}}
			/>
		`,
	},
	{
		key: 'Theming (failure)',
		props: {
			theme: {
				background: 'yellow',
				color: 'brown',
				failureColor: 'magenta',
				outlineColor: 'blue',
				outlineStyle: 'dotted',
				outlineWidth: '2px',
				successColor: 'palegreen',
			}
		},
		usage: `
			<script>
				import {CopyToClipboard} from '@svizzle/ui';
			</script>

			<CopyToClipboard
				theme={{
					background: 'yellow',
					color: 'brown',
					failureColor: 'magenta',
					outlineColor: 'blue',
					outlineStyle: 'dotted',
					outlineWidth: '2px',
					successColor: 'palegreen',
				}}
			/>
		`,
	}
];
