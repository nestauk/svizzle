#! /usr/bin/env bash

bin/01_World_110m_iso_a2_topojson.js && \
bin/12_World_110m_iso_a2_geojson.js && \
bin/01_eurostat_countries.js && \
bin/01_eurostat_nuts.js && \
bin/12_eurostat_nuts_by_country.js

# bin/12_eurostat_nuts_geojson.js
