## `@svizzle/ui` v0.3.0 (next)

- additions:
	- `src/LoadingView.svelte`
	- `src/MessageView.svelte`
	- `src/icons/svizzle/A11yPerson.svelte`
- changes:
	- `Icon.svelte`: add the `glyphSize` prop so that we can pass glyphs with sizes different from 24x24
	- turned `ExternalLink.svelte` into a more generic `Link.svelte`, adding props:
		- `hreflang`
		- `isDownload`
		- `isExternal`
		- `type`
	- `ScreenGauge`:
		- add `landscape`|`portrait` to `classes`
		- changed the output shape:
			- remame `orientationFlags` to `orientations`
			- remame `sizeFlags` to `sizes`
- updated some dev dependencies

## `@svizzle/ui` v0.2.0

- add responsiveness `breakpoints` (see `src/defaults.js`)
- add `src/gauges/ScreenGauge.svelte`
- add `src/ExternalLink.svelte`
- add `src/LinkButton.svelte`
- add `Icon` and Feather icons as Svelte components (see `src/icons/feather/`)
- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)


## `@svizzle/ui` v0.1.0
`
- add `src/icons/src/Switch.svelte`, a simple toggle between 2 states`
