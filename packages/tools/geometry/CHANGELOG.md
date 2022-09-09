## `@svizzle/geometry` v0.5.0 (next)

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded:
				- `eslint`
			- removed `eslint-plugin-import`, `esm`
	- imports:
		- using file extensions
		- use the `node:` protocol
- moved `index.js` in `src/`

## `@svizzle/geometry` v0.4.0

- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` and `browser` fields in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/geometry` v0.3.5

- support object spread in builds

## `@svizzle/geometry` v0.3.4

- updated some dependencies

## `@svizzle/geometry` v0.3.3

- updated some dev dependencies

## `@svizzle/geometry` v0.3.2

- updated some dev dependencies

## `@svizzle/geometry` v0.3.1

- build: remove comments from `.mjs` files

## `@svizzle/geometry` v0.3.0

- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible
- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/geometry` v0.2.0

- move `lamb` to `peerDependencies`
- update docs

## `@svizzle/geometry` v0.1.0

- `getDistance2D`
- `getTwoPointsCenter`
- `linkVector`
- `makeLinkVector`
- `makePosition2D`
- `makePosition3D`
- `makeVectorFeatures`
- `vectorLength2D`
