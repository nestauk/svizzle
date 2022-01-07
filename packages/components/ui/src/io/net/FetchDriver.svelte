<script context='module'>
	import * as _ from 'lamb'
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
	const run = async (sources, priorities, defaultTransformer, prefetch, downloadSet) => {
		await Promise.all(downloadSet(
			_.pickIn(sources, priorities.asap),
			defaultTransformer
		))
		if (prefetch) { 
			await Promise.all(downloadSet(
				_.pickIn(sources, priorities.next),
				defaultTransformer
			))
			await Promise.all(downloadSet(
				_.pickIn(sources, priorities.rest),
				defaultTransformer
			))
		}
	}

</script>

<script>
	import {queue} from 'd3-queue'

	export let data = {}
	export let loadingKeys = []
	export let notLoaded = []
	export let defaultTransformer = bytes => bytes
	export let priorities = []
	export let sources = {}
	export let prefetch = false

	const download = async ([key, {url, transformer}]) => {
		loadingKeys = [...loadingKeys, key]
		const response = await fetch(url)
		const stream = await response.body
		const reader = stream.getReader()

		let chunks = []
		const processChunk = ({done, value}) => {
			if (done) {
				const mergedArray = mergeUint8Arrays(chunks)
				const result = (transformer || defaultTransformer)(mergedArray)
				data[key] = result
				loadingKeys = _.pullFrom(loadingKeys, [key])
			}
			else {
				chunks.push(value)
				return reader.read().then(processChunk)
			}
		}

		return reader.read().then(processChunk)
	}
	const downloadSet = sr => _.pairs(sr).map(download)
	
	$: sources, (data = [])
	$: all = _.keys(sources)
	$: loadedKeys = _.keys(data)
	$: rest = _.pullFrom(all, [...priorities.asap, ...priorities.next])
	$: notLoaded = _.pullFrom(all, [...loadedKeys, ...loadingKeys])
	$: run(sources, {...priorities, rest}, defaultTransformer, prefetch, downloadSet)
</script>
