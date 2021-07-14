#!/usr/bin/env node -r esm

import path from 'path';

import {tapMessage, tapValue} from '@svizzle/dev';
import {readFile, saveObjPassthrough} from '@svizzle/file';
import {getLength, isPathValue, swapKeyValue} from '@svizzle/utils';
import yaml from 'js-yaml';
import * as _ from 'lamb';
import mkdirp from 'mkdirp';
import WORLD_110_TOPOJSON from 'world-atlas/countries-110m.json';

import {getBasename, WORLD_DATABASE_DIR_0, WORLD_DATABASE_DIR_1} from 'paths';

const ISO_TYPE = 'iso_a2';
const GEOMETRIES_PATH = 'objects.countries.geometries';
const UNKNOWN = 'unknown';

/* paths */

const IN_ISO_A2_TO_NAME_PATH = path.resolve(
	WORLD_DATABASE_DIR_0,
	'iso_a2_to_name_by_type.yaml'
);
const OUT_TOPOJSON_DIR = path.resolve(
	WORLD_DATABASE_DIR_1,
	'topojson'
);
const OUT_TOPOJSON_PATH = path.resolve(
	OUT_TOPOJSON_DIR,
	`world_110m_${ISO_TYPE}.json`
);

mkdirp.sync(OUT_TOPOJSON_DIR);

/* utils */

const checkProperties = _.pipe([
	_.getPath(GEOMETRIES_PATH),
	_.filterWith(isPathValue([`properties.${ISO_TYPE}`, UNKNOWN])),
	getLength
]);

/* run */

console.log(`\nrun: ${getBasename(__filename)}\n`);
console.log('Fetching, please wait...');

/*
- edit properties

in:
	- WORLD_DATABASE_DIR_0/iso_a2_to_name_by_type.yaml
out:
	- WORLD_DATABASE_DIR_1/world_110m_iso_a2_topojson.json
*/
readFile(IN_ISO_A2_TO_NAME_PATH, 'utf-8')
.then(yaml.safeLoad)
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
.then(saveObjPassthrough(OUT_TOPOJSON_PATH))
.then(tapMessage(`Saved topojson with ${ISO_TYPE} property in ${OUT_TOPOJSON_PATH}`))
.then(checkProperties)
.then(tapValue(`Amount of '${UNKNOWN}' in 'properties.${ISO_TYPE}' in ${OUT_TOPOJSON_PATH}`))
.catch(err => console.error(err));
