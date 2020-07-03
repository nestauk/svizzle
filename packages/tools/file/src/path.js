/**
* @module @svizzle/file/path
*/

import path from 'path';

import * as _ from 'lamb';

import {mergeObj} from '@svizzle/utils';

/**
 * Detect if a file name has one of the provided extensions.
 * [node environment]
 *
 * @function
 * @arg {array} extensions - An array of extensions
 * @return {boolean}
 *
 * @example
> isJsonOrGeojson = hasAnyExtensionOf(['.json', '.geojson'])
> isJsonOrGeojson('file.json')
true
> isJsonOrGeojson('file.geojson')
true
> isJsonOrGeojson('file.csv')
false
 *
 * @version 0.4.0
 */
export const hasAnyExtensionOf = extensions =>
	fileName => extensions.includes(path.extname(fileName));

/**
 * Filter an array of file names to contain only those with extension .json or .geojson.
 * [node environment]
 *
 * @function
 * @arg {array} extensions - Array of file names
 * @return {array}
 *
 * @example
> filterJsonExtensions(['file.json', 'file.geojson', 'file.csv'])
['file.json', 'file.geojson']
 *
 * @version 0.4.0
 */
export const filterJsonExtensions =
    _.filterWith(hasAnyExtensionOf(['.json', '.geojson']));

/**
 * Return a function expecting a filepath and returning it renamed to the provided extension.
 * Note that if the original provided filepath has multiple extensions only the last one gets changed.
 * [node environment]
 *
 * @function
 * @arg {string} extension - file extension, including the dot (`.txt`, `.csv`, etc)
 * @return {function} - String -> String
 *
 * @example
> renameToJson = renameToExtension('.json')
> renameToJson('file.txt')
'file.json'
> renameToJson('file.min.js')
'file.min.json'
 *
 * @version 0.4.0
 */
export const renameToExtension = ext => _.pipe([
	path.parse,
	_.skipKeys(['base']), // [1]
	mergeObj({ext}),
	path.format
]);

// [1]
// 'pathObject.ext and pathObject.name are ignored if pathObject.base exists'
// https://nodejs.org/api/path.html#path_path_format_pathobject

/*
// version not using node's path
const renameToExtension = ext => filepath => {
    const split = filepath.split('.');
    const oldExt = `.${split[split.length - 1]}`;
    // const oldExt = `.${_.last(split)}`;
    // not usable in dev utils to avoid depending on lamb for now

    return filepath.replace(oldExt, ext);
}
*/
