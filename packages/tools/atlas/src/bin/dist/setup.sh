#! /usr/bin/env bash

DISTRO=data/dist

rm -rf $DISTRO && \
git clone git@github.com:nestauk/svizzle_atlas_distro.git $DISTRO
