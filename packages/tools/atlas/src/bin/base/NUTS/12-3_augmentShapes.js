#! /usr/bin/env node

import path from 'node:path';

import {tapMessage} from '@svizzle/dev';
import {readDir} from '@svizzle/file';
import {makeMergeAppliedFnMap} from '@svizzle/utils';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import {saveExportedObj} from '../../../lib/fileUtils.js';
import {
	NUTS_DATABASE_DIR_1,
	NUTS_DATABASE_DIR_2,
	NUTS_DATABASE_DIR_3,
} from '../../../lib/paths.js';

/* paths */

const inDirs = {
	topojson: path.resolve(NUTS_DATABASE_DIR_1, 'topojson'),
}
const inPaths = {
	yearlyNutsIdToId: path.resolve(NUTS_DATABASE_DIR_2, 'yearlyNutsIdToId.js'),
}
const outDirs = {
	topojson: path.resolve(NUTS_DATABASE_DIR_3, 'topojson'),
}

rimraf.sync(outDirs.topojson);
mkdirp.sync(outDirs.topojson);

/* run */

/*
- read yearlyNutsIdToId.json
- read topojson files
- for all topojsons, add a property `atlasId`

in:
	- NUTS_DATABASE_DIR_1/topojson/*.json
	- NUTS_DATABASE_DIR_2/yearlyNutsIdToId.json
out:
	- NUTS_DATABASE_DIR_2/topojson/*_{country}.json
*/
const run = async () => {
	const {default: yearlyNutsIdToId} =
		await import(inPaths.yearlyNutsIdToId)
		.catch(err => console.error(err));

	const filenames = await readDir(inDirs.topojson);

	await Promise.all(
		_.flatMap(filenames, async filename => {
			const inPath = path.resolve(inDirs.topojson, filename);
			const {name} = path.parse(filename);
			const [ , , , year] = name.split('_');
			const augmentShape = _.updatePath(
				'objects.NUTS.geometries',
				_.mapWith(
					_.updateKey('properties', makeMergeAppliedFnMap({
						atlasId: ({NUTS_ID}) => {
							const yearlyNutsId = `${year}/${NUTS_ID}`;
							const atlasId = yearlyNutsIdToId[yearlyNutsId];

							if (_.isUndefined(atlasId)) {
								console.log(`No 'atlasId' for '${yearlyNutsId}'`)
							}

							return atlasId;
						}
					}))
				)
			);
			const {default: topojson} = await import(inPath);

			const augmentedTopojson = augmentShape(topojson);
			const outPath = path.resolve(outDirs.topojson, `${name}.js`);

			return saveExportedObj(outPath)(augmentedTopojson)
			.then(tapMessage(`Saved augmented topojson in ${outPath}`))
			.catch(err => console.error(outPath, err));
		})
	)
}

console.log(`\nrun: ${path.basename(import.meta.url)}\n`);
console.log('Fetching, please wait...');

run()
.then(tapMessage('Done'))
.catch(err => console.error(err))
