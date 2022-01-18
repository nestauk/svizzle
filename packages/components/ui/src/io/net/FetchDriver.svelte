<script>
	import * as _ from 'lamb'
	// import { writable } from 'svelte/store'
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

	let abortersMap = {}
	let currentGroupId = 'asap'
	let shouldAdvance

	/*
	const addLoadingKey = key => outLoadingKeys = [...outLoadingKeys, key]
	const removeLoadingKey = key => outLoadingKeys = _.pullFrom(outLoadingKeys, [key])
	*/
	const getNextGroupId = () => {
		shouldAdvance = false
		return 		!currentGroupId ?
			'asap' : currentGroupId === 'asap' ?
				'next' : 'rest'
	}
	const abort = (key, reason) => {
		outLoadingKeys = _.pullFrom(outLoadingKeys, [key])
		// removeLoadingKey(key)
		abortersMap[key](reason)
		delete abortersMap[key]
	}

	const getAbortKeys = keys => _.difference(outLoadingKeys, keys)  // warning
	const abortAll = reason => outLoadingKeys.forEach(key => abort(key, reason))

	const download = async (key, {url, transformer}, aborters) => {
		const response = await fetch(url)
		const stream = await response.body
		const reader = stream.getReader()

		// TODO failure
		return new Promise((resolve, reject) => {
			aborters[key] = reason => {
				reader.cancel(reason)
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
	const startDownload = async uris => {
		await Promise.all(uris.map(async ({key, value}) => {
			outLoadingKeys = [...outLoadingKeys, key]
			// addLoadingKey(key)
			try {
				const contents = await download(key, value, abortersMap)
				if (contents) {
					outData[key] = contents
				}
			}
			finally {
				outLoadingKeys = _.pullFrom(outLoadingKeys, [key])
				// removeLoadingKey(key)
			}
		}))
		shouldAdvance = true
	}

	// FIXME --- link missing...
	$: defaultTransformer = defaultTransformer || _.identity

	// Before starting downloading, we must determine what needs
	// to be downloaded and what is currently being downloaded.

	$: allKeys = _.keys(uriMap)
	// When `sourcesMap` changes we wipe `outData`
	// eslint-disable-next-line no-unused-expressions, no-sequences
	$: uriMap, outData = {}
	// eslint-disable-next-line no-unused-expressions, no-sequences
	$: restKeys = _.difference(allKeys, _.union(asapKeys, nextKeys))
	// eslint-disable-next-line no-unused-expressions, no-sequences
	$: restKeys, shouldAdvance = true
	$: groups = {
		asap: asapKeys,
		next: nextKeys,
		rest: restKeys
	}
	$: shouldAdvance && (currentGroupId = getNextGroupId())
	$: currentKeys = groups[currentGroupId]
	$: loadedKeys = _.keys(outData)
	$: keysToLoad = shouldPrefetch || currentGroupId === 'asap'
		? _.difference(currentKeys, loadedKeys)
		: []
	$: todoKeys = _.difference(keysToLoad, outLoadingKeys)
	$: todoUris = objectToKeyValueArray(_.pickIn(uriMap, todoKeys))

	// aborting
	$: abortKeys = getAbortKeys(asapKeys)
	$: abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	// eslint-disable-next-line no-unused-expressions, no-sequences
	$: uriMap, abortAll('Aborted by uriMap change')

	// downloading
	$: isClientSide && startDownload(todoUris)
</script>
