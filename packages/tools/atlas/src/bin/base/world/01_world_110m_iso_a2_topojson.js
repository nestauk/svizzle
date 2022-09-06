#!/usr/bin/env node

import {createRequire} from 'node:module';
import path from 'node:path';

import {tapMessage, tapValue} from '@svizzle/dev';
import {readYaml} from '@svizzle/file';
import {getLength, isPathValue, swapKeyValue} from '@svizzle/utils';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';

const require = createRequire(import.meta.url);
const WORLD_110_TOPOJSON = require('world-atlas/countries-110m.json');

import {saveExportedObjPassthrough} from '../../../lib/fileUtils.js';
import {
	WORLD_DATABASE_DIR_0,
	WORLD_DATABASE_DIR_1
} from '../../../lib/paths.js';

const ISO_TYPE = 'iso_a2';
const GEOMETRIES_PATH = 'objects.countries.geometries';
const UNKNOWN = 'unknown';

/* paths */

const inPaths = {
	isoA2ToNamePath: path.resolve(WORLD_DATABASE_DIR_0, 'iso_a2_to_name_by_type.yaml'),
}
const outDirs = {
	topojson: path.resolve(WORLD_DATABASE_DIR_1, 'topojson'),
}
const outPaths = {
	isoA2ToNamePath: path.resolve(WORLD_DATABASE_DIR_1, 'iso_a2_to_name_by_type.js'),
	topojson: path.resolve(outDirs.topojson, `world_110m_${ISO_TYPE}.js`),
}

mkdirp.sync(outDirs.topojson);

/* utils */

const checkProperties = _.pipe([
	_.getPath(GEOMETRIES_PATH),
	_.filterWith(isPathValue([`properties.${ISO_TYPE}`, UNKNOWN])),
	getLength
]);

/* run */

console.log(`\nrun: ${path.basename(import.meta.url)}\n`);
console.log('Fetching, please wait...');

/*
- edit properties

in:
	- WORLD_DATABASE_DIR_0/iso_a2_to_name_by_type.yaml
out:
	- WORLD_DATABASE_DIR_1/world_110m_iso_a2_topojson.js
*/
readYaml(inPaths.isoA2ToNamePath)
.then(tapMessage(`Saving ${outPaths.isoA2ToNamePath}`))
.then(saveExportedObjPassthrough(outPaths.isoA2ToNamePath, '\t'))
.then(({countries}) => {
	const fullNameToKey = swapKeyValue(countries.full_name);
	const alternativeNameToKey = swapKeyValue(countries.alternative_name);

	return _.updatePathIn(
		WORLD_110_TOPOJSON,
		GEOMETRIES_PATH,
		_.mapWith(obj => ({
			...obj,
			properties: {
				...obj.properties,
				[ISO_TYPE]:
					fullNameToKey[obj.properties.name] ||
					alternativeNameToKey[obj.properties.name],
				name:
					!fullNameToKey[obj.properties.name] &&
					!alternativeNameToKey[obj.properties.name]
						? obj.properties.name
						: undefined
			}
		}))
	)
})
.then(saveExportedObjPassthrough(outPaths.topojson))
.then(tapMessage(`Saved topojson with ${ISO_TYPE} property in ${outPaths.topojson}`))
.then(checkProperties)
.then(tapValue(`Amount of '${UNKNOWN}' in 'properties.${ISO_TYPE}' in ${outPaths.topojson}`))
.catch(err => console.error(err));
