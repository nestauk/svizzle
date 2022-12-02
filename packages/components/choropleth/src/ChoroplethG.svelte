<script>
	import {createEventDispatcher} from 'svelte';
	import {geoPath} from 'd3-geo';
	import {getPath, not} from 'lamb';
	import {makeStyleVars} from '@svizzle/dom';
	import {makeUpdateFeaturesProperty, topoToGeo} from '@svizzle/geo';
	import {isNotNullWith} from '@svizzle/utils';

	import {defaultGeometry, projections} from './shared.js';

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
		messageColor: 'black',
		messageFontSize: '1rem',
		selectedStroke: 'black',
		selectedStrokeWidth: 1,
	}

	// required
	export let height = null;
	// `geojson` is alternative to & takes precedence over `topojson`
	// so that if we have it we avoid the transformation topojson -> geojson
	export let geojson = null;
	export let topojson = null;
	export let topojsonId = null;
	export let width = null;

	// one of the two is required
	export let key = null;
	export let key_alt = 'name';

	// optional
	export let focusedKey = null;
	export let geometry = null;
	export let isInteractive = false;
	export let keyToColor = null;
	export let keyToColorFn = null;
	export let message = 'No data';
	export let projection = null;
	export let projectionFn = null;
	export let projectionId = null;
	export let selectedKeys = [];
	export let theme = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: geometry = geometry ? {...defaultGeometry, ...geometry} : defaultGeometry;
	$: isInteractive = isInteractive || false;
	$: message = message || 'No data';
	$: projection = projection || null;
	$: projectionFn = projectionFn || null;
	$: projectionId = projectionId || null;
	$: key_alt = key_alt || 'name';
	$: projectionFunc =
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
	$: geojson = geojson || topojson && topoToGeo(topojson, topojsonId);
	$: coloredGeojson = geojson && createColoredGeojson(geojson);
	$: currentProjection =
		projection ||
		geojson &&
		geojson.features.length &&
		projectionFunc().fitSize([innerWidth, innerHeight], geojson);
	$: geopath = currentProjection && geoPath(currentProjection);
	$: getFeatureKey =
		feature => feature.properties[key] || feature.properties[key_alt];
	$: isFocused = feature => focusedKey === getFeatureKey(feature);
	$: isSelected = feature =>
		selectedKeys.length &&
		selectedKeys.includes(getFeatureKey(feature));
	$: isDeselected = not(isSelected);
	$: isClickable = feature => isInteractive && hasColor(feature);

	const onKeyDown = (event, key_) => {
		if (['Enter', ' '].includes(event.key)) {
			event.preventDefault();
			dispatch('clicked', key_);
		}
	}
</script>

<svelte:options namespace='svg' />

{#if height && width}
	<g
		{style}
		class:interactive={isInteractive}
		class='ChoroplethG'
	>
		{#if !geojson || !currentProjection}

			<text
				class='message'
				x={width/2}
				y={height/2}
			>{message}</text>

		{:else}

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
								on:click={() => isClickable(feature) && dispatch('clicked', getFeatureKey(feature))}
								on:mouseenter={() => isInteractive && dispatch('entered', getFeatureKey(feature))}
								on:mouseleave={() => isInteractive && dispatch('exited', getFeatureKey(feature))}
								on:keydown={isInteractive && (e => onKeyDown(e, getFeatureKey(feature)))}
							/>
						</g>
					{/each}
				{/if}
			</g>

		{/if} <!-- if no topojson -->
	</g>
{/if}

<style>
	.ChoroplethG {
		pointer-events: none;
	}
	.ChoroplethG.interactive {
		pointer-events: auto;
	}

	text.message {
		dominant-baseline: middle;
		fill: var(--messageColor);
		font-size: var(--messageFontSize);
		stroke: none;
		text-anchor: middle;
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
