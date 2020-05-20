#! /usr/bin/env node -r esm

import path from "path";

import { feature } from 'topojson-client';
import { writeFile } from '@svizzle/file';
import { setGeometryPrecision } from '@svizzle/geo';

import topojson from '../data/1/World_110m_iso_a2_topo.json';

const PATH = path.resolve(__dirname, '../data/2/World_110m_iso_a2_geo.json');
const truncateGeojson = setGeometryPrecision(4);
const geojson = truncateGeojson(feature(topojson, topojson.objects.countries));

writeFile(PATH, JSON.stringify(geojson), 'utf-8')
	.then(() => console.log(`Saved ${PATH}`))
	.catch(err => console.error(err));
