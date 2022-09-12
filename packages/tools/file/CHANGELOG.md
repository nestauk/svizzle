## `@svizzle/file` v0.14.0

- upgrade to ESM:
	- `package.json`:
		- fields:
			- added `"type": "module"`
			- added `main`
			- set `engines.node` to `>=17.5.0`
		- deps:
			- upgraded `d3-dsv`, `eslint`, `node-fetch`, `tempy`
			- removed `esm`, `eslint-plugin-import`
	- imports:
		- using file extensions
		- use the `node:` protocol
- moved `index.js` in `src/`
- added `readExportedJson`
- added `saveExportedObj`, `saveExportedObjPassthrough`, `saveExportedObjects`
- updated/added docs/tests for the existing functions

## `@svizzle/file` v0.13.0

- add `readYaml`, `saveYaml`, `saveYamlPassthrough`
- removed unused dependency on `@svizzle/request`
- fixed example output for `readDirFilesIndexed`
- tests: updated `nock`
- removed build scripts
- removed prerelease packaging scripts
- removed unneeded deps
- removed the `main` field in `package.json`
- distribute `CHANGELOG.md`

## `@svizzle/file` v0.12.0

- add `saveObjects`

## `@svizzle/file` v0.11.0

- add `getPathExt`, `isFileWithExt`, `isCsvFile`, `isJsonFile`, `isTsvFile`, `isYamlFile`

## `@svizzle/file` v0.10.2

- updated some dependencies

## `@svizzle/file` v0.10.1

- updated some dev dependencies

## `@svizzle/file` v0.10.0

- add `resolveToDir`
- updated `readDirFiles` logic
- updated `readDirFilesIndexed` logic and added an argument
- updated some dev dependencies

## `@svizzle/file` v0.9.0

- add `readDirFiles`
- add `readDirFilesIndexed`

## `@svizzle/file` v0.8.1

- build: remove comments from `.mjs` files

## `@svizzle/file` v0.8.0

- docs: converted all examples to a REPL-like format
- dev: using single quotes rather than double quote where possible
- Update to Lamb 0.59.2 (some renames needed)
- Moved `lamb` back to main dependencies (no need to install it separately anymore)

## `@svizzle/file` v0.7.0

- add `saveString`
- add `saveStringPassthrough`

## `@svizzle/file` v0.6.0

- move `lamb` to `peerDependencies`
- update docs

## `@svizzle/file` v0.5.0

- add `writeFile` (it was there since 0.1.0 but it wasn't exported)
- update docs

## `@svizzle/file` v0.4.0

- add `readDsv`
- `readCsv` and `readTsv` now accept a boolean (default to true) to pass files without a header
- update docs

These were there since 0.1.0 but they weren't exported hence we're marking them as 0.4.0:

- add `hasAnyExtensionOf`
- add `filterJsonExtensions`
- add `renameToExtension`
- add `readFile`
- add `readDir`

## `@svizzle/file` v0.3.0

- add `readTsv`

## `@svizzle/file` v0.2.0

- `saveObj` and `saveObjPassthrough` accept a `indent` argument

## `@svizzle/file` v0.1.0

- `filterJsonExtensions`
- `hasAnyExtensionOf`
- `readCsv`
- `readJson`
- `readJsonDir`
- `renameToExtension`
- `saveObj`
- `saveObjPassthrough`
- `saveResponse`
