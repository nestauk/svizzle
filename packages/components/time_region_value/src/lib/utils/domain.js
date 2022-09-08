import {default as hierarchy} from '@svizzle/atlas/data/dist/NUTS/hierarchy.js';
import {transformValues} from '@svizzle/utils';
import {csvParse} from 'd3-dsv';
import * as _ from 'lamb';

/* accessors */

// spec
export const getOrder = _.getKey('order');
export const getYear = _.getKey('year');

// regions
export const getLevel = _.getKey('level');
export const getName = _.getKey('name');
export const getRootId = _.getKey('rootId');
export const getRegionId = _.getKey('region_id');
export const getRegionAtlasId = _.getPath('region.id');

/* region labels */

export const regionIdToName = _.mapValues(hierarchy, getName);

/* sorting */

export const sortAscByYear = _.sortWith([_.sorter(getYear)]);

/* rest */

export const sanitizeDatapoint = id => transformValues({
	[id]: Number,
	region_level: Number,
	region_year_spec: Number,
	year: Number,
});
export const parseCSV = id =>
	datapoint => csvParse(datapoint, sanitizeDatapoint(id));
