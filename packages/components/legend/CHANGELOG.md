## `@svizzle/legend` v0.4.2 (next)

- added `keydown` event to dismiss the selection pressing ESC
- updated license year

## `@svizzle/legend` v0.4.1

- upgraded `svelte`
- added `"svelte": "src/index.js"` field to `package.json`

## `@svizzle/legend` v0.4.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded:
				- `eslint`, `eslint-plugin-svelte3`, `yootils`
			- removed `eslint-plugin-import`
- now internally importing directly from svizzle modules index

## `@svizzle/legend` v0.3.0

- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` and `browser` fields in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/legend` v0.2.2

- updated dev dependencies

## `@svizzle/legend` v0.2.1

- use `yootils` instead of `d3-scale`
- updated some dependencies

## `@svizzle/legend` v0.2.0

- add the field `showTicksExtentOnly` to `flags` prop
- renamed internal stores to start with an underscore
- added default value to props
- `ColorBinsDiv.svelte`: added the missing `message` prop
- updated some dev dependencies

## `@svizzle/legend` v0.1.2

- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/legend` v0.1.1

- show a customisable message if `bins` is not provided or is empty

## `@svizzle/legend` v0.1.0

- add `ColorBinsG.svelte`
- add `ColorBinsDiv.svelte`
