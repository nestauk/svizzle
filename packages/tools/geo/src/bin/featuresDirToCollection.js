#!/usr/bin/env node -r esm

import fs from 'node:fs';
import path from 'node:path';

import commander from 'commander';
import {featureCollection} from '@turf/helpers';

import {readJsonDir} from '@svizzle/file';

import {setGeometryPrecision} from '../modules/geojson.js';
import {version} from '../../package.json';

commander
.version(version)
.usage('-d <dir> -o <output> [-p precision]')
.description('Join all .geojson files in a single GeoJSON feature collection.')
.option('-d, --dir <dir>',
	'input dir (default: current working dir)',
	process.cwd()
)
.option('-o, --output <output>',
	'output file name (default: '-' for stdout)',
	'-'
)
.option('-p, --precision [precision]',
	'precision (default: `null` for no rounding)',
	null
)
.parse(process.argv);

const {dir, output, precision} = commander;

const pipeTo = out => obj => {
	if (out === '-') {
		console.log(obj);
	} else {
		// eslint-disable-next-line no-sync
		fs.writeFileSync(path.resolve(output), JSON.stringify(obj), 'utf8');
	}
}

readJsonDir(path.resolve(dir), 'utf8')
.then(featureCollection)
.then(setGeometryPrecision(precision))
.then(pipeTo(output))
