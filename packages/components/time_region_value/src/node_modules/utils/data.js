import * as _ from 'lamb';
import {
	arrayMax,
	arrayMin,
	makeArrayTransformer,
} from '@svizzle/utils';

/* year extent */

// IDEA just flatten and get the whole extent
export const getYearExtent = _.pipe([
	_.pluck('indicators'),
	_.flatten,
	_.pluck('year_extent'),
	_.transpose,
	makeArrayTransformer([arrayMin, arrayMax]),
]);

/* lookup */

export const makeIndicatorsLookup = _.pipe([
	_.pluck('indicators'),
	_.flatten,
	_.indexBy(_.getPath('schema.value.id')),
]);
