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

	const nextStage = {
		asap: 'next',
		next: 'rest',
	}

</script>

<script>
	import {queue as d3Queue} from 'd3-queue'

	import {isClientSide} from '../../utils/env';

	export let data = {}
	export let loadingKeys = []
	export let notLoaded = []
	export let defaultTransformer = bytes => bytes
	export let priorities = []
	export let sources = {}
	export let prefetch = false

	let stage

	const abortersByKey = {}
	let queue

	const sourcesUpdated = newSources => {
		if (loadingKeys.length > 0) {
			queue.abort()
		}

		return {
			data: {},
			all: _.keys(newSources)
		}
	}
	const prioritiesUpdated = (allKeys, {asap, next}) => {
		const keysToAbort = _.difference(loadingKeys, asap)
		_.map(keysToAbort, key => {
			abortersByKey[key]()
		})

		return {
			rest: _.difference(allKeys, _.union(asap, next)),
			stage: 'asap'
		}
	}
	const stageCompleted = () => {
		if (prefetch && stage in nextStage) {
			console.log('next stage', stage, nextStage[stage])
			stage = nextStage[stage]
		}
	}

	const download = async (key, {url, transformer}, notifyDone) => {
		console.log('starting download', key)
		const response = await fetch(url)
		const stream = await response.body
		const reader = stream.getReader()

		// update state to reflect download started
		loadingKeys = [...loadingKeys, key]
		abortersByKey[key] = () => {
			reader.cancel('Aborted by priority change')
			notifyDone(null, key)
		}

		let chunks = []
		const processChunk = ({done, value}) => {
			if (done) {
				const mergedArray = mergeUint8Arrays(chunks)

				// update state to reflect download completed
				data[key] = (transformer || defaultTransformer)(mergedArray)
				loadingKeys = _.pullFrom(loadingKeys, [key])
				delete abortersByKey[key]

				console.log('download completed', key)

				notifyDone(null, key)
			}
			else {
				chunks.push(value)
				reader.read().then(processChunk)
			}
		}

		// start reading
		reader.read().then(processChunk)

		return {
			abort: () => {
				reader.cancel('Aborted by source change')
			}
		}
	}

	const stageChanged = newStage => {
		console.log('stage changed', newStage)
		const nextSources = _.pickIn(sources, allPriorities[newStage])
		console.log('next sources', nextSources)

		queue = d3Queue()

		_.pairs(nextSources).forEach(([key, value]) => {
			console.log('queuing download', key)
			queue.defer(download, key, value)
		})
		queue.awaitAll((error, keys) => {
			if (error) {
				throw error
			}
			console.log('stage completed', keys)
			stageCompleted()
		})
	}
	$: ({data, all} = sourcesUpdated(sources))
	$: ({rest, stage} = prioritiesUpdated(all, priorities))
	$: allPriorities = {...priorities, rest}
	$: loadedKeys = _.keys(data)
	$: notLoaded = _.difference(all, _.union(loadedKeys, loadingKeys))

	$: isClientSide && stageChanged(stage)
</script>
