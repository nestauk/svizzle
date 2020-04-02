#! /usr/bin/env bash

cp data/1/EU/NUTS/csv/*.csv ./distro && \
cp data/1/EU/NUTS/EU_countries_by_year.yaml ./distro && \
cp data/1/EU/NUTS/topojson/NUTS_*.json ./distro && \
cp data/1/World_*.json ./distro && \
cp data/2/EU/NUTS/topojson/NUTS_*.json ./distro

# cp data/2/World_*.json ./distro
