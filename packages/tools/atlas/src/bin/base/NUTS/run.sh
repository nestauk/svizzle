#! /usr/bin/env bash

echo '
==== NUTS ====
' &&

node src/bin/base/NUTS/0-1_getBaseShapes.js &&
node src/bin/base/NUTS/0-1_getMetadata.js &&
node src/bin/base/NUTS/01-2_reconcileIds.js &&
node src/bin/base/NUTS/12-3_augmentShapes.js &&
node src/bin/base/NUTS/13-4_getCountriesTopojson.js &&

echo
