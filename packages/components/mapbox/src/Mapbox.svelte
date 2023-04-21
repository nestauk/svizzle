<script>
	import mapboxgl from 'mapbox-gl';

	import MapboxglBase from './MapboxglBase.svelte';
	import MapboxglUnsupported from './MapboxglUnsupported.svelte';

	const isMapboxGLSupported = mapboxgl.supported();

	export let _bbox_WS_EN = null; // store
	export let _bbox_WSEN = null; // store
	export let _zoom = null; // store
	export let accessToken;
	export let bounds;
	export let styleURL;
	export let withScaleControl = true;
	export let withZoomControl = true;
</script>

{#if isMapboxGLSupported}
	<MapboxglBase
		{_bbox_WS_EN}
		{_bbox_WSEN}
		{_zoom}
		{accessToken}
		{bounds}
		{styleURL}
		{withScaleControl}
		{withZoomControl}
		on:bboxChanged
		on:mapClick
	>
		<slot />
	</MapboxglBase>
{:else}
	<MapboxglUnsupported />
{/if}
