## `@svizzle/site` v0.3.9 (next)

- removed absolute font property declarations from CSS
- added `A11yMenu` supporting `medium` and larger displays
- use `FontsLoader` component
- replaced some absolute CSS definitions related to text and fonts

## `@svizzle/site` v0.3.8

- updated for changes in `/time_region_value`, `/ui`, `/atlas`
- updated dev dependencies

## `@svizzle/site` v0.3.7

- updated `@svizzle/atlas`

## `@svizzle/site` v0.3.6

- updated for changes in `/atlas` and `/time_region_value`
- updated some dependencies

## `@svizzle/site` v0.3.5

- updated to support `/time_region_value@0.2.0`
- `legend/ColorsBinG`:
   - document `flags.showTicksExtentOnly`
   - document the `geometry` prop
- fix a bug when generating random data for `time_region_value`
- updated some dev dependencies

## `@svizzle/site` v0.3.3

- document `ExternalLink`
- document `LinkButton`
- add a compounds section to show `time_region_value`
- updated some dev dependencies:
	- `@rollup/plugin-commonjs`
	- `@rollup/plugin-node-resolve`
	- `rollup-plugin-svelte`


## `@svizzle/site` v0.3.2

- `@svizzle/ui`: add docs
- `@svizzle/barchart`: document `ref.format`, `ref.keyAbbr`


## `@svizzle/site` v0.3.1

- add linting
- extract a formatting utility from examples
- add Germany NUTS2 2016 as it seems to be the heavier example
- add `@svizzle/legend` docs


## `@svizzle/site` v0.3.0

- add histogram examples
- updated dependencies
- rename example objects keys and move `usage` to specific examples so that the reader will actually see usage changing eventually
- add colors to the UK examples
- use a menu to select examples rather then buttons
- create a list of entries from the examples instead of relying on Sapper scraping them
- during the doc build we're now adding a `.nojekyll` file because of _layout.* files created by sapper that would otherwise be [ignored by Jekyll](https://help.github.com/en/enterprise/2.14/user/articles/files-that-start-with-an-underscore-are-missing)
- optimised exported routes weight
- Update to Lamb 0.59.2 (some renames needed)
- choropleth:
	- document only `ChoroplethG` with a mention of how to use `ChoroplethDiv` to reduce duplication
	- add a specific route for `keyToColor`, it was used in toom many pages
