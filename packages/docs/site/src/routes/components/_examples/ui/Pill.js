export const name = 'Pill';
export const packageName = 'ui';
export const title = 'Pill';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A flexible and customizable pill-shaped container for labels and other short textual elements.'},
];
export const data = [
	{
		content: 'Example label',
		key: 'Basic usage',
		props: {
			label: 'A label',
		},
		usage: `
			<Pill label='A label' />
		`,
	},
	{
		content: 'Bold label',
		key: 'Bold text',
		props: {
			isBold: true,
			label: 'Bold label',
		},
		usage: `
			<Pill
				isBold={true}
				label='Bold label'
			/>
		`,
	},
	{
		content: 'Custom Theme',
		key: 'Custom theme',
		props: {
			label: 'Custom theme',
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
			label: 'No Wrap',
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
			label: 'Custom Style',
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
