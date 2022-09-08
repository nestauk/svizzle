/**
* @module @svizzle/utils/string-any
*/

// TODO test, document
export const exportedJsObjToAny = jsStr => {
	let jsonStr = jsStr;

	if (jsonStr.startsWith('export default ')) {
		jsonStr = jsStr.slice(15);
	}
	if (jsonStr.endsWith('\n')) {
		jsonStr = jsonStr.slice(0, -1);
	}
	if (jsonStr.endsWith(';')) {
		jsonStr = jsonStr.slice(0, -1);
	}

	return JSON.parse(jsonStr);
}
