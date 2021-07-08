## `@svizzle/histogram` v0.4.2 (next)

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
