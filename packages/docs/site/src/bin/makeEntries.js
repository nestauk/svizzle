#!/usr/bin/env node

import {joinWithBlank, makePrefixed} from '@svizzle/utils';
import * as _ from 'lamb';

import {default as barchart} from '../routes/components/_examples/barchart.js';
import {default as choropleth} from '../routes/components/_examples/choropleth.js';
import {default as hierarchy} from '../routes/components/_examples/hierarchy.js';
import {default as histogram} from '../routes/components/_examples/histogram.js';
import {default as legend} from '../routes/components/_examples/legend.js';
import {default as trends} from '../routes/components/_examples/trends.js';

const slugs = [
	...barchart,
	...choropleth,
	...hierarchy,
	...histogram,
	...legend,
	...trends,
]
.map(_.getKey('slug'))
.concat([
	'ui-Icon',
	'ui-Switch',
	'ui-Link',
	'ui-LinkButton',
	'ui-LoadingView'
])

const makeEntries = _.pipe([
	_.mapWith(makePrefixed('components/')),
	joinWithBlank
]);

const entries = `'components ${makeEntries(slugs)}'`;
console.log(entries);
