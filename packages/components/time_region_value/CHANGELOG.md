## `@svizzle/time_region_value` v0.7.0 (next)

- use `FetchDriver.svelte` so that boundaries are pre-fetched in the background
- text in `XorSelector.svelte` can't be selectable anymore

## `@svizzle/time_region_value` v0.6.1

- Fix dirty regions selection not changing the globe icon color

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


## `@svizzle/time_region_value` v0.4.1

- replaced some absolute CSS definitions related to text and fonts

## `@svizzle/time_region_value` v0.4.0

- support ignoring regions (via `regionSettings`, no UI)
- fixed server-side rendering of indicator routes
- fixed clicking on SVG anchors
- workaround for failure to layout on landing
- pass `hrefBase` to `Layout` only
- added a missing dependency
- updated dev dependencies
- supports UK NUTS2 only

## `@svizzle/time_region_value` v0.3.1

- updated `@svizzle/atlas`
- supports UK NUTS2 only

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

## `@svizzle/time_region_value` v0.1.1

- fix: include `*.json` and `*.yaml` files in the distribution (v0.1.0 won't work because of this)
- supports UK NUTS2 only

## `@svizzle/time_region_value` v0.1.0

- add `_layout.svelte`
- add `index.svelte`
- add `[id]/index.svelte`
- add `[id]/[year].svelte`
- note that for now `rollup-plugin-svelte` is using `emitCss: false`
- note that this version only supports UK NUTS2 regions
- supports UK NUTS2 only
