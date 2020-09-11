#!/usr/bin/env node -r esm

import path from 'path';

import * as _ from 'lamb';
import {readDir, readFile} from '@svizzle/file';

import {sliceStringAt} from '../src/array-[string-string]';
import {isIterableEmpty} from '../src/iterable-boolean';
import {makeEndsWith} from '../src/string-[string-boolean]';
import {prepend} from '../src/string-[string-string]';

const INDEX_PATH = path.resolve(__dirname, '../index.js');
const SRC_DIR_PATH = path.resolve(__dirname, '../src');

// eslint-disable-next-line prefer-named-capture-group
const regex = /export \* from '\.\/src\/(.*)'\n+/ug;

const isModule = _.allOf([
	makeEndsWith('.js'),
	_.not(makeEndsWith('.spec.js')),
	_.not(makeEndsWith('.todo.js')),
]);

Promise.all([
	readDir(SRC_DIR_PATH).then(_.pipe([
		_.filterWith(isModule),
		_.mapWith(sliceStringAt([0, -3])),
		_.sortWith([])
	])),

	readFile(INDEX_PATH, 'utf-8')
	.then(exported => [...exported.matchAll(regex)].map(_.getAt(1)))
	.then(_.sortWith([])),
])
.then(([modules, exported]) => _.pullFrom(modules, exported))
.then(overlap => {
	if (isIterableEmpty(overlap)) {
		console.log('👍 Exporting all modules from ./src')
	} else {
		const list = overlap.map(prepend('💥 ')).join('\n');
		console.log(`✋ Not exporting these modules from ./src:\n${list}`)

		// eslint-disable-next-line no-process-exit
		process.exit(1);
	}
})
.catch(err => console.error(err));
