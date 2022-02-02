import {objectToKeyValueArray} from '@svizzle/utils'
import * as _ from 'lamb'
import {BehaviorSubject, Subject, zipWith} from 'rxjs'
import {
	combineLatestWith,
	debounceTime,
	filter,
	map,
	withLatestFrom
} from 'rxjs/operators'

import {derive} from './rxUtils'

export const makeFetchManager = downloadFn => {
	// # input observables
	const _asapKeys = new BehaviorSubject([])
	const _nextKeys = new BehaviorSubject([])
	const _shouldPrefetch = new BehaviorSubject(false)
	const _uriMap = new BehaviorSubject({})

	// # output observables
	const _outData = new BehaviorSubject({})
	const _outLoadingKeys = new BehaviorSubject([])
	const _outEvents = new Subject()

	// # internal observables
	const _targetGroupId = new BehaviorSubject('asap')
	// const _targetGroupId = from(['asap', 'next', 'rest'])

	// # internal derived observables
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
	// ## Keys of files that are fully fetched
	const _fetchedKeys = derive(
		[_outData],
		([outData]) => _.keys(outData)
	)
	// ## Keys in target group that are not yet fully fetched
	// Some of them might be currently downloading
	const _fetchingOrUnfetchedTargetKeys = _groups.pipe(
		combineLatestWith(_targetGroupId),
		debounceTime(0),
		withLatestFrom(_shouldPrefetch, _fetchedKeys),
		map(([[groups, targetGroupId], shouldPrefetch, fetchedKeys]) =>
			shouldPrefetch || targetGroupId === 'asap'
				? _.difference(groups[targetGroupId], fetchedKeys)
				: []
		)
	)
	// ## keys in target group that have not started downloading
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
	// If asapKeys changes abort all current downloads, except those in asap
	const _abortKeys = derive(
		[_asapKeys],
		([asapKeys]) => _.difference(_outLoadingKeys.getValue(), asapKeys)
	)

	// # side effects
	const abortersMap = {}
	let shouldRestart = false

	const addLoadingKey = key => _outLoadingKeys.next([..._outLoadingKeys.getValue(), key])
	const removeLoadingKey = key => _outLoadingKeys.next(_.pullFrom(_outLoadingKeys.getValue(), [key]))
	const setData = (key, data) => {
		_outData.next({..._outData.getValue(), [key]: data})
		_outEvents.next({
			key,
			type: 'complete'
		})
	}

	const getNextGroupId = () => {
		// _shouldAdvance.next(false)
		let nextGroupId
		if (shouldRestart) {
			nextGroupId = 'asap'
		} else {
			const targetGroupId = _targetGroupId.getValue()
			nextGroupId = !targetGroupId ? 'asap' :
				targetGroupId === 'asap' ?
					'next' : 'rest'
		}
		return nextGroupId
	}

	const abort = (key, reason) => {
		removeLoadingKey(key)
		_outEvents.next({
			type: 'abort',
			reason,
			key
		})
		abortersMap[key] && abortersMap[key](reason)
		delete abortersMap[key]
	}

	const abortAll = reason => _outLoadingKeys.getValue().forEach(key => abort(key, reason))

	const startDownload = async ([uris, groupId]) => {
		const keys = _.map(uris, _.getKey('key'))
		_outEvents.next({
			groupId,
			keys,
			type: 'groupStart'
		})
		shouldRestart = false
		let abortedKeys = []
		await Promise.all(uris.map(async ({key, value}) => {
			addLoadingKey(key)
			_outEvents.next({
				key,
				type: 'start'
			})
			try {
				const result = await downloadFn(key, value, abortersMap)
				if (result.type === 'complete') {
					setData(key, result.contents)
				} else if (result.type === 'abort') {
					abortedKeys.push(key)
				}
			} catch (e) {
				console.error(e)
			} finally {
				removeLoadingKey(key)
			}
		}))
		_outEvents.next({
			abortedKeys,
			groupId,
			type: 'groupComplete'
		})
		_targetGroupId.next(getNextGroupId())
		shouldRestart = false
	}

	// When `_uriMap` changes we:
	// * abort all downloads
	// * wipe `outData` (clear the cache)
	_uriMap.pipe(debounceTime(0)).subscribe(() => {
		abortAll('Aborted by uriMap change')
		_outData.next({})
		_outEvents.next({
			type: 'reset'
		})
	})

	_restKeys.pipe(debounceTime(0)).subscribe(() => {
		shouldRestart = true
	})

	_abortKeys.pipe(debounceTime(0)).subscribe(abortKeys =>
		abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	)

	// ## downloading
	_unfetchedUris.pipe(
		debounceTime(0),
		filter(uris => uris.length > 0),
		zipWith(_targetGroupId),
	).subscribe(startDownload)

	return {
		_asapKeys,
		_nextKeys,
		_shouldPrefetch,
		_uriMap,
		_outData,
		_outLoadingKeys,
		_outLog: _outEvents
	}
}
