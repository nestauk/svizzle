/**
* @module @svizzle/dev/common
*/

/**
 * Return a function expecting the filepath to rename
 *
 * @function
 * @arg {string} extension
 * @return {string}
 *
 * @example
> renameToFoo = renameToExtension('.foo')
> renameToFoo('filename.txt')
'filename.foo'
> renameToFoo('filename.spec.txt')
'filename.spec.foo'
 *
 * @version 0.2.0
 */
export const renameToExtension = ext => filepath => {
	const split = filepath.split('.');
	const oldExt = `.${split[split.length - 1]}`;

	return filepath.replace(oldExt, ext);
}

/**
 * Return a string modifying the input filepath extension to .css.
 * Used to get the location of the CSS build from the JS build:
 * dist/component.js -> dist/component.css
 *
 * @function
 * @arg {string} filepath
 * @return {string}
 *
 * @example
> renameToCss('filename.js')
'filename.css'
 *
 * @version 0.1.0
 */
export const renameToCss = renameToExtension('.css');

/**
 * Return a string modifying the input filepath extension to .min.js.
 * Used to get the location of the minified build from the JS build:
 * dist/component.js -> dist/component.min.js
 *
 * @function
 * @arg {string} filepath
 * @return {string}
 *
 * @example
> renameToMinJs('filename.js')
'filename.min.js'
 *
 * @version 0.1.0
 */
export const renameToMinJs = renameToExtension('.min.js');

/**
 * Return a string modifying the input filepath extension to .mjs.
 * Used to get the location of the es6 build from the JS build:
 * dist/component.js -> dist/component.mjs
 *
 * @function
 * @arg {string} filepath
 * @return {string}
 *
 * @example
> renameToCss('filename.js')
'filename.mjs'
 *
 * @version 0.1.0
 */
export const renameToMjs = renameToExtension('.mjs');

/**
 * Return a string modifying the input filepath extension to .mjs.
 * Used to get the location of the es6 build from the JS build:
 * dist/component.js -> dist/component.mjs
 *
 * @function
 * @arg {obj} package - object representation of package.json
 * @return {string} - banner
 *
 * @example
> import pkg from 'package.json'
> makeBanner(pkg)
'svizzle v0.1.0 - © 2021 nestauk'
 *
 * @version 0.1.0
 */
export const makeBanner = pkg => {
	const author = typeof pkg.author === 'object'
		? pkg.author.name
		: pkg.author;
	const year = new Date().getFullYear();

	return `// ${pkg.name} v${pkg.version} - © ${year} ${author}`
}
