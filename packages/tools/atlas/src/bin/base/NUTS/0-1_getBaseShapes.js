#!/usr/bin/env node

import path from 'node:path';

import {tapMessage} from '@svizzle/dev';
import {readYaml} from '@svizzle/file';
import {makeKeyedValuesPermutations, transformValues} from '@svizzle/utils';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import fetch from 'node-fetch';
import rimraf from 'rimraf';

import {saveExportedObj} from '../../../lib/fileUtils.js';
import {
	NUTS_DATABASE_DIR_0,
	NUTS_DATABASE_DIR_1,
} from '../../../lib/paths.js';
import {NUTS_HOME_URL} from '../../../lib/urls.js';

/* paths */

const inPaths = {
	nutsSpec: path.resolve(NUTS_DATABASE_DIR_0, 'nuts_spec.yaml'),
}
// out: sub-dirs of NUTS_DATABASE_DIR_1, see makeDestinationPath

/* utils */

const makeURL = ({
	format,
	proj_epsg_id,
	resolution,
	spatialtype,
	subset,
	year,
}) =>
	`${NUTS_HOME_URL}/${format[0]}/NUTS_${spatialtype}_${resolution}_${year}_${proj_epsg_id}_LEVL_${subset}.${format[1]}`;

// as of now we don't support saving other than topojson and geojson
// which we save as `.js` files
const makeDestinationPath = ({
	format,
	proj_epsg_id,
	resolution,
	spatialtype,
	subset,
	year,
}) =>
	path.resolve(
		NUTS_DATABASE_DIR_1,
		format[0],
		`NUTS_${spatialtype}_${resolution}_${year}_${proj_epsg_id}_LEVL_${subset}.js`
		// e.g. NUTS_RG_03M_2003_4326_LEVL_1.js
	);

const makeObjectsKey = ({
	proj_epsg_id,
	resolution,
	spatialtype,
	year,
}) =>
	`NUTS_${spatialtype}_${resolution}_${year}_${proj_epsg_id}`;
	// e.g. NUTS_RG_03M_2003_4326

const permute = _.pipe([
	_.updatePath('format', _.pairs),
	makeKeyedValuesPermutations,
]);

const makeTopojsonUpdater = key => transformValues({
	objects: _.rename({[key]: 'NUTS'}),
});

/* run */

/*
- read nuts_spec.yaml
- create permutations format/proj/resolution/spatialtype/subset/year
- fetch topojson files
- assign `objects` to a 'NUTS' property

in:
	- inPaths.nutsSpec
	- NUTS_HOME_URL
out:
	- OUT_TOPOJSON_DIR/*.js
*/
const run = async () => {
	const permutations =
		await readYaml(inPaths.nutsSpec)
		.then(permute)
		.catch(err => console.error(err));

	await Promise.all(
		_.map(permutations,
			_.pipe([
				_.collect([makeURL, makeDestinationPath, _.identity]),
				([url, filePath, permutation]) => {
					rimraf.sync(path.parse(filePath).dir);
					mkdirp.sync(path.parse(filePath).dir);

					const key = makeObjectsKey(permutation);

					const updater = permutation.format[0] === 'topojson'
						? makeTopojsonUpdater(key)
						: _.identity;

					return fetch(url)
					.then(response => response.json())
					.then(updater)
					.then(tapMessage(`Saving ${filePath}`))
					.then(saveExportedObj(filePath))
					.catch(err => console.error(url, err));
				}
			])
		)
	).catch(err => console.error(err));
}

console.log(`\nrun: ${path.basename(import.meta.url)}\n`);
console.log('Fetching, please wait...');

run()
.then(tapMessage('Done'))
.catch(err => console.error(err));
