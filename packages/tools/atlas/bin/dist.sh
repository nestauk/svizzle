#! /usr/bin/env bash

cp data/1/EU/NUTS/csv/*.csv ./gist && \
cp data/1/EU/NUTS/EU_countries_by_year.yaml ./gist && \
cp data/1/EU/NUTS/topojson/NUTS_*.json ./gist && \
cp data/1/World_*.json ./gist && \
cp data/2/EU/NUTS/topojson/NUTS_*.json ./gist && \
cp data/2/World_*.json ./gist
