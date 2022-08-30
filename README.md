# Svizzle

Svelte components for data visualisation and utilities for data transformation.

## Documentation

All functions are documented at [https://nestauk.github.io/svizzle](https://nestauk.github.io/svizzle), divided by modules.

## Modules installation

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Svizzle is a mono-repo containing the source code of various npm packages: please follow these links for installation instructions.

**[Components](https://github.com/nestauk/svizzle/tree/release/packages/components)**

- [`@svizzle/barchart`](https://github.com/nestauk/svizzle/tree/release/packages/components/barchart)
- [`@svizzle/choropleth`](https://github.com/nestauk/svizzle/tree/release/packages/components/choropleth)
- [`@svizzle/histogram`](https://github.com/nestauk/svizzle/tree/release/packages/components/histogram)
- [`@svizzle/legend`](https://github.com/nestauk/svizzle/tree/release/packages/components/legend)
- [`@svizzle/time_region_value`](https://github.com/nestauk/svizzle/tree/release/packages/components/time_region_value)
- [`@svizzle/ui`](https://github.com/nestauk/svizzle/tree/release/packages/components/ui)

**[Tools](https://github.com/nestauk/svizzle/tree/release/packages/tools)**

- [`@svizzle/atlas`](https://github.com/nestauk/svizzle/tree/release/packages/tools/atlas)
- [`@svizzle/dev`](https://github.com/nestauk/svizzle/tree/release/packages/tools/dev)
- [`@svizzle/dom`](https://github.com/nestauk/svizzle/tree/release/packages/tools/dom)
- [`@svizzle/file`](https://github.com/nestauk/svizzle/tree/release/packages/tools/file)
- [`@svizzle/geo`](https://github.com/nestauk/svizzle/tree/release/packages/tools/geo)
- [`@svizzle/geometry`](https://github.com/nestauk/svizzle/tree/release/packages/tools/geometry)
- [`@svizzle/request`](https://github.com/nestauk/svizzle/tree/release/packages/tools/request)
- [`@svizzle/utils`](https://github.com/nestauk/svizzle/tree/release/packages/tools/utils)

## Cloning

Files fetched or processed via `@svizzle/atlas` are distributed in [this repo](git@github.com:nestauk/svizzle_atlas_distro.git), which is a registered as a git [submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules), so the first time you clone `svizzle` please use:

```
git clone --recurse-submodules git@github.com:nestauk/svizzle.git
```

to make sure to fetch it.

If you already cloned it and forgot `--recurse-submodules`, you can run:

```
git submodule update --init
```

## Development

See [here](./doc/dev.md).
