## `@svizzle/dev` v0.6.2 (next)

- upgraded `lamb`, `mocha`, `eslint`

## `@svizzle/dev` v0.6.1

- updated license year

## `@svizzle/dev` v0.6.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded:
				- `eslint`
				- `just-compare` to avoid errors in svizzle scripts
			- removed `esm`, `eslint-plugin-import`
	- imports:
		- using file extensions
		- use the `node:` protocol
- moved `index.js` in `src/`

## `@svizzle/dev` v0.5.0

- added: `tapTime` and `tapTimeEnd`
- fix: distribute `src/index.js`
- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` field in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/dev` v0.4.4

- updated some dependencies

## `@svizzle/dev` v0.4.3

- updated some dev dependencies

## `@svizzle/dev` v0.4.2

- updated some dev dependencies

## `@svizzle/dev` v0.4.1

- build: remove comments from `.mjs` files

## `@svizzle/dev` v0.4.0

- Update to Lamb 0.59.2 (no renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)
- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible

## `@svizzle/dev` v0.3.0

- move `lamb` to `peerDependencies`
- add linting
- updated docs

- add `tapMessage`
- add `tapWith`
- move `tapAppendTo` from /utils
- move `tapType` from /utils
- move `tapTypeAndValue` from /utils
- move `tapValue` from /utils

## `@svizzle/dev` v0.2.0

- add `renameToExtension`
- more generic `makeBanner`

## `@svizzle/dev` v0.1.0

- `makeBanner`
- `makePrinter`
- `renameToCss`
- `renameToMinJs`
- `renameToMjs`
