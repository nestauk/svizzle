#! /usr/bin/env node -r esm

import path from "path";

import { feature } from 'topojson-client';
import { tapMessage } from '@svizzle/dev';
import { readDir, readJson, saveObj } from '@svizzle/file';
import { setGeometryPrecision } from '@svizzle/geo';

const IN_BASE_PATH = path.resolve(__dirname, '../data/1/EU/NUTS/topojson');
const OUT_BASE_PATH = path.resolve(__dirname, '../data/2/EU/NUTS/geojson');
const truncateGeojson = setGeometryPrecision(4);

readDir(IN_BASE_PATH)
.then(filenames => Promise.all(
  filenames.map(filename => {
    const {name} = path.parse(filename);
    const [objName] = name.split('_LEVL');

    const inPath = path.resolve(IN_BASE_PATH, filename);
    const outPath = path.resolve(OUT_BASE_PATH, filename);

    return readJson(inPath, 'utf-8')
    .then(topojson =>
      truncateGeojson(feature(topojson, topojson.objects[objName]))
    )
    .then(saveObj(outPath))
    .then(tapMessage(`Saved in ${outPath}`))
    .catch(err => console.error(outPath, err))
  })
))
.then(tapMessage('Done'))
.catch(err => console.error(err));
