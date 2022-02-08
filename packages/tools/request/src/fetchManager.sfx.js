import * as _ from 'lamb';
import {
	forkJoin,
	Subject
} from 'rxjs';
import {
	debounceTime,
	finalize,
} from 'rxjs/operators';
// import {isIterableEmpty} from '@svizzle/utils';

/*
// these are global so as to share URI cache across all instances
const downloadActionsMap = {}
*/

export const makeSideEffectors = ({
	_outEvents,
	downloadFn
}) => {
	const downloadObservablesMap = {};
	const abortersMap = {};

	const abort = async (uri, reason) => {
		abortersMap[uri] && await abortersMap[uri](reason);
	}

	const downloadUri = uri => {
		if (uri in downloadObservablesMap) {
			return downloadObservablesMap[uri];
		}

		const _subject = new Subject();
		const _observable = _subject.pipe(
			finalize(() => {
				// callback is called before poping array
				// so length is 1
				if (_observable.observers.length === 1) {
					abort(uri, 'no subscribers left')
				}
			})
		)
		downloadObservablesMap[uri] = _subject;

		_outEvents.next({
			uri,
			type: 'fileStarted'
		});

		const promise = downloadFn(uri, abortersMap);

		promise.then(fetchResult => {
			delete downloadObservablesMap[uri];
			_subject.next(fetchResult);
			_subject.complete();
			_outEvents.next({
				uri,
				type: 'fileCompleted',
				bytes: fetchResult.bytes
			});
		})

		return _observable;
	}

	const abortUris = (uris, reason) =>
		Promise.all(_.map(uris, uri => abort(uri, reason)));

	const startDownload = async ([[uris, groupId], urisToAbort]) => {
		await abortUris(urisToAbort, 'Not needed ASAP');

		_outEvents.next({
			groupId,
			uris,
			type: 'groupStarted'
		})
		let abortedUris = [];

		const downloadObservables = _.map(
			uris,
			uri => downloadUri(uri, abortersMap)
		);
		forkJoin(downloadObservables)
		.pipe(
			debounceTime(0)
		)
		.subscribe(() => {
			_outEvents.next({
				abortedUris,
				groupId,
				type: 'groupCompleted'
			})
		});
	};

	return {
		downloadUri,
		startDownload
	}
}
