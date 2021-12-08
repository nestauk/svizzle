#! /usr/bin/env bash

echo '
==== NUTS ====
' &&

node -r esm src/bin/base/NUTS/0-1_getBaseShapes.js &&
node -r esm src/bin/base/NUTS/0-1_getMetadata.js &&
node -r esm src/bin/base/NUTS/01-2_reconcileIds.js &&
node -r esm src/bin/base/NUTS/12-3_augmentShapes.js &&
node -r esm src/bin/base/NUTS/13-4_getCountriesTopojson.js &&

echo
