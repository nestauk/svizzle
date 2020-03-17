#! /usr/bin/env bash

rimraf gist/*.json gist/*.csv gist/*.yaml && \
mkdirp data/1/EU/NUTS && \
mkdirp data/2/EU/NUTS && \
rimraf data/1/EU/NUTS/** && \
rimraf data/2/EU/NUTS/**  && \
mkdirp data/1/EU/NUTS/csv && \
mkdirp data/1/EU/NUTS/topojson && \
mkdirp data/2/EU/NUTS/topojson
# mkdirp data/2/EU/NUTS/geojson
