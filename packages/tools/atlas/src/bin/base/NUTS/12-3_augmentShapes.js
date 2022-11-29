#! /usr/bin/env node

import path from 'node:path';

import {tapMessage} from '@svizzle/dev';
import {readDir, saveExportedObj, saveObj} from '@svizzle/file';
import {topoToGeo} from '@svizzle/geo';
import {isIterableNotEmpty, roundTo, sortObjectKeysAsc} from '@svizzle/utils';
import bbox from '@turf/bbox';
import centroid from '@turf/centroid';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import {makeFilterTopojsonByNutsId} from '../../../lib/nutsUtils.js';
import {
	NUTS_DATABASE_DIR_1,
	NUTS_DATABASE_DIR_2,
	NUTS_DATABASE_DIR_3,
	NUTS_INSPECT_DIR,
} from '../../../lib/paths.js';

/*
- read yearlyNutsIdToId.json
- read topojson files
- for all topojsons, add properties `atlasId`, `bbox`, `centroid`, `isOversea`
*/

/* paths */

const inDirs = {
	topojson: path.resolve(NUTS_DATABASE_DIR_1, 'topojson'),
}
const inJsPaths = {
	overseaIds: path.resolve(NUTS_DATABASE_DIR_2, 'overseaIds.js'),
	overseaIdsGroups: path.resolve(NUTS_DATABASE_DIR_2, 'overseaIdsGroups.js'),
	yearlyNutsIdToId: path.resolve(NUTS_DATABASE_DIR_2, 'yearlyNutsIdToId.js'),
}
const outJsPaths = {
	allBboxes: path.resolve(NUTS_DATABASE_DIR_3, 'allBboxes.js'),
}
const outInspectPaths = {
	allBboxes: path.resolve(NUTS_INSPECT_DIR, 'allBboxes.json'),
}
const outDirs = {
	topojson: path.resolve(NUTS_DATABASE_DIR_3, 'topojson'),
}

rimraf.sync(outDirs.topojson);
mkdirp.sync(outDirs.topojson);

/* utils */

const roundTo5 = roundTo(5);

// TODO add to /geo
// https://turfjs.org/docs/#bbox: [minX, minY, maxX, maxY]
// if `bboxRef` is empty, make sure we have something to compare to by using `±Infinity`
const getWiderBbox = (bbox1, bboxRef) => [
	Math.min(bbox1[0], bboxRef[0] || Infinity),
	Math.min(bbox1[1], bboxRef[1] || Infinity),
	Math.max(bbox1[2], bboxRef[2] || -Infinity),
	Math.max(bbox1[3], bboxRef[3] || -Infinity),
];

// skip bboxes at country level to avoid mainland bbox == worldwide bbox
const getLowerLevelsBboxes = _.pipe([
	_.pickIf((value, key) => key.endsWith('LEVL_3')),
	_.values
]);

/* run */

const run = async () => {

	/* load resources */

	const {default: yearlyNutsIdToId} =
		await import(inJsPaths.yearlyNutsIdToId)
		.catch(err => console.error(err));

	const {default: overseaIds} =
		await import(inJsPaths.overseaIds)
		.catch(err => console.error(err));

	/* augment shapes, calculate various EU bboxes */

	let allBboxes = {};

	const filenames = await readDir(inDirs.topojson);

	await Promise.all(
		_.flatMap(filenames, async filename => {
			const topoJsInPath = path.resolve(inDirs.topojson, filename);
			const {name} = path.parse(filename);
			const [ , , , year] = name.split('_');

			const {default: topojson} =
				await import(topoJsInPath)
				.catch(err => console.error(err));

			// augment utils

			const bboxes = {
				mainland: [],
				oversea: [],
				worldwide: [],
			};

			// FIXME depends on having `topojson` in the outer scope rel to `augmentShape`
			// because `updatePath` receives a value, not `(value, path, object)`
			// FIXME imperative code modifying var in upper scope
			// e.g. `yearlyNutsId`, `allBboxes`, `bboxes`
			const augmentShape = _.updatePath(
				'objects.NUTS.geometries',
				_.mapWith(
					_.updateKey('properties', properties => {
						const {NUTS_ID} = properties;

						/* atlasId */

						const yearlyNutsId = `${year}/${NUTS_ID}`;
						const atlasId = yearlyNutsIdToId[yearlyNutsId];

						if (_.isUndefined(atlasId)) {
							console.log(`No 'atlasId' for '${yearlyNutsId}'`)
						}

						/* isOversea */

						const isOversea = _.isIn(overseaIds, atlasId);

						/* bboxes, centroid */

						// geojson

						const filterByNutsId = makeFilterTopojsonByNutsId(NUTS_ID);
						const filteredTopo = filterByNutsId(topojson);
						const filteredGeojson = topoToGeo(filteredTopo, 'NUTS');

						// bboxes

						const regionBbox = _.map(bbox(filteredGeojson), roundTo5);

						if (isOversea) {
							bboxes.oversea = getWiderBbox(regionBbox, bboxes.oversea);
						} else {
							bboxes.mainland = getWiderBbox(regionBbox, bboxes.mainland);
						}
						bboxes.worldwide = getWiderBbox(regionBbox, bboxes.worldwide);

						// centroid

						const regionCentroid = _.map(
							centroid(filteredGeojson).geometry.coordinates,
							roundTo5
						);

						process.stdout.write(`Shape ${name}: processed region ${NUTS_ID}\r`);

						return {
							...properties,
							atlasId,
							bbox: regionBbox,
							centroid: regionCentroid,
							isOversea: isOversea || undefined,
						}
					})
				)
			);

			const augmentedTopojson = augmentShape(topojson);
			const topoJsOutPath = path.resolve(outDirs.topojson, `${name}.js`);

			allBboxes[name] = bboxes;

			return saveExportedObj(topoJsOutPath)(augmentedTopojson)
			.then(tapMessage(`Saved augmented topojson in ${topoJsOutPath}`))
			.catch(err => console.error(topoJsOutPath, err));
		})
	);

	/* allBboxes */

	// sort keys for diff consistency

	allBboxes = sortObjectKeysAsc(allBboxes);

	// calc the unified bbox only at level 3 to make sure we avoid
	// regions like e.g. 104 (Norway) which at level 1 is still a single
	// region, hence with max latitude ~= 81 deg because of 2293:
	// https://en.wikipedia.org/wiki/Svalbard_and_Jan_Mayen
	allBboxes.unified = _.reduce(
		getLowerLevelsBboxes(allBboxes),
		(acc, {mainland, oversea, worldwide}) => {
			acc.mainland = getWiderBbox(mainland, acc.mainland);
			acc.worldwide = getWiderBbox(worldwide, acc.worldwide);
			if (isIterableNotEmpty(oversea)) {
				acc.oversea = getWiderBbox(oversea, acc.oversea);
			}

			return acc;
		},
		{
			mainland: [],
			oversea: [],
			worldwide: [],
		}
	);


	await saveExportedObj(outJsPaths.allBboxes, '\t')(allBboxes)
	.then(tapMessage(`Saved bboxes in ${outJsPaths.allBboxes}`))
	.catch(err => console.error(outJsPaths.allBboxes, err));

	await saveObj(outInspectPaths.allBboxes, '\t')(allBboxes)
	.then(tapMessage(`Saved bboxes in ${outInspectPaths.allBboxes}`))
	.catch(err => console.error(outInspectPaths.allBboxes, err));
}

console.log(`\nrun: ${path.basename(import.meta.url)}\n`);

run()
.then(tapMessage('Done'))
.catch(err => console.error(err))
