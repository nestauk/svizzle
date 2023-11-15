export const name = 'Pill';
export const packageName = 'ui';
export const title = 'Pill';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A flexible and customizable pill-shaped container for labels and other small textual elements.'},
;
export const data = [
	{
		content: 'Example Label',
		key: 'Basic usage',
		props: {},
		usage: `
			<Pill label='Example Label' />
		`,
	},
	{
		content: 'Bold Label',
		key: 'Bold text',
		props: {
			isBold: true,
		},
		usage: `
			<Pill
				label='Bold Label'
				isBold={true}
			/>
		`,
	},
	{
		content: 'Custom Theme',
		key: 'Custom theme',
		props: {
			theme: {
				backgroundColor: 'blue',
				border: 'thick solid red',
				fontSize: '1.2em',
				textColor: 'yellow',
			},
		},
		usage: `
			<Pill
				label='Custom Theme'
				theme={{
					backgroundColor: 'blue',
					border: 'thick solid red',
					fontSize: '1.2em',
					textColor: 'yellow',
				}}
			/>
		`,
	},
	{
		content: 'No Wrap',
		key: 'Text nowrap',
		props: {
			nowrap: false,
		},
		usage: `
			<Pill
				label='No Wrap'
				nowrap={false}
			/>
		`,
	},
	{
		content: 'Custom Style',
		key: 'Custom style and bold',
		props: {
			isBold: true,
			theme: {
				backgroundColor: 'green',
				border: 'dotted thin purple',
				fontSize: '0.8em',
				textColor: 'white',
			},
		},
		usage: `
			<Pill
				label='Custom Style'
				isBold={true}
				theme={{
					backgroundColor: 'green',
					border: 'dotted thin purple',
					fontSize: '0.8em',
					textColor: 'white',
				}}
			/>
		`,
	},
];
