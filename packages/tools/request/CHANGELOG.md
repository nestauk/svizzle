## `@svizzle/request` v0.5.2

- updated license year

## `@svizzle/request` v0.5.1

- rearranged `rxjs` imports to minimize impact during import
- moved `rxjs` out of `devDependencies`

## `@svizzle/request` v0.5.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded:
				- `d3-fetch`, `eslint`, `node-fetch`, `rxjs`
			- removed `eslint-plugin-import`, `esm`
	- imports:
		- using file extensions
		- use the `node:` protocol
- `fetchManager` now downloads exported javascript objects (`export default ...`)
- remove `requestJson`
- remove the dependency on `d3-request`, which is deprecated
- moved `index.js` in `src/`

## `@svizzle/request` v0.4.0

- added `fetchManager` featuring three-stage-prioritized stream-based resource
	downloads. As a note for future developments, we agreed that this implementation
	is too brittle and that we should use a state machine to manage the logic
	rather than Rx streams.
- tests: updated `nock`
- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` and `browser` fields in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/request` v0.3.5

- support object spread in builds

## `@svizzle/request` v0.3.4

- updated some dependencies

## `@svizzle/request` v0.3.3

- updated some dev dependencies

## `@svizzle/request` v0.3.2

- updated some dev dependencies

## `@svizzle/request` v0.3.1

- build: remove comments from `.mjs` files

## `@svizzle/request` v0.3.0

- dev: using single quotes rather than double quote where possible
- dev: using single quotes rather than double quote where possible
- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/request` v0.2.0

- move `lamb` to `peerDependencies`
- updated docs

## `@svizzle/request` v0.1.1

- removed `vendor/` from the build

## `@svizzle/request` v0.1.0

- `requestJson`
- `requestNdjson`
