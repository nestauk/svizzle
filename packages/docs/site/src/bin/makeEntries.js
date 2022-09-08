#!/usr/bin/env node -r svelte/register

import {concatValues, joinWithBlank, makePrefixed} from '@svizzle/utils';
import * as _ from 'lamb';

import * as examples from '../routes/components/_examples/index.js';

const makeEntries = _.pipe([
	concatValues,
	_.pluck('slug'),
	_.mapWith(makePrefixed('components/')),
	joinWithBlank
]);

const entries = `'components ${makeEntries(examples)}'`;
console.log(entries);
