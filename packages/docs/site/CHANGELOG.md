## `@svizzle/site` v0.4.1 (next)

- reinstated `/ui` docs
- reorganised `/ui` examples
- /components: `.col2` is now:
	- scrollable
	- `position: relative;` to make sure components show within it
- support documenting components with unnamed slots
	- caveats:
		- as of now dynamic slots aren't supported so we can't document named slots
		- it supports 1 level of depth only so slots being components with slots
			themselves won't work
- a11y menu: added a `z-index` to the menu container
- use `@svizzle/ui`'s `NoScript` component
- serve `@svizzle/atlas` files from `/static`
- components route:
	- hightlight selected slug
	- reset events payloads when we choose a new example

## `@svizzle/site` v0.4.0

- upgrade to ESM:
	- converted all JSON files in the examples to Javascript
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- set `engines.node` to `>=17.5.0`
			- moved some dev deps in `dependencies`
		- deps:
			- upgraded all dependencies
			- removed `esm`, `eslint-plugin-import`
	- imports:
		- using file extensions
		- use the `node:` protocol
- now internally importing directly from svizzle modules index
- moved `src/node_modules` to `src/lib` and added `rollup-plugin-alias`
- updated scripts
- removed `cypress`

## `@svizzle/site` v0.3.12

- removed custom line height setting for a11y menu, now using defaults
- fix doc for `BarchartVDiv-selectedKeys`
- use `BarchartVDiv` in the docs instead of `BarchartV`

## `@svizzle/site` v0.3.11

- Avoid exposing `@svizzle/choropleth/src/shared`

## `@svizzle/site` v0.3.10

- moved all `dependencies` to `devDependencies` to [avoid having to maintain](https://github.com/sveltejs/sapper-template-rollup#using-external-components) the `external` list in `rollup.config.js` (prone to error)
- change to accomodate `@svizzle/time_region_value@0.5.0`:
	- shows random data for all NUTS levels and for the whole of Europe
	- added required configs
	- `makeRandomIndicators.js` now sorts datapoints columns using `order`
	- deleted NUTS2/UK data
	- not showing POIs anymore for now

## `@svizzle/site` v0.3.9

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
