import * as _ from 'lamb';

export const name = 'HighlightedText';
export const packageName = 'ui';
export const title = 'HighlightedText';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A component to render text with its parts matching a regex being highlighted.'},
	{tag: 'p', content: 'If `shouldScroll` ir `true` it should scroll to the first occurrence of the highlighted text.'},
];
export const data = [
	{
		key: 'Basic',
		props: {
			regex: /wor/gui,
			string: `Hello world! Don't worry!`,
		},
		usage: `
			<script>
				import {HighlightedText} from '@svizzle/ui';
			</script>

			<HighlightedText
				regex={/wor/gui}
				string='Hello world!'
			/>
		`,
	},
	{
		key: 'Theming',
		props: {
			regex: /wor/gui,
			string: `Hello world! Don't worry!`,
			theme: {
				colorHighlightedBackground: 'palegreen',
				colorHighlightedText: 'blue'
			}
		},
		usage: `
			<script>
				import {HighlightedText} from '@svizzle/ui';
			</script>

			<HighlightedText
				regex={/wor/gui}
				string='Hello world! Don't worry!'
				theme={{
					colorHighlightedBackground: 'palegreen',
					colorHighlightedText: 'blue'
				}}
			/>
		`,
	},
	{
		key: 'Long text, auto-scrolling to the highlighted text',
		props: {
			regex: /world/gui,
			shouldScroll: true,
			string: `${_.repeat('something ', 2000)} Hello world!`
		},
		usage: `
			<script>
				import {HighlightedText} from '@svizzle/ui';
			</script>

			<HighlightedText
				regex={/world/ui}
				shouldScroll={true}
				string={_.repeat('something ', 2000) 'Hello world!'}
			/>
		`,
	},
	{
		key: 'Long text with no auto-scrolling',
		props: {
			regex: /world/gui,
			string: `${_.repeat('something ', 2000)} Hello world!`
		},
		usage: `
			<script>
				import {HighlightedText} from '@svizzle/ui';
			</script>

			<HighlightedText
				regex={/world/ui}
				string={_.repeat('something ', 2000) 'Hello world!'}
			/>
		`,
	}
];
