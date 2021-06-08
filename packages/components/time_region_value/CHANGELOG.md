## `@svizzle/time_region_value` v0.2.0 (next)

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
- now the theme can be passed only to the layout, which updates a store shared by all interested components
- stores have been renamed so that they start with `_`
- props that are expected to be stores start with `_`
- adds a loading icon while waiting for `ScreenGauge` to populate `screen`
- fix missing info icon in `/[id]`
- add `/time_region_value` to the main readme
- remove `/time_region_value/src/node_modules/utils/generic.js`
- some renames
- updated some dev dependencies

## `@svizzle/time_region_value` v0.1.1

- fix: include `*.json` and `*.yaml` files in the distribution (v0.1.0 won't work because of this)

## `@svizzle/time_region_value` v0.1.0

- add `_layout.svelte`
- add `index.svelte`
- add `[id]/index.svelte`
- add `[id]/[year].svelte`
- note that for now `rollup-plugin-svelte` is using `emitCss: false`
- note that this version only supports UK NUTS2 regions
