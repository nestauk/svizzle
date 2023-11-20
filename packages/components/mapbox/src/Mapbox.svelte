<script>
	import 'mapbox-gl/dist/mapbox-gl.css';

	import geoViewport from '@mapbox/geo-viewport';
	import {makeStyleVars} from '@svizzle/dom';
	import mapboxgl from 'mapbox-gl';
	import {createEventDispatcher, onMount, setContext} from 'svelte';
	import {derived, writable} from 'svelte/store';

	import MapboxglUnsupported from './MapboxglUnsupported.svelte';
	import {ws_en_to_wsen} from './util';

	const MAPBOXGL = {
		minZoom: 0,
		maxZoom: 24,
		tileSize: 512
	};

	const isMapboxGLSupported = mapboxgl.supported();

	const dispatch = createEventDispatcher();

	/* props */

	export let _bbox_WS_EN = null; // store
	export let _bbox_WSEN = null; // store
	export let _zoom = null; // store
	export let accessToken = null;
	export let bounds;
	export let eventsHandlers = null;
	export let fitBoundsPadding = 20; // px
	export let getFeatureState;
	export let isAnimated = true;
	export let isDblClickEnabled = true;
	export let isInteractive = true;
	export let reactiveLayersIds = [];
	export let style;
	export let theme;
	export let visibleLayersIds = [];
	export let withScaleControl = true;
	export let withZoomControl = true;

	const defaultTheme = {
		outlineColor: 'black',
		outlineStyle: 'solid',
		outlineWidth: '1px',
	}

	$: fitBoundsPadding = fitBoundsPadding ?? 20;
	$: isDblClickEnabled = isDblClickEnabled ?? true;
	$: isAnimated = isAnimated ?? true;
	$: isInteractive = isInteractive ?? true;
	$: _bbox_WS_EN = _bbox_WS_EN || writable([[-180, -90], [180, 90]]);
	$: _bbox_WSEN = _bbox_WSEN || derived(_bbox_WS_EN, bbox_WS_EN => bbox_WS_EN.length ?? ws_en_to_wsen(bbox_WS_EN));
	$: _zoom = _zoom || writable(0);
	$: visibleLayersIds = visibleLayersIds || [];
	$: reactiveLayersIds = reactiveLayersIds || [];
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: mapStyle = makeStyleVars(theme);

	/* context */

	const _bbox = writable($_bbox_WS_EN);
	const _map = writable();
	export const _projectFn = writable(x => x);

	setContext('Mapbox', {
		_bbox,
		_map,
		_projectFn
	});

	/* local vars */

	let eventsHandlersRegistry = [];
	let height = 0;
	let map;
	let mapcontainer;
	let width = 0;

	/* updating layers */

	const updateLayers = (layers_, reactiveLayersIds_, getFeatureStateFn) => {
		if (!layers_ || !getFeatureStateFn) {
			return;
		}
		layers_.forEach(layer => {
			if (reactiveLayersIds_.includes(layer.id)) {
				map
				.querySourceFeatures(layer.source, {sourceLayer: layer['source-layer']})
				.forEach(feature => {
					const state = getFeatureStateFn(feature);
					state && map.setFeatureState({
						id: feature.id,
						source: layer.source,
						sourceLayer: layer['source-layer'],
					}, state);
				});
			}

			map?.setLayoutProperty(
				layer.id,
				'visibility',
				visibleLayersIds.includes(layer.id) ? 'visible' : 'none'
			);
		});
	}

	$: map?.setStyle(style);
	$: layers = $_map && style && $_map?.getStyle().layers;
	$: updateLayers(layers, reactiveLayersIds, getFeatureState);
	$: {
		eventsHandlersRegistry.forEach(
			({type, targetLayer, handler}) => {
				map?.off(type, targetLayer, handler);
			}
		);
		eventsHandlers?.forEach(
			({type, targetLayer, handler}) => {
				map?.on(type, targetLayer, handler);
			}
		);
		eventsHandlersRegistry = eventsHandlers ?? [];
	}

	/* bbox */

	$: $_bbox = $_bbox_WS_EN

	// FIXME supports Mercator projection only
	$: viewport = geoViewport.viewport(
		ws_en_to_wsen($_bbox_WS_EN),
		[width, height],
		MAPBOXGL.minZoom,
		MAPBOXGL.maxZoom,
		MAPBOXGL.tileSize,
	);

	/* controls */

	const addAttributionControl = () => {
		map.addControl(
			new mapboxgl.AttributionControl({
				compact: true
			})
		)
	};

	const addScaleControl = () => {
		map.addControl(
			new mapboxgl.ScaleControl({
				maxWidth: 80,
				unit: 'metric'
			}),
			'top-right'
		);
	};

	const addZoomControl = () => {
		map?.addControl(
			new mapboxgl.NavigationControl({
				showCompass: false
			}),
			'bottom-right'
		);
	};

	const addControls = () => {
		addAttributionControl();

		if (withScaleControl) {
			addScaleControl();
		}

		if (withZoomControl) {
			addZoomControl();
		}
	};

	/* bbox */

	const fitToBbox = bbox_WSEN => {
		map?.fitBounds(bbox_WSEN, {
			animate: isAnimated,
			linear: true,
			padding: {
				bottom: fitBoundsPadding,
				left: fitBoundsPadding,
				right: fitBoundsPadding,
				top: fitBoundsPadding,
			}
		});
	};

	/* events */

	const updateBbox = () => {
		if (map) {
			const mapBounds = map.getBounds().toArray();
			$_bbox_WS_EN = mapBounds;
			$_bbox = mapBounds;
		}
	}

	const updateZoom = () => {
		if (map) {
			const zoom = map.getZoom();
			$_zoom = zoom;
		}
	}

	const setMapEvents = () => {
		map.on('move', event => {
			updateBbox();
			const {originalEvent} = event;
			if (originalEvent && originalEvent.type !== 'resize') {
				dispatch('bboxChanged');
			}
		})
		.on('zoom', () => {
			updateZoom();
		})
		.on('boxzoomend', () => {
			dispatch('bboxChanged');
		})
		.on('click', () => {
			dispatch('mapClick');
		})
		.on('mousemove', ({
			lngLat, // geographic coordinates of the mouse position
			originalEvent: {x, y}, // document pixel coordinates
			point, // canvas pixel coordinates
		}) => {
			const features = map.queryRenderedFeatures(point);
			const payload = {
				features,
				lngLat,
				point,
				x,
				y,
			}
			dispatch('mapFeaturesHovered', payload);
		})
		.on('touchstart', ({
			lngLat, // geographic coordinates of the mouse position
			originalEvent: {targetTouches: [touch]}, // document pixel coordinates
			point, // canvas pixel coordinates
		}) => {
			const {clientX: x, clientY: y} = touch;
			const features = map.queryRenderedFeatures(point);
			const payload = {
				features,
				lngLat,
				point,
				x,
				y,
			}
			dispatch('mapFeaturesTouchStarted', payload);
		});
	}

	/* methods */

	// FIXME TBD: bind instead?
	const setGeometry = () => {
		if (!mapcontainer) {
			return;
		}

		const elementGeometry = getComputedStyle(mapcontainer);
		width = parseFloat(elementGeometry.width);
		height = parseFloat(elementGeometry.height);
	};

	const mapgl = node => {
		const {center, zoom} = viewport;

		mapboxgl.accessToken = accessToken;

		map = new mapboxgl.Map({
			center,
			container: node,
			maxZoom: MAPBOXGL.maxZoom,
			minZoom: MAPBOXGL.minZoom,
			renderWorldCopies: true,
			style,
			zoom,

			// interactions
			attributionControl: false, // we add this later to have it compact
			doubleClickZoom: isDblClickEnabled,
			dragPan: isInteractive,
			dragRotate: false,
			interactive: isInteractive,
			pitchWithRotate: false, // don't render dots in perspective
			scrollZoom: isInteractive,
			touchPitch: false,
			touchZoomRotate: isInteractive,
		})
		.on('load', () => {
			setMapEvents();
			bounds && fitToBbox(bounds);
			updateZoom();

			setGeometry(); // ipad FIXME: initial svg is 100x100

			$_map = map;
			$_projectFn = map.project.bind(map);
			$_map.resize();
		})
		.on('data', () => {
			layers = $_map && style && $_map?.getStyle().layers;
			updateLayers(layers, reactiveLayersIds, getFeatureState);
		});

		map.touchZoomRotate.disableRotation();

		// controls

		addControls();
	};

	const onMouseEnter = () => dispatch('entered');
	const onMouseLeave = () => dispatch('exited');

	/* lifecycle */

	onMount(() => {
		setGeometry();
	});

	const onResize = () => {
		setGeometry();
		bounds && fitToBbox(bounds);
	}

	$: bounds && fitBoundsPadding && fitToBbox(bounds);
</script>

<svelte:window on:resize={onResize} />

{#if isMapboxGLSupported}
	<div
		class='Mapboxgl'
		on:mouseenter={onMouseEnter}
		on:mouseleave={onMouseLeave}
		role='none'
		style={mapStyle}
	>
		<div
			bind:this={mapcontainer}
			class='mapcontainer'
			use:mapgl
		/>
	</div>
	{#if $_map}
		<slot />
	{/if}
{:else}
	<MapboxglUnsupported />
{/if}


<style>
	.Mapboxgl {
		height: 100%;
		position: relative;
		width: 100%;
	}

	.mapcontainer {
		height: 100%;
		width: 100%;
	}

	/*
		Outlines inside of MapboxGL instances must be themed directly
		using its own CSS classes.
	*/
	.Mapboxgl :global(.mapboxgl-canvas:focus-visible),
	.Mapboxgl :global(.mapboxgl-ctrl-group button:focus:focus-visible),
	.Mapboxgl :global(.mapboxgl-ctrl-logo:focus:focus-visible),
	.Mapboxgl :global(.mapboxgl-ctrl-attrib-button:focus) {
		box-shadow: none !important;
		/* box-shadow: var(--focusShadow) !important; */
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor) !important;
		outline-offset: calc(-1 * var(--outlineWidth)) !important;
	}
</style>
