import {objectToKeyValueArray} from '@svizzle/utils'
import * as _ from 'lamb'
import {BehaviorSubject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'

import {derive} from './rxUtils'

const DEBUG = false
const debug = (...args) => DEBUG && console.log(...args)

export const makeFetchManager = downloadFn => {
	// input stores
	const _asapKeys = new BehaviorSubject([])
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

	const startDownload = async uris => {
		debug('startDownload', uris.length)
		await Promise.all(uris.map(async ({key, value}) => {
			addLoadingKey(key)
			try {
				const contents = await downloadFn(key, value, abortersMap)
				if (contents) {
					// console.log('setting data', key)
					setData(key, contents)
					// console.log('data set', key)
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
	// * abort all downloads
	// * wipe `outData` (clear the cache)
	_uriMap.pipe(debounceTime(0)).subscribe(() => {
		abortAll('Aborted by uriMap change')
		_outData.next({})
	})

	_restKeys.pipe(debounceTime(0)).subscribe(() => {
		// _shouldAdvance.next(true)
		_targetGroupId.next('asap')
	})
	_shouldAdvance.pipe(debounceTime(0)).subscribe(shouldAdvance =>
		shouldAdvance && _targetGroupId.next(getNextGroupId())
	)

	_abortKeys.pipe(debounceTime(0)).subscribe(abortKeys =>
		abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	)

	// downloading
	_unfetchedUris.pipe(debounceTime(0)).subscribe(todoUris => {
		// debug('todoUris', todoUris)
		downloadFn && todoUris.length > 0 && startDownload(todoUris)
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
		_transformer.subscribe(() => debug('default transformer updated'))
	}

	return {
		_asapKeys,
		_nextKeys,
		_shouldPrefetch,
		_uriMap,
		_outData,
		_outLoadingKeys
	}
}
