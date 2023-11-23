## `@svizzle/mapbox` v0.2.0

- props:
	- renamed `styleURL` to `style` and clarified that it can take an object or a URL
	- added:
		- `eventsHandlers` handlers for Mapbox's events
		- `fitBoundsPadding`: padding in pixels when zooming to `bounds` (in lieu of the old `FIT_PADDING` which was equal to 60 px)
		- `getFeatureState` to control features style interactively (e.g. when hovering features of the map)
		- `isAnimated` to control `fitBounds` animation
		- `isInteractive` to better control interactivity
		- `isDblClickEnabled` to enable/disable `map.doubleClickZoom`
		- `reactiveLayersIds` to set reactive layers
		- `theme` to control focus' style
		- `visibleLayersIds` to set visible layers
	- exposed the map projection function via `_projectFn` read-only prop

- added new events:
	- `mapFeaturesHovered` when hovering the map on systems that support pointers
	- `mapFeaturesTouchStarted` when hovering the map on systems that support touch
	- `entered` when entering the map
	- `exited` when leaving the map

- implementation:
	- renamed the context id to `Mapbox`
	- removed `MapboxglBase.svelte`
	- upgraded `mapbox-gl`, `svelte`, `eslint`
	- adopted `eslint-plugin-svelte`

## `@svizzle/mapbox` v0.1.1

- `SvgLayer`: set `.SvgLayers` to `display: block`

## `@svizzle/mapbox` v0.1.0

- added `CustomControl.svelte`
- added `Mapbox.svelte`
- added `MapboxglUnsupported.svelte`
- added `SvgLayers.svelte`
- added various utils and docs
