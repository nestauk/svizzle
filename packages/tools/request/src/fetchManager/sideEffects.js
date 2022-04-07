import {getKey} from '@svizzle/utils';
import * as _ from 'lamb';

export const makeSideEffectors = ({
	_outEvents,
	downloadFn
}) => {
	const cancellersMap = {}

	const cancel = (key, reason) => {
		cancellersMap[key] && cancellersMap[key](reason);
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

		let cancelledKeys = [];

		await Promise.all(
			uris.map(
				async ({key, value}) => {
					_outEvents.next({
						key,
						type: 'file:start'
					});

					try {
						const result = await downloadFn(key, value, cancellersMap);

						if (result.type === 'complete') {
							_outEvents.next({
								data: result.contents,
								key,
								type: 'file:complete'
							});
						} else if (result.type === 'cancel') {
							cancelledKeys.push(key);

							_outEvents.next({
								key,
								reason: result.reason,
								type: 'file:cancel'
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
			cancelledKeys,
			groupId,
			type: 'group:complete'
		});
	}

	return {
		cancel,
		startDownload
	}
}
