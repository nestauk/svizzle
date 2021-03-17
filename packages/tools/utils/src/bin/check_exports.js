#!/usr/bin/env node -r esm

import path from 'path';

import * as _ from 'lamb';

// have to do this to avoid dep cycle: @svizzle/file -> @svizzle/utils -> @svizzle/file
import {readDir, readFile} from '../../../file/src/read';

import {sliceStringAt} from '../modules/array-[string-string]';
import {isIterableNotEmpty} from '../modules/iterable-boolean';
import {makeEndsWith} from '../modules/string-[string-boolean]';
import {makePrefixed} from '../modules/string-[string-string]';

const INDEX_PATH = path.resolve(__dirname, '../../index.js');
const MODULES_DIR_PATH = path.resolve(__dirname, '../modules');

const regex = /export \* from '\.\/src\/modules\/(.*)'\n+/ug;

const isModule = _.allOf([
	makeEndsWith('.js'),
	_.not(makeEndsWith('.spec.js')),
	_.not(makeEndsWith('.todo.js')),
]);

Promise.all([
	readDir(MODULES_DIR_PATH).then(_.pipe([
		_.filterWith(isModule),
		_.mapWith(sliceStringAt([0, -3])),
		_.sortWith([])
	])),

	readFile(INDEX_PATH, 'utf-8')
	.then(srcIndex => [...srcIndex.matchAll(regex)].map(_.getAt(1)))
	.then(_.sortWith([])),
])
.then(([modules, exported]) => _.pullFrom(modules, exported))
.then(leftovers => {
	if (isIterableNotEmpty(leftovers)) {
		const list = leftovers.map(makePrefixed('- ./src/modules/')).join('\n');
		console.log(`\n======================\n✋`)
		console.log(`/utils: index.js not exporting these modules from ./src/modules:\n\n${list}`)
		console.log(`======================\n`)

		// eslint-disable-next-line no-process-exit
		process.exit(1);
	}
})
.catch(err => console.error(err));
