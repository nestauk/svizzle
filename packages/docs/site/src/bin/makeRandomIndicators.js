#!/usr/bin/env node -r esm

import path from 'path';

import * as _ from 'lamb';
import Chance from 'chance';
import {csvFormat} from 'd3-dsv';
import {tapMessage} from '@svizzle/dev';
import {saveObj, saveString} from '@svizzle/file';
import {inclusiveRange} from '@svizzle/utils';
import NUTS2_UK_by_year
	from '../routes/compounds/time_region_value/_data/NUTS2_UK_by_year';

const chance = new Chance();

/* indicators specs */

const GROUPS_PATH = path.resolve(
	__dirname,
	'../routes/compounds/time_region_value/_data/indicatorsGroups.json'
);

const createYYYMMDD = () =>
	`${chance.year()}${chance.integer({min: 1, max: 12})}${chance.integer({min: 1, max: 31})}`;

const createIndicator = groupId => {
	const id = chance.word({length: 5});
	const year_extent = [
		chance.integer({min: 2006, max: 2011}),
		chance.integer({min: 2012, max: 2017}),
	];

	return {
		api_doc_url: chance.url(),
		api_type: 'FETCH', // TODO,
		data_date: createYYYMMDD(),
		title: chance.sentence({words: 4}),
		subtitle: chance.sentence({words: 6}),
		endpoint_url: chance.url(),
		framework_group: groupId,
		is_experimental: chance.bool(),
		order: ['year', 'nuts_id', 'nuts_year_spec', 'value.id'],
		region: {
			type: 'NutsRegion',
			level: 2,
			source_url: 'http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D'
		},
		schema: {
			nuts_id: {type: 'NutsRegion.id'},
			nuts_year_spec: {type: 'NutsRegion.year_spec'},
			value: {
				id,
				label: chance.sentence({words: 5}),
				type: 'int'
			},
			year: {
				data_type: 'int',
				label: chance.sentence({words: 4}),
			}
		},
		source_name: chance.sentence({words: 4}),
		source_url: chance.url(),
		url: `/svizzle/data/${id}.csv`,
		year_extent,
		availableYears: inclusiveRange(year_extent)
	}
}

const createGroup = ({amountOfIndicators, index}) => {
	const groupId = chance.word({length: 5});

	return {
		description: chance.sentence(),
		id: groupId,
		label: chance.sentence({words: 6}),
		order: index,
		indicators: _.map(
			_.range(0, chance.integer({min: 1, max: amountOfIndicators})),
			() => createIndicator(groupId)
		)
	}
};

const createGroups = amountOfGroups => _.map(
	_.range(0, amountOfGroups),
	index => createGroup({
		amountOfIndicators: chance.integer({min: 3, max: 9}),
		index
	})
);

const groups = createGroups(5);

saveObj(GROUPS_PATH, 2)(groups)
.then(tapMessage(`Saved groups at: ${GROUPS_PATH}`));

/* indicators CSVs */

const createYearDatapoints = (id, year, max) => {
	const spec =
		_.findLast(NUTS2_UK_by_year, _.pipe([
			_.getKey('year_spec'),
			_.isLTE(year),
		]));

	return _.map(spec.regions, nuts_id => ({
		year,
		nuts_id,
		nuts_year_spec: spec.year_spec,
		[id]: chance.integer({min: 0, max}),
	}))
}

const createAndSaveIndicatorCSV = obj => {
	const indicatorId = obj.schema.value.id;
	const exp = chance.integer({min: 1, max: 8});
	const max = Number(`1E${exp}`);
	const data = _.flatMap(
		obj.availableYears,
		year => createYearDatapoints(indicatorId, year, max)
	);
	const dataString = csvFormat(data);
	const filepath = path.resolve(
		__dirname,
		`../../static/data/${indicatorId}.csv`
	);

	return saveString(filepath)(dataString)
}

const createAndSaveIndicatorCSVsOf = _.pipe([
	_.flatMapWith(_.getKey('indicators')),
	_.mapWith(createAndSaveIndicatorCSV)
]);

Promise.all(createAndSaveIndicatorCSVsOf(groups))
.then(tapMessage(`Saved indicators in: ../../static/data/`));
