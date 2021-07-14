#!/usr/bin/env node -r esm

import path from 'path';

import {tapMessage} from '@svizzle/dev';
import {
	isCsvFile,
	isTsvFile,
	readDirFilesIndexed,
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

import {
	NUTS_DATA_BASE_DIR_0,
	NUTS_DATA_BASE_DIR_1,
	NUTS_DATA_BASE_DIR_2,
	NUTS_INSPECT_DIR,
} from 'paths';

/* paths */

const IN_DIR_recoded = path.resolve(NUTS_DATA_BASE_DIR_0, 'history/recoded');
const IN_DIR_sourceText = path.resolve(NUTS_DATA_BASE_DIR_1, 'sourceText');
const OUT_PATH_detectedChangesById = path.resolve(NUTS_INSPECT_DIR, 'detectedChangesById.json');
const OUT_PATH_hierarchy = path.resolve(NUTS_DATA_BASE_DIR_2, 'hierarchy.json');
const OUT_PATH_idToYearlyNutsIds = path.resolve(NUTS_DATA_BASE_DIR_2, 'idToYearlyNutsIds.json');
const OUT_PATH_recoded = path.resolve(NUTS_DATA_BASE_DIR_2, 'recoded.json');
const OUT_PATH_sourceText = path.resolve(NUTS_INSPECT_DIR, 'sourceText.json');
const OUT_PATH_unifiedNuts = path.resolve(NUTS_DATA_BASE_DIR_2, 'unifiedNuts.json');
const OUT_PATH_yearlyNutsIdToId = path.resolve(NUTS_DATA_BASE_DIR_2, 'yearlyNutsIdToId.json');

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
		year: _.always(year),
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
			? yearlyId.slice(0, -3).concat('EL')	// 2010/N_A, Mount Athos, 2010/EL
			: yearlyId.slice(0, -1);

const makeUnifiedIds = (sourceTexts, recodes) => {
	let id = 0;
	const yearlyNutsIdToId = {};

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
					console.log('!!! no source.pid for:', yearlyId)
				}
			}

			return source
		});

		return acc.concat(newSources)
	}, []);

	return {maxId: id, yearlyNutsIdToId, unifiedNuts}
}

const getDetectedChanges = _.pipe([
	_.pairs,
	_.groupBy(_.getAt(1)),
	_.mapValuesWith(
		_.pipe([
			_.mapWith(_.pipe([_.getAt(0), x => x.split('/')[1]])),
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
	_.adapter([
		_.casus(_.hasKey('NAME_LATN'), _.getKey('NAME_LATN')),
		_.getKey('NUTS_NAME'),
	]),
]);

const makeHierarchy = _.pipe([
	_.collect([
		_.groupBy(_.getKey('pid')),
		_.groupBy(getId),
	]),
	([areasByParentId, areasById]) => _.mapValues(areasById, (areas, id) => {
		const props = {}
		const name = getName(areas);

		const levels = getLevels(areas);
		if (levels.length === 1) {
			// eslint-disable-next-line prefer-destructuring
			props.level = levels[0];
		} else {
			props.levels = levels;
		}

		const children = areasByParentId[id]
			? _.uniques(_.map(areasByParentId[id], getId))
			: undefined;

		return {
			id,
			name,
			...props,
			children,
		}
	})
]);

const makeIdToNutsIds = _.pipe([
	_.pairs,
	_.groupBy(_.getAt(1)),
	_.mapValuesWith(_.mapWith(_.getAt(0)))
]);

/* run */

const run = async () => {
	const recodes =
		await readDirFilesIndexed(IN_DIR_recoded, isTsvFile, tsvParse)
		.then(makeRecodes)
		.then(saveObjPassthrough(OUT_PATH_recoded, 2));

	const sourceTexts =
		await readDirFilesIndexed(IN_DIR_sourceText, isCsvFile, csvParse)
		.then(makeSourceTexts)
		.then(saveObjPassthrough(OUT_PATH_sourceText, 2));

	const {maxId, yearlyNutsIdToId, unifiedNuts} =
		makeUnifiedIds(sourceTexts, recodes);

	const hierarchy = makeHierarchy(unifiedNuts);

	const idToYearlyNutsIds = makeIdToNutsIds(yearlyNutsIdToId);

	/* checks */

	console.log(`====== max ID: ${maxId} ======`);

	// check the chain of changes

	const detectedChangesById = getDetectedChanges(yearlyNutsIdToId);

	return saveObjects([
		{
			filepath: OUT_PATH_detectedChangesById,
			object: detectedChangesById
		},
		{
			filepath: OUT_PATH_hierarchy,
			object: hierarchy
		},
		{
			filepath: OUT_PATH_yearlyNutsIdToId,
			object: yearlyNutsIdToId
		},
		{
			filepath: OUT_PATH_idToYearlyNutsIds,
			object: idToYearlyNutsIds
		},
		{
			filepath: OUT_PATH_unifiedNuts,
			object: unifiedNuts
		},
	])
}

run()
.then(tapMessage('Done'))
.catch(err => console.error(err));
