## `@svizzle/atlas`

Svizzle Atlas contains geographic boundaries data for mapping.

https://nestauk.github.io/svizzle

### Installation

`@svizzle/atlas` peer-depends on `lamb` so you have to install `lamb` along with it.

*npm*

`npm i -S lamb @svizzle/atlas`


### Distribution files

Files fetched or processed via `@svizzle/atlas` are distributed in [this repo](git@github.com:nestauk/svizzle_atlas_distro.git), which is a registered as a git [submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules), so the first time you clone `svizzle` please use:

```
git clone --recurse-submodules git@github.com:nestauk/svizzle.git
```

to make sure to fetch it.

If you already cloned it and forgot `--recurse-submodules`, you can run:

```
git submodule update --init
```
