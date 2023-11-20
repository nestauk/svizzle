<script>
	import {CustomControl, Mapbox, SvgLayer} from '@svizzle/mapbox';

	import Layer1 from './components/Layer1.svelte';
	import Layer2 from './components/Layer2.svelte';
	import ToggleControl from './components/ToggleControl.svelte';

	const accessToken = 'pk.eyJ1IjoibmVzdGEtdWsiLCJhIjoiY2ozbjUzY2drMDAwNzJxbnl6a21uM253cSJ9.3RTMySEVk0LC4gQvGoG-Zw';
	const style = 'mapbox://styles/nesta-uk/cl8olrzo200ci16pim0h4c1pn';

	let isCustomControlVisible = false;
	let isCustomLayer1Visible = false;
	let isCustomLayer2Visible = false;
	let bounds;

	const zoomToEngland = () => {
		bounds = [[-8.61752, 49.90774], [1.76229, 60.84585]]
	}
</script>

<div class='map-container'>
	<Mapbox
		{accessToken}
		{bounds}
		{style}
		withScaleControl={true}
		withZoomControl={true}
	>
		<CustomControl position='top-left'>
			<ToggleControl
				bind:checked={isCustomControlVisible}
				title='Show custom controls'
			/>
		</CustomControl>
		{#if isCustomControlVisible}
			<CustomControl position='top-left'>
				<ToggleControl
					bind:checked={isCustomLayer1Visible}
					title='Show first custom layer'
				/>
				<ToggleControl
					bind:checked={isCustomLayer2Visible}
					title='Show second custom layer'
				/>
			</CustomControl>
		{/if}

		<CustomControl position='bottom-left'>
			<button on:click={zoomToEngland}>
				Zoom to England
			</button>
		</CustomControl>

		{#if isCustomLayer1Visible}
			<SvgLayer
				isInteractive={false}
				order={1}
			>
				<Layer1 wsen={[[-140, 0], [-50, 70]]} />
			</SvgLayer>
		{/if}

		{#if isCustomLayer2Visible}
			<SvgLayer
				isInteractive={false}
				order={2}
			>
				<Layer2 wsen={[[50, 0], [140, 70]]} />
			</SvgLayer>
		{/if}
	</Mapbox>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
	button {
		white-space: nowrap;
		width: auto;
		padding: 0 0.5rem;
	}
</style>
