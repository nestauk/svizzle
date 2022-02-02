import {objectToKeyValueArray} from '@svizzle/utils'
import * as _ from 'lamb'
import {
	BehaviorSubject,
	from,
	Subject,
	zipWith
} from 'rxjs'
import {
	debounceTime,
	switchMapTo,
	map,
	share,
	// tap,
	withLatestFrom
} from 'rxjs/operators'
// import {tapValue} from '@svizzle/dev'

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
	const _groupIds = from(['asap', 'next', 'rest'])
	const _groupComplete = new BehaviorSubject()

	// # internal derived observables
	const _allKeys = derive(
		[_uriMap],
		([uriMap]) => _.keys(uriMap)
	)
	const _restKeys = derive(
		[_allKeys, _asapKeys, _nextKeys],
		([allKeys, asapKeys, nextKeys]) => _.difference(allKeys, _.union(asapKeys, nextKeys))
	)
	const _groups = _restKeys.pipe(
		withLatestFrom(_asapKeys, _nextKeys),
		map(([restKeys, asapKeys, nextKeys]) => ({
			asap: asapKeys,
			next: nextKeys,
			rest: restKeys
		}))
	)// .pipe(tap(tapValue('groups')))


	// `_restKey` changes whenever `_uriMap`,`_asapKeys` or `_nextKeys` updates
	// so it's ideal to detect if downloads should restart at 'asap'
	const _targetGroupId = _restKeys.pipe(
		// tap(tapValue('RK')),
		// https://rxmarbles.com/#switchMap
		switchMapTo(_groupIds.pipe(
			zipWith(_groupComplete), // wait for download to complete
			map(_.getAt(0)),
		)),
		// tap(tapValue('tvTGI')),
	)

	// ## Keys of files that are fully fetched
	const _fetchedKeys = _outData.pipe(map(_.keys))

	// ## Keys in target group that are not yet fully fetched
	// Some of them might be currently downloading
	const _fetchingOrUnfetchedTargetKeys = _targetGroupId.pipe(
		withLatestFrom(_groups, _shouldPrefetch, _fetchedKeys),
		map(([targetGroupId, groups, shouldPrefetch, fetchedKeys]) =>
			shouldPrefetch || targetGroupId === 'asap'
				? _.difference(groups[targetGroupId], fetchedKeys)
				: []
		),
		// tap(tapValue('FOUTK')),
		share()
	)

	// ## keys in target group that have not started downloading
	const _unfetchedTargetKeys = _fetchingOrUnfetchedTargetKeys.pipe(
		withLatestFrom(_outLoadingKeys),
		map(([fetchingOrUnfetchedTargetKeys, outLoadingKeys]) =>
			_.difference(
				fetchingOrUnfetchedTargetKeys,
				outLoadingKeys
			)
		),
		// tap(tapValue('UTK'))
	)
	const _unfetchedUris = _unfetchedTargetKeys.pipe(
		withLatestFrom(_uriMap),
		map(([unfetchedTargetKeys, uriMap]) =>
			objectToKeyValueArray(_.pickIn(uriMap, unfetchedTargetKeys))
		)
	)

	// If asapKeys changes abort all current downloads, except those in asap
	const _abortKeys = derive(
		[_asapKeys],
		([asapKeys]) => _.difference(_outLoadingKeys.getValue(), asapKeys)
	)

	// # side effects
	const abortersMap = {}

	const addLoadingKey = key => _outLoadingKeys.next([..._outLoadingKeys.getValue(), key])
	const removeLoadingKey = key => _outLoadingKeys.next(_.pullFrom(_outLoadingKeys.getValue(), [key]))
	const setData = (key, data) => {
		_outData.next({..._outData.getValue(), [key]: data})
		_outEvents.next({
			key,
			type: 'complete'
		})
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
		_groupComplete.next()
		groupId === 'rest' && _outEvents.next({
			type: 'done'
		})
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

	_abortKeys.pipe(debounceTime(0)).subscribe(abortKeys =>
		abortKeys.forEach(key => abort(key, 'Aborted by priority change'))
	)

	// ## download
	_unfetchedUris.pipe(
		zipWith(_targetGroupId),
	).subscribe(startDownload)

	return {
		_asapKeys,
		_nextKeys,
		_shouldPrefetch,
		_uriMap,
		_outData,
		_outLoadingKeys,
		_outEvents
	}
}
