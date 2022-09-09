#!/usr/bin/env node

import path from 'node:path';

import {tapMessage} from '@svizzle/dev';
import {
	isCsvFile,
	isTsvFile,
	readDirFilesIndexed,
	saveExportedObjects,
	saveExportedObjPassthrough,
	saveObjects,
	saveObjPassthrough,
} from '@svizzle/file';
import {
	getId,
	getLength,
	isIterableLongerThan1,
	makeMergeAppliedFnMap,
} from '@svizzle/utils';
import * as _ from 'lamb';
import {csvParse, tsvParse} from 'd3-dsv';

import {getNutsName} from '../../../lib/nutsUtils.js';
import {
	NUTS_DATABASE_DIR_0,
	NUTS_DATABASE_DIR_1,
	NUTS_DATABASE_DIR_2,
	NUTS_INSPECT_DIR,
} from '../../../lib/paths.js';

/* paths */

const inDirs = {
	// 0
	recoded: path.resolve(NUTS_DATABASE_DIR_0, 'history/recoded'),

	// 1
	sourceText: path.resolve(NUTS_DATABASE_DIR_1, 'sourceText'),
};
const outJsPaths = {
	// 2
	hierarchy: path.resolve(NUTS_DATABASE_DIR_2, 'hierarchy.js'),
	idToNutsIdByYear: path.resolve(NUTS_DATABASE_DIR_2, 'idToNutsIdByYear.js'),
	recoded: path.resolve(NUTS_DATABASE_DIR_2, 'recoded.js'),
	unifiedNuts: path.resolve(NUTS_DATABASE_DIR_2, 'unifiedNuts.js'),
	yearlyNutsIdToId: path.resolve(NUTS_DATABASE_DIR_2, 'yearlyNutsIdToId.js'),
};

const outInspectPaths = {
	detectedChangesById: path.resolve(NUTS_INSPECT_DIR, 'detectedChangesById.json'),
	sourceText: path.resolve(NUTS_INSPECT_DIR, 'sourceText.json'),
};

/* utils */

const makeChangesIndex = _.pipe([
	_.mapWith(({newId, oldId}) => [newId, oldId]),
	_.fromPairs
]);

const makeRecodes = _.pipe([
	_.mapValuesWith(
		(array, filename) => {
			delete array.columns;

			return {
				newIdToOldId: makeChangesIndex(array),
				..._.make(
					['from', 'to'],
					filename.split('.')[0].split('_')
				)
			}
		}
	),
	_.values,
	_.sortWith([_.getKey('from')])
]);

// TODO get this from boundaries data
const getNutsIdLevel = id =>
	id === 'N_A' // N_A, Mount Athos (2010), level 1
		? 1
		: id.length - 2;

const makeAugmentSource = year => _.pipe([
	_.skip(['MOUNT_TYPE', 'URBN_TYPE', 'COAST_TYPE']),
	makeMergeAppliedFnMap({
		level: ({NUTS_ID}) => getNutsIdLevel(NUTS_ID),
		year: _.always(Number(year)),
	}),
]);

const makeSourcesFor = year => _.pipe([
	_.mapWith(makeAugmentSource(year)),
	_.sortWith([
		_.getKey('level'),
		_.getKey('NUTS_ID'),
	])
]);

const makeSourceTexts = _.pipe([
	_.mapValuesWith(
		(array, filename) => {
			delete array.columns;

			// 'NUTS_2003.csv' -> '2003'
			// eslint-disable-next-line prefer-destructuring
			const year = filename.split('.')[0].split('_')[1];
			const makeSources = makeSourcesFor(year);

			return {
				sources: makeSources(array),
				year,
			}
		}
	),
	_.values,
	_.sortWith([_.getKey('year')])
]);

// TODO get this via point-in-polygon using the centroid
const getNutsParentYearlyId = yearlyId =>
	yearlyId.includes('UKN') && yearlyId.length === 10
		? yearlyId.slice(0, -2).concat('0')	// North Ireland, e.g. 2016/UKN12 -> 2016/UKN0
		: yearlyId.includes('N_A')
			? yearlyId.slice(0, 5).concat('EL')	// 2010/N_A, Mount Athos, 2010/EL
			: yearlyId.slice(0, -1);

const getNutsRootYearlyId = yearlyId =>
	yearlyId.includes('UKN') && yearlyId.length === 10
		? yearlyId.slice(0, 7)	// North Ireland, e.g. 2016/UKN12 -> 2016/UK
		: yearlyId.includes('N_A')
			? yearlyId.slice(0, 5).concat('EL')	// 2010/N_A, Mount Athos, 2010/EL
			: yearlyId.slice(0, 7);

const makeUnifiedIds = (sourceTexts, recodes) => {
	let id = 0;
	const yearlyNutsIdToId = {};

	// FIXME this reduce has side-effects
	// i.e. editing `id` & `yearlyNutsIdToId`
	let unifiedNuts = _.reduce(sourceTexts, (acc, {sources, year}) => {
		const changeObj = _.find(recodes, change => change.to === year);

		const newSources = _.map(sources, source => {

			/* id */

			const oldId = changeObj && changeObj.newIdToOldId[source.NUTS_ID];

			// recoded
			let globalId =
				oldId && yearlyNutsIdToId[`${changeObj.from}/${oldId}`];

			// unchanged
			if (_.isUndefined(globalId)) {
				globalId = changeObj && yearlyNutsIdToId[`${changeObj.from}/${source.NUTS_ID}`];
			}

			if (_.isUndefined(globalId)) {
				globalId = id++;
			}

			const yearlyId = `${year}/${source.NUTS_ID}`;

			yearlyNutsIdToId[yearlyId] = globalId;
			source.id = globalId;

			/* parent id */

			if (source.NUTS_ID.length > 2) {
				const parentYearlyId = getNutsParentYearlyId(yearlyId);
				source.pid = yearlyNutsIdToId[parentYearlyId];

				if (_.isUndefined(source.pid)) {
					console.log('⚠️⚠️⚠️ no source.pid for:', yearlyId)
				}
			}

			/* root id */

			const rootYearlyId = getNutsRootYearlyId(yearlyId);
			source.rootId = yearlyNutsIdToId[rootYearlyId];

			if (_.isUndefined(source.rootId)) {
				console.log('⚠️⚠️⚠️ no source.rootId for:', yearlyId)
			}

			return source
		});

		return acc.concat(newSources)
	}, []);

	return {
		maxId: id,
		unifiedNuts,
		yearlyNutsIdToId,
	}
}

const getDetectedChanges = _.pipe([
	_.pairs,
	_.groupBy(_.getAt(1)),
	_.mapValuesWith(
		_.pipe([
			_.mapWith(_.pipe([_.head, x => x.split('/')[1]])),
			_.uniques
		])
	),
	_.pickIf(_.allOf([
		isIterableLongerThan1,
		_.pipe([_.uniques, isIterableLongerThan1])
	]))
]);

// getters
const getYear = _.getKey('year');

const getProp = prop => _.pipe([
	_.pluck(prop),
	_.uniques,
]);
const getLevels = getProp('level');

// most recent name among the most frequent names
const getName = _.pipe([
	_.groupBy(_.getKey('NUTS_NAME')),
	_.mapValuesWith(_.sortWith([_.sorterDesc(getYear)])),
	_.values,
	_.sortWith([_.sorterDesc(getLength)]),
	_.getPath('0.0'),
	getNutsName
]);

const makeHierarchy = _.pipe([
	_.collect([
		_.groupBy(_.getKey('pid')),
		_.groupBy(getId),
	]),
	([areasByParentId, areasById]) => _.mapValues(areasById, (areas, id) => {

		/* name */
		const name = getName(areas);

		/* pid */
		// check that `pid` is the same for all areas with the same `id`
		const pids = _.uniques(_.pluck(areas, 'pid'));
		if (pids.length > 1) {
			console.log(`⚠️⚠️⚠️ id ${id} has multiple pids: ${pids}`)
		}
		const [{pid},] = areas;

		/* rootId */
		// check that `pid` is the same for all areas with the same `id`
		const rootIds = _.uniques(_.pluck(areas, 'rootId'));
		if (rootIds.length > 1) {
			console.log(`⚠️⚠️⚠️ id ${id} has multiple rootIds: ${rootIds}`)
		}
		const [{rootId},] = areas;

		/* level, levels */
		const lev = {}
		const levels = getLevels(areas);
		if (levels.length === 1) {
			// eslint-disable-next-line prefer-destructuring
			lev.level = levels[0];
		} else {
			lev.levels = levels;
		}

		/* children */
		const children = areasByParentId[id]
			? _.uniques(_.map(areasByParentId[id], getId))
			: undefined;

		return {
			name,
			id: Number(id),
			pid,
			rootId,
			...lev,
			children,
		}
	})
]);

const makeIdToNutsIdByYear = _.pipe([
	_.pairs,
	_.groupBy(_.getAt(1)),
	_.mapValuesWith(
		_.pipe([
			_.mapWith(_.pipe([
				_.head,
				_.splitBy('/')
			])),
			_.fromPairs
		])
	)
]);


/* run */

const run = async () => {
	const recodes =
		await readDirFilesIndexed(inDirs.recoded, isTsvFile, tsvParse)
		.then(makeRecodes)
		.then(saveExportedObjPassthrough(outJsPaths.recoded, '\t'));

	const sourceTexts =
		await readDirFilesIndexed(inDirs.sourceText, isCsvFile, csvParse)
		.then(makeSourceTexts)
		.then(saveObjPassthrough(outInspectPaths.sourceText, '\t'));

	const {maxId, yearlyNutsIdToId, unifiedNuts} =
		makeUnifiedIds(sourceTexts, recodes);

	const hierarchy = makeHierarchy(unifiedNuts);

	const idToNutsIdByYear = makeIdToNutsIdByYear(yearlyNutsIdToId);

	/* checks */

	console.log(`====== max ID: ${maxId} ======`);

	// check the chain of changes

	const detectedChangesById = getDetectedChanges(yearlyNutsIdToId);

	return Promise.all([
		saveExportedObjects([
			{
				filepath: outJsPaths.hierarchy,
				object: hierarchy
			},
			{
				filepath: outJsPaths.yearlyNutsIdToId,
				object: yearlyNutsIdToId
			},
			{
				filepath: outJsPaths.idToNutsIdByYear,
				object: idToNutsIdByYear
			},
			{
				filepath: outJsPaths.unifiedNuts,
				object: unifiedNuts
			},
		]),
		saveObjects([
			{
				filepath: outInspectPaths.detectedChangesById,
				indentation: '\t',
				object: detectedChangesById,
			},
		]),
	])
}

run()
.then(tapMessage('Done'))
.catch(err => console.error(err));
