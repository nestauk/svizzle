import * as _ from 'lamb';

const format = _.replace(/\t/ug, _.repeat(' ', 4));

export const ViewsSliderMarkup = format(`
<ViewsSlider {viewId}>
	<View id='view_1'>
		<div class='view'>
			<h1>View 1</h1>
			<svg>
				<circle
					cx=50
					cy=50
					r=30
					fill='palegreen'
					stroke='green'
				/>
			</svg>
		</div>
	</View>
	<View id='view_2'>
		<div class='view'>
			<h1>View 2</h1>
			<svg>
				<rect
					x=10
					y=10
					width=100%
					height=100
					fill='orange'
					stroke='red'
				/>
			</svg>
		</div>
	</View>
</ViewsSlider>
`);

export const ViewsXorMarkup = format(`
<ViewsXor {viewId}>
	<View id='view_1'>
		<div class='view'>
			<h1>View 1</h1>
			<svg>
				<circle
					cx=50
					cy=50
					r=30
					fill='palegreen'
					stroke='green'
				/>
			</svg>
		</div>
	</View>
	<View id='view_2'>
		<div class='view'>
			<h1>View 2</h1>
			<svg>
				<rect
					x=10
					y=10
					width=100
					height=100
					fill='orange'
					stroke='red'
				/>
			</svg>
		</div>
	</View>
</ViewsXor>
`);
