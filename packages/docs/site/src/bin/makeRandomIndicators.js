#!/usr/bin/env node

import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {default as unifiedNuts}
	from '@svizzle/atlas/data/dist/NUTS/unifiedNuts.js';
import {tapMessage} from '@svizzle/dev';
import {saveExportedObj, saveString} from '@svizzle/file';
import {inclusiveRange} from '@svizzle/utils';
import Chance from 'chance';
import {csvFormat} from 'd3-dsv';
import * as _ from 'lamb';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const chance = new Chance();

/* paths */

const DIR_site = path.resolve(__dirname, '../..');
const OUT_PATH_groups = path.resolve(
	DIR_site,
	'src/routes/compounds/time_region_value/_data/indicatorsGroups.js'
);
const OUT_DIR_static_data = path.resolve(DIR_site, 'static/data');

/* indicators specs: utils */

const createYYYYMMDD = () =>
	`${chance.year()}${chance.integer({min: 1, max: 12})}${chance.integer({min: 1, max: 31})}`;

const createIndicatorSpec = groupId => {
	const id = chance.word({length: 5});
	const year_extent = [
		chance.integer({min: 2006, max: 2011}),
		chance.integer({min: 2012, max: 2017}),
	];

	return {
		api_doc_url: chance.url(),
		api_type: 'FETCH', // TODO,
		availableYears: inclusiveRange(year_extent),
		data_date: createYYYYMMDD(),
		description: chance.sentence({words: 15}),
		endpoint_url: chance.url(),
		framework_group: groupId,
		is_experimental: chance.bool(),
		order: [
			'year',
			'region_type',
			'region_year_spec',
			'region_id',
			'region_level',
			'value.id',
		],
		region_types: ['NUTS'],
		schema: {
			region_id: 'string',
			region_level: 'int',
			region_type: 'string',
			region_year_spec: 'int',
			value: {
				data_type: 'int',
				format: '.1f', // to keep the average label short in the barchart
				id,
				label: chance.sentence({words: 5}),
			},
			year: {
				data_type: 'int',
				label: chance.sentence({words: 4}),
			}
		},
		source_name: chance.sentence({words: 4}),
		source_url: chance.url(),
		subtitle: chance.sentence({
			words: chance.integer({min: 6, max: 36})
		}),
		title: chance.sentence({
			words: chance.integer({min: 4, max: 30})
		}),
		url: `/svizzle/data/${id}.csv`,
		year_extent,
	}
}

const createGroup = ({amountOfIndicators, order}) => {
	const groupId = chance.word({length: 5});

	return {
		description: chance.sentence(),
		id: groupId,
		label: chance.sentence({words: 6}),
		order,
		indicators: _.map(
			_.range(0, chance.integer({min: 1, max: amountOfIndicators})),
			() => createIndicatorSpec(groupId)
		)
	}
};

const createGroups = amountOfGroups => _.map(
	_.range(0, amountOfGroups),
	index => createGroup({
		amountOfIndicators: chance.integer({min: 3, max: 9}),
		order: index
	})
);

/* indicators specs: run */

const groups = createGroups(5);

saveExportedObj(OUT_PATH_groups, '\t')(groups)
.then(tapMessage(`Saved groups at: ${OUT_PATH_groups}`));


/* indicators CSVs: utils */

const makePairsRegionsYearSpec = _.pipe([
	_.groupBy(_.getKey('year')),
	_.mapValuesWith((regions, yearSpec) => ({yearSpec, regions})),
	_.values,
	_.sortWith([_.getKey('yearSpec')])
]);
const pairsRegionsYearSpec = makePairsRegionsYearSpec(unifiedNuts);

const createYearDatapoints = ({indicatorId, keysSorter, max, year}) => {
	const {regions, yearSpec} =
		_.findLast(pairsRegionsYearSpec, _.pipe([
			_.getKey('yearSpec'),
			_.isLTE(year),
		]));

	return _.map(
		regions,
		({level, NUTS_ID: region_id}) => keysSorter({
			[indicatorId]: chance.integer({min: 0, max}),
			region_id,
			region_level: level,
			region_type: 'NUTS',
			region_year_spec: yearSpec,
			year,
		})
	)
};

const makeKeysSorter = ({order, schema}) => obj =>
	_.reduce(order, (acc, aPath) => {
		const key = aPath === 'value.id' ? _.getPathIn(schema, aPath) : aPath

		acc[key] = obj[key];

		return acc
	}, {});

const createAndSaveIndicatorCSV = specObj => {
	const {availableYears, order, schema} = specObj;
	const indicatorId = schema.value.id;
	const keysSorter = makeKeysSorter({order, schema});
	const exp = chance.integer({min: 1, max: 8});
	const max = Number(`1E${exp}`);
	const data = _.flatMap(
		availableYears,
		year => createYearDatapoints({indicatorId, keysSorter, max, year})
	);
	const dataString = csvFormat(data);
	const filepath = path.resolve(OUT_DIR_static_data, `${indicatorId}.csv`);

	return saveString(filepath)(dataString)
}

const createAndSaveIndicatorCSVsOf = _.pipe([
	_.flatMapWith(_.getKey('indicators')),
	_.mapWith(createAndSaveIndicatorCSV)
]);

/* indicators CSVs: run */

Promise.all(createAndSaveIndicatorCSVsOf(groups))
.then(tapMessage(`Saved indicators in: ${OUT_DIR_static_data}`));
