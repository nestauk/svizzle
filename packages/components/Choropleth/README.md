# Choropleth

Choropleth components for Svelte.

- `ChoroplethSVG`: base component to be used within `<div>`s
- `ChoroplethDiv`: base component to be used directly
- `ChoroplethWorldDiv`: base world choropleth

These have no title, scales or tooltips.

## Terminology

Since the component can render different types of areas, here we're using the term "region" to refer to the geographic regions type we'll be representing (e.g. 'country', 'NUTS2', etc).

## Props

Here are props used in base components (not that they're not always used)

### `colorDefaultFill`

The default fill color for polygons.

Type: `string`

Default: `white`

### `colorSeaFill`

The background color.

Type: `string`

Default: `white`

### `colorStroke`

The default stroke color for polygons.

Type: `string`

Default: `grey`

### `colorStrokeSelected`

The stroke color for selected polygons.

Type: `string`

Default: `white`

### `geojson`

The Geojson FeatureCollection of regions to be represented, with features' `properties` having the a field corresponding to the prop `key`.

Type: `object`

Default: `undefined`

### `height`

The svg canvas `height` attribute.

Type: `Number`

Default: `undefined`

### `isInteractive`

If `true`, emits events when interacting with the polygons, the payload being the value of the region `key` (see [events](#events) below).

Type: `boolean`

Default: `false`

### `key` (Required)

The key to be used in the features `properties` field as the region identifier.

For example the `properties` field might have the shape `{iso_a2: String, iso_a3: String}`: by passing `iso_a3` we choose to identify features by the value in the `iso_a3` field of their `properties` field.

Type: `String`

Default: `undefined`

### `key_alt`

You might provide geojson where not all the features have the provided `key`.
For example if you provide `key: 'iso_a2'` (ISO Alpha 2 codes), disputed or partially recognised countries might not have that code (e.g. `Kosovo`).
For these cases you can provide a `key_alt`, equal to `name` by default.",

Type: `String`

Default: `name`

### `keyToColor`

By providing an object mapping region key -> region color, you can control the regions colour.

Notice that the default color for keys not in `keyToColor` is black.

Type: `object`

Default: `undefined`

Example:

```js
{
  foo: 'yellow',
  bar: '#ff0000',
}
```

### `projection`

The projection name. Most projections provided from `d3-geo` are valid ids.

Type: `String`

Default: `geoEquirectangular` (see `d3-geo`).

### `selectedKeys`

The keys of the items to be highlighted.

Type: `String[]`

Default: `[]`

### `sizeStroke`

The default `stroke-width` (unselected polygons).

Type: `number`

Default: `0.5`

### `sizeStrokeSelected`

The `stroke-width` of selected polygons.

Type: `number`

Default: `1`

### `width`

The svg canvas `width` attribute.

Type: `Number`

Default: `undefined`

## Events

### `clicked`

Event: `click` on a region

Payload: the clicked region `id`, based on the provided [`key`](#key).

### `entered`

Event: `mouseenter` on a region

Payload: the entered region `id`, based on the provided [`key`](#key).

### `exited`

Event: `mouseleave` on a region

Payload: the exited region `id`, based on the provided [`key`](#key).
