## `@svizzle/dom` v0.7.0 (next)

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

## `@svizzle/dom` v0.6.0

- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` and `browser` fields in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/dom` v0.5.1

- support object spread in builds

## `@svizzle/dom` v0.5.0

- removed `moveNode`
- updated some dependencies

## `@svizzle/dom` v0.4.4

- updated some dev dependencies

## `@svizzle/dom` v0.4.3

- updated some dev dependencies

## `@svizzle/dom` v0.4.2

- depends on a newer `@svizzle/utils` because of `prepend` renamed to `makePrefixed`

## `@svizzle/dom` v0.4.1

- build: remove comments from `.mjs` files

## `@svizzle/dom` v0.4.0

- add `makeStyleVars`
- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible
- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/dom` v0.3.0

- move `lamb` to `peerDependencies`
- add `alignTags`
- `makeStyle` now skips nil values
- updated docs

## `@svizzle/dom` v0.2.0

- changed `toPx` to not throw anymore
- should fix an import from `vendor`

## `@svizzle/dom` v0.1.0

- `getElementGeometry`
- `makeStyle`
- `moveNode`
- `toPx`
