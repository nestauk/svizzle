import {identity} from 'lamb';

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

export const makeWebStreamsFetcher = (myFetch, transformer = identity) =>
	myFetch
		? async (key, {customTransformer, url}, aborters) => {
			const response = await myFetch(url)
			const stream = await response.body
			const reader = stream.getReader()

			return new Promise((resolve/* , reject */) => {
				aborters[key] = async reason => {
					await reader.cancel(reason)
					delete aborters[key]
					resolve({
						type: 'abort'
					})
				}

				let chunks = []
				const processChunk = ({done, value}) => {
					if (!done) {
						chunks.push(value)
						reader.read().then(processChunk)
					} else {
						const mergedArray = mergeUint8Arrays(chunks)
						const results = (customTransformer || transformer)(mergedArray)
						delete aborters[key]
						resolve({
							type: 'complete',
							contents: results
						})
					}
				}

				// start reading
				reader.read().then(processChunk)
			})
		}
		// eslint-disable-next-line no-empty-function
		: () => {}
