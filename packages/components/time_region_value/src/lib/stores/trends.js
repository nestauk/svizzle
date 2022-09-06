import {objectToKeyValueArray} from '@svizzle/utils';
import * as _ from 'lamb';
import {derived} from 'svelte/store';

// lib/utils
import {sortAscByYear} from '../utils/domain.js';

// lib/stores
import {_selectionData} from './indicator.js';

const makeTrends = _.pipe([
	_.groupBy(_.getPath('region.id')),
	_.mapValuesWith(sortAscByYear),
	objectToKeyValueArray
]);

export const _trends = derived(_selectionData, makeTrends);
