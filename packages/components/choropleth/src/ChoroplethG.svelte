<script>
	import { createEventDispatcher } from 'svelte';
	import { feature as geoObject } from 'topojson-client';
	import { geoPath } from 'd3-geo';
	import * as _ from 'lamb';
	import {
		makeUpdateFeaturesProperty,
		setGeometryPrecision
	} from '@svizzle/geo';
	import { isNotNullWith } from '@svizzle/utils';

	import * as projections from './projections';

	const dispatch = createEventDispatcher();
	const hasColor = isNotNullWith(_.getPath('properties.color'));
	const truncateGeojson = setGeometryPrecision(4);
	const topoToGeo = (topojson, id) =>
		truncateGeojson(geoObject(topojson, topojson.objects[id]));

	const defaultGeometry = {
		bottom: 10,
		left: 10,
		right: 10,
		top: 10,
	}

	const defaultTheme = {
		backgroundColor: 'white',
		defaultFill: 'white',
		defaultStroke: 'grey',
		defaultStrokeWidth: 0.5,
		selectedStroke: 'black',
		selectedStrokeWidth: 1,
	}

	// required
	export let height;
	export let key;
	export let topojson;
	export let topojsonId;
	export let width;

	// optional
	export let geometry;
	export let isInteractive;
	export let key_alt;
	export let keyToColor;
	export let keyToColorFn;
	export let projection;
	export let selectedKeys;
	export let theme;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: geojson = topoToGeo(topojson, topojsonId);
	$: geometry = geometry ? _.merge(defaultGeometry, geometry) : defaultGeometry;
	$: isInteractive = isInteractive || false;
	$: key_alt = key_alt || 'name';
	$: projection = projection && projections[projection] || projections.geoEquirectangular;
	$: selectedKeys = selectedKeys || [];
	$: theme = theme ? _.merge(defaultTheme, theme) : defaultTheme;

	$: innerHeight = Math.max(0, height - geometry.top - geometry.bottom);
	$: innerWidth = Math.max(0, width - geometry.left - geometry.right);
	$: createColoredGeojson = makeUpdateFeaturesProperty({
		key_alt,
		key,
		map: keyToColor,
		mapFn: keyToColorFn,
		propName: 'color',
	});
	$: coloredGeojson = geojson && createColoredGeojson(geojson);
	$: fitProjection = geojson
		&& projection().fitSize([innerWidth, innerHeight], geojson);
	$: geopath = fitProjection && geoPath(fitProjection);
	$: getPayload =
		feature => feature.properties[key] || feature.properties[key_alt];
	$: isSelected = feature =>
		selectedKeys.length &&
		selectedKeys.includes(getPayload(feature));
	$: isDeselected = feature =>
		selectedKeys.length &&
		!selectedKeys.includes(getPayload(feature));
	$: isReady = geopath && coloredGeojson;
	$: isClickable = feature => isInteractive && hasColor(feature);
</script>

<svelte:options namespace='svg' />

{#if height && width}
<!-- {style} -->
<g
	class='ChoroplethG'
	class:interactive={isInteractive}
>
	<rect
		{height}
		{width}
		fill={theme.backgroundColor}
	/>
	<g transform='translate({geometry.left},{geometry.top})'>
		{#if isReady}
		{#each coloredGeojson.features as feature}
		<g class='feature' id='{key_alt}'>
			<path
				class:clickable={isClickable(feature)}
				class:deselected={isDeselected(feature)}
				d={geopath(feature)}
				fill={feature.properties.color || theme.defaultFill}
				stroke={isSelected(feature) ? theme.selectedStroke : theme.defaultStroke}
				stroke-width={isSelected(feature) ? theme.selectedStrokeWidth : theme.defaultStrokeWidth}
				on:click={() => isClickable(feature) && dispatch('clicked', getPayload(feature))}
				on:mouseenter={() => isInteractive && dispatch('entered', getPayload(feature))}
				on:mouseleave={() => isInteractive && dispatch('exited', getPayload(feature))}
			/>
		</g>
		{/each}
		{/if}
	</g>
</g>
{/if}

<style>
	.ChoroplethG {
		pointer-events: none;
	}
	.ChoroplethG.interactive {
		pointer-events: auto;
	}

	.feature path.clickable {
		cursor: pointer;
	}
	.feature path.deselected {
		fill-opacity: 0.25;
	}
</style>
