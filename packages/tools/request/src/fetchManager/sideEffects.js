import {getKey} from '@svizzle/utils';
import * as _ from 'lamb';

export const makeSideEffectors = ({
	_groupComplete,
	_outData,
	_outEvents,
	_outLoadingKeys,
	downloadFn
}) => {
	const abortersMap = {}

	const abort = (key, reason) => {
		_outEvents.next({
			key,
			reason,
			type: 'abort',
		});
		abortersMap[key] && abortersMap[key](reason);
	}

	const abortAll = reason =>
		_outLoadingKeys
		.getValue()
		.forEach(key => abort(key, reason));

	const startDownload = async ([
		[uris, groupId],
		fetchingOrFetchedTargetKeys
	]) => {
		const keys = _.map(uris, getKey);

		_outEvents.next({
			groupId,
			keys,
			skipping: fetchingOrFetchedTargetKeys,
			type: 'groupStart'
		});

		let abortedKeys = [];

		await Promise.all(uris.map(async ({key, value}) => {
			_outLoadingKeys.next([..._outLoadingKeys.getValue(), key]);
			_outEvents.next({
				key,
				type: 'start'
			});

			try {
				const result = await downloadFn(key, value, abortersMap);
				if (result.type === 'complete') {
					_outData.next({
						..._outData.getValue(),
						[key]: result.contents
					});
					_outEvents.next({
						key,
						type: 'complete'
					});
				} else if (result.type === 'abort') {
					abortedKeys.push(key);
				}
			} catch (e) {
				console.error(e);
			} finally {
				_outLoadingKeys.next(_.pullFrom(
					_outLoadingKeys.getValue(),
					[key]
				));
			}
		}));

		_outEvents.next({
			abortedKeys,
			groupId,
			type: 'groupComplete'
		});

		// TBD
		_groupComplete.next();
	}

	return {
		abort,
		abortAll,
		startDownload
	}
}
