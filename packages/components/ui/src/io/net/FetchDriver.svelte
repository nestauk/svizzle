<script>
	import * as _ from 'lamb'
	import { writable } from 'svelte/store'
	import {objectToKeyValueArray} from '@svizzle/utils'

	import {isClientSide} from '../../utils/env'
	import {mergeUint8Arrays} from './utils'

	// input props
	export let defaultTransformer = _.identity
	export let asapKeys = []
	export let nextKeys = []
	export let shouldPrefetch = false
	export let uriMap = {}

	// output props (for binding)
	export let outData = {}
	export let outLoadingKeys = []

	let aborters = {}

	const download = async (key, {url, transformer}, aborters) => {
		const response = await fetch(url)
		const stream = await response.body
		const reader = stream.getReader()

		// TODO failure
		return new Promise((resolve, reject) => {
			aborters[key] = message => {
				reader.cancel(message)
				delete aborters[key]
				resolve()
			}

			let chunks = []
			const processChunk = async ({done, value}) => {
				if (!done) {
					chunks.push(value)
					reader.read().then(processChunk)
				}
				else {
					const mergedArray = mergeUint8Arrays(chunks)
					const results = (transformer || defaultTransformer)(mergedArray)
					delete aborters[key]
					resolve(results)
				}
			}

			// start reading
			reader.read().then(processChunk)
		})
	}

	// FIXME --- link missing...
	$: defaultTransformer = defaultTransformer || _.identity

	// Before starting downloading, we must determine what needs
	// to be downloaded and what is currently being downloaded.

	$: allKeys = _.keys(uriMap)
	// When `sourcesMap` changes we wipe `outData`
	// eslint-disable-next-line no-unused-expressions, no-sequences
	$: uriMap, outData = {}
	$: restKeys = _.difference(allKeys, _.union(asapKeys, nextKeys))
	$: restKeys, currentGroupId = 'asap'
	$: groups = {
		asap: asapKeys,
		next: nextKeys,
		rest: restKeys
	}
	$: outLoadingKeys.length === 0 && (currentGroupId = currentGroupId === 'asap' ? 'next' : 'rest')
	$: currentKeys = groups[currentGroupId]
	$: loadedKeys = _.keys(outData)
	$: keysToLoad = shouldPrefetch || currentGroupId === 'asap'
		? _.difference(currentKeys, loadedKeys)
		: []
	$: todoKeys = _.difference(keysToLoad, outLoadingKeys)
	$: todoUris = objectToKeyValueArray(_.pickIn(uriMap, todoKeys))

	const abort = (key, reason) => {
		outLoadingKeys = _.pullFrom(outLoadingKeys, [key])
		aborters[key](reason)
	}
	// 
	const getAbortKeys = keys => _.difference(outLoadingKeys, keys)  // warning
	// aborting
	$: abortKeys = getAbortKeys(asapKeys)
	$: abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	$: uriMap, outLoadingKeys.forEach(() => abort(key, 'Aborted by uriMap change'))

	// downloading
	$: (async () => {
		todoUris.forEach(async ({key, value}) => {
			outLoadingKeys = [...outLoadingKeys, key]
			try {
				outData[key] = await download(key, value, aborters)
			}
			
			finally {
				outLoadingKeys = _.pullFrom(loadingKeys, [key])
			}
		})
	})()
</script>
