#! /usr/bin/env bash

BASE=data/base
DISTRO=data/dist

# NUTS

rm -rf $DISTRO/NUTS &&
mkdir $DISTRO/NUTS &&
mkdir $DISTRO/NUTS/topojson &&
cp $BASE/NUTS/1/countries_by_year.yaml $DISTRO/NUTS/ && \
cp -r $BASE/NUTS/1/csv $DISTRO/NUTS/ && \
cp $BASE/NUTS/1/topojson/*.json $DISTRO/NUTS/topojson/ && \
cp $BASE/NUTS/2/topojson/*.json $DISTRO/NUTS/topojson/ && \

# world

rm -rf $DISTRO/world &&
mkdir $DISTRO/world &&
cp $BASE/world/0/iso_a2_to_name_by_type.yaml $DISTRO/world/ && \
cp $BASE/world/1/world_110m_iso_a2_topojson.json $DISTRO/world/
