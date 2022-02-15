import {identity} from 'lamb';

const mergeUint8Arrays = arrays => {
	const totalLength = arrays.reduce(
		(acc, array) => acc + array.length,
		0
	);
	const mergedArray = new Uint8Array(totalLength);
	let start = 0;
	arrays.forEach(array => {
		mergedArray.set(array, start)
		start += array.length
	});
	return mergedArray;
}

export const makeWebStreamsFetcher = (myFetch, transformer = identity) =>
	myFetch
		? async (key, {customTransformer, url}, aborters) => {
			const response = await myFetch(url);
			const stream = await response.body;
			const reader = stream.getReader();

			return new Promise((resolve/* , reject */) => {
				let hasAborted = false;
				aborters[key] = async reason => {
					hasAborted = true;
					await reader.cancel(reason);
					resolve({
						type: 'abort'
					});
				}

				let chunks = [];
				const processChunk = ({done, value}) => {
					if (!done) {
						chunks.push(value);
						reader.read().then(processChunk);
					} else {
						if (!hasAborted) {
							const mergedArray = mergeUint8Arrays(chunks);
							const results = (customTransformer || transformer)(mergedArray);
							resolve({
								type: 'complete',
								contents: results
							});
						}
						delete aborters[key];
					}
				}

				// start reading
				reader.read().then(processChunk);
			});
		}
		// eslint-disable-next-line no-empty-function
		: () => {};
