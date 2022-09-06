#! /usr/bin/env bash

BASE=data/base
DISTRO=data/dist

# NUTS

rm -rf $DISTRO/NUTS &&
mkdir $DISTRO/NUTS &&
mkdir $DISTRO/NUTS/topojson &&
cp		$BASE/NUTS/1/countries_by_year.js 		$DISTRO/NUTS/ && \
cp		$BASE/NUTS/1/nutsSpec.js 							$DISTRO/NUTS/ && \
cp -r $BASE/NUTS/1/sourceText								$DISTRO/NUTS/ && \
cp 		$BASE/NUTS/2/hierarchy.js							$DISTRO/NUTS/ && \
cp 		$BASE/NUTS/2/idToNutsIdByYear.js			$DISTRO/NUTS/ && \
cp 		$BASE/NUTS/2/recoded.js								$DISTRO/NUTS/ && \
cp 		$BASE/NUTS/2/unifiedNuts.js						$DISTRO/NUTS/ && \
cp 		$BASE/NUTS/2/yearlyNutsIdToId.js			$DISTRO/NUTS/ && \
cp 		$BASE/NUTS/3/topojson/*.js						$DISTRO/NUTS/topojson/ && \
cp 		$BASE/NUTS/4/topojson/*.js						$DISTRO/NUTS/topojson/ && \

# world

rm -rf $DISTRO/world &&
mkdir $DISTRO/world &&
mkdir $DISTRO/world/topojson &&
cp $BASE/world/1/iso_a2_to_name_by_type.js				$DISTRO/world/ && \
cp $BASE/world/1/topojson/world_110m_iso_a2.js		$DISTRO/world/topojson/
