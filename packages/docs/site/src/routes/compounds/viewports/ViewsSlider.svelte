<script>
	import {View, ViewsSlider} from '@svizzle/ui';

	import {ViewsSliderMarkup} from './markup.js';

	let viewId = 'view_1';

	const setViewId = id => {
		viewId = id;
	}
</script>

<svelte:head>
	<title>@svizzle/ui: ViewsSlider</title>
</svelte:head>

<main>
	<section>
		<button on:click={() => setViewId('view_1')}>View 1</button>
		<button on:click={() => setViewId('view_2')}>View 2</button>
		<button on:click={() => setViewId('view_3')}>View 3</button>

		<p>Viewport</p>
		<div class='viewport'>
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
								width=100
								height=100
								fill='orange'
								stroke='red'
							/>
						</svg>
					</div>
				</View>
				<View id='view_3'>
					<div class='view'>
						<h1>View 3</h1>
						<svg>
							<rect
								x=40
								y=40
								width=50
								height=50
								fill='cyan'
								stroke='blue'
								stroke-width=3
							/>
						</svg>
					</div>
				</View>
			</ViewsSlider>
		</div>
	</section>

	<section>
		<p>You can create a slideshow by rendering a `View` based on its `id` using `ViewsSlider` to transition between views, like below.</p>
		<p>Please check <code>packages/docs/site/src/routes/compounds/viewports/ViewsSlider.svelte</code> for more details.</p>
		<pre>{ViewsSliderMarkup}</pre>
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: 100%;
		height: 100%;
		width: 100%;
	}

	button {
		cursor: pointer;
		padding: 1em;
	}

	.viewport {
		border: thin solid black;
		overflow: hidden;
		width: 50%;
	}
	.view {
		border: thin solid red;
		padding: 1em;
	}
</style>
