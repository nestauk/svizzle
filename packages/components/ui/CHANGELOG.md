## `@svizzle/ui` v0.13.0

- added `Input` and `Pill` components
- added a minimal viewport system, see:
	- `View.svelte`
	- `ViewsSlider.svelte`
	- `ViewsXor.svelte`
- added `XorNavigator` component
- updated `Banner` & `Scroller`
- `Link` component renamed to `HyperLink`
- removed `just-compare`, now using `areEqual` from `@svizzle/utils`
- upgraded:
	- `@macfja/svelte-persistent-store`
	- `feather-icons`
	- `lamb`
	- `svelte`
	- `eslint`
- adopted `eslint-plugin-svelte`, linted

## `@svizzle/ui` v0.12.0

- `Scroller`:
	- add centering props
	- fixed a bug where `overflow-x` was overridden
- `CenteredView`: added some prop default

## `@svizzle/ui` v0.11.0

- `Scroller`:
	- added 2 new props
		- `outerScrollTop`, to let other components binding to its internal scroll
		- `scrollbarWidth`, to account for scrollbar width on Windows
	- fixed not reacting to slot size changes
- `ScreenSensor`: fixed the measured `glyph.height` being too big
- `Banner`, `Switch` and `XorSelector`: resolved some a11y related warnings

## `@svizzle/ui` v0.10.0

- added `resizeHandler` action

## `@svizzle/ui` v0.9.1

- use correct css var names in `ResponsiveButton`
- fixed `ScrollbarStyler` warning [1]

[1]
```
No scopable elements found in template. If you're using global styles in the
style tag, you should move it into an external stylesheet file and import it
in JS. See
https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md#where-should-i-put-my-global-styles.
```

## `@svizzle/ui` v0.9.0

- added `AlphabetPicker.svelte`
- added `Banner.svelte`
- added `CenteredView.svelte`
- added `CopyToClipboard.svelte`
- added `HighlightedText.svelte`
- added `LayoutHMF.svelte`
- added `ResponsiveButton.svelte`
- added `ScrollbarStyler.svelte`
- added `Scroller.svelte`
- added `StyleDriver.svelte`
- added `StyleSensor.svelte`
- added `XorSelector.svelte`
- added `PLATFORM` and `isPlatformIn(oses, browsers)`
- `a11yMenu`: removed `z-index`
- `Link`:
	- spacebar scrolling disabled when focused
	- added `outlineColor`, `outlineStyle` and `outlineWidth` theme props
	- added `ariaDescribedBy` and `ariaLabel` props
	- use `color: 'inherit'` instead of `black`
- `MessageView`:
	- now using `CenteredView`
	- added props `padding`, `textAlign`
	- added documentation
- `MultiBanner`:
	- now using `Banner`, `LayoutHMF`, `Scroller`
	- props:
		- added `footerText`, `theme`
		- removed `currentIndex`
- `Switch`:
	- no longer using radio buttons nor a `fieldset`
	- keyboard support:
		- [b], [e]
		- moved `cursor: pointer` to the `wrapper` div
	- `theme`:
		- added `outlineColor`, `outlineStyle` and `outlineWidth` props
		- added `knobColor` prop
- updated license year

[b] better keyboard support
[e] use `event.key` instead of `event.keyCode` (now deprecated [1]) which is also more readable as we don't rely on numeric codes

[1] https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode


## `@svizzle/ui` v0.8.0

- `A11yMenu` is now themable

## `@svizzle/ui` v0.7.1

- upgraded `svelte`
- added `"svelte": "src/index.js"` field to `package.json`
- removed `FetchDriver` from `src/index.js` to avoid build issues

## `@svizzle/ui` v0.7.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- added `just-compare`, was missing before
			- upgraded:
				- `@macfja/svelte-persistent-store`, `hast-util-to-html`, `uid`: updated code for the new API
				- `camelcase`, `eslint`, `eslint-plugin-svelte3`
			- removed `esm`, `eslint-plugin-import`
	- imports:
		- using file extensions
		- use the `node:` protocol
	- `StorageIO`: moved the setup in `onMount`
- icons: added `src/icons/feather/Table.svelte`
- now internally importing directly from svizzle modules index

## `@svizzle/ui` v0.6.0

- moved `@macfja/svelte-persistent-store` to dependencies to fix the `StorageIO` component
- added `FetchDriver` component wrapping access to `@svizzle/request/src/fetchManager/fetchManager.js`
- line height in A11y menu is now unitless
- added A11y menu components to `ui/src/index.js`
- use `_.head` instead of `_.getAt(0)`
- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` field in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/ui` v0.5.0

- add components:
	- `MultiBanner`
	- `NoScript`
	- `ResponsiveFlex`
	- `StorageIO`
	- `A11yMenu`
	- `FontsLoader`
- add `isClientSide`, `isServerSide` utils
- `Link`: fixed behaviour of `style` when `theme.color` is nullish
- `ScreenGauge`:
	- fixed `sampleText` enlarging the document size
	- renamed `ScreenGauge` to `ScreenSensor`
	- made `ScreenSensor` into a singleton so that it renders only once
	- removed `fontSize` property
	- replaced bound size variables by `ResizeObserver` action
- replaced some absolute CSS definitions related to text and fonts
- fixed linting errors:
	- in `src/a11y/menu/settings.js`
	- linting now fails on warnings

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
