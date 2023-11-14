## `@svizzle/choropleth` v0.9.4

- set `display: block` on the inner `<svg>`

## `@svizzle/choropleth` v0.9.2

- added a new prop `geojson`: it's alternative to & takes precedence over the
	`topojson` prop so that if we have a geojson we avoid the
	topojson -> geojson transformation
- added `keydown` event when `isInteractive` is true
- updated license year

## `@svizzle/choropleth` v0.9.1

- upgraded `svelte`
- added `"svelte": "src/index.js"` field to `package.json`

## `@svizzle/choropleth` v0.9.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded:
				- `d3-geo`, `eslint`, `eslint-plugin-svelte3`
			- removed `eslint-plugin-import`
	- imports:
		- using file extensions

## `@svizzle/choropleth` v0.8.0

- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` field in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/choropleth` v0.7.0

- ported some utilities to `/geo`, hence:
	- removed `truncateGeojson`
	- removed `topoToGeo`
- renamed `src/utils` to `src/shared`
- now exporting `projections` from `src/shared`
- `ChoroplethG.svelte`: refactored to use the new imports

## `@svizzle/choropleth` v0.6.7

- updated dev dependencies
- updated a test

## `@svizzle/choropleth` v0.6.6

- updated `@svizzle/atlas`

## `@svizzle/choropleth` v0.6.5

- updated some dependencies

## `@svizzle/choropleth` v0.6.4

- added default value to props
- updated some dev dependencies

## `@svizzle/choropleth` v0.6.3

- updated some dependencies:
	- `d3-geo`
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/choropleth` v0.6.2

- show the `message` only if `projection` is `undefined` OR the internal geojson has an empty `features` property

## `@svizzle/choropleth` v0.6.1

- fix the message in case `topojson` has no objects or `projection` is `undefined` (useful if you know it has been generated with a geojson with an empty `features` property)

## `@svizzle/choropleth` v0.6.0

- add prop `projection`
- show a customisable message if `items` is not provided or is empty

## `@svizzle/choropleth` v0.5.0

- add prop `focusedKey`
- document `topoToGeo`

## `@svizzle/choropleth` v0.4.0

- add `projectionId` and rename `projection` to `projectionFn` so that we can pass either a projection function or an id to select a projection from the available ones
- expose `topoToGeo` and `defaultGeometry` in `src/utils`
- remove more exotic projections that would better be used with spherical coordinates [lambda, phi]

## `@svizzle/choropleth` v0.3.0

- `ChoroplethG`
	- renamed `ChoroplethSVG` to `ChoroplethG`, with root element being `<g>` rather than a `<svg>`
	- don't use the safety for the background
	- new props:
		- `deselectedOpacity`
		- `geometry` (was the internal variable `safety`)
		- `hoverFill`
		- `hoverStroke`
		- `hoverStrokedasharray`
		- `hoverStrokeWidth`
	- moved these props in a `theme` var while renaming them:
		- `colorSea` -> `backgroundColor`
		- `colorDefaultFill` -> `defaultFill`
		- `colorStroke` -> `defaultStroke`
		- `colorStrokeSelected` -> `selectedFeatureStroke`
		- `sizeStroke` -> `defaultStrokeWidth`
		- `sizeStrokeSelected` -> `selectedStrokeWidth`
- `ChoroplethDiv`:
	- added props: `title`, `padding`, `headerHeight`
- docs:
	- document only `ChoroplethG` with a mention of how to use `ChoroplethDiv` to reduce duplication
	- add a specific route for `keyToColor`, it was used in toom many pages
- Update to Lamb 0.59.2 (no renames needed)

## `@svizzle/choropleth` v0.2.0

- show features with full opacity if `selectedKeys` is not provided
- added prop `keyToColorFn`
- removed `ChoroplethWorldDiv`

## `@svizzle/choropleth` v0.1.0

- added `ChoroplethSVG`
- added `ChoroplethDiv`
- added `ChoroplethWorldDiv`
