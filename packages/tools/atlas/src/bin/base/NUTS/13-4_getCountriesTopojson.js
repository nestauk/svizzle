#! /usr/bin/env node

import path from 'node:path';

import {tapMessage} from '@svizzle/dev';
import {readDir, saveExportedObj} from '@svizzle/file';
import {pruneTopology} from '@svizzle/geo';
import {transformPaths} from '@svizzle/utils';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import {
	NUTS_DATABASE_DIR_1,
	NUTS_DATABASE_DIR_3,
	NUTS_DATABASE_DIR_4,
} from '../../../lib/paths.js';

/*
- read countries_by_year.yaml
- read topojson files
- for all countries, filter topojsons by CNTR_CODE and save them
*/

/* paths */

const inPaths = {
	countriesByYear: path.resolve(NUTS_DATABASE_DIR_1, 'countries_by_year.js'),
}
const inDirs = {
	topojson: path.resolve(NUTS_DATABASE_DIR_3, 'topojson'),
}
const outDirs = {
	topojson: path.resolve(NUTS_DATABASE_DIR_4, 'topojson'),
}

rimraf.sync(outDirs.topojson);
mkdirp.sync(outDirs.topojson);

/* utils */

const makeTopojsonFilterByCountryId = countryId => transformPaths({
	'objects.NUTS.geometries':
		_.filterWith(_.pipe([
			_.getPath('properties.CNTR_CODE'),
			_.is(countryId),
		]))
});

/* run */

const run = async () => {
	const filtersByYear =
		await import(inPaths.countriesByYear)
		.then(
			_.pipe([
				_.getKey('default'),
				_.mapValuesWith(
					_.mapWith(_.collect([_.identity, makeTopojsonFilterByCountryId]))
				)
			])
		);

	const filenames = await readDir(inDirs.topojson);

	await Promise.all(
		_.flatMap(filenames, async filename => {
			const topoJsInPath = path.resolve(inDirs.topojson, filename);
			const {name} = path.parse(filename);
			const [ , , , year] = name.split('_');

			const {default: topojson} = await import(topoJsInPath);
			const {length} = JSON.stringify(topojson);

			return _.map(filtersByYear[year], ([id, filterByCountryId]) => {
				const topoJsOutPath = path.resolve(outDirs.topojson, `${name}_${id}.js`);

				const filteredObjectsTopo = filterByCountryId(topojson);
				const prunedTopo = pruneTopology(filteredObjectsTopo);

				return saveExportedObj(topoJsOutPath)(prunedTopo)
				.then(tapMessage(`${year} ${id}: ${length} -> ${JSON.stringify(prunedTopo).length} Saved in ${topoJsOutPath}`))
				.catch(err => console.error(topoJsOutPath, err));
			});
		})
	)
}

console.log(`\nrun: ${path.basename(import.meta.url)}\n`);

run()
.then(tapMessage('Done'))
.catch(err => console.error(err))
