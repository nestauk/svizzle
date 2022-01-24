export const mergeUint8Arrays = arrays => {
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
