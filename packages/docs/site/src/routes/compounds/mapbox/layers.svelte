<script>
	import {Mapbox, SvgLayer} from '@svizzle/mapbox';

	import Layer1 from './components/Layer1.svelte';
	import Layer2 from './components/Layer2.svelte';

	const accessToken = 'pk.eyJ1IjoibmVzdGEtdWsiLCJhIjoiY2ozbjUzY2drMDAwNzJxbnl6a21uM253cSJ9.3RTMySEVk0LC4gQvGoG-Zw';
	const styleURL = 'mapbox://styles/nesta-uk/cl8olrzo200ci16pim0h4c1pn';
</script>

<div class='map-container'>
	<Mapbox
		{accessToken}
		{styleURL}
		withScaleControl={true}
		withZoomControl={true}
	>
		<SvgLayer
			interactive={false}
			order={1}
		>
			<Layer1 wsen={[[-140, 0], [-50, 70]]} />
		</SvgLayer>

		<SvgLayer
			interactive={false}
			order={1}
		>
			<Layer2 wsen={[[50, 0], [140, 70]]} />
		</SvgLayer>
	</Mapbox>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
