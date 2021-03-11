#!/usr/bin/env node -r esm

import path from 'path';

import * as _ from 'lamb';
import {tapMessage} from '@svizzle/dev';
import {readDirFilesIndexed, saveString, writeFile} from '@svizzle/file';
import {
	makePostfixed,
	makePrefixed,
	splitByDot,
} from '@svizzle/utils';
import camelcase from 'camelcase';
import toHtml from 'hast-util-to-html';
import {parse as parseSVG} from 'svg-parser';

// Run after `npm run lernacleanboot` at global level.
// Lerna installs all deps in `<root of the repo>/node_modules/`
const FEATHER_ICONS_DIR =
	path.resolve(__dirname, '../../../../node_modules/feather-icons/dist/icons');
const OUTPUT_DIR = path.resolve(__dirname, '../src/icons/feather');

export const isSvgFile = filepath => path.parse(filepath).ext.endsWith('.svg');
export const isSvgTag = _.pipe([_.getKey('tagName'), _.is('svg')]);
export const stringifySvgTags = str => toHtml(str, {space: 'svg'});
export const camelCase = str => camelcase(str, {pascalCase: true});
export const extractSvgBody = _.pipe([
	parseSVG,
	_.getKey('children'),
	_.findWhere(isSvgTag),
	_.getKey('children'),
	_.mapWith(stringifySvgTags),
	_.joinWith(''),
	makePrefixed(`<svelte:options namespace='svg'/>\n`),
	makePostfixed('\n'),
]);
export const resolveTo = dirPath => filename => path.resolve(dirPath, filename);
export const resolve = resolveTo(OUTPUT_DIR);
export const makeComponentName = _.pipe([
	splitByDot,
	_.getAt(0),
	camelCase,
]);
export const makeComponentPath = _.pipe([
	makeComponentName,
	makePostfixed('.svelte'),
	resolve
]);
export const writeMapToFiles = obj => _.map(
	_.pairs(obj),
	([filepath, string]) =>
		writeFile(makeComponentPath(filepath), string, 'utf8')
);

export const writeIndex = _.pipe([
	_.keys,
	_.mapWith(_.pipe([
		makeComponentName,
		id => `export {default as ${id}} from './${id}.svelte';`
	])),
	_.joinWith('\n'),
	saveString(resolve('index.js'))
]);
export const createFeatherIcons = obj => Promise.all([
	...writeMapToFiles(obj),
	writeIndex(obj),
]);

readDirFilesIndexed(FEATHER_ICONS_DIR, isSvgFile, extractSvgBody)
.then(createFeatherIcons)
.then(tapMessage(`Saved files in ${OUTPUT_DIR}`))
.catch(err => console.error(err));
