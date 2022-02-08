import assert from 'assert';

const mergeUint8Arrays = arrays => {
	const totalLength = arrays.reduce(
		(acc, array) => acc + array.length,
		0
	)
	const mergedArray = new Uint8Array(totalLength)
	let start = 0
	arrays.forEach(array => {
		mergedArray.set(array, start)
		start += array.length
	})
	return mergedArray
}

export const makeWebStreamsFetcher = myFetch =>
	myFetch
		? async (url, abortersMap) => {
			const response = await myFetch(url);
			const stream = await response.body;
			const reader = stream.getReader();

			const fetcher = resolve => {
				assert(!(url in abortersMap), 'Abort key already registered');
				abortersMap[url] = async reason => {
					delete abortersMap[url];
					await reader.cancel(reason);
					resolve({
						type: 'abort',
						url
					});
				};

				let chunks = [];
				const processChunk = ({done, value}) => {
					if (!done) {
						chunks.push(value);
						reader.read().then(processChunk);
					} else {
						delete abortersMap[url];
						const bytes = mergeUint8Arrays(chunks);
						resolve({
							type: 'complete',
							bytes,
							url
						});
					}
				};

				// start reading
				reader.read().then(processChunk);
			};

			return new Promise(fetcher);
		}
		: () => Promise.resolve();
