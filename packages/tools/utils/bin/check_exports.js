#!/usr/bin/env node -r esm

import path from 'path';

import * as _ from 'lamb';

// have to do this to avoid dep cycles: @svizzle/file -> @svizzle/utils -> @svizzle/file
import {readDir, readFile} from '../../file/src/read';

import {sliceStringAt} from '../src/array-[string-string]';
import {isIterableNotEmpty} from '../src/iterable-boolean';
import {makeEndsWith} from '../src/string-[string-boolean]';
import {makePrefixed} from '../src/string-[string-string]';

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
	.then(srcIndex => [...srcIndex.matchAll(regex)].map(_.getAt(1)))
	.then(_.sortWith([])),
])
.then(([modules, exported]) => _.pullFrom(modules, exported))
.then(leftovers => {
	if (isIterableNotEmpty(leftovers)) {
		const list = leftovers.map(makePrefixed('- ./src/')).join('\n');
		console.log(`\n======================\n✋`)
		console.log(`/utils: index.js not exporting modules in ./src with these filenames:\n\n${list}`)
		console.log(`======================\n`)

		// eslint-disable-next-line no-process-exit
		process.exit(1);
	}
})
.catch(err => console.error(err));
