#! /usr/bin/env node -r esm

import path from "path";

import * as _ from 'lamb';
import yaml from 'js-yaml';
import prune from 'topojson-simplify/src/prune';
import { tapMessage } from '@svizzle/dev';
import { readDir, readFile, readJson, saveObj } from '@svizzle/file';
import {transformPaths} from '@svizzle/utils';

const EU_COUNTRIES_HISTORY_PATH = path.resolve(__dirname, '../data/1/EU/NUTS/EU_countries_by_year.yaml');
const IN_BASE_PATH = path.resolve(__dirname, '../data/1/EU/NUTS/topojson');
const OUT_BASE_PATH = path.resolve(__dirname, '../data/2/EU/NUTS/topojson');

const makeTopojsonFilterByCountryId = countryId => transformPaths({
	'objects.NUTS.geometries':
		_.filterWith(_.pipe([
			_.getPath('properties.CNTR_CODE'),
			_.is(countryId),
		]))
});

/*
- Read EU_countries_by_year.yaml
- Read topojson files
- Filter topojsons by countryId and save them
*/
const process = async () => {
	const filtersByYear = await readFile(EU_COUNTRIES_HISTORY_PATH, 'utf-8')
	.then(yaml.safeLoad)
	.then(_.mapValuesWith(
		_.mapWith(_.collect([_.identity, makeTopojsonFilterByCountryId]))
	))
	.catch(err => console.error(err));

	const filenames = await readDir(IN_BASE_PATH);

	await Promise.all(
		_.flatMap(filenames, async filename => {
			const inPath = path.resolve(IN_BASE_PATH, filename);
			const {name} = path.parse(filename);
			const [ , , , year] = name.split('_');

			const topojson = await readJson(inPath, 'utf-8');
			const {length} = JSON.stringify(topojson);

			return filtersByYear[year].map(([id, filterByCountryId]) => {
				const outPath = path.resolve(OUT_BASE_PATH, `${name}_${id}.json`);

				const filteredObjectsTopo = filterByCountryId(topojson);
				const prunedTopo = prune(filteredObjectsTopo);

				return saveObj(outPath)(prunedTopo)
				.then(tapMessage(`${year} ${id}: ${length} -> ${JSON.stringify(prunedTopo).length} Saved in ${outPath}`))
				.catch(err => console.error(outPath, err));
			});
		})
	)
}

process()
.then(tapMessage('Done'))
.catch(err => console.error(err))
