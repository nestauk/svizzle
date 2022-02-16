import {getKey} from '@svizzle/utils';
import * as _ from 'lamb';

export const makeSideEffectors = ({
	_outEvents,
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

	const startDownload = async ([
		[uris, groupId],
		fetchingOrFetchedTargetKeys
	]) => {
		const keys = _.map(uris, getKey);

		_outEvents.next({
			groupId,
			keys,
			skipping: fetchingOrFetchedTargetKeys,
			type: 'group:start'
		});

		let abortedKeys = [];

		await Promise.all(
			uris.map(
				async ({key, value}) => {
					_outEvents.next({
						key,
						type: 'file:start'
					});

					try {
						const result = await downloadFn(key, value, abortersMap);

						if (result.type === 'complete') {
							_outEvents.next({
								data: result.contents,
								key,
								type: 'file:complete'
							});
						} else if (result.type === 'abort') {
							abortedKeys.push(key);

							_outEvents.next({
								key,
								type: 'file:abort'
							});
						}
					} catch (error) {
						console.error(error);

						_outEvents.next({
							key,
							error,
							type: 'file:error'
						});
					}
				}
			)
		);

		_outEvents.next({
			keys,
			abortedKeys,
			groupId,
			type: 'group:complete'
		});
	}

	return {
		abort,
		startDownload
	}
}
