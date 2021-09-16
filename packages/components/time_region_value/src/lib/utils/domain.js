import * as _ from 'lamb';
import {csvParse} from 'd3-dsv';
import {transformValues} from '@svizzle/utils';

export const getNutsId = _.getKey('nuts_id');

export const sortAscByYear = _.sortWith([_.sorter(_.getKey('year'))]);

const sanitizeValue = id => transformValues({
	[id]: Number,
	// year: Number
});
export const parseCSV = id =>
	t => csvParse(t, sanitizeValue(id));
