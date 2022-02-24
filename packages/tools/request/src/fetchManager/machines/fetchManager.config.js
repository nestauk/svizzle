export const fetchManagerConfig = {
	id: 'manager',
	initial: 'Active',
	states: {
		Active: {
			on: {
				FILE_CANCELLED: {
					target: '#manager.UpdatingForFileEvent'
				},
				FILE_COMPLETED: {
					actions: 'addFileToData',
					target: '#manager.UpdatingForFileEvent'
				},
				FILE_ERRORED: {
					target: '#manager.UpdatingForFileEvent'
				},
				FILE_STARTED: {
					// 1) this action is in fact not needed as we can get the
					// list of loading URIs from the spawned fetchers.
					// Also, because of the asynchronous nature of
					// the fetch API, the behavior is not deterministic
					// and leads to URIs being fetched twice on some occasions
					actions: 'addToLoadingURIs',
					target: '#manager.Active'
				},
				PRIORITY_CHANGED: {
					actions: 'storePriorities',
					target: '#manager.UpdatingForPropsChange'
				},
				URIs_CHANGED: {
					// FIXME additional `storeURIs` action needed to do so
					// separately from priority lists
					target: '#manager.UpdatingForPropsChange'
				}
			}
		},
		UpdatingForFileEvent: {
			entry: [
				'removeFromLoadingURIs', // Not needed, see 1) above
				'deleteFileFetcher', // fixed omisison
			],
			always: {
				target: '#manager.UpdatingForPropsChange'
			}
		},
		UpdatingForPropsChange: {
			entry: [
				'computeProgress',
				'cancelUneededFetchers',
				'spawnNewFetchers'
			],
			always: {
				target: '#manager.Active'
			}
		}
	}
}
