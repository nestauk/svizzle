import * as _ from 'lamb';

export const name = 'MessageView';
export const packageName = 'ui';
export const title = 'MessageView';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'A component to show a text message at the center of view.'},
];
export const data = [
	{
		key: 'No props',
		props: {
		},
		usage: `
			<script>
				import {MessageView} from '@svizzle/ui';
			</script>

			<MessageView />
		`,
	},
	{
		key: 'Some text',
		props: {
			text: 'Some text'
		},
		usage: `
			<script>
				import {MessageView} from '@svizzle/ui';
			</script>

			<MessageView text='Some text' />
		`,
	},
	{
		key: 'Style',
		props: {
			backgroundColor: 'palegreen',
			color: 'blue',
			fontSize: '20px',
			padding: '100px',
			textAlign: 'end',
			text: _.repeat('hey ', 40)
		},
		usage: `
			<script>
				import {MessageView} from '@svizzle/ui';
			</script>

			<MessageView
				backgroundColor='palegreen'
				color='blue'
				fontSize='20px'
				padding='100px'
				text={_.repeat('hey ', 40)}
				text='Some text'
				textAlign='end'
			/>
		`,
	},
];
