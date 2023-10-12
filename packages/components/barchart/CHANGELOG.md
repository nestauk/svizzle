## `@svizzle/barchart` v0.11.0 (next)

- bar events now dispatch `{displayValue, key, label, value}`
- changed the shape of the `theme` prop
	- removed `theme.fontSize`
	- added `theme.glyphHeight` and `theme.glyphWidth`
- use `/ui`'s `Scroller`


## `@svizzle/barchart` v0.10.0

- added `valueToColorFn` prop

## `@svizzle/barchart` v0.9.0

- renamed:
	- `focusedKey` to `heroKey`
	- `shouldScrollToFocusedKey` to `shouldScrollToHeroKey`
- added keyboard support when `isInteractive` is true
- theming:
	- changed the `theme` props to control colors: see `theme.item*`
	- precedence to choose an item color is now:
		- hovering
		- hero key
		- selected key (if there is at least one selected key)
		- color map or function
		- default color
	- added `refRectColor`, `refRectStrokeColor`, `refTextFill` to control ref boxes theme
	- added `outlineColor`, `outlineStyle` and `outlineWidth` styling keyboard support
- using `MessageView` from `@svizzle/ui`
- updated LICENSE year

## `@svizzle/barchart` v0.8.1

- upgraded `svelte`
- added `"svelte": "src/index.js"` field to `package.json`

## `@svizzle/barchart` v0.8.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded:
				- `eslint`, `eslint-plugin-svelte3`, `just-compare`, `yootils`
			- removed `eslint-plugin-import`

## `@svizzle/barchart` v0.7.0

- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` field in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/barchart` v0.6.8

- updated dev dependencies

## `@svizzle/barchart` v0.6.7

- updated some dependencies

## `@svizzle/barchart` v0.6.6

- fix scrolling to the selected item
- added default value to props
- updated some dev dependencies

## `@svizzle/barchart` v0.6.5

- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/barchart` v0.6.4

- fix: show zeroes
- labels now adapt to the available width

## `@svizzle/barchart` v0.6.3

When we build the ref label we now can:
- format the value using the `format` property of a reference
- abbreviate the key in case the label goes off the barchart width, using the `keyAbbr` property of a reference

## `@svizzle/barchart` v0.6.2

- fix: calculate refs labels length using the whole label text

## `@svizzle/barchart` v0.6.1

- fix: don't attempt to scroll if `items` is not provided or is empty

## `@svizzle/barchart` v0.6.0

- use reference values to build the x scale in order to draw ref lines exceeding the data extent correctly
- show a customisable message if `items` is not provided or is empty

## `@svizzle/barchart` v0.5.0

- add prop `refs`
- add prop `selectedKeys`
- add prop `titleFontSize`
- don't show the axis with positive and zeroes or negative and zeroes

## `@svizzle/barchart` v0.4.0

- dist: rename `BarchartV.*.js` to `BarchartVDiv.*.js`

## `@svizzle/barchart` v0.3.0

- rename the component to `BarchartVDiv`
- add a background rect
- rewrite to accept negative values
- uses SVG instead of HTML
- props rename: `defaultColor` -> `barDefaultColor`
- new props:
	- `theme`
		- `axisColor`
		- `backgroundColor`
		- `backgroundOpacity`
		- `fontSize` (the distance between bars depends on this now)
		- `headerHeight` (was previously static in CSS)
		- `textColor` (was previously static in CSS)
		- `padding` (was previously static in CSS)
		- moved these props within `theme`:
			- `barDefaultColor` (renamed from `defaultColor`)
			- `focusedKeyColor`
			- `hoverColor`
	- `barHeight` (was previously set in CSS)
- temporarily removed the props doc from the README.md to avoid duplication with the website
- Update to Lamb 0.59.2 (no renames needed)

## `@svizzle/barchart` v0.2.0

- `BarchartV` accepts `keyToColorFn`

## `@svizzle/barchart` v0.1.0

- added `BarchartV`
