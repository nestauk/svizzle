#!/usr/bin/env node -r esm

import path from 'path';

import yaml from 'js-yaml';
import * as _ from 'lamb';
import {
	readFile,
	saveString,
	saveStringPassthrough
} from '@svizzle/file';
import {tapMessage} from '@svizzle/dev';
import {csvParse} from 'd3-dsv';
import fetch from 'node-fetch';

const BASE_URL = 'https://ec.europa.eu/eurostat/cache/GISCO/distribution/v2/nuts';
const NUTS_SPEC_PATH = path.resolve(__dirname, '../data/0/nuts_spec.yaml');
const NUTS_BASE_PATH = path.resolve(__dirname, `../data/1/EU/NUTS/csv`);
const EU_COUNTRIES_HISTORY_PATH = path.resolve(__dirname, '../data/1/EU/NUTS/EU_countries_by_year.yaml');

const makeURL = year => `${BASE_URL}/csv/NUTS_AT_${year}.csv`;
const makePathYearlyCsv = year =>
	path.resolve(NUTS_BASE_PATH, `NUTS_${year}.csv`);

const makeEuCountries = _.pipe([
	csvParse,
	_.groupBy(_.getKey('CNTR_CODE')), // [1]
	_.keys,
	_.sortWith([]),
]);

/*
- Fetch CSVs files
- Create EU_countries_by_year.yaml
*/
readFile(NUTS_SPEC_PATH, 'utf-8')
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
.then(tapMessage(`Saving ${EU_COUNTRIES_HISTORY_PATH}`))
.then(saveString(EU_COUNTRIES_HISTORY_PATH))
.then(tapMessage('Done'))
.catch(err => console.error(err));

// [1] "properties":{"NUTS_ID":"LU","LEVL_CODE":0,"CNTR_CODE":"LU","NUTS_NAME":"Luxembourg (Grand-Duché)","FID":"LU"},"id":"LU"
