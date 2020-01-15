# List of documentation about dependencies side effects

## Lamb

[`sideEffects: false`](https://github.com/ascartabelli/lamb/blob/master/package.json#L48)

## D3 modules

https://github.com/d3/d3/issues/3131#issuecomment-517316673

### `sideEffects: true`:

d3
d3-transition

### `sideEffects: false`:

d3-array
d3-axis
d3-brush
d3-chord
d3-color
d3-contour
d3-delaunay
d3-dispatch
d3-drag
d3-dsv
d3-ease
d3-fetch
d3-force
d3-format
d3-geo
d3-hexbin
d3-hierarchy
d3-interpolate
d3-path
d3-polygon
d3-quadtree
d3-random
d3-scale
d3-scale-chromatic
d3-selection
d3-shape
d3-tile
d3-time
d3-time-format
d3-timer
d3-zoom

Note: misses those not used by D3 I think, like for example `d3-request`
