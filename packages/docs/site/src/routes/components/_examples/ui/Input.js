export const name = 'Input';
export const packageName = 'ui';
export const title = 'Input';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A customizable input field with integrated clear button and custom event handling.'},
];
export const events = [
	'changed',
	'reset',
	'submitted',
];
export const data = [
	{
		content: 'Basic input',
		key: 'Basic usage',
		props: {
			placeholder: 'Enter text',
			value: '',
		},
		usage: `
			<Input
				placeholder='Enter text'
				value={''}
			/>
		`,
	},
	{
		content: 'Text with autofocus',
		key: 'Autofocus enabled',
		props: {
			autofocus: true,
			placeholder: 'Focused input',
			value: '',
		},
		usage: `
			<Input
				autofocus={true}
				placeholder='Focused input'
				value={''}
			/>
		`,
	},
	{
		content: 'Password input',
		key: 'Password type',
		props: {
			placeholder: 'Enter password',
			type: 'password',
			value: '',
		},
		usage: `
			<Input
				placeholder='Enter password'
				type='password'
				value={''}
			/>
		`,
	},
	{
		content: 'Custom theme',
		key: 'Custom theme',
		props: {
			placeholder: 'Custom style',
			theme: {
				backgroundColor: 'lightblue',
				borderColor: 'darkblue',
				colorIcon: 'orange',
				colorText: 'darkgreen',
				outline: '2px dotted red',
			},
			value: '',
		},
		usage: `
			<Input
				placeholder='Custom style'
				theme={{
					backgroundColor: 'lightblue',
					borderColor: 'darkblue',
					colorIcon: 'orange',
					colorText: 'darkgreen',
					outline: '2px dotted red',
				}}
				value={''}
			/>
		`,
	},
	{
		content: 'Submitted event',
		key: 'Handling submitted event',
		props: {
			placeholder: 'Press Enter to submit',
			value: '',
		},
		usage: `
			<Input
				placeholder='Press Enter to submit'
				value={''}
				on:submitted={() => console.log('Submitted')}
			/>
		`,
	},
];
