export const name = 'AlphabetPicker';
export const packageName = 'ui';
export const title = 'AlphabetPicker';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'An alphabet picker useful for example to scroll directly to intermediate portions of a long list.'},
	{tag: 'p', content: 'Clicking an enabled character should emit `charSelected` with that char as payload.'},
];
export const events = [
	'charSelected',
];
export const data = [
	{
		key: 'No props (disabled)',
		props: {},
		usage: `
			<script>
				import {AlphabetPicker} from '@svizzle/ui';
			</script>

			<AlphabetPicker />
		`,
	},
	{
		key: 'Full alphabet, all chars enabled',
		props: {
			enabledChars: '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
		},
		usage: `
			<script>
				import {AlphabetPicker} from '@svizzle/ui';
			</script>

			<AlphabetPicker
				enabledChars={'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')}
			/>
		`,
	},
	{
		key: 'Full alphabet, some chars enabled',
		props: {
			enabledChars: 'AGJORSVYZ'.split('')
		},
		usage: `
			<script>
				import {AlphabetPicker} from '@svizzle/ui';
			</script>

			<AlphabetPicker
				enabledChars={'AGJORSVYZ'.split('')}
			/>
		`,
	},
	{
		key: 'Random chars, in random order',
		props: {
			chars: 'Ab$^KecJRSW'.split(''),
			enabledChars: 'Abe$^JSW'.split('')
		},
		usage: `
			<script>
				import {AlphabetPicker} from '@svizzle/ui';
			</script>

			<AlphabetPicker
				chars={'Ab$^KecJRSW'.split('')}
				enabledChars={'Abe$^JSW'.split('')}
			/>
		`,
	},
	{
		key: 'Theming',
		props: {
			enabledChars: 'AGJORSVYZ'.split(''),
			theme: {
				backgroundColor: 'palegreen',
				backgroundColorDisabled: 'orange',
				focusOutline: '5px auto',
				focusOutlineOffset: '5px',
				textColor: 'green',
				textColorDisabled: 'yellow'
			}
		},
		usage: `
			<script>
				import {AlphabetPicker} from '@svizzle/ui';
			</script>

			<AlphabetPicker
				enabledChars={'AGJORSVYZ'.split('')}
				theme={{
					backgroundColor: 'palegreen',
					backgroundColorDisabled: 'orange',
					focusOutline: '5px auto',
					focusOutlineOffset: '5px',
					textColor: 'green',
					textColorDisabled: 'yellow'
				}}
			/>
		`,
	}
];
