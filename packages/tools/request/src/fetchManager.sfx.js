import * as _ from 'lamb';
import {
	forkJoin,
	Subject
} from 'rxjs';
import {
	debounceTime,
	finalize,
} from 'rxjs/operators';

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
			type: 'file:started'
		});

		const promise = downloadFn(uri, abortersMap);

		promise.then(fetchResult => {
			delete downloadObservablesMap[uri];
			_subject.next(fetchResult);
			_subject.complete();
			_outEvents.next(fetchResult);
		})

		return _observable;
	}

	const abortUris = (uris, reason) =>
		Promise.all(_.map(uris, uri => abort(uri, reason)));

	const startDownload = ([uris, groupId]) => {
		_outEvents.next({
			groupId,
			uris,
			type: 'group:started'
		});
		const downloadObservables = _.map(
			uris,
			uri => downloadUri(uri, abortersMap)
		);
		const sub = forkJoin(downloadObservables)
		.pipe(
			debounceTime(0)
		)
		.subscribe(() => {
			_outEvents.next({
				groupId,
				type: 'group:completed'
			});
			sub.unsubscribe();
		});
	};

	return {
		abortUris,
		downloadUri,
		startDownload
	}
}
