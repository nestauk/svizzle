import * as _ from 'lamb';

export const name = 'Scroller';
export const packageName = 'ui';
export const title = 'Scroller';
export const slug = `${packageName}-${name}`;
export const doc = [
	{tag: 'p', content: 'Shows shadows on the top and/or the bottom depending on the level of scrolling on the content of the provided slot.'},
	{tag: 'p', content: 'Useful to help the user detecting long content.'},
	{tag: 'p', content: 'With no scrolling, it shows a shadow at the bottom.'},
	{tag: 'p', content: 'Mid-scrolling, it shows a shadow both at the top and at the bottom.'},
	{tag: 'p', content: 'When fully scrolled, it shows a shadow at the top.'},
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
						content: 'A title',
						elementName: 'h1',
					},
					{
						content: _.repeat('something ', 400),
						elementName: 'p',
					},
				]
			}
		],
		usage: `
			<script>
				import {Scroller} from '@svizzle/ui';
			</script>

			<Scroller>
				<h1>A title</h1>
				<p>{_.repeat('something ', 400)}</p>
			</Scroller>
		`,
	},
	{
		key: 'Aligning horizontally',
		props: {
			alignHorizontally: true
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						content: 'A title',
						elementName: 'h1',
					},
					..._.map(_.range(0, 10), _.always({
						content: 'something',
						elementName: 'p',
					}))
				]
			}
		],
		usage: `
			<script>
				import {Scroller} from '@svizzle/ui';
			</script>

			<Scroller alignHorizontally={true}>
				<h1>Hi!</h1>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
			</Scroller>
		`,
	},
	{
		key: 'Aligning vertically',
		props: {
			alignVertically: true
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						content: 'A title',
						elementName: 'h1',
					},
					..._.map(_.range(0, 10), _.always({
						content: 'something',
						elementName: 'p',
					}))
				]
			}
		],
		usage: `
			<script>
				import {Scroller} from '@svizzle/ui';
			</script>

			<Scroller alignVertically={true}>
				<h1>Hi!</h1>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
			</Scroller>
		`,
	},
	{
		key: 'Aligning in both directions',
		props: {
			alignHorizontally: true,
			alignVertically: true
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						content: 'A title',
						elementName: 'h1',
					},
					..._.map(_.range(0, 10), _.always({
						content: 'something',
						elementName: 'p',
					}))
				]
			}
		],
		usage: `
			<script>
				import {Scroller} from '@svizzle/ui';
			</script>

			<Scroller
				alignHorizontally={true}
				alignHorizontally={true}
			>
				<h1>Hi!</h1>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
				<p>something</p>
			</Scroller>
		`,
	},
	{
		key: 'Style',
		props: {
			theme: {
				bottomShadowGeometry: 'inset 0px -24px 24px -24px',
				shadowColor: 'red',
				topShadowGeometry: 'inset 0px 24px 24px -24px',
			}
		},
		slots: [
			{
				slotName: 'default',
				items: [
					{
						content: 'A title',
						elementName: 'h1',
					},
					{
						content: _.repeat('something ', 400),
						elementName: 'p',
					},
				]
			}
		],
		usage: `
			<script>
				import {Scroller} from '@svizzle/ui';
			</script>

			<Scroller
				theme={{
					bottomShadowGeometry: 'inset 0px -24px 24px -24px',
					shadowColor: 'red',
					topShadowGeometry: 'inset 0px 24px 24px -24px',
				}}
			>
				<h1>A title</h1>
				<p>{_.repeat('something ', 400)}</p>
			</Scroller>
		`,
	},
];
