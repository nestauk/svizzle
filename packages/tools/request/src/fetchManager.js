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
	map,
	share,
	skipWhile,
	switchMapTo,
	// tap,
	withLatestFrom
} from 'rxjs/operators'
// import {tapValue} from '@svizzle/dev'

import {makeSideEffectors} from './fetchManager.sfx'
import {derive} from './rxUtils'

export const makeFetchManager = downloadFn => {

	/* input observables */

	const _asapKeys = new BehaviorSubject([])
	const _nextKeys = new BehaviorSubject([])
	const _shouldPrefetch = new BehaviorSubject(false)
	const _uriMap = new BehaviorSubject({})

	/* output observables */

	const _outData = new BehaviorSubject({})
	const _outLoadingKeys = new BehaviorSubject([])
	const _outEvents = new Subject()

	/* internal observables */

	const _groupIds = from(['asap', 'next', 'rest'])
	const _groupComplete = new BehaviorSubject()

	const {
		abort,
		abortAll,
		startDownload
	} = makeSideEffectors({
		_groupComplete,
		_outData,
		_outEvents,
		_outLoadingKeys,
		downloadFn
	})

	/* internal derived observables */

	const _allKeys = _uriMap.pipe(
		map(_.keys),
		share()
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
	)
	// .pipe(tap(tapValue('groups')))

	const _targetGroupId = _groups.pipe(
		debounceTime(0),
		// https://rxmarbles.com/#switchMap\
		switchMapTo(_groupIds.pipe(
			zipWith(_groupComplete), // wait for download to complete
			map(_.getAt(0)),
		)),
		share(),
	)

	// ## Keys of files that are fully fetched
	const _fetchedKeys = _outData.pipe(
		map(_.keys),
		share()
	)

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

	const _alreadyFetchedOrFetching = _targetGroupId.pipe(
		withLatestFrom(_groups, _fetchedKeys, _outLoadingKeys),
		map(([targetGroupId, groups, fetchedKeys, loadingKeys]) =>
			_.intersection(
				groups[targetGroupId],
				_.union(fetchedKeys, loadingKeys)
			)
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
		withLatestFrom(_alreadyFetchedOrFetching),
	).subscribe(startDownload)

	// FIXME this happens on every completed download and is rather abusive of
	// memory allocation and the garbage collector. Should rewrite conditional
	// without creating new arrays.
	_fetchedKeys.pipe(
		withLatestFrom(_shouldPrefetch, _allKeys, _asapKeys),
		skipWhile(([fetchedKeys, shouldPrefetch, allKeys, asapKeys]) => shouldPrefetch
			? _.intersection(
				fetchedKeys,
				allKeys
			).length < allKeys.length
			: _.intersection(
				fetchedKeys,
				asapKeys
			).length < asapKeys.length
		),
		debounceTime(0)
	).subscribe(() => _outEvents.next({
		type: 'done'
	}))

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
