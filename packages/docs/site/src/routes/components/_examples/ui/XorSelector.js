export const name = 'XorSelector';
export const packageName = 'ui';
export const title = 'XorSelector';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'An widget select a value from a set.'},
];
export const events = [
	'changed',
];
export const data = [
	{
		key: 'Basic props (numbers)',
		props: {
			value: 2,
			values: [1, 2, 3, 4]
		},
		usage: `
			<XorSelector
				value=2
				values={[1, 2, 3, 4]}
			/>
		`,
	},
	{
		key: 'Basic props (labels)',
		props: {
			value: 'green',
			values: ['red', 'green', 'blue']
		},
		usage: `
			<XorSelector
				value='green'
				values={['red', 'green', 'blue']}
			/>
		`,
	},
	{
		key: 'No value (defaults to the first of `values`)',
		props: {
			values: ['Off', 'On']
		},
		usage: `
			<XorSelector values={['Off', 'On']} />
		`,
	},
	{
		key: 'Theming',
		props: {
			values: ['A', 'B', 'C'],
			theme: {
				borderColor: 'orange',
				borderRadius: '45%',
				borderWidth: '2px',
				selectedColor: 'red',
				selectedTextColor: 'yellow',
				textColor: 'blue',
			}
		},
		usage: `
			<Switch
				values={['A', 'B', 'C']}
				theme={{
					borderColor: 'orange',
					borderRadius: '45%',
					borderWidth: '2px',
					selectedColor: 'red',
					selectedTextColor: 'yellow',
					textColor: 'blue',
				}}
			/>
		`,
	},
];
