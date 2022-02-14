#!/usr/bin/env node -r esm

import path from 'path';

import {tapMessage} from '@svizzle/dev';
import {
	readYaml,
	saveStringPassthrough,
	saveYaml,
} from '@svizzle/file';
import {csvParse} from 'd3-dsv';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import fetch from 'node-fetch';
import rimraf from 'rimraf';

import {getBasename, NUTS_DATABASE_DIR_0, NUTS_DATABASE_DIR_1} from 'paths';
import {NUTS_HOME_URL} from 'urls';

/* paths */

const inPaths = {
	nutsSpec: path.resolve(NUTS_DATABASE_DIR_0, 'nuts_spec.yaml'),
}
const outDirs = {
	sourceText: path.resolve(NUTS_DATABASE_DIR_1, 'sourceText'),
}
const outPaths = {
	countriesByYear: path.resolve(NUTS_DATABASE_DIR_1, 'countries_by_year.yaml'),
}

/* utils */

const makeURL = year => `${NUTS_HOME_URL}/csv/NUTS_AT_${year}.csv`;
const makePathYearlyCsv = year =>
	path.resolve(outDirs.sourceText, `NUTS_${year}.csv`);

const makeEuCountries = _.pipe([
	csvParse,
	_.groupBy(_.getKey('CNTR_CODE')), // [1]
	_.keys,
	_.sortWith([]),
]);

/* run */

rimraf.sync(outDirs.sourceText);
mkdirp.sync(outDirs.sourceText);

console.log(`\nrun: ${getBasename(__filename)}\n`);
console.log('Fetching, please wait...');

/*
- fetch CSVs files
- create `countries_by_year.yaml`

in:
	- inPaths.nutsSpec
	- NUTS_HOME_URL
out:
	- outDirs.sourceText/*.csv
	- NUTS_DATABASE_DIR_1/countries_by_year.yaml
*/
readYaml(inPaths.nutsSpec, 'utf-8')
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
.then(_.fromPairs)
.then(tapMessage(`Saving ${outPaths.countriesByYear}`))
.then(saveYaml(outPaths.countriesByYear))
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
