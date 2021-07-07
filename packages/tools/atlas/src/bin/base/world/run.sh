#! /usr/bin/env bash

echo '
==== world ====
' &&

node -r esm src/bin/base/world/01_world_110m_iso_a2_topojson.js &&

echo
