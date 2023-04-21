# Mapbox GL Wrapper for Svelte

A Svelte component library that streamlines the integration of Mapbox GL JS into
Svelte applications.

## Features

- Allows for adding SVG layers and custom controls through slots
- Layers and custom controls can obtain the mapbox instance through `getContext`
- Provides stores for the bounding box and zoom level
- Can enable/disable scale and zoom controls through properties
- Degrades to a fallback message if Mapbox GL JS is not supported in the user's browser

## Installation

```sh
npm install --save @svizzle/mapbox
```

## `Mapbox` Component

The main component of this library, it wraps the Mapbox GL JS map and provides
the platform for adding custom SVG layers and controls through the use of the
`SVGLayer` and `CustomControl` components (see below).

### Usage

```svelte
<script>
	import {Mapbox} from '@svizzle/mapbox';
</script>

<MapBox
	accessToken="{your_access_token}"
	styleURL="{your_style_url}"
/>
```

### Props

- `_bbox_WS_EN`: store for the bounding box in `[[West, South], [East, North]]` format (optional)
- `_bbox_WSEN`: store for the bounding box in `[West, South, East, North]` format (optional)
- `_zoom`: store for the map zoom level (optional)
- `accessToken`: your Mapbox access token (*required*)
- `bounds`: bounding box for the map viewport (optional)
- `customControl`: custom control to be added to the map (optional)
- `styleURL`: URL for the Mapbox style to be used (*required*)
- `withScaleControl`: whether to display the scale control (default: true)
- `withZoomControl`: whether to display the zoom control (default: true)

### Events

- `bboxChanged`: emitted when the bounding box of the map changes
- `mapClick`: emitted when the map is clicked

### Slots

- Default slot for adding additional custom components, SVG layers or custom controls to the map

### Browser support

The component checks if Mapbox GL JS is supported in the user's browser. If it
is not supported, a fallback message is rendered instead of the map.

## `SVGLayer` component

The `SVGLayer` component allows you to add custom SVG layers to a `Mapbox`
instance. It makes it easy to integrate additional graphical elements, such as
annotations or overlays, on top of a Mapbox GL map.

### Usage

You may add multiple SVG layers to a map. Each SVG layer will be rendered on top
of the previous one.

```svelte
<script>
	import {Mapbox, SVGLayer} from '@svizzle/mapbox';
</script>

<Mapbox
	accessToken="{your_access_token}"
	styleURL="{your_style_url}"
>
	<SVGLayer>
		<!-- SVG layer content -->
	</SVGLayer>
	<SVGLayer>
		<!-- Another SVG layer content -->
	</SVGLayer>
</Mapbox>
```

### Props

- `isInteractive`: A boolean that determines whether the SVG layer should be interactive or not (default: `true`)
- `order`: A number that determines the visual order of the SVG layer relative to other SVG layers (default: none). Higher values place the layer on top of other layers with lower values.

## `CustomControl` component

The `CustomControl` component enables you to add custom controls to a Mapbox GL
map within a Svelte application. This component simplifies the process of
integrating custom controls, such as buttons or additional information panels,
into your Mapbox GL maps.

### Usage

You may add multiple custom controls to a map. Each custom control will be
rendered according to its `position` property.

```svelte
<script>
	import {Mapbox, CustomControl} from '@svizzle/mapbox';
</script>

<Mapbox
	accessToken="{your_access_token}"
	styleURL="{your_style_url}"
>
	<CustomControl>
		<!-- Custom control content -->
	</CustomControl>
</Mapbox>
```

### Props

- `position`: A string that determines the position of the custom control on the map (default: none). Accepted values are: `top-right`, `top-left`, `bottom-right`, or `bottom-left`.
