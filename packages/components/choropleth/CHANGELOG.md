## `@svizzle/choropleth` v0.3.0 (next)

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
