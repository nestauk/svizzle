## `@svizzle/atlas` v0.7.0

- use `readYaml` from `@svizzle/file`
- add the `unlink` npm script
- use `_.head` instead of `_.getAt(0)`
- removed prerelease packaging scripts
- removed unneeded deps
- distribute `CHANGELOG.md`

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

## `@svizzle/atlas` v0.5.0

- refactor scripts and the package file structure and change atlas utils accordingly
- NUTS: collect 2021 and remove resolution `10M`
- add new npm scripts
- changed the shape of the object exported by `src/specs.js`

## `@svizzle/atlas` v0.4.0

- add utils and specs
- updated some dependencies

## `@svizzle/atlas` v0.3.0

- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/atlas` v0.2.0

- fixed the scripts to extract NUTS topojson by country (#48)
- moved the distribution dir from a [gist](https://gist.github.com/mindrones/b9538f1b7308d1a2f2d54c927116e825) to the [svizzle_atlas_distro](https://github.com/nestauk/svizzle_atlas_distro) repo

## `@svizzle/atlas` v0.1.0

- moved world boundaries scripts from /choropleth
- add NUTS scripts
