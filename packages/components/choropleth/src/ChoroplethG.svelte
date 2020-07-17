<script>
	import { createEventDispatcher } from 'svelte';
	import { feature as geoObject } from 'topojson-client';
	import { geoPath } from 'd3-geo';
	import * as _ from 'lamb';
	import {makeStyleVars} from '@svizzle/dom';
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
		hoverFill: '#f6f6f6',
		hoverStroke: 'black',
		hoverStrokeWidth: 1.5,
		hoverStrokedasharray: '',
		selectedStroke: 'black',
		selectedStrokeWidth: 1,
		deselectedOpacity: 0.25,
	}

	// required
	export let height;
	export let topojson;
	export let topojsonId;
	export let width;

	// optional
	export let geometry;
	export let isInteractive;
	export let key_alt;
	export let key;
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
	$: style = makeStyleVars(theme);
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
	$: isClickable = feature => isInteractive && hasColor(feature);
</script>

<svelte:options namespace='svg' />

{#if height && width}
<g
	{style}
	class:interactive={isInteractive}
	class='ChoroplethG'
	>
	<rect
		{height}
		{width}
		class='bkg'
	/>
	<g transform='translate({geometry.left},{geometry.top})'>
		{#if coloredGeojson}
		{#each coloredGeojson.features as feature}
		<g
			class:deselected={isDeselected(feature)}
			class:selected={isSelected(feature)}
			class='feature'
			id={feature.properties[key] || feature.properties[key_alt]}
		>
			<path
				class:clickable={isClickable(feature)}
				d={geopath(feature)}
				style='fill:{feature.properties.color || null}'
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

	rect.bkg {
		fill: var(--backgroundColor);
	}

	.feature path {
		fill: var(--defaultFill);
		fill-opacity: 1;
		stroke: var(--defaultStroke);
		stroke-width: var(--defaultStrokeWidth);
	}
	.feature path.clickable {
		cursor: pointer;
	}
	.feature path:hover {
		fill: var(--hoverFill);
		stroke: var(--hoverStroke);
		stroke-width: var(--hoverStrokeWidth);
		stroke-dasharray: var(--hoverStrokedasharray);
	}
	.feature.selected path {
		stroke: var(--selectedStroke);
		stroke-width: var(--selectedStrokeWidth);
	}
	.feature.deselected path {
		fill-opacity: var(--deselectedOpacity);
	}
</style>
