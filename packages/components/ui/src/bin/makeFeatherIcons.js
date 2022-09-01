#!/usr/bin/env node

import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {tapMessage} from '@svizzle/dev';
import {
	readDirFilesIndexed,
	resolveToDir,
	saveString,
	writeFile,
} from '@svizzle/file';
import {
	makePostfixed,
	makePrefixed,
	splitByDot,
} from '@svizzle/utils';
import camelcase from 'camelcase';
import {toHtml} from 'hast-util-to-html';
import * as _ from 'lamb';
import {parse as parseSVG} from 'svg-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Run after `npm run lernacleanboot` at global level.
// Lerna installs all deps in `<root of the repo>/node_modules/`
const FEATHER_ICONS_DIR =
	path.resolve(__dirname, '../../../../../node_modules/feather-icons/dist/icons');
const FEATHER_GLYPHS_DIR = path.resolve(__dirname, '../icons/feather');

const resolveToFeatherDir = resolveToDir(FEATHER_GLYPHS_DIR);

// utils
const isSvgFile = filepath => path.parse(filepath).ext.endsWith('.svg');
const isSvgTag = _.pipe([_.getKey('tagName'), _.is('svg')]);
const stringifySvgTags = str => toHtml(str, {space: 'svg'});
const camelCase = str => camelcase(str, {pascalCase: true});
const extractSvgBody = _.pipe([
	parseSVG,
	_.getKey('children'),
	_.findWhere(isSvgTag),
	_.getKey('children'),
	_.mapWith(stringifySvgTags),
	_.joinWith(''),
	makePrefixed(`<svelte:options namespace='svg'/>\n`),
	makePostfixed('\n'),
]);
const makeComponentName = _.pipe([
	splitByDot,
	_.head,
	camelCase,
]);
const makeComponentPath = _.pipe([
	makeComponentName,
	makePostfixed('.svelte'),
	resolveToFeatherDir
]);
const writeMapToFiles = obj => _.map(
	_.pairs(obj),
	([filename, string]) =>
		writeFile(makeComponentPath(filename), string, 'utf8')
);
const writeFeatherIndex = _.pipe([
	_.keys,
	_.mapWith(_.pipe([
		makeComponentName,
		id => `export {default as ${id}} from './${id}.svelte';`
	])),
	_.joinWith('\n'),
	makePostfixed('\n'), // linting: make sure we have a proper EOF
	saveString(resolveToFeatherDir('index.js'))
]);
const setupFeatherIcons = obj => Promise.all([
	...writeMapToFiles(obj),
	writeFeatherIndex(obj),
]);

readDirFilesIndexed(FEATHER_ICONS_DIR, isSvgFile, extractSvgBody)
.then(setupFeatherIcons)
.then(tapMessage(`Saved files in ${FEATHER_GLYPHS_DIR}`))
.catch(err => console.error(err));
