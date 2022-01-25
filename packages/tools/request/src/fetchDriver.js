import * as _ from 'lamb'
// import {derived, get, writable} from 'svelte/store'
import {
	BehaviorSubject,
	combineLatest,
} from 'rxjs'
import {map, debounceTime} from 'rxjs/operators'

import {objectToKeyValueArray} from '@svizzle/utils'

import {isClientSide} from '../../../components/ui/src/utils/env'
import {mergeUint8Arrays} from './utils'

const derive = (observables, fn) => combineLatest(...observables)
.pipe(
	debounceTime(0),
	map(fn)
)

/*
const derive2 = (main, observables, fn) => main
.pipe(
	combineLatestWith(...observables),
	debounceTime(0),
	map(fn)
)
*/
const DEBUG = true
const debug = (...args) => DEBUG && console.log(...args)

export const makeFetchDriver = (myFetch = isClientSide && fetch) => {
	// input stores
	const _asapKeys = new BehaviorSubject([])
	const _defaultTransformer = new BehaviorSubject(_.identity)
	const _nextKeys = new BehaviorSubject([])
	const _shouldPrefetch = new BehaviorSubject(false)
	const _uriMap = new BehaviorSubject({})

	// output stores
	const _outData = new BehaviorSubject({})
	const _outLoadingKeys = new BehaviorSubject([])

	// internal stores
	const _currentGroupId = new BehaviorSubject()
	const _shouldAdvance = new BehaviorSubject(false)

	const abortersMap = {}

	const addLoadingKey = key => _outLoadingKeys.next([..._outLoadingKeys.getValue(), key])
	const removeLoadingKey = key => _outLoadingKeys.next(_.pullFrom(_outLoadingKeys.getValue(), [key]))
	const setData = (key, data) => _outData.next({..._outData.getValue(), [key]: data})

	const getNextGroupId = () => {
		_shouldAdvance.next(false)
		const currentGroupId = _currentGroupId.getValue()
		return !currentGroupId ?
			'asap' : currentGroupId === 'asap' ?
				'next' : 'rest'
	}
	const abort = (key, reason) => {
		removeLoadingKey(key)
		debug('aborting', key)
		abortersMap[key] && abortersMap[key](reason)
		delete abortersMap[key]
	}

	const getAbortKeys = keys => _.difference(_outLoadingKeys.getValue(), keys)  // warning
	const abortAll = reason => _outLoadingKeys.getValue().forEach(key => abort(key, reason))

	const download = async (key, {url, transformer}, aborters) => {
		const response = await myFetch(url)
		const stream = await response.body
		const reader = stream.getReader()

		const defaultTransformer = _defaultTransformer.getValue()
		debug('downloading', key, url)

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
					debug('finished', key)
					resolve(results)
				}
			}

			// start reading
			reader.read().then(processChunk)
		})
	}

	const startDownload = async uris => {
		debug('startDownload', uris.length)
		await Promise.all(uris.map(async ({key, value}) => {
			/*
			if (_outLoadingKeys.getValue().includes(key)) {
				return
			}*/
			addLoadingKey(key)
			try {
				const contents = await download(key, value, abortersMap)
				if (contents) {
					setData(key, contents)
				}
			} catch (e) {
				console.error(e)
			} finally {
				removeLoadingKey(key)
			}
		}))
		_shouldAdvance.next(true)
	}

	// internal stores and subscriptions

	const _allKeys = derive([_uriMap], ([uriMap]) => _.keys(uriMap))
	// When `sourcesMap` changes we wipe `outData`
	_uriMap.subscribe(() => _outData.next({}))

	const _restKeys = derive(
		[_allKeys, _asapKeys, _nextKeys],
		([allKeys, asapKeys, nextKeys]) => _.difference(allKeys, _.union(asapKeys, nextKeys)))

	_restKeys.subscribe(() => _shouldAdvance.next(true)) // TODO explain this line

	const _groups = derive([_asapKeys, _nextKeys, _restKeys],
		([asapKeys, nextKeys, restKeys]) => ({
			asap: asapKeys,
			next: nextKeys,
			rest: restKeys
		})
	)

	_shouldAdvance.subscribe(shouldAdvance => shouldAdvance && _currentGroupId.next(getNextGroupId()))

	const _loadedKeys = derive([_outData], ([outData]) => _.keys(outData))
	let loadedKeys = []
	_loadedKeys.subscribe(lk => {
		loadedKeys = lk
	})
	const _currentKeys = derive([_groups, _currentGroupId],
		([groups, currentGroupId]) => groups[currentGroupId]
	)
	const _keysToLoad = derive([_shouldPrefetch, _currentGroupId, _currentKeys],
		([shouldPrefetch, currentGroupId, currentKeys]) =>
			shouldPrefetch || currentGroupId === 'asap'
				? _.difference(currentKeys, loadedKeys)
				: []
	)
	const _todoKeys = derive([_keysToLoad],
		([keysToLoad]) => _.difference(keysToLoad, _outLoadingKeys.getValue())
	)
	const _todoUris = derive([_uriMap, _todoKeys],
		([uriMap, todoKeys]) => objectToKeyValueArray(_.pickIn(uriMap, todoKeys))
	)

	// aborting
	const _abortKeys = derive([_asapKeys], ([asapKeys]) => getAbortKeys(asapKeys))
	_abortKeys.subscribe(abortKeys =>
		abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	)
	_uriMap.subscribe(() => abortAll('Aborted by uriMap change'))

	// debugging
	_uriMap.subscribe(uriMap => debug('URI map', _.keys(uriMap).length))
	_currentGroupId.subscribe(currentGroupId => debug('current group id', currentGroupId))
	_shouldAdvance.subscribe(shouldAdvance => debug('should advance ?', shouldAdvance))
	_shouldPrefetch.subscribe(shouldPrefetch => debug('should prefetch ?', shouldPrefetch))
	_keysToLoad.subscribe(keysToLoad => debug('keysToLoad', keysToLoad.length))
	_todoKeys.subscribe(todoKeys => debug('todoKeys', todoKeys.length))
	_currentKeys.subscribe(currentKeys => debug('currentKeys', currentKeys.length))
	_loadedKeys.subscribe(lk => debug('loadedKeys', lk.length))
	_asapKeys.subscribe(asapKeys => debug('asapKeys', asapKeys.length))
	_nextKeys.subscribe(nextKeys => debug('nextKeys', nextKeys.length))
	_restKeys.subscribe(restKeys => debug('restKeys', restKeys.length))
	_defaultTransformer.subscribe(() => debug('default transformer'))

	// downloading
	_todoUris.subscribe(todoUris => {
		// debug('todoUris', todoUris)
		todoUris.length > 0 && startDownload(todoUris)
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
