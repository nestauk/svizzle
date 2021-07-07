#! /usr/bin/env bash

echo '
==== NUTS ====
' &&

node -r esm src/bin/base/NUTS/01_getMetadata.js &&
node -r esm src/bin/base/NUTS/01_getShapes.js &&
node -r esm src/bin/base/NUTS/12_getCountriesTopojson.js &&

echo
