#! /usr/bin/env node -r esm

import path from 'path';

import {tapMessage} from '@svizzle/dev';
import {readDir, readFile, readJson, saveObj} from '@svizzle/file';
import {transformPaths} from '@svizzle/utils';
import yaml from 'js-yaml';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import prune from 'topojson-simplify/src/prune';
import rimraf from 'rimraf';

import {getBasename, NUTS_DATABASE_DIR_1, NUTS_DATABASE_DIR_2} from 'paths';

/* path */

const IN_COUNTRIES_BY_YEAR = path.resolve(
	NUTS_DATABASE_DIR_1,
	'countries_by_year.yaml'
);
const IN_TOPOJSON_DIR = path.resolve(NUTS_DATABASE_DIR_1, 'topojson');
const OUT_TOPOJSON_DIR = path.resolve(NUTS_DATABASE_DIR_2, 'topojson');

rimraf.sync(OUT_TOPOJSON_DIR);
mkdirp.sync(OUT_TOPOJSON_DIR);

/* utils */

const makeTopojsonFilterByCountryId = countryId => transformPaths({
	'objects.NUTS.geometries':
		_.filterWith(_.pipe([
			_.getPath('properties.CNTR_CODE'),
			_.is(countryId),
		]))
});

/* run */

/*
- read countries_by_year.yaml
- read topojson files
- for all countries, filter topojsons by CNTR_CODE and save them

in:
	- NUTS_DATABASE_DIR_1/countries_by_year.yaml
	- NUTS_DATABASE_DIR_1/topojson/*.json
out:
	- NUTS_DATABASE_DIR_2/topojson/*_{country}.json
*/
const run = async () => {
	const filtersByYear = await readFile(IN_COUNTRIES_BY_YEAR, 'utf-8')
	.then(yaml.safeLoad)
	.then(_.mapValuesWith(
		_.mapWith(_.collect([_.identity, makeTopojsonFilterByCountryId]))
	))
	.catch(err => console.error(err));

	const filenames = await readDir(IN_TOPOJSON_DIR);

	await Promise.all(
		_.flatMap(filenames, async filename => {
			const inPath = path.resolve(IN_TOPOJSON_DIR, filename);
			const {name} = path.parse(filename);
			const [ , , , year] = name.split('_');

			const topojson = await readJson(inPath, 'utf-8');
			const {length} = JSON.stringify(topojson);

			return filtersByYear[year].map(([id, filterByCountryId]) => {
				const outPath = path.resolve(OUT_TOPOJSON_DIR, `${name}_${id}.json`);

				const filteredObjectsTopo = filterByCountryId(topojson);
				const prunedTopo = prune(filteredObjectsTopo);

				return saveObj(outPath)(prunedTopo)
				.then(tapMessage(`${year} ${id}: ${length} -> ${JSON.stringify(prunedTopo).length} Saved in ${outPath}`))
				.catch(err => console.error(outPath, err));
			});
		})
	)
}

console.log(`\nrun: ${getBasename(__filename)}\n`);
console.log('Fetching, please wait...');

run()
.then(tapMessage('Done'))
.catch(err => console.error(err))
