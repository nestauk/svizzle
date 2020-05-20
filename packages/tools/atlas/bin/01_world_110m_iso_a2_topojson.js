#!/usr/bin/env node -r esm

import path from 'path';

import yaml from 'js-yaml';
import * as _ from 'lamb';
import { readFile, saveObjPassthrough } from '@svizzle/file';
import { getLength, isPathValue, swapKeyValue } from '@svizzle/utils';
import { tapMessage, tapValue } from '@svizzle/dev';

import WORLD_110_TOPOJSON from 'world-atlas/countries-110m.json';

const ISO_TYPE = 'iso_a2';
const GEOMETRIES_PATH = 'objects.countries.geometries';
const UNKNOWN = 'unknown';

const ISO_A2_TO_NAME_PATH = path.resolve(__dirname, '../data/0/iso_a2_to_name_by_type.yaml');
const WORLD_110_ISOTYPE_TOPO = path.resolve(__dirname, `../data/1/World_110m_${ISO_TYPE}_topo.json`);

const checkProperties = _.pipe([
	_.getPath(GEOMETRIES_PATH),
	_.filterWith(isPathValue([`properties.${ISO_TYPE}`, UNKNOWN])),
	getLength
]);

readFile(ISO_A2_TO_NAME_PATH, 'utf-8')
	.then(yaml.safeLoad)
	.then(({countries}) => {
		const fullNameToKey = swapKeyValue(countries.full_name);
		const alternativeNameToKey = swapKeyValue(countries.alternative_name);

		return _.updatePathIn(WORLD_110_TOPOJSON, GEOMETRIES_PATH,
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
	.then(saveObjPassthrough(WORLD_110_ISOTYPE_TOPO))
	.then(tapMessage(`Saved topojson with ${ISO_TYPE} property in ${WORLD_110_ISOTYPE_TOPO}\n`))
	.then(checkProperties)
	.then(tapValue(`Amount of '${UNKNOWN}' in 'properties.${ISO_TYPE}' in ${WORLD_110_ISOTYPE_TOPO}`))
	.catch(err => console.error(err));
