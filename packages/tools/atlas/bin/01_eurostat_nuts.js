#!/usr/bin/env node -r esm

import path from 'path';

import yaml from 'js-yaml';
import * as _ from 'lamb';
import { readFile, saveObj } from '@svizzle/file';
import {makeKeyedValuesPermutations, transformValues} from '@svizzle/utils';
import {tapMessage} from '@svizzle/dev';
import fetch from 'node-fetch';
import mkdirp from 'mkdirp';

const BASE_URL = 'https://ec.europa.eu/eurostat/cache/GISCO/distribution/v2/nuts';

const NUTS_SPEC_PATH = path.resolve(__dirname, '../data/0/nuts_spec.yaml');
const NUTS_BASE_PATH = path.resolve(__dirname, `../data/1/EU/NUTS`);

const makeURL = ({
	format,
	proj_epsg_id,
	resolution,
	spatialtype,
	subset,
	year,
}) =>
	`${BASE_URL}/${format[0]}/NUTS_${spatialtype}_${resolution}_${year}_${proj_epsg_id}_LEVL_${subset}.${format[1]}`;

const makeExtension = string => string === 'geojson' ? 'json' : string;

// NUTS_RG_03M_2003_4326_LEVL_1.json
const makeDestinationPath = ({
	format,
	proj_epsg_id,
	resolution,
	spatialtype,
	subset,
	year,
}) =>
	path.resolve(
		NUTS_BASE_PATH,
		format[0],
		`NUTS_${spatialtype}_${resolution}_${year}_${proj_epsg_id}_LEVL_${subset}.${makeExtension(format[1])}`
	);

// NUTS_RG_03M_2003_4326
const makeObjectsKey = ({
	proj_epsg_id,
	resolution,
	spatialtype,
	year,
}) =>
	`NUTS_${spatialtype}_${resolution}_${year}_${proj_epsg_id}`;

const permute = _.pipe([
	_.updatePath('format', _.pairs),
	makeKeyedValuesPermutations,
]);

const makeTopojsonUpdater = key => transformValues({
	objects: _.rename({[key]: 'NUTS'}),
});

/*
- Read nuts_spec.yaml
- Create permutations format/proj/resolution/spatialtype/subset/year
- Fetch topojson files
- Assign `objects` to a 'NUTS' property
*/
const process = async () => {
	const permutations =
		await readFile(NUTS_SPEC_PATH, 'utf-8')
		.then(yaml.safeLoad)
		.then(permute)
		.catch(err => console.error(err));

	await Promise.all(
		_.map(permutations,
			_.pipe([
				_.collect([makeURL, makeDestinationPath, _.identity]),
				([url, filePath, permutation]) => {
					mkdirp.sync(path.parse(filePath).dir);

					const {format} = permutation;
					const key = makeObjectsKey(permutation);

					const updater = format[0] === 'topojson'
						? makeTopojsonUpdater(key)
						: _.identity;

					return fetch(url)
					.then(response => response.json())
					.then(updater)
					.then(tapMessage(`Saving ${filePath}`))
					.then(saveObj(filePath))
					.catch(err => console.error(url, err));
				}
			])
		)
	).catch(err => console.error(err));
}

process()
.then(tapMessage('Done'))
.catch(err => console.error(err));
