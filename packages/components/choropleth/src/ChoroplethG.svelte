<script>
	import {createEventDispatcher} from 'svelte';
	import {geoPath} from 'd3-geo';
	import {getPath} from 'lamb';
	import {makeStyleVars} from '@svizzle/dom';
	import {makeUpdateFeaturesProperty} from '@svizzle/geo';
	import {isNotNullWith} from '@svizzle/utils';

	import * as projections from './projections';
	import {topoToGeo, defaultGeometry} from './utils';

	const dispatch = createEventDispatcher();
	const hasColor = isNotNullWith(getPath('properties.color'));

	const defaultTheme = {
		backgroundColor: 'white',
		defaultFill: 'white',
		defaultStroke: 'grey',
		defaultStrokeWidth: 0.5,
		deselectedOpacity: 0.25,
		focusedStroke: 'red',
		focusedStrokeWidth: 2,
		focusedDasharray: '',
		hoverFill: '#f6f6f6',
		hoverStroke: 'black',
		hoverStrokedasharray: '',
		hoverStrokeWidth: 1.5,
		selectedStroke: 'black',
		selectedStrokeWidth: 1,
	}

	// required
	export let height;
	export let topojson;
	export let topojsonId;
	export let width;

	// optional
	export let focusedKey;
	export let geometry;
	export let isInteractive;
	export let key_alt;
	export let key;
	export let keyToColor;
	export let keyToColorFn;
	export let projectionFn;
	export let projectionId;
	export let selectedKeys;
	export let theme;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: geojson = topoToGeo(topojson, topojsonId);
	$: geometry = geometry ? {...defaultGeometry, ...geometry} : defaultGeometry;
	$: isInteractive = isInteractive || false;
	$: key_alt = key_alt || 'name';
	$: projection =
		projectionFn ||
		projectionId && projections[projectionId] ||
		projections.geoEquirectangular;
	$: selectedKeys = selectedKeys || [];
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
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
	$: isFocused = feature => focusedKey === getPayload(feature);
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
			class:focused={focusedKey && isFocused(feature)}
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
	.feature.focused path {
		stroke: var(--focusedStroke) !important;
		stroke-width: var(--focusedStrokeWidth) !important;
		stroke-dasharray: var(--focusedDasharray) !important;
	}
</style>
