import {writeFile} from '@svizzle/file';
import * as _ from 'lamb';

// TODO move to /file (#533)
export const saveExportedObj = (filepath, indent = 0) =>
	object => writeFile(
		filepath,
		`export default ${JSON.stringify(object, null, indent)}\n`,
		'utf8'
	);

// TODO move to /file (#533)
export const saveExportedObjPassthrough = (filepath, indent = 0) =>
	object => writeFile(
		filepath,
		`export default ${JSON.stringify(object, null, indent)}\n`,
		'utf8'
	).then(() => object);

// TBD add catch() everywhere in /file?

export const saveExportedObjects = array => Promise.all([
	_.map(array, ({filepath, object, indentation = '\t'}) =>
		saveExportedObj(filepath, indentation)(object)
		.then(() => console.log(`Saved ${filepath}`))
	)
]);

// TODO /file: document that `indentation` can be a string (e.g. like `\t`)
// `indentation` -> `indentStrOrCount`?
