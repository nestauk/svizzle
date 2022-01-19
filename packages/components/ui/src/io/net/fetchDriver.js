import * as _ from 'lamb'
import {derived, get, writable} from 'svelte/store'
import {objectToKeyValueArray} from '@svizzle/utils'

import {isClientSide} from '../../utils/env'
import {mergeUint8Arrays} from './utils'

export const makeFetchDriver = (myFetch = isClientSide && fetch) => {
	// input stores
	const _asapKeys = writable([])
	const _defaultTransformer = writable(_.identity)
	const _nextKeys = writable([])
	const _shouldPrefetch = writable(false)
	const _uriMap = writable({})

	// output stores
	const _outData = writable({})
	const _outLoadingKeys = writable([])

	// internal stores
	const _currentGroupId = writable('asap')
	const _shouldAdvance = writable(false)

	const abortersMap = {}

	const addLoadingKey = key => _outLoadingKeys.update(outLoadingKeys => [...outLoadingKeys, key])
	const removeLoadingKey = key => _outLoadingKeys.update(outLoadingKeys => _.pullFrom(outLoadingKeys, [key]))
	const setData = (key, data) => _outData.update(outData => ({...outData, [key]: data}))

	const getNextGroupId = () => {
		_shouldAdvance.set(false)
		const currentGroupId = get(_currentGroupId)
		return !currentGroupId ?
			'asap' : currentGroupId === 'asap' ?
				'next' : 'rest'
	}
	const abort = (key, reason) => {
		removeLoadingKey(key)
		abortersMap[key](reason)
		delete abortersMap[key]
	}

	const getAbortKeys = keys => _.difference(get(_outLoadingKeys), keys)  // warning
	const abortAll = reason => get(_outLoadingKeys).forEach(key => abort(key, reason))

	const download = async (key, {url, transformer}, aborters) => {
		const response = await myFetch(url)
		const stream = await response.body
		const reader = stream.getReader()

		const defaultTransformer = get(_defaultTransformer)

		// TODO failure
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
			if (get(_outLoadingKeys).includes(key)) {
				return
			}
			addLoadingKey(key)
			try {
				const contents = await download(key, value, abortersMap)
				if (contents) {
					setData(key, contents)
				}
			} finally {
				removeLoadingKey(key)
			}
		}))
		_shouldAdvance.set(true)
	}

	// internal stores and subscriptions

	const _allKeys = derived([_uriMap], ([uriMap]) => _.keys(uriMap))
	// When `sourcesMap` changes we wipe `outData`
	_uriMap.subscribe(() => _outData.set({}))

	const _restKeys = derived(
		[_allKeys, _asapKeys, _nextKeys],
		([allKeys, asapKeys, nextKeys]) => _.difference(allKeys, _.union(asapKeys, nextKeys)))

	_restKeys.subscribe(() => _shouldAdvance.set(true)) // TODO explain this line

	const _groups = derived([_asapKeys, _nextKeys, _restKeys],
		([asapKeys, nextKeys, restKeys]) => ({
			asap: asapKeys,
			next: nextKeys,
			rest: restKeys
		})
	)

	_shouldAdvance.subscribe(() => _currentGroupId.set(getNextGroupId()))

	const _currentKeys = derived([_groups, _currentGroupId],
		([groups, currentGroupId]) => groups[currentGroupId]
	)

	const _loadedKeys = derived([_outData], ([outData]) => _.keys(outData))
	const _keysToLoad = derived([_shouldPrefetch, _currentGroupId, _currentKeys, _loadedKeys],
		([shouldPrefetch, currentGroupId, currentKeys, loadedKeys]) =>
			shouldPrefetch || currentGroupId === 'asap'
				? _.difference(currentKeys, loadedKeys)
				: []
	)
	const _todoKeys = derived([_keysToLoad, _outLoadingKeys],
		([keysToLoad, outLoadingKeys]) => _.difference(keysToLoad, outLoadingKeys)
	)
	const _todoUris = derived([_uriMap, _todoKeys],
		([uriMap, todoKeys]) => objectToKeyValueArray(_.pickIn(uriMap, todoKeys))
	)

	// aborting
	const _abortKeys = derived([_asapKeys], ([asapKeys]) => getAbortKeys(asapKeys))
	_abortKeys.subscribe(abortKeys =>
		abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	)
	_uriMap.subscribe(() => abortAll('Aborted by uriMap change'))

	// downloading
	_todoUris.subscribe(todoUris => {
		isClientSide && startDownload(todoUris)
	})

	return {
		_defaultTransformer,
		_asapKeys,
		_nextKeys,
		_shouldPrefetch,
		_uriMap,
		_outData,
		_outLoadingKeys
	}
}
