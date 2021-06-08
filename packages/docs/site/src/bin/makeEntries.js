#!/usr/bin/env node -r esm -r svelte/register

import * as _ from 'lamb';
import {concatValues, joinWithBlank, makePrefixed} from '@svizzle/utils';

import * as examples from '../routes/components/_examples';

const makeEntries = _.pipe([
	concatValues,
	_.pluck('slug'),
	_.mapWith(makePrefixed('components/')),
	joinWithBlank
]);

const entries = `'components ${makeEntries(examples)}'`;
console.log(entries);
