import {tapValue} from '@svizzle/dev'
import {
	isIterableEmpty,
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
	tap,
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
		debounceTime(0),
		withLatestFrom(_asapUris, _nextUris),
		map(([restUris, asapUris, nextUris]) => ({
			asap: asapUris,
			next: nextUris,
			rest: restUris
		})),
		// tap(tapValue('_groups')),
		share()
	);

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
		// debounceTime(0),
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
		debounceTime(0),
		withLatestFrom(_outLoadingUris),
		map(([unfetchedActiveUris, loadingUris]) =>
			_.difference(loadingUris, unfetchedActiveUris)
		),
		// tap(tapValue('_urisToAbort'))
	);

	/* side effects */

	// side effectors
	const {
		abortUris,
		startDownload
	} = makeSideEffectors({
		_outEvents,
		downloadFn
	});

	// subscriptions

	// When `_allUris` changes we:
	// * abort all downloads
	// * wipe `_outData` (clear the cache)
	_allUris
	.pipe(
		debounceTime(0),
		withLatestFrom(_outData, _outLoadingUris)
	)
	.subscribe(async ([allUris, outData, loadingUris]) => {
		_outEvents.next({type: 'allUris'})
		const urisToAbort = _.difference(
			loadingUris,
			allUris
		);
		// console.log('aborting', urisToAbort)
		await abortUris(urisToAbort, 'No longer in `_allUris`')
		// Keep only cached content in new _allUris
		_outData.next(_.pickIn(outData, allUris));
	});

	_groups.pipe(
		debounceTime(0)
	)
	.subscribe(() => {
		_outEvents.next({
			type: 'cycle:started'
		});
	});

	// download

	_urisToAbort.pipe(

	).subscribe(async urisToAbort => {
		await abortUris(urisToAbort, 'Not needed ASAP');
	});

	_unfetchedActiveUris
	.pipe(
		debounceTime(0),
		zipWith(
			_activeGroupId,
			_outEvents.pipe(
				filter(isKeyValue(['type', 'queue:empty']))
			)
		),
		// withLatestFrom(_urisToAbort),
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
	.subscribe(() => _outEvents.next({type: 'cycle:done'}));

	_shouldPrefetch
	.pipe(withLatestFrom(_asapUris))
	.subscribe(([should, asapUris]) => {
		// force restart when shouldPrefetch becomes true
		should && _asapUris.next(asapUris)
	});

	_outEvents
	.pipe(
		filter(isKeyValue(['type', 'file:started'])),
		withLatestFrom(_outLoadingUris)
	)
	.subscribe(([{uri}, loadingUris]) =>
		_outLoadingUris.next([...loadingUris, uri])
	);

	_outEvents
	.pipe(
		// filter(isKeyValue(['type', 'file:completed'])),
		filter(({type}) => [
			'file:completed',
			'file:aborted'].includes(type)
		),
		withLatestFrom(_outLoadingUris, _outData, _transformer),
	)
	.subscribe(([{type, uri, bytes}, loadingUris, outData, transformer]) => {
		_outLoadingUris.next(_.pullFrom(loadingUris, [uri]));
		if (type === 'file:completed') {
			const content = transformer(bytes);
			_outData.next({...outData, [uri]: content});
		}
	});

	_outLoadingUris
	.pipe(
		filter(isIterableEmpty),
		debounceTime(0)
	)
	.subscribe(() => {
		_outEvents.next({
			type: 'queue:empty'
		})
	});

	_outEvents
	.pipe(
		filter(isKeyValue(['type', 'group:completed'])),
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
