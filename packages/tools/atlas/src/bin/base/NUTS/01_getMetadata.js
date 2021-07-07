#!/usr/bin/env node -r esm

import path from 'path';

import {tapMessage} from '@svizzle/dev';
import {
	readFile,
	saveString,
	saveStringPassthrough
} from '@svizzle/file';
import {csvParse} from 'd3-dsv';
import yaml from 'js-yaml';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import fetch from 'node-fetch';
import rimraf from 'rimraf';

import {getBasename, NUTS_DATA_PATH_0, NUTS_DATA_PATH_1} from 'paths';
import {NUTS_HOME_URL} from 'urls';

/* paths */

const IN_SPEC_PATH = path.resolve(NUTS_DATA_PATH_0, 'nuts_spec.yaml');
const OUT_COUNTRIES_BY_YEAR_PATH = path.resolve(
	NUTS_DATA_PATH_1,
	'countries_by_year.yaml'
);
const OUT_CSV_BASE_DIR = path.resolve(NUTS_DATA_PATH_1, `csv`);

/* utils */

const makeURL = year => `${NUTS_HOME_URL}/csv/NUTS_AT_${year}.csv`;
const makePathYearlyCsv = year =>
	path.resolve(OUT_CSV_BASE_DIR, `NUTS_${year}.csv`);

const makeEuCountries = _.pipe([
	csvParse,
	_.groupBy(_.getKey('CNTR_CODE')), // [1]
	_.keys,
	_.sortWith([]),
]);

/* run */

rimraf.sync(OUT_CSV_BASE_DIR);
mkdirp.sync(OUT_CSV_BASE_DIR);

console.log(`\nrun: ${getBasename(__filename)}\n`);
console.log('Fetching, please wait...');

/*
- fetch CSVs files
- create `countries_by_year.yaml`

in:
	- IN_SPEC_PATH
	- NUTS_HOME_URL
out:
	- OUT_CSV_BASE_DIR/*.csv
	- NUTS_DATA_PATH_1/countries_by_year.yaml
*/
readFile(IN_SPEC_PATH, 'utf-8')
.then(yaml.safeLoad)
.then(({year}) => Promise.all(
	_.map(year,
		_.pipe([
			_.collect([_.identity, makeURL, makePathYearlyCsv]),
			([startYear, url, filePath]) =>
				fetch(url)
				.then(response => response.text())
				.then(tapMessage(`Saving ${filePath}`))
				.then(saveStringPassthrough(filePath))
				.then(csvString => [startYear, makeEuCountries(csvString)])
				.catch(err => console.error(url, err))
		])
	)
))
.then(_.pipe([_.fromPairs, yaml.safeDump]))
.then(tapMessage(`Saving ${OUT_COUNTRIES_BY_YEAR_PATH}`))
.then(saveString(OUT_COUNTRIES_BY_YEAR_PATH))
.then(tapMessage('Done'))
.catch(err => console.error(err));

/*
[1]
	'properties':{
		'NUTS_ID':'LU',
		'LEVL_CODE':0,
		'CNTR_CODE':'LU',
		'NUTS_NAME':'Luxembourg (Grand-Duché)',
		'FID':'LU'
	},
	'id':'LU'
*/
