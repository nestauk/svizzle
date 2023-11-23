## `@svizzle/geo` v0.9.3

- upgraded `lamb`, `mocha`, `eslint`

## `@svizzle/geo` v0.9.1

- use caret ranges for `@turf/*` packages
- updated license year

## `@svizzle/geo` v0.9.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded `@turf/bbox`, `@turf/centroid`, `@turf/helpers`, `@turf/truncate`, `eslint`
			- removed `esm`, `eslint-plugin-import`
	- imports:
		- using file extensions
		- use the `node:` protocol
	- copied `pruneTopology` as-is from `topojson-simplify` v3.0.3 because it's not an ESM module
	- using `createRequire` to import JSON files in unit tests
- moved `index.js` in `src/`

## `@svizzle/geo` v0.8.0

- added `makeFilterTopoBy`
- remove the dependency from /atlas to avoid circular dependencies
- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` and `browser` fields in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/geo` v0.7.0

- port some utilities from `/choropleth`:
	- add `truncateGeojson`
	- add `topoToGeo`

## `@svizzle/geo` v0.6.4

- updated some dependencies

## `@svizzle/geo` v0.6.3

- updated some dev dependencies

## `@svizzle/geo` v0.6.2

- updated `@turf/*` to version `6.3.0`
- updated some dev dependencies

## `@svizzle/geo` v0.6.1

- build: remove comments from `.mjs` files

## `@svizzle/geo` v0.6.0

- Updated `@turf/*` to version `6.2.0-alpha.0` which is tree-shakable, hence reducing the build size (see #101)
- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)
- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible

## `@svizzle/geo` v0.5.0

- `makeAddFeaturesProperty` accepts `mapFn`

## `@svizzle/geo` v0.4.0

- add `makeAddFeaturesProperty`

## `@svizzle/geo` v0.3.0

- move `lamb` to `peerDependencies`
- updated docs

## `@svizzle/geo` v0.2.0

- `makeToPointFeature` and `makeToGeoPoints` accept a `propsTransformer` argument

## `@svizzle/geo` v0.1.0

- `getOrMakeBBox`
- `makeCentroids`
- `makeToPointFeature`
- `makeToGeoPoints`
- `setGeometryPrecision`
