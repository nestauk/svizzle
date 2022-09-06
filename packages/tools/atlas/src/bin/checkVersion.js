#!/usr/bin/env node

import {fileURLToPath} from 'node:url';

import {readJson} from '@svizzle/file';

import {version as utilsVersion} from '../utils.js';

const packagePath =
	fileURLToPath(new URL('../../package.json', import.meta.url));

readJson(packagePath)
.then(({version: packageVersion}) => {
	if (utilsVersion !== packageVersion) {
		console.log(`\n======================\n✋`);
		console.log(`/atlas: version mismatch! src/utils.js: ${utilsVersion}, package.json: ${packageVersion}`);
		console.log(`======================\n`);

		// eslint-disable-next-line no-process-exit
		process.exit(1);
	}
})
.catch(err => console.error(err));
