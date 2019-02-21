/**
* @module @svizzle/dev/common
*/

/**
 * Return a function expecting the filepath to rename
 *
 * @function
 * @arg {string}
 * @return {string}
 *
 * @example
const renameToFoo = renameToExtension(".foo")
renameToFoo("filepath.txt") // "filepath.foo"
renameToFoo("filepath.spec.txt") // "filepath.spec.foo"
 *
 * @version 0.2.0
 */
export const renameToExtension = ext => filepath => {
    const split = filepath.split(".");
    const oldExt = `.${split[split.length - 1]}`;

    return filepath.replace(oldExt, ext);
}

/**
 * Return a string modifying the input filepath extension to .css.
 * Used to get the location of the CSS build from the JS build:
 * dist/component.js -> dist/component.css
 *
 * @function
 * @arg {string}
 * @return {string}
 *
 * @example renameToCss("filepath.js") // "filepath.css"
 *
 * @version 0.1.0
 */
export const renameToCss = renameToExtension(".css");

/**
 * Return a string modifying the input filepath extension to .min.js.
 * Used to get the location of the minified build from the JS build:
 * dist/component.js -> dist/component.min.js
 *
 * @function
 * @arg {string}
 * @return {string}
 *
 * @example renameToMinJs("filepath.js") // "filepath.min.js"
 *
 * @version 0.1.0
 */
export const renameToMinJs = renameToExtension(".min.js");

/**
 * Return a string modifying the input filepath extension to .mjs.
 * Used to get the location of the es6 build from the JS build:
 * dist/component.js -> dist/component.mjs
 *
 * @function
 * @arg {string}
 * @return {string}
 *
 * @example renameToCss("filepath.js") // "filepath.mjs"
 *
 * @version 0.1.0
 */
export const renameToMjs = renameToExtension(".mjs");

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
import pkg from "package.json";
makeBanner(pkg);
// "svizzle v0.1.0 - © 2019 nestauk"
 *
 * @version 0.1.0
 */
export const makeBanner = pkg => {
    const author = (typeof pkg.author) === "object"
        ? pkg.author.name
        : pkg.author;
    const year = (new Date).getFullYear();

    return `// ${pkg.name} v${pkg.version} - © ${year} ${author}`
}
