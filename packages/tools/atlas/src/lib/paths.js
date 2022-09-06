import path from 'node:path';
import {fileURLToPath} from 'node:url';

import mkdirp from 'mkdirp';

// data
export const DATA_DIR = fileURLToPath(new URL('../../data', import.meta.url));
export const DATABASE_DIR = path.resolve(DATA_DIR, 'base');
export const INSPECT_DIR = path.resolve(DATA_DIR, 'inspect');

mkdirp.sync(INSPECT_DIR);

// NUTS
export const NUTS_DATABASE_DIR = path.resolve(DATABASE_DIR, 'NUTS');
export const NUTS_DATABASE_DIR_0 = path.resolve(NUTS_DATABASE_DIR, '0');
export const NUTS_DATABASE_DIR_1 = path.resolve(NUTS_DATABASE_DIR, '1');
export const NUTS_DATABASE_DIR_2 = path.resolve(NUTS_DATABASE_DIR, '2');
export const NUTS_DATABASE_DIR_3 = path.resolve(NUTS_DATABASE_DIR, '3');
export const NUTS_DATABASE_DIR_4 = path.resolve(NUTS_DATABASE_DIR, '4');
export const NUTS_INSPECT_DIR = path.resolve(INSPECT_DIR, 'NUTS');

// NUTS_DATABASE_DIR_0 exists
mkdirp.sync(NUTS_DATABASE_DIR_1);
mkdirp.sync(NUTS_DATABASE_DIR_2);
mkdirp.sync(NUTS_DATABASE_DIR_3);
mkdirp.sync(NUTS_DATABASE_DIR_4);
mkdirp.sync(NUTS_INSPECT_DIR);

// world
export const WORLD_DATABASE_DIR = path.resolve(DATABASE_DIR, 'world');
export const WORLD_DATABASE_DIR_0 = path.resolve(WORLD_DATABASE_DIR, '0');
export const WORLD_DATABASE_DIR_1 = path.resolve(WORLD_DATABASE_DIR, '1');

// WORLD_DATABASE_DIR_0 exists
mkdirp.sync(WORLD_DATABASE_DIR_1);
