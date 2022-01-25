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
	const _targetGroupId = new BehaviorSubject()
	const _shouldAdvance = new BehaviorSubject(false)

	const abortersMap = {}

	const addLoadingKey = key => _outLoadingKeys.next([..._outLoadingKeys.getValue(), key])
	const removeLoadingKey = key => _outLoadingKeys.next(_.pullFrom(_outLoadingKeys.getValue(), [key]))
	const setData = (key, data) => _outData.next({..._outData.getValue(), [key]: data})

	const getNextGroupId = () => {
		_shouldAdvance.next(false)
		const targetGroupId = _targetGroupId.getValue()
		return !targetGroupId ?
			'asap' : targetGroupId === 'asap' ?
				'next' : 'rest'
	}
	const abort = (key, reason) => {
		removeLoadingKey(key)
		debug('aborting', key)
		abortersMap[key] && abortersMap[key](reason)
		delete abortersMap[key]
	}

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

	const _allKeys = derive(
		[_uriMap],
		([uriMap]) => _.keys(uriMap)
	)

	const _restKeys = derive(
		[_allKeys, _asapKeys, _nextKeys],
		([allKeys, asapKeys, nextKeys]) =>
			_.difference(allKeys, _.union(asapKeys, nextKeys))
	)

	const _groups = derive(
		[_asapKeys, _nextKeys, _restKeys],
		([asapKeys, nextKeys, restKeys]) => ({
			asap: asapKeys,
			next: nextKeys,
			rest: restKeys
		})
	)
	// Keys that should be loaded according to targetGroupId
	const _targetKeys = derive(
		[_groups, _targetGroupId],
		([groups, targetGroupId]) => groups[targetGroupId]
	)

	// Keys of files that are fully fetched
	const _fetchedKeys = derive(
		[_outData],
		([outData]) => _.keys(outData)
	)

	// very temporary hack TODO FIXME
	let fetchedKeys = []
	_fetchedKeys.subscribe(lk => {
		fetchedKeys = lk
	})

	// Keys in target group that are not yet fully fetched
	// Some of them might be currently downloading
	const _fetchingOrUnfetchedTargetKeys = derive(
		[_shouldPrefetch, _targetGroupId, _targetKeys],
		([shouldPrefetch, targetGroupId, targetKeys]) =>
			shouldPrefetch || targetGroupId === 'asap'
				? _.difference(targetKeys, fetchedKeys)
				: []
	)

	// keys in target group that have not started downloading
	const _unfetchedTargetKeys = derive(
		[_fetchingOrUnfetchedTargetKeys],
		([fetchingOrUnfetchedTargetKeys]) =>
			_.difference(
				fetchingOrUnfetchedTargetKeys,
				_outLoadingKeys.getValue()
			)
	)
	const _unfetchedUris = derive(
		[_uriMap, _unfetchedTargetKeys],
		([uriMap, unfetchedTargetKeys]) =>
			objectToKeyValueArray(_.pickIn(uriMap, unfetchedTargetKeys))
	)

	// If asapKeys changes abort al current downloads, except those in asap
	const _abortKeys = derive(
		[_asapKeys],
		([asapKeys]) => _.difference(_outLoadingKeys.getValue(), asapKeys)
	)

	// side effects

	// When `_uriMap` changes we:
	// * wipe `outData` (clear the cache)
	// * abort all downloads
	_uriMap.subscribe(() => _outData.next({}))
	_uriMap.subscribe(() => abortAll('Aborted by uriMap change'))

	_restKeys.subscribe(() => _shouldAdvance.next(true)) // TODO explain this line
	_shouldAdvance.subscribe(shouldAdvance =>
		shouldAdvance && _targetGroupId.next(getNextGroupId())
	)

	_abortKeys.subscribe(abortKeys =>
		abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	)

	// downloading
	_unfetchedUris.subscribe(todoUris => {
		// debug('todoUris', todoUris)
		todoUris.length > 0 && startDownload(todoUris)
	})

	// debugging
	if (DEBUG) {
		_uriMap.subscribe(uriMap => debug('URI map', _.keys(uriMap).length))
		_targetGroupId.subscribe(targetGroupId => debug('target group id', targetGroupId))
		_shouldAdvance.subscribe(shouldAdvance => debug('should advance?', shouldAdvance))
		_shouldPrefetch.subscribe(shouldPrefetch => debug('should prefetch?', shouldPrefetch))
		_fetchingOrUnfetchedTargetKeys.subscribe(fetchingOrUnfetchedTargetKeys =>
			debug('fetchingOrUnfetchedTargetKeys', fetchingOrUnfetchedTargetKeys.length)
		)
		_unfetchedTargetKeys.subscribe(unfetchedTargetKeys =>
			debug('unfetchedTargetKeys', unfetchedTargetKeys.length)
		)
		_targetKeys.subscribe(targetKeys => debug('targettKeys', targetKeys.length))
		_fetchedKeys.subscribe(fk => debug('fetchedKeys', fk.length))
		_asapKeys.subscribe(asapKeys => debug('asapKeys', asapKeys.length))
		_nextKeys.subscribe(nextKeys => debug('nextKeys', nextKeys.length))
		_restKeys.subscribe(restKeys => debug('restKeys', restKeys.length))
		_defaultTransformer.subscribe(() => debug('default transformer updated'))
	}

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
