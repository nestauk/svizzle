#!/usr/bin/env node -r esm

import * as _ from 'lamb';
import {concatValues, joinWith, prepend} from '@svizzle/utils';

import * as examples from '../routes/components/_examples';

const makeEntries = _.pipe([
	concatValues,
	_.pluck('slug'),
	_.mapWith(prepend('components/')),
	joinWith(' ')
]);

const entries = `'components ${makeEntries(examples)}'`;
console.log(entries);