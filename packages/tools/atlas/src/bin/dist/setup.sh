#! /usr/bin/env bash

DISTRO=data/dist

rm -rf $DISTRO && \
git clone --depth 1 git@github.com:nestauk/svizzle_atlas_distro.git $DISTRO
