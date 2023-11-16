<script>
	import {CustomControl, Mapbox} from '@svizzle/mapbox';

	const accessToken = 'pk.eyJ1IjoibmVzdGEtdWsiLCJhIjoiY2ozbjUzY2drMDAwNzJxbnl6a21uM253cSJ9.3RTMySEVk0LC4gQvGoG-Zw';
	const styleURL = 'mapbox://styles/nesta-uk/cl8olrzo200ci16pim0h4c1pn';

	let bounds;
	const zoomToEngland = () => {
		bounds = [[-8.61752, 49.90774], [1.76229, 60.84585]]
	}
</script>

<div class='map-container'>
	<Mapbox
		{accessToken}
		{bounds}
		{styleURL}
		withScaleControl={true}
		withZoomControl={true}
	>
		<CustomControl position='top-left'>
			<button on:click={zoomToEngland}>
				Zoom to England
			</button>
		</CustomControl>
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
