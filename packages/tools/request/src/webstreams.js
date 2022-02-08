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
		? async (uri, abortersMap) => {
			const response = await myFetch(uri);
			const stream = await response.body;
			const reader = stream.getReader();

			const fetcher = resolve => {
				assert(!(uri in abortersMap), 'Abort key already registered');
				abortersMap[uri] = async reason => {
					delete abortersMap[uri];
					resolve({
						type: 'file:aborted',
						uri
					});
					await reader.cancel(reason);
				};

				let chunks = [];
				const processChunk = ({done, value}) => {
					if (!done) {
						chunks.push(value);
						reader.read().then(processChunk);
					} else {
						delete abortersMap[uri];
						const bytes = mergeUint8Arrays(chunks);
						resolve({
							type: 'file:completed',
							bytes,
							uri
						});
					}
				};

				// start reading
				reader.read().then(processChunk);
			};

			return new Promise(fetcher);
		}
		: () => Promise.resolve();
