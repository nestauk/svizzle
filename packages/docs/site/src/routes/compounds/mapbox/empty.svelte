<script>
	import {Mapbox} from '@svizzle/mapbox';

	const accessToken = 'pk.eyJ1IjoibmVzdGEtdWsiLCJhIjoiY2ozbjUzY2drMDAwNzJxbnl6a21uM253cSJ9.3RTMySEVk0LC4gQvGoG-Zw';
	const style = 'mapbox://styles/nesta-uk/cl8olrzo200ci16pim0h4c1pn';
</script>

<div class='map-container'>
	<Mapbox
		{accessToken}
		{style}
		withScaleControl={true}
		withZoomControl={true}
	/>
</div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
