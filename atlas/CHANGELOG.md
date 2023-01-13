# @svizzle/atlas v0.9.0

NUTS, added overseas bboxes/centroids, augmented shapes

- provide oversea ids (`NUTS/overseaIds.json`, `NUTS/overseaIdsGroups.js`)
- provide bounding boxes for all years/levels for the supported resolutions (`NUTS/allBboxes.json`)
- topojsons: augment all regions with `bbox`, `centroid`, `isOversea`

# @svizzle/atlas v0.8.0

- convert all JSON assets to javascript files, to avoid importing `.json`,
which is not officially supported in ESM yet

# @svizzle/atlas v0.6.0

- Add NUTS unified ids and hierarchy (#9)
- NUTS, add parent ids to `hierarchy.json` (#10)
- NUTS, add `rootId` (#12)
- NUTS, add resolution `10M`, update some texts in `3M` files (#14)
- NUTS, enhance distributed files (#16)
	- `unifiedNuts.json`: `year` is now a `Number`
	- `hierarchy.json`: `id` is now a `Number`
