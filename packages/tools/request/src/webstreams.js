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
	async (key, {customTransformer, url}, aborters, transformer) => {
		const response = await myFetch(url)
		const stream = await response.body
		const reader = stream.getReader()

		return new Promise((resolve/* , reject */) => {
			aborters[key] = reason => {
				reader.cancel(reason)
				delete aborters[key]
				resolve()
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
					resolve(results)
				}
			}

			// start reading
			reader.read().then(processChunk)
		})
	}
