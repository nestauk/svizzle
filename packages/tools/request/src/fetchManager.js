// import {tapValue} from '@svizzle/dev'
import {
	isKeyValue
} from '@svizzle/utils'
import * as _ from 'lamb'
import {
	BehaviorSubject,
	// ombineLatest,
	// forkJoin,
	from,
	Subject,
	// zip,
	zipWith
} from 'rxjs'
import {
	combineLatestWith,
	debounceTime,
	filter,
	map,
	share,
	skipWhile,
	// switchMap,
	// mergeAll,
	// mergeMap,
	switchMapTo,
	// tap,
	withLatestFrom
} from 'rxjs/operators'

import {makeSideEffectors} from './fetchManager.sfx'

export const makeFetchManager = downloadFn => {

	/* input streams */

	const _allUris = new BehaviorSubject([]);
	const _asapUris = new BehaviorSubject([]);
	const _nextUris = new BehaviorSubject([]);
	const _shouldPrefetch = new BehaviorSubject(false);
	const _transformer = new BehaviorSubject(_.identity)

	/* output streams */

	const _outData = new BehaviorSubject({});
	const _outLoadingUris = new BehaviorSubject([]);
	const _outEvents = new Subject();

	/* internal streams */

	const _groupIds = from(['asap', 'next', 'rest']);
	const _shouldStartGroup = new BehaviorSubject();

	/* internal derived streams */

	const _restUris = _allUris.pipe(
		debounceTime(0), // TODO Check if `asyncScheduler` is applicable instead
		combineLatestWith(_asapUris, _nextUris),
		map(([allUris, asapUris, nextUris]) =>
			_.difference(
				allUris,
				_.union(asapUris, nextUris)
			)
		),
		// tap(tapValue('_restUris')),
		share()
	);

	const _groups = _restUris.pipe(
		withLatestFrom(_asapUris, _nextUris),
		map(([restUris, asapUris, nextUris]) => ({
			asap: asapUris,
			next: nextUris,
			rest: restUris
		})),
		// tap(tapValue('_groups')),
		share()
	);

	/*
	const _shouldStartGroup = _outEvents.pipe(
		filter(
			isKeyValue(['type', 'started'])
			// || isKeyValue(['type', 'groupCompleted'])
		),
		// tap(tapValue('_shouldStartGroup')),
	);
	*/

	// https://rxmarbles.com/#switchMap
	const _activeGroupId = _groups.pipe(
		debounceTime(0),
		switchMapTo(
			_groupIds.pipe(
				zipWith(_shouldStartGroup), // wait for signal
				map(_.getAt(0)),
			)
		),
		// tap(tapValue('_groupId')),
		share()
	);

	// Keys of files that are fully fetched
	const _fetchedUris = _outData.pipe(
		map(_.keys),
		// tap(tapValue('_fetchedUris')),
		share()
	);

	// Keys in target group that are not yet fully fetched
	// Some of them might be currently downloading
	const _unfetchedActiveUris = _activeGroupId.pipe(
		withLatestFrom(_groups, _shouldPrefetch, _fetchedUris),
		// tap(tapValue('before _unfetchedActiveUris')),
		map(([activeGroupId, groups, shouldPrefetch, fetchedUris]) =>
			shouldPrefetch || activeGroupId === 'asap'
				? _.difference(groups[activeGroupId], fetchedUris)
				: []
		),
		// tap(tapValue('_unfetchedActiveUris')),
		share()
	);

	const _urisToAbort = _unfetchedActiveUris
	.pipe(
		withLatestFrom(_outLoadingUris),
		map(([unfetchedActiveUris, loadingUris]) =>
			_.difference(loadingUris, unfetchedActiveUris)
		),
		// tap(tapValue('_urisToAbort'))
	);

	/* side effects */

	// side effectors
	const {
		startDownload
	} = makeSideEffectors({
		_outEvents,
		downloadFn
	});

	// subscriptions

	// When `_uriMap` changes we:
	// * abort all downloads
	// * wipe `_outData` (clear the cache)
	_allUris
	.pipe(
		debounceTime(0),
		withLatestFrom(_outData)
	)
	.subscribe(([allUris, outData]) => {
		_outEvents.next({type: 'allUris'})
		// Keep only cached content in new _allUris
		_outData.next(_.pickIn(outData, allUris));
	});

	_groups.pipe(
		debounceTime(0)
	)
	.subscribe(() => {
		_outEvents.next({type: 'started'});
	});

	// download

	_unfetchedActiveUris
	.pipe(
		zipWith(_activeGroupId),
		withLatestFrom(_urisToAbort),
		// tap(tapValue('startDownload'))
	)
	.subscribe(startDownload);

	// FIXME this happens on every completed download and is rather abusive of
	// memory allocation and the garbage collector. Should rewrite conditional
	// without creating new arrays.
	_fetchedUris
	.pipe(
		withLatestFrom(_allUris, _asapUris, _shouldPrefetch),
		skipWhile(
			([fetchedUris, allUris, asapUris, shouldPrefetch]) =>
				_.intersection(
					shouldPrefetch ? allUris : asapUris,
					fetchedUris
				).length < (shouldPrefetch ? allUris : asapUris).length
		),
		debounceTime(0)
	)
	.subscribe(() => _outEvents.next({type: 'done'}));

	/*
	_shouldPrefetch
	.pipe(withLatestFrom(_asapUris))
	.subscribe(([should, asapUris]) => {
		// force restart when shouldPrefetch becomes true
		should && _asapUris.next(asapUris)
	});

	_outEvents
	.pipe(
		filter(isKeyValue(['type', 'fileStarted'])),
		withLatestFrom(_outLoadingUris)
	)
	.subscribe(({uri}, loadingUris) =>
		_outLoadingUris.next([...loadingUris, uri])
	);
	*/

	_outEvents
	.pipe(
		filter(isKeyValue(['type', 'fileCompleted'])),
		withLatestFrom(_outLoadingUris, _outData, _transformer)
	)
	.subscribe(([{uri, bytes}, loadingUris, outData, transformer]) => {
		_outLoadingUris.next(_.pullFrom(loadingUris, uri));
		const content = transformer(bytes);
		_outData.next({...outData, [uri]: content});
	});


	_outEvents
	.pipe(
		filter(isKeyValue(['type', 'groupCompleted'])),
		debounceTime(0),
	)
	.subscribe(() => {
		_shouldStartGroup.next();
	});

	return {
		_allUris,
		_asapUris,
		_nextUris,
		_outData,
		_outEvents,
		_outLoadingUris,
		_shouldPrefetch,
		_transformer
	};
}
