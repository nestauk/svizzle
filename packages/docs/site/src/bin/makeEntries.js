#!/usr/bin/env node -r esm

import * as _ from 'lamb';
import {concatValues, joinWith} from '@svizzle/utils';

import * as examples from '../routes/components/_examples';

const makeEntries = _.pipe([
	concatValues,
	_.pluckKey('slug'),
	joinWith(' ')
]);

const entries = `'components ${makeEntries(examples)}'`;
console.log(entries);
