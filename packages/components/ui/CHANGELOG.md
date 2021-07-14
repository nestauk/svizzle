## `@svizzle/ui` v0.4.0

- `Link`:
	- text has to be passed as a child of the component rather than using the `text` prop
	- add `showIcon` prop
	- drop props `isExternal` and `text`
	- fixed behaviour of `download` attribute
- `LinkButton`:
	- add props:
		- `download`
		- `hreflang`
		- `rel`
		- `target`
		- `type`
	- fixed behaviour of `download` attribute
- `LoadingView`:
	- make sure props are set to their default if `undefined`
	- add documentation on the site
- updated dev dependencies

## `@svizzle/ui` v0.3.1

- comply with WCAG criterias:
	- 1.3.1 H71 - Providing a description for groups of form controls using fieldset and legend elements https://www.w3.org/WAI/WCAG21/Techniques/html/H71
	- 1.4.6 G17 - Ensuring that a contrast ratio of at least 7:1 exists between text (and images of text) and background behind the text https://www.w3.org/WAI/WCAG21/Techniques/general/G17
- updated some dependencies

## `@svizzle/ui` v0.3.0

- additions:
	- `src/LoadingView.svelte`
	- `src/MessageView.svelte`
	- `src/icons/svizzle/A11yPerson.svelte`
- changes:
	- icons:
		- `Icon.svelte`: add the `glyphSize` prop so that we can pass glyphs with sizes different from 24x24
		- glyphs are not built anymore
	- turned `ExternalLink.svelte` into a more generic `Link.svelte`:
		- adding props:
			- `download`
			- `hreflang`
			- `isBold`
			- `isExternal`
			- `isUnderlined`
			- `type`
		- rename `theme.textColor` to `theme.color`
	- `ScreenGauge`:
		- add `landscape`|`portrait` to `classes`
		- renamed `screen` to `_screen` to follow our internal convention to start store names with an underscore
		- changed the `_screen` shape:
			- rename `orientationFlags` to `orientations`
			- rename `sizeFlags` to `sizes`
		- export `defaultBreakpoints` directly from `ScreenGauge` rather than from a module
	- added default value to props
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
