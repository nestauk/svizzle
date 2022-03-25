# Svizzle changelog

## next

## `@svizzle/choropleth` v0.7.1 (next)

- removed unused dev dependency on `js-yaml`

## `@svizzle/ui` v0.5.1 (next)

- moved `@macfja/svelte-persistent-store` to dependencies to fix the `StorageIO` component

## `@svizzle/atlas` v0.6.1 (next)

- use `readYaml` from `@svizzle/atlas`

## `@svizzle/dev` v0.4.5 (next)

- fix: distribute `src/index.js`

## `@svizzle/file` v0.13.0 (next)

- add `readYaml`, `saveYaml`, `saveYamlPassthrough`
- removed unused dependency on `@svizzle/request`

## `@svizzle/geo` v0.8.0 (next)

- added `makeFilterTopoBy`
- remove the dependency from /atlas to avoid circular dependencies

## `@svizzle/utils` v0.17.0 (next)

- added `sanitize`
- added `sortObjectKeysAsc`, `sortObjectKeysDesc`
- added `jsonBufferToAny`


## 20211224_2

## `@svizzle/time_region_value` v0.6.1

- Fix dirty regions selection not changing the globe icon color


## 20211224

## `@svizzle/time_region_value` v0.6.0

- Fix the color scale and hide the legend when we have only 1 data point
- Show country codes in the bar chart
- Enhanced UX for `GeoFilterModal`
- Refactor:
	- Move stores in appropriate modules
		- rename `stores/barchart.js` -> `stores/indicatorYear.js`
		- move many stores from `stores/theme.js` to `stores/colors.js`
		- move some stores from `stores/indicator.js` to `stores/indicatorCurrent.js`
		- move some stores from `stores/indicator.js` to `stores/legend.js`
	- Use precomputed `rootIds` in `stores/selectedRegions.js`

## `@svizzle/site` v0.3.11

- Avoid exposing `@svizzle/choropleth/src/shared`


## 20211214

## `@svizzle/choropleth` v0.7.0

- ported some utilities to `/geo`, hence:
	- removed `truncateGeojson`
	- removed `topoToGeo`
- renamed `src/utils` to `src/shared`
- now exporting `projections` from `src/shared`
- `ChoroplethG.svelte`: refactored to use the new imports

## `@svizzle/time_region_value` v0.5.0

Breaking:
	- now supports NUTS levels 0123 for the whole of Europe
	- does not support NUTS2/UK specifically anymore
	- the schema required for this to work has changed (needs documentation)

Some implementation notes:
	- stores:
		- heavily refactored and changed their location within `src/node_modules/stores/`
		- use a function to `set` `_selectedYear` to make sure we set numbers
	- routes:
		- simplified as a lot of reactivity now happens in `derived`s
	- components:
		- a lot of these have been refactored to accomodate the new stores
		- `GeoFilterModal.svelte`: refactored + now uses `RegionsSelector`
		- `InfoModal.svelte`, `InfoView.svelte`: refactored + now show `region_types`
	- boundaries:
		- The current version does a lot of reconciliation between the pair `[NUTS_ID, region_year_spec]` and the `atlasId` for a region, resulting in the code being a bit convolute and with suboptimal performance.
		- Some of the current reconciliation code could be avoided by using the `atlasId` property provided to topojsons features by `/atlas` but we need to release this version to test it in an app, hence we'll need to add that optimisation in a future version.

## `@svizzle/site` v0.3.10

- moved all `dependencies` to `devDependencies` to [avoid having to maintain](https://github.com/sveltejs/sapper-template-rollup#using-external-components) the `external` list in `rollup.config.js` (prone to error)
- change to accomodate `@svizzle/time_region_value@0.5.0`:
	- shows random data for all NUTS levels and for the whole of Europe
	- added required configs
	- `makeRandomIndicators.js` now sorts datapoints columns using `order`
	- deleted NUTS2/UK data
	- not showing POIs anymore for now

## `@svizzle/atlas` v0.6.0

- NUTS:
	- add resolution `10M`, update some texts in `3M` files
	- reconcile recoded regions ids by introducing an 'unified' `atlasId`:
	- provide static maps to facilitate in-app reconciliation:
		- `unifiedNuts.json`: a list of regions with added:
			- `id`: the atlas id
			- `rootId`: the root region id (e.g. usually the country id)
			- `pid`: the parent region id
		- `hierarchy.json`: a hierarchy of regions based on the unified ids
		- `yearlyNutsIdToId.json`: a map from `year/NUTS_ID` to `atlasId`
		- `idToNutsIdByYear.json`: a map from `atlasId` to `NUTS_ID` by `year`
		- `recoded.json`: a map of recodes as declared by NUTS (see `/atlas/data/base/NUTS/0/history/recoded` & `/atlas/data/base/NUTS/0/history/README.md`)
	- augmented each region of the topojsons with a property `atlasId`
- add the `getAtlasId` function
- remove the dependency on `@svizzle/geo`

## `@svizzle/geo` v0.7.0

- port some utilities from `/choropleth`:
	- add `truncateGeojson`
	- add `topoToGeo`



## 20211126

## `@svizzle/time_region_value` v0.4.1

- replaced some absolute CSS definitions related to text and fonts

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

## `@svizzle/site` v0.3.9

- removed absolute font property declarations from CSS
- added `A11yMenu` supporting `medium` and larger displays
- use `FontsLoader` component
- replaced some absolute CSS definitions related to text and fonts

## `@svizzle/atlas` v0.5.1 (next - not published on npm yet)

- NUTS: add hierarchy and unified ids

## `@svizzle/dom` v0.5.1

- support object spread in builds

## `@svizzle/file` v0.12.0

- add `saveObjects`

## `@svizzle/geometry` v0.3.5

- support object spread in builds

## `@svizzle/request` v0.3.5

- support object spread in builds

## `@svizzle/utils` v0.16.0

- added `arraySumWith`, `pluckPath`, `updateKeys`
- moved `applyFnMap` to `src/modules/object-[any-object]`
- support object spread in builds


## 20210714

- remove `AUTHORS` files everywhere

## `@svizzle/barchart` v0.6.8

- updated dev dependencies

## `@svizzle/choropleth` v0.6.7

- updated dev dependencies
- updated a test

## `@svizzle/histogram` v0.4.2

- updated dev dependencies

## `@svizzle/legend` v0.2.2

- updated dev dependencies

## `@svizzle/time_region_value` v0.4.0

- support ignoring regions (via `regionSettings`, no UI)
- fixed server-side rendering of indicator routes
- fixed clicking on SVG anchors
- workaround for failure to layout on landing
- pass `hrefBase` to `Layout` only
- added a missing dependency
- updated dev dependencies
- supports UK NUTS2 only

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

## `@svizzle/site` v0.3.8

- updated for changes in `/time_region_value`, `/ui`, `/atlas`
- updated dev dependencies

## `@svizzle/atlas` v0.5.0

- refactor scripts and the package file structure and change atlas utils accordingly
- NUTS: collect 2021 and remove resolution `10M`
- add new npm scripts
- changed the shape of the object exported by `src/specs.js`

## `@svizzle/file` v0.11.0

- add `getPathExt`, `isFileWithExt`, `isCsvFile`, `isJsonFile`, `isTsvFile`, `isYamlFile`


## 20210630 (2)

## `@svizzle/choropleth` v0.6.6

- updated `@svizzle/atlas`

## `@svizzle/time_region_value` v0.3.1

- updated `@svizzle/atlas`
- supports UK NUTS2 only

## `@svizzle/site` v0.3.7

- updated `@svizzle/atlas`

## `@svizzle/atlas` v0.4.0

- to be published on npm


## 20210630

## `@svizzle/barchart` v0.6.7

- updated some dependencies

## `@svizzle/choropleth` v0.6.5

- updated some dependencies

## `@svizzle/histogram` v0.4.1

- updated some dependencies

## `@svizzle/legend` v0.2.1

- use `yootils` instead of `d3-scale`
- updated some dependencies

## `@svizzle/time_region_value` v0.3.0

- fetch boundaries at run-time
- `_layout`: add props `POIs` (points of interest) and `flags`
- introduce `regionSettings` and start making regional selection a bit more generic
- fix an error when clicking on a disabled navigation button in the timeline
- fix fields not being shown in the info modal
- comply with WCAG criterias:
	- 1.3.1 G141 - Organizing a page using headings https://www.w3.org/WAI/WCAG21/Techniques/general/G141
	- 1.3.1 H71 - Providing a description for groups of form controls using fieldset and legend elements https://www.w3.org/WAI/WCAG21/Techniques/html/H71
	- 4.1.2 H91 - Using HTML form controls and links: https://www.w3.org/WAI/WCAG21/Techniques/html/H91
- updated some dependencies
- supports UK NUTS2 only

## `@svizzle/ui` v0.3.1

- comply with WCAG criterias:
	- 1.3.1 H71 - Providing a description for groups of form controls using fieldset and legend elements https://www.w3.org/WAI/WCAG21/Techniques/html/H71
	- 1.4.6 G17 - Ensuring that a contrast ratio of at least 7:1 exists between text (and images of text) and background behind the text https://www.w3.org/WAI/WCAG21/Techniques/general/G17
- updated some dependencies

## `@svizzle/site` v0.3.6

- updated for changes in `/atlas` and `/time_region_value`
- updated some dependencies

## `@svizzle/atlas` v0.4.0 (not published on npm)

- add utils and specs
- updated some dependencies

## `@svizzle/dev` v0.4.4

- updated some dependencies

## `@svizzle/dom` v0.5.0

- removed `moveNode`
- updated some dependencies

## `@svizzle/file` v0.10.2

- updated some dependencies

## `@svizzle/geo` v0.6.4

- updated some dependencies

## `@svizzle/geometry` v0.3.4

- updated some dependencies

## `@svizzle/request` v0.3.4

- updated some dependencies

## `@svizzle/utils` v0.15.0

- added `isPromise`
- updated some dependencies


## 20210617

- Add scripts to npm link svizzles locally, useful when testing things before releasing.

## `@svizzle/barchart` v0.6.6

- fix scrolling to the selected item
- added default value to props
- updated some dev dependencies

## `@svizzle/choropleth` v0.6.4

- added default value to props
- updated some dev dependencies

## `@svizzle/dev` v0.4.3

- updated some dev dependencies

## `@svizzle/dom` v0.4.4

- updated some dev dependencies

## `@svizzle/file` v0.10.1

- updated some dev dependencies

## `@svizzle/geo` v0.6.3

- updated some dev dependencies

## `@svizzle/geometry` v0.3.3

- updated some dev dependencies

## `@svizzle/histogram` v0.4.0

- utils: add `getBinsTicksExtent`
- renamed internal stores to start with an underscore
- added default value to props
- updated some dev dependencies

## `@svizzle/legend` v0.2.0

- add the field `showTicksExtentOnly` to `flags` prop
- renamed internal stores to start with an underscore
- added default value to props
- `ColorBinsDiv.svelte`: added the missing `message` prop
- updated some dev dependencies

## `@svizzle/request` v0.3.3

- updated some dev dependencies

## `@svizzle/site` v0.3.5

- updated to support `/time_region_value@0.2.0`
- `legend/ColorsBinG`:
   - document `flags.showTicksExtentOnly`
   - document the `geometry` prop
- fix a bug when generating random data for `time_region_value`
- updated some dev dependencies

## `@svizzle/time_region_value` v0.2.0

- support for responsive layout (`small`, `portrait`):
	- added a navigation system specific for `small`
		- the sidebar slides in/out from the left
		- `/[id]`: trends, info, settings are separate views
		- `/[id]/[year]`: map, barchart, info, settings are separate views
		- responsive timeline: shows only one year
	- use a `derived` for safeties instead of setting them imperatively
	- /[year] (`small`): removing countries & tooltip for now:
		- countries cover the map
		- a mobile tooltip would need a new design
	- `components/InfoModal/` -> `components/Info/`
	- geo & info modals are now mutually exclusive, geo has priority
	- theme:
		- add some colors to the theme
		- add transitions values to the theme (for now unused, see comments where the vars are used)
- remove the `goTo` prop from `src/routes/index.svelte` and `src/routes/_layout_.svelte`
- now the `theme` can be passed only to the layout, which updates a store shared by all interested components
- color schemes are now part of the `theme`
- stores have been renamed so that they start with `_`
- props that are expected to be stores start with `_`
- adds a loading icon while waiting for `ScreenGauge` to populate `screen`
- fix missing info icon in `/[id]`
- added default value to props, changed some defaults
- add `/time_region_value` to the main readme
- remove `/time_region_value/src/node_modules/utils/generic.js`
- some renames
- updated some dev dependencies
- supports UK NUTS2 only

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

## `@svizzle/utils` v0.14.0

- updated some dev dependencies

### Any -> Undefined

- added `noop`

### Array -> (Any-Any)

- added `truthynessTo`


## 20210415

## `@svizzle/time_region_value` v0.1.1

- fix: include `*.json` and `*.yaml` files in the distribution (v0.1.0 won't work because of this)
- supports UK NUTS2 only


## 20210413

- Added a new way to upload tarballs to the repo to all packages.

## `@svizzle/barchart` v0.6.5

- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/choropleth` v0.6.3

- updated some dependencies:
	- `d3-geo`
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/dev` v0.4.2

- updated some dev dependencies

## `@svizzle/dom` v0.4.3

- updated some dev dependencies

## `@svizzle/file` v0.10.0

- add `resolveToDir`
- updated `readDirFiles` logic
- updated `readDirFilesIndexed` logic and added an argument
- updated some dev dependencies

## `@svizzle/geo` v0.6.2

- updated `@turf/*` to version `6.3.0`
- updated some dev dependencies

## `@svizzle/geometry` v0.3.2

- updated some dev dependencies

## `@svizzle/histogram` v0.3.1

- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/legend` v0.1.2

- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte` (for now using `emitCss: false`)

## `@svizzle/request` v0.3.2

- updated some dev dependencies

## `@svizzle/site` v0.3.3

- document `ExternalLink`
- document `LinkButton`
- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte`

## `@svizzle/time_region_value` v0.1.0

- add `_layout.svelte`
- add `index.svelte`
- add `[id]/index.svelte`
- add `[id]/[year].svelte`
- note that for now `rollup-plugin-svelte` is using `emitCss: false`
- supports UK NUTS2 only

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

## `@svizzle/utils` v0.13.0

- updated some dev dependencies
- removed `joinWith`, now provided by `lamb`

### (Any -> Array) -> (Array -> Object)

- add `makeArrayToObjectWith`

### Array -> String

- add `joinWithBlank`


## 20201119

## `@svizzle/dom` v0.4.2

- depends on a newer `@svizzle/utils` because of `prepend` renamed to `makePrefixed`

## `@svizzle/utils` v0.12.0

### (Any -> Any) -> (Object -> Array)

- add `valuesWith`

### (Any -> Boolean) -> (Object -> Any)

- add `findValueWith`

### Any -> Boolean

- add `isFunction`

### Array -> Object

- add `makeIndexByKey`

### String -> String

- add `makePostfixed`
- rename `prepend` to `makePrefixed`


## 20201002

## `@svizzle/barchart` v0.6.4

- fix: show zeroes
- labels now adapt to the available width

## `@svizzle/choropleth` v0.6.2

- show the `message` only if `projection` is `undefined` OR the internal geojson has an empty `features` property

## `@svizzle/legend` v0.1.1

- show a customisable message if `bins` is not provided or is empty

## `@svizzle/site` v0.3.2

- `@svizzle/ui`: add docs
- `@svizzle/barchart`:
	- document `ref.format`, `ref.keyAbbr`
	- document barchart labels adaptive layout
	- add examples for zeroes fix

## `@svizzle/ui` v0.1.0

- add `<Switch />`, a simple toggle between 2 values

## `@svizzle/utils` v0.11.1

- fix a dep cycle introduced earlier


## 20200915

## `@svizzle/barchart` v0.6.3

When we build the ref label we now can:
- format the value using the `format` property of a reference
- abbreviate the key in case the label goes off the barchart width, using the `keyAbbr` property of a reference

## 20200911

## `@svizzle/barchart` v0.6.2

- fix: calculate refs labels length using the whole label text

## `@svizzle/utils` v0.11.0

- add a npm script to check that we're exporting all modules from `./src`

### (Any -> Boolean) -> (Array -> Array)

- add `raiseWith` (was originally provided in `v0.10.0` but I forgot to export `src/[any-boolean]-[array-array]` in that release)

### (Any -> Number) -> (Array -> Number)

- add `makeAverageWith`

### Array -> Number

- add `arrayAverage`, `keyValueArrayAverage`


## 20200910

## `@svizzle/barchart` v0.6.1

- fix: don't attempt to scroll if `items` is not provided or is empty

## `@svizzle/choropleth` v0.6.1

- fix the message in case `topojson` has no objects or `projection` is `undefined` (useful if you know it has been generated with a geojson with an empty `features` property)

## 20200909

## `@svizzle/barchart` v0.6.0

- use reference values to build the x scale in order to draw ref lines exceeding the data extent correctly
- show a message if `items` is not provided or is empty

## `@svizzle/choropleth` v0.6.0

- add prop `projection`
- show a customisable message if `items` is not provided or is empty

## `@svizzle/histogram` v0.3.0

- show a customisable message if `items` is not provided or is empty

## `@svizzle/utils` v0.10.0

### Any -> Boolean

- add `negate`


## 20200908

## `@svizzle/choropleth` v0.5.0

- document `topoToGeo`
- add prop `focusedKey`


## 20200907

## `@svizzle/barchart` v0.5.0

- add prop `refs`
- add prop `selectedKeys`
- add prop `titleFontSize`
- don't show the axis with positive and zeroes or negative and zeroes

## `@svizzle/choropleth` v0.4.0

- add `projectionId` and rename `projection` to `projectionFn` so that we can pass either a projection function or an id to select a projection from the available ones
- expose `topoToGeo` and `defaultGeometry` in `src/utils`
- remove more exotic projections that would better be used with spherical coordinates [lambda, phi]

## `@svizzle/file` v0.9.0

- add `readDirFiles`
- add `readDirFilesIndexed`

## `@svizzle/utils` v0.9.0

### (String -> String) -> (Object -> Object)

- add `renameKeysWith` (was added in the `0.8.0` release but without exporting its module)

### Any -> (Object -> Boolean)

- add `hasValue` (was added in the `0.8.0` release but without exporting its module)

### Array -> Array

- add `setIndexAsKey`

### Array -> Object

- add `makeKeyedFalse`
- add `makeKeyedTrue`

### String -> Number

- add `getEndOfLineLength` (was added in the `0.8.0` release but without exporting its module)

### Object -> (Object -> Object)

- add `makeMergeAppliedFnMap`


## 20200807

- build: remove comments from `.mjs` files for packages under `/tools`

## /site v0.3.1

- add linting
- extract a formatting utility from examples
- add Germany NUTS2 2016 as it seems to be the heavier example
- add `@svizzle/legend` docs

## `@svizzle/dev` v0.4.1

- build: remove comments from `.mjs` files

## `@svizzle/barchart` v0.4.0

- dist: rename `BarchartV.*.js` to `BarchartVDiv.*.js`

## `@svizzle/dom` v0.4.1

- build: remove comments from `.mjs` files

## `@svizzle/file` v0.8.1

- build: remove comments from `.mjs` files

## `@svizzle/geo` v0.6.1

- build: remove comments from `.mjs` files

## `@svizzle/geometry` v0.3.1

- build: remove comments from `.mjs` files

## `@svizzle/histogram` v0.2.0

- props: rename `maxfontSize` to `maxFontSize`
- add `src/utils.js` to the outputs, to be imported in browsers directly
- when interactive and a with a non-empty selection, clicking on the background resets the selection

## `@svizzle/legend` v0.1.0

- add `ColorBinsG.svelte`
- add `ColorBinsDiv.svelte`

## `@svizzle/request` v0.3.1

- build: remove comments from `.mjs` files

## `@svizzle/utils` v0.8.1

- build: remove comments from `.mjs` files

## 20200722

- update docs
- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible
- update to Lamb 0.59.2
	- latest with correct `exports`: https://github.com/ascartabelli/lamb/releases/tag/v0.59.2
	- renames: https://github.com/ascartabelli/lamb/releases/tag/v0.59.0
		- `pick` -> `pickIn`
		- `pickKeys` -> `pick`
		- `pluckKey` -> `pluck`
		- `renameKeys` -> `rename`
		- `skipKeys` -> `skip`

## /site v0.3.0

- add histogram examples
- updated dependencies
- rename example objects keys and move `usage` to specific examples so that the reader will actually see usage changing eventually
- add colors to the UK examples
- use a menu to select examples rather then buttons
- create a list of entries from the examples instead of relying on Sapper scraping them
- during the doc build we're now adding a `.nojekyll` file because of _layout.* files created by sapper that would otherwise be [ignored by Jekyll](https://help.github.com/en/enterprise/2.14/user/articles/files-that-start-with-an-underscore-are-missing)
- optimised exported routes weight
- Update to Lamb 0.59.2 (some renames needed)

## `@svizzle/atlas` v0.3.0

- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

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

## `@svizzle/dev` v0.4.0

- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)
- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible

## `@svizzle/dom` v0.4.0

- add `makeStyleVars`
- docs: converted all examples to a REPL format
- dev: using single quotes rather than double quote where possible
- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/file` v0.8.0

- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/geo` v0.6.0

- Updated `@turf/*` to version `6.2.0-alpha.0` which is tree-shakable, hence reducing the build size (see #101)
- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)
- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible

## `@svizzle/geometry` v0.3.0

- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

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

## `@svizzle/request` v0.3.0

- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/utils` v0.8.0

- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible
- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

### (Any -> Any):accumcb -> (Array -> Any)

- add tests to make sure `reduceFromArr` and `reduceFromObj` return a new instance of the initial value every time they get called

### Any -> (Any -> Boolean)

- add `isEqualTo`

### Array -> (Array -> Array)

- add `pluckKeys`

### Array -> (Object -> Object)

- add `pluckValuesKeys`

### Array -> Array

- Fix `inclusiveRange` returning an empty array when the extent has 2 zeroes

### Object -> Boolean

- add `hasSomeNullValues`
- add tests to `endsWithNewLine` to check Windows line ending

### String -> String

- add `capitalize`
- make `trimLastNewline` compatible with Windows line ending


## 20200411_2

## `@svizzle/utils` v0.7.1

### Array -> Array

- `inclusiveRange` returns a single valued array when the values of the provided extent are equal


## 20200411

- updated some docs

## `@svizzle/barchart` v0.2.0

- `BarchartV` accepts `keyToColorFn`

## `@svizzle/choropleth` v0.2.0

- show features with full opacity if `selectedKeys` is not provided
- added prop `keyToColorFn`
- removed `ChoroplethWorldDiv`

## `@svizzle/atlas` v0.2.0

- fixed the scripts to extract NUTS topojson by country (#48)
- moved the distribution dir from a [gist](https://gist.github.com/mindrones/b9538f1b7308d1a2f2d54c927116e825) to the [svizzle_atlas_distro](https://github.com/nestauk/svizzle_atlas_distro) repo

## `@svizzle/geo` v0.5.0

- `makeAddFeaturesProperty` accepts `mapFn`

## `@svizzle/utils` v0.7.0

### Array -> Array

- add `inclusiveRange`

### Object -> (String -> Boolean)

- add `isKeyOf`


## 20200319

## `@svizzle/barchart` v0.1.0

- added `BarchartV`

## `@svizzle/choropleth` v0.1.0

- added `ChoroplethSVG`
- added `ChoroplethDiv`
- added `ChoroplethWorldDiv`

## `@svizzle/atlas` v0.1.0

- moved world boundaries scripts from /choropleth
- add NUTS scripts

## `@svizzle/file` v0.7.0

- add `saveString`
- add `saveStringPassthrough`

## `@svizzle/geo` v0.4.0

- add `makeAddFeaturesProperty`

## `@svizzle/utils` v0.6.0

### (Any -> Any) -> (Object -> Object)

- add `groupValuesWith`
- add `indexValuesWith`

### Array -> (Any -> Boolean)

- renamed `makeIsContained` to `makeOccursIn`

### Array -> (Object -> Object)

- added `applyTransformsSequence`

### Object -> (Object -> Object)

- add `transformPaths`
- `transformValues`: assume identity for missing keys

### Object -> Object

- add `swapKeyValue`


## 20200115

- add linting
- update docs

## `@svizzle/dev` v0.3.0

- move `lamb` to `peerDependencies`
- updated docs
- add `tapMessage`
- add `tapWith`
- move `tapAppendTo` from /utils
- move `tapType` from /utils
- move `tapTypeAndValue` from /utils
- move `tapValue` from /utils

## `@svizzle/dom` v0.3.0

- move `lamb` to `peerDependencies`
- add `alignTags`
- `makeStyle` now skips nil values
- updated docs

## `@svizzle/file` v0.6.0

- move `lamb` to `peerDependencies`
- update docs

## `@svizzle/geo` v0.3.0

- move `lamb` to `peerDependencies`
- updated docs

## `@svizzle/geometry` v0.2.0

- move `lamb` to `peerDependencies`
- update docs

## `@svizzle/request` v0.2.0

- move `lamb` to `peerDependencies`
- updated docs

## `@svizzle/utils` v0.5.0

- move `lamb` to `peerDependencies`
- updated docs

### (Any -> Any) -> (Any -> Boolean)

- added `isArrayWith`
- added `isNilWith`
- added `isNotNaNWith`
- added `isNotNilWith`
- added `isNotNullWith`
- added `isNullWith`
- added `isNumberWith`
- added `isObjectWith`
- added `isStringWith`
- added `isUndefinedWith`
- added `isValidNumberWith`
- added `isToNumberValidNumberWith`
- added `isToFloatValidNumberWith`

### (Any -> Array) -> (Any -> Array)

- added `makeBiPermutationsWith`

### (Any -> Array) -> (Array -> Array)

- renamed `reduceFromArr` -> `reduceFromEmptyArray`
- renamed `reduceFromObj` -> `reduceFromEmptyObject`

### (Any -> Object) -> (Array -> Object)

- added `makeAllOccurrencesWith`

### Any -> Boolean

- added `isArguments`

### Array -> (Any -> Boolean)

- added `makeIsContained`

### Array -> (String -> String)

- added `sliceStringAt`

### Array -> Array

- added `makeBiPermutations`
- added `sortValueAscKeyAsc`
- added `sortValueAscKeyDesc`
- added `sortValueDescKeyAsc`
- added `sortValueDescKeyDesc`

### Array -> Iterable

- added `getShorter`

### Array -> Objects

- added `mergeObjects`

### Iterable -> Array

- move `tapAppendTo` to /dev

### String -> (Any -> Any)

- move `tapValue` to /dev
- move `tapType` to /dev
- move `tapTypeAndValue` to /dev

### String -> (String -> Boolean)

- added `makeEndsWith`
- added `makeStartsWith`
- added `makeStringEndsWith`
- added `makeStringStartsWith`

### String -> Boolean

- added `endsWith`
- added `endsWithNewLine`

### String -> String

- added `sliceString`


## 20190930

- switched to a flat layout, easier to use and makes it easier to read the doc
- update docs

## `@svizzle/file` v0.5.0

- add `writeFile` (it was there since 0.1.0 but it wasn't exported)
- update docs

## `@svizzle/utils` v0.4.0

- updated docs

### Any -> Boolean

- added `isNotNull`

### Array -> (Object -> Array)

- added `pickAndConcatValues`

### Array -> (String -> Boolean)

- added `containsOneOf`

### Object -> Any

- added `getId`
- added `getKey`
- added `getValue`

### Object -> Array

- added `concatValues`


## 20190908

- fix npm script
- add npm scripts to enable deploying packages tarballs on github
- update docs

## `@svizzle/file` v0.4.0

- add `readDsv`
- `readCsv` and `readTsv` now accept a boolean (default to true) to pass files without a header
- update docs

These were there since 0.1.0 but they weren't exported hence we're marking them as 0.4.0:

- add `hasAnyExtensionOf`
- add `filterJsonExtensions`
- add `renameToExtension`
- add `readFile`
- add `readDir`

## `@svizzle/utils` v0.3.0

- updated docs

### Any -> Any

- `tapValue`, `tapType`, `tapTypeAndValue` now expect an optional string and return a tap function

### Any -> (Any -> Boolean)

- added `isNot`

### Any -> (Array -> Object)

- added `makeKeyed`

### Array -> Array

- added `getFirstAndLast`

### Array -> Boolean (proto)

- added `includes`

### Array -> Number

- added `arraySum`

### Array -> (Any -> Boolean)

- added `makeIsIncluded`

### Array -> (Number -> Number)

- added `makePolynomial`

### Array -> Object

- added `keyValueArrayToObject`

### Array -> (Object -> Boolean)

- added `isKeyValue`
- added `isNotKeyValue`
- added `isPathValue`
- added `isNotPathValue`

### Contructor -> (Function -> (Array -> Any))

- added `reduceTo`

### Function -> (Array -> Any)

- added `reduceFromArr`
- added `reduceFromObj`

### Function -> (Object -> Array)

- added `objectToKeyValueArrayWith`

### Function -> (Iterable -> Object)

- added `pairToKeyValueObjectWith`

### Object -> Boolean

- added `hasObjSize1`


## 20190411

- docs:
   - use "docdash" as the jsdoc template
   - add a serve script

- dev:
   - add development guidelines
   - allow versioning from `dev` only

## `@svizzle/dev` v0.2.0

- add `renameToExtension`
- more generic `makeBanner`

## `@svizzle/dom` v0.2.0

- changed `toPx` to not throw anymore
- should fix an import from `vendor`

## `@svizzle/file` v0.2.0

- `saveObj` and `saveObjPassthrough` accept a `indent` argument

## `@svizzle/geo` v0.2.0

- `makeToPointFeature` and `makeToGeoPoints` accept a `propsTransformer` argument

## `@svizzle/request` v0.1.1

- removed `vendor/` from the build

## `@svizzle/utils` v0.2.0

- added missing tests and docs

- moved functions returning functions in `fn/` directories.

  For example `makeKeysGetter`:
  - expects an array and returns a function that expects an object and returns an array;
  - hence it's in `utils/src/array/fn/object/array.js`.

- moved functions derived from Javascript types in `proto/` directories.

### Any -> Boolean

- added `isNotNil`

### Array -> (Any -> Object)

- added `makeWith`

### Array -> (Array -> Object)

- added `makeWithKeys`, `makeWithValues`

### Object -> Array

- renamed `getTruthyKeys` to `getTruthyValuesKeys`

### Object -> Object

- added `pickIfTruthy`


## `@svizzle/dev` v0.1.0

- `makeBanner`
- `makePrinter`
- `renameToCss`
- `renameToMinJs`
- `renameToMjs`

## `@svizzle/dom` v0.1.0

- `getElementGeometry`
- `makeStyle`
- `moveNode`
- `toPx`

## `@svizzle/file` v0.1.0

- `filterJsonExtensions`
- `hasAnyExtensionOf`
- `readCsv`
- `readJson`
- `readJsonDir`
- `renameToExtension`
- `saveObj`
- `saveObjPassthrough`
- `saveResponse`

## `@svizzle/geo` v0.1.0

- `getOrMakeBBox`
- `makeCentroids`
- `makeToPointFeature`
- `makeToGeoPoints`
- `setGeometryPrecision`

## `@svizzle/geometry` v0.1.0

- `getDistance2D`
- `getTwoPointsCenter`
- `linkVector`
- `makeLinkVector`
- `makePosition2D`
- `makePosition3D`
- `makeVectorFeatures`
- `vectorLength2D`

## `@svizzle/request` v0.1.0

- `requestJson`
- `requestNdjson`


## `@svizzle/utils` v0.1.0

### Any -> Any

- `makeEmptyArrayIfUndefined`
- `toFloatOrIdentity`
- `tapValue`
- `tapType`
- `tapTypeAndValue`

### Any -> Boolean

- `isArray`
- `isNumber`
- `isObject`
- `isString`
- `isNotNaN`
- `isValidNumber`
- `toNumberisValidNumber`
- `toFloatIsValidNumber`

### Any -> String

- `stringify`

### Array -> Array

- `concat`
- `removeAt`
- `swap`
- `toggleItem`

### Array -> Boolean

- `areAllTruthy`
- `areSomeTruthy`

### Array -> Function

- `makeKeysGetter`
- `makeIsWithinRange`
- `makeArrayTransformer`

### Array -> Number

- `makeRandomNumInRange`
- `arrayMax`
- `arrayMaxBy`
- `arrayMaxWith`
- `arrayMin`
- `arrayMinBy`
- `arrayMinWith`

### Array -> Object

- `makeKeyedZeroes`
- `makeOccurrences`
- `makeAllOccurrences`

### Array -> String

- `join`
- `joinWith`
- `joinWithDash`
- `joinWithColon`
- `joinWithSemicolon`

### Iterable -> Array

- `tapAppendTo`

### Iterable -> Boolean

- `isIterableEmpty`
- `isIterableNotEmpty`
- `hasIterableLength1`
- `isIterableLongerThan1`

### Iterable -> Number

- `getLength`

### Iterable -> Object

- `pairToKeyValueObject`

### Number -> Boolean

- `is0`
- `is1`
- `isGT0`
- `isGT1`

### Object -> Array

- `objectToKeyValueArray`
- `getTruthyKeys`

### Object -> Boolean

- `isObjEmpty`
- `isObjNotEmpty`

### Object -> Function

- `applyFnMap`
- `transformValues`

### Object -> Number

- `getObjSize`
- `valuesMax`
- `valuesMaxBy`
- `valuesMaxWith`
- `valuesMin`
- `valuesMinBy`
- `valuesMinWith`

### Object -> Object

- `mapValuesToFloat`
- `mapValuesToFloatPossibly`
- `mapValuesToNumber`
- `mergeObj`
- `makeMergeKeyValue`
- `mergeWith`
- `mergeWithSum`
- `mergeWithMerge`
- `mergeWithConcat`
- `mergeWithAppendTo`

### String -> Array

- `split`
- `makeSplitStringBy`
- `makeSplitBy`
- `splitByDot`
- `splitByEOL`
- `splitBySemiColon`
- `makeLines`
- `makeRows`
- `ndjsonToArray`

### String -> Boolean

- `isTrimmedNotEmpty`
- `startsWith`

### String -> String

- `prepend`
- `trim`
