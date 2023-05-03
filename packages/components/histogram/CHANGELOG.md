## `@svizzle/histogram` v0.6.3

- updated deps

## `@svizzle/histogram` v0.6.2

- added `keydown` event to dismiss the selection pressing ESC
- updated license year

## `@svizzle/histogram` v0.6.1

- upgraded `svelte`
- added `"svelte": "src/index.js"` field to `package.json`

## `@svizzle/histogram` v0.6.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- added: `d3-array`
			- upgraded:
				- `d3-scale`, `eslint`, `eslint-plugin-svelte3`
			- removed `eslint-plugin-import`, `esm`
	- imports:
		- using file extensions
		- use the `node:` protocol

## `@svizzle/histogram` v0.5.0

- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` and `browser` fields in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/histogram` v0.4.2

- updated dev dependencies

## `@svizzle/histogram` v0.4.1

- updated some dependencies

## `@svizzle/histogram` v0.4.0

- utils: add `getBinsTicksExtent`
- renamed internal stores to start with an underscore
- added default value to props
- updated some dev dependencies

## `@svizzle/histogram` v0.3.1

- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/histogram` v0.3.0

- show a customisable message if `items` is not provided or is empty

## `@svizzle/histogram` v0.2.0

- props: rename `maxfontSize` to `maxFontSize`
- add `src/utils.js` to the outputs, to be imported in browsers directly
- when interactive and a with a non-empty selection, clicking on the background resets the selection

## `@svizzle/histogram` v0.1.0

- add `HistogramG.svelte`
- add `HistogramDiv.svelte`
- add binning utils:
	- add `areValidBins`
	- add `exactAmountBins`
	- add `findFirstNonEmptyBinIndex`
	- add `findLastNonEmptyBinIndex`
	- add `getBinsExtent`
	- add `getBinsItems`
	- add `getBinsMax`
	- add `getBinsMin`
	- add `getBinsTicks`
	- add `getNonEmptyBinsTicks`
	- add `getTrimmedBinsStats`
	- add `isNonEmptyBin`
